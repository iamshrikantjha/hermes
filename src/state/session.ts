import { create } from 'zustand'

type User = { id: string; name: string }

type SessionState = {
  joined: boolean
  roomId: string | null
  me: User | null
  language: string
  setJoined: (v: boolean) => void
  setRoom: (roomId: string) => void
  setMe: (user: User) => void
  setLanguage: (lang: string) => void
}

export const useSessionStore = create<SessionState>((set) => ({
  joined: false,
  roomId: null,
  me: null,
  language: 'typescript',
  setJoined: (v) => set({ joined: v }),
  setRoom: (roomId) => set({ roomId }),
  setMe: (user) => set({ me: user }),
  setLanguage: (language) => set({ language }),
}))


