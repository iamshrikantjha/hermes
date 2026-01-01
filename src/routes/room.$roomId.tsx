import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Editor } from '../components/Editor'
import { Chat } from '../components/Chat'
import { VideoGrid } from '../components/VideoGrid'
import { useSessionStore } from '../state/session'
import { ThemeSwitcher } from '../components/ThemeSwitcher'
import { getAvatarUrl } from '../utils/avatars'
import { Check, Code, MessageSquare, Edit2, Link as LinkIcon } from 'lucide-react'

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
  const me = useSessionStore(s => s.me)
  /* Tab state for mobile */
  const [activeTab, setActiveTab] = useState<'code' | 'collaborate'>('code')

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

  if (!joined) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 font-sans">
        <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-8 items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Code className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Join Room</h2>
            <p className="text-base-content/60 mb-6">#{roomId}</p>

            <div className="form-control w-full mb-4">
              <input
                className="input input-bordered w-full bg-base-200"
                placeholder="Your Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') onJoin() }}
                autoFocus
              />
            </div>

            <button className="btn btn-primary w-full btn-lg text-white" onClick={onJoin} disabled={joining}>
              {joining ? <span className="loading loading-spinner"></span> : 'Join Room'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex h-screen w-full flex-col bg-base-200 font-sans">
        {/* Modern Navbar */}
        <div className="h-14 bg-base-100 border-b border-base-300 flex items-center px-4 justify-between shadow-sm flex-none z-50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-base-content leading-tight">Hermes</h1>
              <p className="text-[10px] text-base-content/60 font-mono">#{roomId}</p>
            </div>
          </div>

          <div className="hidden md:flex gap-2">
            <button className="btn btn-ghost btn-circle text-base-content/70" onClick={copyLink} title="Copy Link">
              {copySuccess ? <Check className="w-5 h-5 text-green-500" /> : <LinkIcon className="w-5 h-5" />}
            </button>
            <ThemeSwitcher />
          </div>

          <div className="flex items-center gap-3">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-2 normal-case font-normal hover:bg-base-200 rounded-full px-2">
                <div className="avatar placeholder">
                  <div className="w-8 rounded-full bg-base-300 ring-1 ring-base-300">
                    <img src={getAvatarUrl(me?.name ?? 'Anon')} alt="avatar" />
                  </div>
                </div>
                <span className="hidden sm:inline font-medium">{me?.name}</span>
              </div>
              <ul tabIndex={0} className="dropdown-content z-[20] menu p-2 shadow-lg bg-base-100 rounded-lg w-52 mt-2 border border-base-300">
                <li><a onClick={() => setIsNameModalOpen(true)}><Edit2 className="w-4 h-4" /> Edit Profile</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="md:hidden flex border-b border-base-300 bg-base-100">
          <button
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'code' ? 'text-primary border-b-2 border-primary' : 'text-base-content/60'}`}
            onClick={() => setActiveTab('code')}
          >
            <Code className="w-4 h-4" /> Code
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'collaborate' ? 'text-primary border-b-2 border-primary' : 'text-base-content/60'}`}
            onClick={() => setActiveTab('collaborate')}
          >
            <MessageSquare className="w-4 h-4" /> Call
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row relative">

          {/* Editor Area */}
          <div className={`${activeTab === 'code' ? 'block' : 'hidden'} md:block flex-1 h-full relative bg-base-100 border-r border-base-300 shadow-sm z-0`}>
            <Editor roomId={roomId} />
          </div>

          {/* Sidebar Area */}
          <div className={`${activeTab === 'collaborate' ? 'flex' : 'hidden'} md:flex w-full md:w-[350px] lg:w-[400px] h-full flex-col bg-base-200 border-l border-base-300`}>
            {/* Video Area */}
            <div className="h-[40%] md:h-2/5 p-2 overflow-hidden flex flex-col">
              <VideoGrid roomId={roomId} />
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-2 pt-0 overflow-hidden flex flex-col h-full min-h-0">
              <Chat roomId={roomId} />
            </div>
          </div>
        </div>
      </div>
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
            onKeyDown={(e) => { if (e.key === 'Enter') save() }}
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