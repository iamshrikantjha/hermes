import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Editor } from '../components/Editor'
import { Chat } from '../components/Chat'
import { VideoGrid } from '../components/VideoGrid'
import { useSessionStore } from '../state/session'

export const Route = createFileRoute('/room/$roomId')({
  component: RoomPage,
})

function RoomPage() {
  const { roomId } = Route.useParams()
  const router = useRouter()
  const [displayName, setDisplayName] = useState("")
  const [joining, setJoining] = useState(false)
  const joined = useSessionStore(s => s.joined)
  const setJoined = useSessionStore(s => s.setJoined)
  const setRoom = useSessionStore(s => s.setRoom)
  const themeRef = useRef<string | null>(null)

  useEffect(() => {
    setRoom(roomId)
  }, [roomId, setRoom])

  const onJoin = () => {
    const name = displayName.trim() || `Guest-${Math.random().toString(36).slice(2, 6)}`
    setJoining(true)
    useSessionStore.getState().setMe({ id: crypto.randomUUID(), name })
    setJoined(true)
    setJoining(false)
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
  }

  const content = useMemo(() => (
    <div className="flex h-dvh w-full flex-col">
      <div className="navbar bg-base-100 border-b">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Hermes</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control hidden md:block">
            <input type="text" readOnly className="input input-bordered w-80" value={window.location.href} />
          </div>
          <button className="btn btn-primary" onClick={copyLink}>Copy Link</button>
          <select className="select select-bordered" value={useSessionStore.getState().language} onChange={(e) => useSessionStore.getState().setLanguage(e.target.value)}>
            <option value="typescript">TypeScript</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
          </select>
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={(e) => {
              const newTheme = e.target.checked ? 'night' : 'light'
              document.documentElement.setAttribute('data-theme', newTheme)
              themeRef.current = newTheme
            }} />
            <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0L7.05,18.4A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7,4.93,6.29A1,1,0,1,0,3.52,7.7L4.23,8.41A1,1,0,0,0,5.64,7ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2ZM18.36,17a1,1,0,0,0-1.41,1.41l.71.71a1,1,0,0,0,1.41-1.41ZM12,19a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,7.05a1,1,0,0,0,.71-.29l.71-.71a1,1,0,0,0-1.41-1.41l-.71.71a1,1,0,0,0,0,1.41A1,1,0,0,0,18.36,7.05Z"/></svg>
            <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8,8,0,0,1-10.45-10.5A1,1,0,0,0,9,1,10,10,0,1,0,22,14,1,1,0,0,0,21.64,13Z"/></svg>
          </label>
        </div>
      </div>
      <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-3 gap-2 p-2 h-[calc(100dvh-4rem)]">
        <div className="md:col-span-2 card bg-base-100 shadow overflow-hidden">
          <div className="card-body p-0 h-full">
            <Editor roomId={roomId} />
          </div>
        </div>
        <div className="md:col-span-1 flex flex-col gap-2 h-full">
          <div className="card bg-base-100 shadow grow">
            <div className="card-body p-0 h-full">
              <Chat roomId={roomId} />
            </div>
          </div>
          <div className="card bg-base-100 shadow">
            <div className="card-body p-2">
              <VideoGrid roomId={roomId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ), [roomId])

  if (!joined) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Join Room {roomId}</h2>
            <input className="input input-bordered w-full" placeholder="Your display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            <div className="card-actions justify-end">
              <button className="btn btn-primary" disabled={joining} onClick={onJoin}>Join</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return content
}


