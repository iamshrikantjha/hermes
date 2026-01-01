import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { ThemeSwitcher } from '../components/ThemeSwitcher'
import { useSessionStore } from '../state/session'
import Footer from '@/components/Footer'

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
    <div className="min-h-screen bg-[#F0F2F5] dark:bg-[#18191A] flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-white dark:bg-[#242526] shadow-sm py-4 border-b border-gray-200 dark:border-[#393a3b]">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <span className="text-2xl font-bold bg-primary text-transparent bg-clip-text">Hermes</span>
          </div>
          <div className="flex gap-4 items-center">
            <a href="https://github.com/iamshrikantjha/hermes" target="_blank" className="text-gray-600 dark:text-gray-300 hover:text-primary font-medium">GitHub</a>
            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full items-center">
          {/* Left: Text */}
          <div className="text-center md:text-left space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#1877F2] dark:text-[#2D88FF]">
              Connect worldwide with code.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Hermes helps you share code in real-time with crystal clear video calls and chat. No sign-up required.
            </p>
          </div>

          {/* Right: Card */}
          <div className="card bg-white dark:bg-[#242526] shadow-xl border border-gray-200 dark:border-[#393a3b] w-full max-w-md mx-auto">
            <div className="card-body p-8 block">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Create or Join Room</h2>

              <div className="space-y-4">
                <div className="form-control">
                  <input
                    className="input input-bordered input-lg w-full bg-gray-50 dark:bg-[#3a3b3c] focus:border-primary"
                    placeholder="Your Display Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <input
                    className="input input-bordered input-lg w-full bg-gray-50 dark:bg-[#3a3b3c] focus:border-primary"
                    placeholder="Room ID (Optional)"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') go() }}
                  />
                </div>

                <button
                  className="btn btn-primary btn-lg w-full text-lg capitalize font-bold text-white shadow-md hover:shadow-lg transition-all"
                  onClick={go}
                >
                  Get Started
                </button>

                <div className="divider text-gray-400 text-sm">Features</div>

                <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-gray-500">
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Free Forever</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <span>Real-time</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <span>Secure P2P</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>

  )
}