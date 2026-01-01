import { useEffect, useRef, useState } from 'react'
import { useWebRTC } from '../realtime/webrtc'
import { getAvatarUrl } from '../utils/avatars'
import { getAudioContext } from '../utils/audio'
import { Mic, MicOff, CameraOff, PhoneOff, Video, VideoOff } from 'lucide-react'

type Props = { roomId: string }

export function VideoGrid({ roomId }: Props) {
  const { streams, start, stop, isStarted, isMicOn, isCamOn, toggleMic, toggleCam } = useWebRTC(roomId)

  return (
    <div className="flex flex-col h-full bg-base-100/50 rounded-xl p-2 gap-2">
      {/* Controls Bar - Floating or Top */}
      <div className="flex justify-between items-center bg-base-100 p-2 rounded-lg shadow-sm mb-2 border border-base-200">
        <div className="text-sm font-semibold text-base-content/60 px-2">
          {isStarted ? `${streams.length} Participants` : 'Ready to join'}
        </div>
        <div className="join shadow-sm">
          {!isStarted ? (
            <button className="btn btn-primary join-item btn-sm" onClick={() => start()}>Join Call</button>
          ) : (
            <>
              <button className={`btn btn-sm join-item ${isMicOn ? 'btn-ghost' : 'btn-error text-white'}`} onClick={toggleMic} title="Toggle Mic">
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>
              <button className={`btn btn-sm join-item ${isCamOn ? 'btn-ghost' : 'btn-error text-white'}`} onClick={toggleCam} title="Toggle Camera">
                {isCamOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>
              <button className="btn btn-error btn-sm text-white join-item" onClick={stop}>
                <PhoneOff className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className={`grid gap-2 h-full ${streams.length <= 1 ? 'grid-cols-1' : streams.length <= 4 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {streams.map(s => (
            <VideoTile key={s.peerId} stream={s.stream} label={s.label} muted={s.label.includes('Me')} />
          ))}
          {streams.length === 0 && (
            <div className="col-span-full flex items-center justify-center text-base-content/40 flex-col gap-2 opacity-50">
              <CameraOff className="w-16 h-16" strokeWidth={1.5} />
              <span>Camera is off</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Simple hook to detect volume
function useAudioVolume(stream: MediaStream) {
  const [volume, setVolume] = useState(0)

  useEffect(() => {
    if (!stream || stream.getAudioTracks().length === 0) return

    // Use singleton context
    const ctx = getAudioContext()
    if (!ctx) return

    let source: MediaStreamAudioSourceNode | null = null
    let analyser: AnalyserNode | null = null

    try {
      source = ctx.createMediaStreamSource(stream)
      analyser = ctx.createAnalyser()
      analyser.fftSize = 32
      source.connect(analyser)
    } catch (e) {
      // Ignore errors if context is already tracking stream or closed
      return
    }

    const buffer = new Uint8Array(analyser.frequencyBinCount)
    let active = true

    const loop = () => {
      if (!active || !analyser) return
      analyser.getByteFrequencyData(buffer)
      let sum = 0
      for (const v of buffer) sum += v
      const avg = sum / buffer.length
      setVolume(avg)
      requestAnimationFrame(loop)
    }
    loop()

    return () => {
      active = false
      try {
        source?.disconnect()
        analyser?.disconnect()
      } catch (e) { }
    }
  }, [stream])

  return volume
}

function VideoTile({ stream, label, muted }: { stream: MediaStream, label: string, muted?: boolean }) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const avatarUrl = getAvatarUrl(label)
  const volume = useAudioVolume(stream)
  const isSpeaking = volume > 10 // Threshold for visual "speaking" indicator

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream
    }
  }, [stream])

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden group aspect-video shadow-lg ring transition-all duration-100 ${isSpeaking && !muted ? 'ring-4 ring-primary ring-opacity-50 scale-[1.02]' : 'ring-transparent'}`}>
      <video
        ref={ref}
        className="w-full h-full object-cover relative z-10"
        autoPlay
        playsInline
        muted={muted}
      />

      {/* Avatar Fallback / Underlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-base-300 z-0">
        <div className={`relative flex items-center justify-center`}>
          {isSpeaking && !muted && (
            <div className="absolute w-full h-full rounded-full bg-primary/30 animate-ping"></div>
          )}
          <img src={avatarUrl} alt="avatar" className="w-20 h-20 rounded-full object-cover z-10 relative shadow-xl" />
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/70 to-transparent p-2 flex justify-between items-end transition-opacity opacity-0 group-hover:opacity-100">
        <div className="text-white text-xs font-medium bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-2">
          <img src={avatarUrl} className="w-4 h-4 rounded-full" />
          {label}
        </div>
        {/* Mic Icon Status */}
        <div className="bg-black/40 p-1 rounded-full text-white">
          {muted ? (
            <MicOff className="w-4 h-4 text-error" />
          ) : (
            <Mic className={`w-4 h-4 ${isSpeaking ? 'text-success' : 'text-base-content/70'}`} />
          )}
        </div>
      </div>
    </div>
  )
}



