import { useEffect, useRef, useState } from 'react'
import { useSessionStore } from '../state/session'
import { useGunList, getGunForRoom } from '../realtime/gun'
import { getAvatarUrl } from '../utils/avatars'
import { Send, MessageSquare } from 'lucide-react'

type Props = { roomId: string }
type ChatMessage = { id: string; text: string; senderId: string; senderName: string; ts: number }

export function Chat({ roomId }: Props) {
  const me = useSessionStore(s => s.me)
  const [text, setText] = useState('')
  const { list } = useGunList<ChatMessage>({ roomId, key: 'chat' })
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [list.length])

  const send = () => {
    const t = text.trim()
    if (!t) return
    const gun = getGunForRoom(roomId)
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      text: t,
      senderId: me?.id ?? 'anon',
      senderName: me?.name ?? 'Anonymous',
      ts: Date.now(),
    }
    gun.get(roomId).get('chat').set(msg)
    setText('')
  }

  return (
    <div className="flex flex-col h-full bg-base-100 rounded-xl shadow-sm border border-base-200 overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b flex items-center justify-between bg-base-100 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg text-base-content">Chat</h3>
        </div>
        <div className="text-xs text-base-content/60">{list.length} messages</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-100/50">
        {list.sort((a, b) => a.ts - b.ts).map(m => {
          const isMe = m.senderId === me?.id
          return (
            <div key={m.id} className={`chat ${isMe ? 'chat-end' : 'chat-start'}`}>
              <div className="chat-image avatar">
                <div className="w-8 rounded-full shadow-sm ring-1 ring-base-200">
                  <img src={getAvatarUrl(m.senderName)} alt={m.senderName} />
                </div>
              </div>
              <div className="chat-header text-xs text-base-content/60 mb-1 ml-1">
                {m.senderName}
              </div>
              <div className={`chat-bubble shadow-sm text-sm ${isMe
                ? 'chat-bubble-primary text-primary-content'
                : 'bg-base-200 text-base-content'
                }`}>
                {m.text}
              </div>
              <div className="chat-footer opacity-50 text-[10px] mt-0.5">
                {new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          )
        })}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-base-100">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              className="w-full bg-base-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all pr-10"
              placeholder="Aa"
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') send() }}
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary p-1 hover:bg-base-200 rounded-full" onClick={send} disabled={!text.trim()}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}



