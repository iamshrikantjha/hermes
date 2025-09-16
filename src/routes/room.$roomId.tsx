import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Editor } from '../components/Editor'
import { Chat } from '../components/Chat'
import { VideoGrid } from '../components/VideoGrid'
import { useSessionStore } from '../state/session'
import { ThemeSwitcher } from '../components/ThemeSwitcher'
import { getAvatarUrl } from '../utils/avatars'

export const Route = createFileRoute('/room/$roomId')({
  component: RoomPage,
})

function RoomPage() {
  const { roomId } = Route.useParams()
  const router = useRouter()
  const [displayName, setDisplayName] = useState("")
  const [joining, setJoining] = useState(false)
  const [isNameModalOpen, setIsNameModalOpen] = useState(false)
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
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">Hermes</a>
        </div>
        <div className="navbar-center hidden md:flex">
          <div className="join w-[32rem]">
            <input type="text" readOnly value={window.location.href} className="input input-bordered join-item w-full" />
            <button className="btn btn-primary join-item" onClick={copyLink}>Copy</button>
          </div>
        </div>
        <div className="navbar-end">
          <div className="hidden md:flex items-center gap-2">
            <select className="select select-bordered select-sm" value={useSessionStore.getState().language} onChange={(e) => useSessionStore.getState().setLanguage(e.target.value)}>
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
            </select>
            <button className="btn btn-ghost" onClick={()=>setIsNameModalOpen(true)}>
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src={getAvatarUrl(useSessionStore.getState().me?.name ?? 'Anonymous')} />
                </div>
              </div>
              <span className="ml-2 max-w-[10rem] truncate">{useSessionStore.getState().me?.name ?? 'Anonymous'}</span>
            </button>
            <ThemeSwitcher />
          </div>
          <div className="md:hidden dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">Menu</div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56">
              <li>
                <button onClick={copyLink}>Copy Link</button>
              </li>
              <li>
                <a onClick={()=>setIsNameModalOpen(true)}>Edit Name</a>
              </li>
              <li>
                <div className="px-2 py-1">
                  <select className="select select-bordered select-sm w-full" value={useSessionStore.getState().language} onChange={(e) => useSessionStore.getState().setLanguage(e.target.value)}>
                    <option value="typescript">TypeScript</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                    <option value="go">Go</option>
                    <option value="rust">Rust</option>
                  </select>
                </div>
              </li>
              <li>
                <div className="px-2 py-1"><ThemeSwitcher /></div>
              </li>
            </ul>
          </div>
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

  return (
    <>
      {content}
      <NameEditModal open={isNameModalOpen} onClose={()=>setIsNameModalOpen(false)} />
    </>
  )
}

function NameEditModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const me = useSessionStore(s => s.me)
  const [name, setName] = useState(me?.name ?? '')
  useEffect(() => { setName(me?.name ?? '') }, [me?.name])
  const save = () => {
    if (!name.trim()) return
    useSessionStore.getState().setMe({ id: useSessionStore.getState().me?.id ?? crypto.randomUUID(), name: name.trim() })
    onClose()
  }
  return (
    <dialog className={`modal ${open ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-3">Edit display name</h3>
        <input className="input input-bordered w-full" value={name} onChange={(e)=>setName(e.target.value)} />
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={save}>Save</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  )
}


