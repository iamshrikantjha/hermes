import { useEffect, useRef, useState } from 'react'
import { useSessionStore } from '../state/session'
import { useWebRTC } from '../realtime/webrtc'

type Props = { roomId: string }

export function VideoGrid({ roomId }: Props) {
  const { streams, start, stop, isStarted } = useWebRTC(roomId)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button className="btn btn-secondary" onClick={() => start()} disabled={isStarted}>Start Cam</button>
        <button className="btn" onClick={() => stop()} disabled={!isStarted}>Stop</button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {streams.map(s => (
          <VideoTile key={s.peerId} stream={s.stream} label={s.label} />
        ))}
      </div>
    </div>
  )
}

function VideoTile({ stream, label }: { stream: MediaStream, label: string }) {
  const ref = useRef<HTMLVideoElement | null>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream
    }
  }, [stream])
  return (
    <div className="rounded overflow-hidden border">
      <video ref={ref} className="w-full aspect-video" autoPlay playsInline muted={label==='Me'} />
      <div className="p-1 text-xs opacity-70">{label}</div>
    </div>
  )
}


