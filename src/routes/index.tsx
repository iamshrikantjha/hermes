import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { ThemeSwitcher } from '../components/ThemeSwitcher'
import { useSessionStore } from '../state/session'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const router = useRouter()
  const [roomId, setRoomId] = useState('')
  const [name, setName] = useState('')
  const go = () => {
    const id = roomId.trim() || Math.random().toString(36).slice(2, 8)
    const displayName = name.trim() || `Host-${Math.random().toString(36).slice(2, 6)}`
    useSessionStore.getState().setMe({ id: crypto.randomUUID(), name: displayName })
    // Mark as joined so the room does not ask again
    useSessionStore.getState().setJoined(true)
    router.navigate({ to: `/room/${id}` })
  }
  return (
    <div className="min-h-dvh hero bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold">Hermes</h1>
            <ThemeSwitcher />
          </div>
          <p className="py-4 opacity-80">Real-time code collaboration, chat, and P2P video calls — all free and ephemeral.</p>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body gap-3">
              <div className="grid md:grid-cols-2 gap-3">
                <input className="input input-bordered w-full" placeholder="Your display name" value={name} onChange={(e)=>setName(e.target.value)} />
                <input className="input input-bordered w-full" placeholder="Room ID (leave blank to create)" value={roomId} onChange={(e)=>setRoomId(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter') go() }} />
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={go}>Create / Join</button>
              </div>
            </div>
          </div>
          <div className="stats shadow mt-6">
            <div className="stat">
              <div className="stat-title">Editor</div>
              <div className="stat-value">Monaco</div>
              <div className="stat-desc">TypeScript, JS, Python, and more</div>
            </div>
            <div className="stat">
              <div className="stat-title">Realtime</div>
              <div className="stat-value">Gun.js</div>
              <div className="stat-desc">Ephemeral, session-only</div>
            </div>
            <div className="stat">
              <div className="stat-title">Calls</div>
              <div className="stat-value">WebRTC</div>
              <div className="stat-desc">Peer-to-peer video</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
