import { useEffect, useRef, useState } from 'react'
import { useSessionStore } from '../state/session'
import { useWebRTC } from '../realtime/webrtc'

type Props = { roomId: string }

export function VideoGrid({ roomId }: Props) {
  const { streams, start, stop, isStarted, isMicOn, isCamOn, toggleMic, toggleCam } = useWebRTC(roomId)

  return (
    <div className="flex flex-col gap-2">
      <div className="join">
        <button className="btn btn-secondary join-item" onClick={() => start()} disabled={isStarted}>Start</button>
        <button className="btn join-item" onClick={() => stop()} disabled={!isStarted}>Leave</button>
        <button className={`btn join-item ${isCamOn?'':'btn-outline'}`} disabled={!isStarted} onClick={toggleCam}>
          {isCamOn ? 'Camera On' : 'Camera Off'}
        </button>
        <button className={`btn join-item ${isMicOn?'':'btn-outline'}`} disabled={!isStarted} onClick={toggleMic}>
          {isMicOn ? 'Mic On' : 'Mic Off'}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {streams.map(s => (
          <VideoTile key={s.peerId} stream={s.stream} label={s.label} muted={s.label==='Me'} />
        ))}
      </div>
    </div>
  )
}

function VideoTile({ stream, label, muted }: { stream: MediaStream, label: string, muted?: boolean }) {
  const ref = useRef<HTMLVideoElement | null>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream
    }
  }, [stream])
  return (
    <div className="rounded overflow-hidden border">
      <video ref={ref} className="w-full aspect-video" autoPlay playsInline muted={muted} />
      <div className="p-1 text-xs opacity-70">{label}</div>
    </div>
  )
}


