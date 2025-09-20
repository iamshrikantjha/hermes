import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
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
  const [displayName, setDisplayName] = useState("")
  const [joining, setJoining] = useState(false)
  const [isNameModalOpen, setIsNameModalOpen] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const joined = useSessionStore(s => s.joined)
  const setJoined = useSessionStore(s => s.setJoined)
  const setRoom = useSessionStore(s => s.setRoom)

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
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const content = useMemo(() => (
    <div className="flex h-screen w-full flex-col bg-base-200/30">
      {/* Modern Navbar */}
      <div className="navbar bg-base-100/95 backdrop-blur-xl border-b border-base-300/50 shadow-sm sticky top-0 z-50">
        <div className="navbar-start">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Hermes
              </h1>
              <p className="text-xs text-base-content/60 -mt-1">Room: {roomId}</p>
            </div>
          </div>
        </div>
        
        <div className="navbar-center hidden lg:flex">
          <div className="join shadow-lg">
            <input 
              type="text" 
              readOnly 
              value={window.location.href} 
              className="input input-bordered join-item w-80 bg-base-100/50 text-sm font-mono" 
            />
            <button 
              className={`btn join-item transition-all duration-300 ${
                copySuccess ? 'btn-success' : 'btn-primary hover:btn-primary-focus'
              }`}
              onClick={copyLink}
            >
              {copySuccess ? (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        <div className="navbar-end">
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Selector */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                {useSessionStore.getState().language}
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52 border border-base-300">
                {['typescript', 'javascript', 'python', 'cpp', 'java', 'go', 'rust'].map(lang => (
                  <li key={lang}>
                    <a 
                      onClick={() => useSessionStore.getState().setLanguage(lang)}
                      className={useSessionStore.getState().language === lang ? 'active' : ''}
                    >
                      <span className="capitalize">{lang === 'cpp' ? 'C++' : lang}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* User Profile */}
            <button 
              className="btn btn-ghost gap-3 hover:bg-base-200 transition-all duration-200"
              onClick={() => setIsNameModalOpen(true)}
            >
              <div className="avatar">
                <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                  <img src={getAvatarUrl(useSessionStore.getState().me?.name ?? 'Anonymous')} />
                </div>
              </div>
              <span className="max-w-[8rem] truncate font-medium">
                {useSessionStore.getState().me?.name ?? 'Anonymous'}
              </span>
            </button>

            <div className="divider divider-horizontal mx-0"></div>
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-64 border border-base-300">
              <li>
                <button onClick={copyLink} className="gap-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Room Link
                </button>
              </li>
              <li>
                <button onClick={() => setIsNameModalOpen(true)} className="gap-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </button>
              </li>
              <li>
                <div className="px-2 py-1">
                  <select 
                    className="select select-bordered select-sm w-full" 
                    value={useSessionStore.getState().language} 
                    onChange={(e) => useSessionStore.getState().setLanguage(e.target.value)}
                  >
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
                <div className="px-2 py-1">
                  <ThemeSwitcher />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 p-4 gap-4 grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-3 min-h-0">
        {/* Editor Panel */}
        <div className="lg:col-span-2 card bg-base-100/80 backdrop-blur-sm shadow-xl border border-base-300/30 overflow-hidden group hover:shadow-2xl transition-all duration-300">
          <div className="card-body p-0 h-full relative">
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="badge badge-primary badge-sm font-mono">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Editor
              </div>
            </div>
            <Editor roomId={roomId} />
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-1 flex flex-col gap-4 h-full min-h-0">
          {/* Chat Panel */}
          <div className="card bg-base-100/80 backdrop-blur-sm shadow-xl border border-base-300/30 flex-1 overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="card-body p-0 h-full relative">
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="badge badge-secondary badge-sm">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Chat
                </div>
              </div>
              <Chat roomId={roomId} />
            </div>
          </div>

          {/* Video Panel */}
          <div className="card bg-base-100/80 backdrop-blur-sm shadow-xl border border-base-300/30 group hover:shadow-2xl transition-all duration-300">
            <div className="card-body p-3 relative">
              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="badge badge-accent badge-sm">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Video
                </div>
              </div>
              <VideoGrid roomId={roomId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ), [roomId, copySuccess])

  if (!joined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-1000"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="card bg-base-100/90 backdrop-blur-xl shadow-2xl border border-base-300/50">
            <div className="card-body p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Join Room</h2>
                <p className="text-base-content/70">
                  Joining room{' '}
                  <span className="font-mono bg-base-200 px-2 py-1 rounded text-primary font-semibold">
                    {roomId}
                  </span>
                </p>
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-medium">Display Name</span>
                </label>
                <input 
                  className="input input-bordered input-lg bg-base-100/50 focus:bg-base-100 transition-all duration-300 hover:shadow-md focus:shadow-lg" 
                  placeholder="Enter your display name..."
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)}
                  onKeyDown={(e) => { if(e.key === 'Enter' && !joining) onJoin() }}
                />
              </div>

              <button 
                className={`btn btn-primary btn-lg w-full font-semibold transition-all duration-300 ${
                  joining ? 'loading' : 'hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
                disabled={joining} 
                onClick={onJoin}
              >
                {joining ? (
                  <>
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    Joining...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Join Room
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {content}
      <NameEditModal open={isNameModalOpen} onClose={() => setIsNameModalOpen(false)} />
    </>
  )
}

function NameEditModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const me = useSessionStore(s => s.me)
  const [name, setName] = useState(me?.name ?? '')
  
  useEffect(() => { 
    setName(me?.name ?? '') 
  }, [me?.name])
  
  const save = () => {
    if (!name.trim()) return
    useSessionStore.getState().setMe({ 
      id: useSessionStore.getState().me?.id ?? crypto.randomUUID(), 
      name: name.trim() 
    })
    onClose()
  }

  return (
    <dialog className={`modal ${open ? 'modal-open' : ''}`}>
      <div className="modal-box bg-base-100/95 backdrop-blur-xl border border-base-300/50 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold">Edit Profile</h3>
            <p className="text-base-content/70 text-sm">Update your display name</p>
          </div>
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text font-medium">Display Name</span>
          </label>
          <input 
            className="input input-bordered input-lg bg-base-100/50 focus:bg-base-100 transition-all duration-300" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if(e.key === 'Enter') save() }}
            placeholder="Enter your name..."
          />
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button 
            className="btn btn-primary font-semibold hover:scale-105 transition-transform duration-200" 
            onClick={save}
            disabled={!name.trim()}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Save Changes
          </button>
        </div>
      </div>
      <div className="modal-backdrop bg-base-content/20 backdrop-blur-sm" onClick={onClose}></div>
    </dialog>
  )
}