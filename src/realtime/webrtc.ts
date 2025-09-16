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

  useEffect(() => {
    return () => {
      Object.values(peersRef.current).forEach(p => p.destroy())
      localStreamRef.current?.getTracks().forEach(t => t.stop())
    }
  }, [])

  const start = async () => {
    if (isStarted) return
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    localStreamRef.current = stream
    setIsCamOn(true)
    setIsMicOn(true)
    setStreams((s) => [{ peerId: 'me', stream, label: 'Me' }, ...s.filter(x => x.peerId !== 'me')])
    setIsStarted(true)
    signalPresence()
  }

  const stop = () => {
    setIsStarted(false)
    Object.values(peersRef.current).forEach(p => p.destroy())
    peersRef.current = {}
    localStreamRef.current?.getTracks().forEach(t => t.stop())
    localStreamRef.current = null
    setStreams((s) => s.filter(x => x.peerId === 'me' ? false : true))
  }

  function signalPresence() {
    const gun = getGunForRoom(roomId)
    const presence = gun.get(roomId).get('presence')
    const myId = me?.id ?? 'anon'
    presence.get(myId).put({ id: myId, ts: Date.now() })
    presence.map().on((data:any, peerId:string) => {
      if (!data || peerId === myId) return
      if (!peersRef.current[peerId]) createPeer(peerId)
    })
  }

  function createPeer(peerId: string) {
    const initiator = peerId.localeCompare(useSessionStore.getState().me?.id ?? 'anon') > 0
    const p = new Peer({
      initiator,
      trickle: true,
      stream: localStreamRef.current ?? undefined,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:global.stun.twilio.com:3478?transport=udp' },
        ],
      },
    })
    peersRef.current[peerId] = p
    const gun = getGunForRoom(roomId)
    const sig = gun.get(roomId).get('signals')

    p.on('signal', data => {
      sig.get(`${useSessionStore.getState().me?.id}|${peerId}`).put(JSON.stringify(data))
    })

    const key = `${peerId}|${useSessionStore.getState().me?.id}`
    sig.get(key).on((raw:any) => {
      if (!raw) return
      try {
        const d = JSON.parse(raw)
        p.signal(d)
      } catch {}
    })

    p.on('stream', (stream) => {
      setStreams((s) => {
        const rest = s.filter(x => x.peerId !== peerId)
        return [...rest, { peerId, stream, label: peerId.slice(0,6) }]
      })
    })

    p.on('close', () => {
      setStreams((s) => s.filter(x => x.peerId !== peerId))
      delete peersRef.current[peerId]
    })

    p.on('error', () => {
      setStreams((s) => s.filter(x => x.peerId !== peerId))
      delete peersRef.current[peerId]
    })
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


