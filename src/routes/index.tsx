import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [roomId, setRoomId] = useState('')
  const go = () => {
    const id = roomId.trim() || Math.random().toString(36).slice(2, 8)
    window.location.href = `/room/${id}`
  }
  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Start a collaboration session</h2>
          <input className="input input-bordered w-full" placeholder="Enter Room ID or leave blank" value={roomId} onChange={(e)=>setRoomId(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter') go() }} />
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={go}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  )
}
