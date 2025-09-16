import { useEffect, useRef, useState } from 'react'
import { useSessionStore } from '../state/session'
import { useGunList, getGunForRoom } from '../realtime/gun'
import { getAvatarUrl } from '../utils/avatars'

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
    <div className="h-full flex flex-col">
      <div className="p-3 border-b font-semibold">Chat</div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {list.sort((a,b)=>a.ts-b.ts).map(m => (
          <div key={m.id} className={`chat ${m.senderId===me?.id?'chat-end':'chat-start'}`}>
            <div className="chat-image avatar">
              <div className="w-8 rounded-full">
                <img src={getAvatarUrl(m.senderName)} />
              </div>
            </div>
            <div className="chat-header">
              {m.senderName} <time className="text-xs opacity-50 ml-1">{new Date(m.ts).toLocaleTimeString()}</time>
            </div>
            <div className="chat-bubble">{m.text}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="p-2 border-t">
        <div className="join w-full">
          <input className="input input-bordered join-item w-full" placeholder="Type a message" value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') send() }} />
          <button className="btn btn-primary join-item" onClick={send}>Send</button>
        </div>
      </div>
    </div>
  )
}


