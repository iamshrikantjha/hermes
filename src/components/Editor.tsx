import { useEffect, useMemo, useRef, useState } from 'react'
import EditorComponent, { useMonaco } from '@monaco-editor/react'
import { useSessionStore } from '../state/session'
import { getGunForRoom, useGunDoc } from '../realtime/gun'

type Props = { roomId: string }

export function Editor({ roomId }: Props) {
  const language = useSessionStore(s => s.language)
  const me = useSessionStore(s => s.me)
  const [value, setValue] = useState<string>('')
  const monaco = useMonaco()

  const { doc, setDoc } = useGunDoc<string>({ roomId, key: 'code', defaultValue: '' })

  useEffect(() => {
    setValue(doc ?? '')
  }, [doc])

  const handleChange = (val?: string) => {
    const v = val ?? ''
    setValue(v)
    setDoc(v)
  }

  return (
    <EditorComponent
      height="100%"
      theme={document.documentElement.getAttribute('data-theme') === 'night' ? 'vs-dark' : 'vs-light'}
      language={language}
      value={value}
      onChange={handleChange}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        automaticLayout: true,
      }}
    />
  )
}


