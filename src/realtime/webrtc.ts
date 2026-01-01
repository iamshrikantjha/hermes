import Peer from 'simple-peer'
import { useEffect, useRef, useState } from 'react'
import { getGunForRoom } from './gun'
import { useSessionStore } from '../state/session'

type RemoteStream = { peerId: string; stream: MediaStream; label: string }

export function useWebRTC(roomId: string) {
  const me = useSessionStore(s => s.me)
  const [streams, setStreams] = useState<RemoteStream[]>([])
  const [isStarted, setIsStarted] = useState(false)
  const [isCamOn, setIsCamOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const localStreamRef = useRef<MediaStream | null>(null)
  const peersRef = useRef<Record<string, Peer.Instance>>({})
  const roomIdRef = useRef(roomId)

  // Update ref if room changes (unlikely but safe)
  useEffect(() => { roomIdRef.current = roomId }, [roomId])

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      stop()
    }
  }, [])

  const start = async () => {
    if (isStarted) return
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      localStreamRef.current = stream

      // Initialize states based on tracks
      setIsCamOn(stream.getVideoTracks()[0]?.enabled ?? false)
      setIsMicOn(stream.getAudioTracks()[0]?.enabled ?? false)

      setStreams((prev) => {
        const others = prev.filter(x => x.peerId !== 'me')
        return [{ peerId: 'me', stream, label: 'Me' }, ...others]
      })

      setIsStarted(true)
      signalPresence()
    } catch (err) {
      console.error("Failed to get media", err)
      alert("Could not access Camera/Microphone. Please check permissions.")
    }
  }

  const stop = () => {
    setIsStarted(false)

    // Destroy peers
    Object.values(peersRef.current).forEach(p => p.destroy())
    peersRef.current = {}

    // Stop local tracks
    localStreamRef.current?.getTracks().forEach(t => t.stop())
    localStreamRef.current = null

    // Remove 'me' from streams, keep others? No, looking at the code, we should clear 'me'
    // Actually if we stop, we probably leave the call, so clear everything or just 'me'?
    // User asked "Leave", so we should probably clear all streams as we are disconnecting from the mesh.
    setStreams([])
  }

  function signalPresence() {
    const gun = getGunForRoom(roomIdRef.current)
    const presence = gun.get(roomIdRef.current).get('presence')
    const myId = me?.id ?? 'anon'

    // Announce self
    presence.get(myId).put({ id: myId, ts: Date.now() })

    // Listen for others
    presence.map().on((data: any, peerId: string) => {
      if (!data || peerId === myId) return
      // Simple debounce/check if peer exists
      if (!peersRef.current[peerId]) {
        createPeer(peerId)
        // Note: 'initiator' logic in original code was: 
        // initiator = peerId > myId. 
        // This is a common pattern for mesh to avoid double connections.
        // We should stick to that or use a dedicated signal.
        // Let's stick to the deterministic initiator logic.
      }
    })
  }

  function createPeer(peerId: string) {
    const myId = useSessionStore.getState().me?.id ?? 'anon'
    if (peersRef.current[peerId]) return // Already connected

    // Deterministic initiator: The one with larger ID initiates
    const initiator = myId.localeCompare(peerId) > 0

    // If we are iterating from presence, we only initiate if we are the larger ID.
    // If we are the smaller ID, we wait for their signal? 
    // Re-reading original code:
    // "if (!peersRef.current[peerId]) createPeer(peerId)"
    // "const initiator = peerId.localeCompare(...) > 0" -> This logic seems to say "If THEIR id is bigger than mine, I initiate?" 
    // Wait: 'peerId.localeCompare(myId) > 0' means peerId > myId.
    // If peerId > myId, then 'initiator' is true. 
    // So smaller ID waits?
    // Let's verify standard mesh pattern. usually: if (myId > peerId) initiate.
    // The previous code had: `const initiator = peerId.localeCompare(myId) > 0`
    // So if peerId="B", myId="A". "B".compare("A") is > 0. So A initiates connection to B? 
    // No, `createPeer` is called by A.
    // `initiator` defaults to false in simple-peer.
    // If A (local) creates peer for B (remote). 
    // If A < B, initiator = true.
    // If A > B, initiator = false.
    // This ensures only one side initiates.

    const p = new Peer({
      initiator,
      trickle: true,
      stream: localStreamRef.current ?? undefined,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }
        ],
      },
    })

    peersRef.current[peerId] = p
    const gun = getGunForRoom(roomIdRef.current)
    const sig = gun.get(roomIdRef.current).get('signals')

    // On Signal: Send to Gun
    p.on('signal', data => {
      const target = peerId
      const source = myId
      // Store signal geared towards target
      // Key: target|source. Value: signal data
      // So target listens to 'me|...' ?
      // Original code: sig.get(`${myId}|${peerId}`).put(...) -> 'source|target'
      sig.get(`${source}|${target}`).put(JSON.stringify(data))
    })

    // Listen for Signals geared towards ME from PEER
    // Key: `${myId}|${peerId}` ? 
    // Original code: `sig.get(key).on(...)` where key = `${peerId}|${myId}` (remote|local)
    // So if A sends to B on 'A|B'. B listens on 'A|B'.
    // Correct.
    const incomingKey = `${peerId}|${myId}`
    sig.get(incomingKey).on((raw: any) => {
      if (!raw) return
      try {
        const d = JSON.parse(raw)
        p.signal(d)
      } catch (e) { console.error('Signal parse error', e) }
    })

    p.on('stream', (stream) => {
      setStreams((prev) => {
        if (prev.find(x => x.peerId === peerId)) return prev
        return [...prev, { peerId, stream, label: peerId.slice(0, 8) }]
      })
    })

    p.on('close', () => {
      cleanupPeer(peerId)
    })

    p.on('error', (err) => {
      console.warn('Peer error', peerId, err)
      cleanupPeer(peerId)
    })
  }

  function cleanupPeer(peerId: string) {
    if (peersRef.current[peerId]) {
      peersRef.current[peerId].destroy()
      delete peersRef.current[peerId]
    }
    setStreams((s) => s.filter(x => x.peerId !== peerId))
  }

  function toggleCam() {
    const stream = localStreamRef.current
    if (!stream) return
    const track = stream.getVideoTracks()[0]
    if (!track) return
    const next = !track.enabled
    track.enabled = next
    setIsCamOn(next)
  }

  function toggleMic() {
    const stream = localStreamRef.current
    if (!stream) return
    const track = stream.getAudioTracks()[0]
    if (!track) return
    const next = !track.enabled
    track.enabled = next
    setIsMicOn(next)
  }

  return { streams, start, stop, isStarted, isCamOn, isMicOn, toggleCam, toggleMic }
}


