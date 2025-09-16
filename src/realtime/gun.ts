import Gun from 'gun'
import 'gun/sea'
import 'gun/axe'
import { useEffect, useState } from 'react'

const gunByRoom: Record<string, Gun> = {}

export function getGunForRoom(roomId: string) {
  if (!gunByRoom[roomId]) {
    // Use local peer only (no storage). You can add free community relays if desired.
    gunByRoom[roomId] = Gun({ localStorage: false, radisk: false, peers: [] })
  }
  return gunByRoom[roomId]
}

export function useGunDoc<T>({ roomId, key, defaultValue }: { roomId: string; key: string; defaultValue: T }) {
  const [doc, setDocState] = useState<T>(defaultValue)
  useEffect(() => {
    const gun = getGunForRoom(roomId)
    const node = gun.get(roomId).get(key)
    const handler = node.on((data: T) => {
      if (data !== undefined && data !== null) setDocState(data)
    })
    return () => { node.off() }
  }, [roomId, key])

  const setDoc = (value: T) => {
    const gun = getGunForRoom(roomId)
    gun.get(roomId).get(key).put(value)
  }
  return { doc, setDoc }
}

export function useGunList<T>({ roomId, key }: { roomId: string; key: string }) {
  const [list, setList] = useState<T[]>([])
  useEffect(() => {
    const gun = getGunForRoom(roomId)
    const set = gun.get(roomId).get(key)
    const items: Record<string, T> = {}
    set.map().on((data: T, id: string) => {
      if (!data) { delete items[id]; setList(Object.values(items)); return }
      items[id] = data
      setList(Object.values(items))
    })
    return () => { set.off() }
  }, [roomId, key])
  return { list }
}


