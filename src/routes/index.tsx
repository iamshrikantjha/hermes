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
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-primary/20 rounded-full animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Hermes
                </h1>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full animate-pulse"></div>
              </div>
              <div className="ml-auto">
                <ThemeSwitcher />
              </div>
            </div>
            <p className="text-xl md:text-2xl text-base-content/80 font-light leading-relaxed max-w-2xl mx-auto">
              Real-time code collaboration, chat, and P2P video calls — all{' '}
              <span className="font-semibold text-primary">free</span> and{' '}
              <span className="font-semibold text-secondary">ephemeral</span>
            </p>
          </div>

          {/* Main card */}
          <div className="card bg-base-100/80 backdrop-blur-xl shadow-2xl border border-base-300/50 mb-12 animate-fade-in-up animation-delay-200">
            <div className="card-body p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Your display name</span>
                  </label>
                  <input 
                    className="input input-bordered input-lg bg-base-100/50 focus:bg-base-100 transition-all duration-300 hover:shadow-md focus:shadow-lg" 
                    placeholder="Enter your name..." 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Room ID</span>
                  </label>
                  <input 
                    className="input input-bordered input-lg bg-base-100/50 focus:bg-base-100 transition-all duration-300 hover:shadow-md focus:shadow-lg" 
                    placeholder="Leave blank to create new room..."
                    value={roomId} 
                    onChange={(e) => setRoomId(e.target.value)} 
                    onKeyDown={(e) => { if(e.key === 'Enter') go() }} 
                  />
                </div>
              </div>
              <div className="card-actions justify-center">
                <button 
                  className="btn btn-primary btn-lg px-12 text-lg font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl" 
                  onClick={go}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Create / Join Room
                </button>
              </div>
            </div>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-3 gap-6 animate-fade-in-up animation-delay-400">
            <div className="card bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
              <div className="card-body text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="card-title text-primary justify-center mb-2">Monaco Editor</h3>
                <p className="text-base-content/70">TypeScript, JavaScript, Python, and 30+ languages with IntelliSense</p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:scale-105">
              <div className="card-body text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary/20 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="card-title text-secondary justify-center mb-2">Gun.js Realtime</h3>
                <p className="text-base-content/70">Blazing fast synchronization, ephemeral and session-only data</p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105">
              <div className="card-body text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="card-title text-accent justify-center mb-2">WebRTC Calls</h3>
                <p className="text-base-content/70">Secure peer-to-peer video calls with crystal clear quality</p>
              </div>
            </div>
          </div>

          {/* Additional features */}
          <div className="text-center mt-16 animate-fade-in-up animation-delay-600">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="badge badge-primary badge-lg px-4 py-3">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                No Sign-up Required
              </div>
              <div className="badge badge-secondary badge-lg px-4 py-3">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Auto-Delete After Session
              </div>
              <div className="badge badge-accent badge-lg px-4 py-3">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Instant Collaboration
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <Footer />
    </div>
  )
}