import { useEffect, useState } from 'react'
import EditorComponent from '@monaco-editor/react'
import { useSessionStore } from '../state/session'
import { useGunDoc } from '../realtime/gun'
import { runCode } from '../utils/runner'

type Props = { roomId: string }

const LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'json',
  'css',
  'html',
  'markdown'
]

export function Editor({ roomId }: Props) {
  const language = useSessionStore(s => s.language)
  const setLanguage = useSessionStore(s => s.setLanguage)
  const [value, setValue] = useState<string>('')
  const [output, setOutput] = useState<string[]>([])
  const [isError, setIsError] = useState(false)

  const { doc, setDoc } = useGunDoc<string>({ roomId, key: 'code', defaultValue: '// Writes some code then click run\nconsole.log("Hello Hermes!")' })

  useEffect(() => {
    setValue(doc ?? '')
  }, [doc])

  const handleChange = (val?: string) => {
    const v = val ?? ''
    setValue(v)
    setDoc(v)
  }

  const handleRun = () => {
    setIsError(false)
    setOutput(['Running...'])
    const res = runCode(value, language)
    if (res.error) {
      setIsError(true)
      setOutput(prev => [...prev.filter(l => l !== 'Running...'), ...res.output, `Error: ${res.error}`])
    } else {
      setOutput(res.output.length ? res.output : ['> No output'])
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-[#1e1e1e]">
      {/* Toolbar */}
      <div className="h-12 border-b border-gray-200 dark:border-[#393a3b] flex items-center justify-between px-4 bg-white dark:bg-[#242526]">
        <div className="flex items-center gap-3">
          <select
            className="select select-bordered select-sm w-32 focus:outline-none"
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            {LANGUAGES.map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
          </select>
        </div>

        <button className="btn btn-primary btn-sm gap-2" onClick={handleRun}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          Run
        </button>
      </div>

      <div className="flex-1 relative">
        <EditorComponent
          height="100%"
          theme={document.documentElement.getAttribute('data-theme') === 'night' ? 'vs-dark' : 'vs-light'} /* Note: This theme switch needs reload or state effect normally, but lets stick to simple prop */
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
      </div>

      {/* Basic Console */}
      <div className="h-32 border-t border-gray-200 dark:border-[#393a3b] bg-gray-50 dark:bg-[#18191a] flex flex-col font-mono text-sm">
        <div className="px-4 py-1 text-xs text-gray-400 uppercase font-bold border-b dark:border-[#393a3b] flex justify-between">
          <span>Console</span>
          <button className="hover:text-red-500" onClick={() => setOutput([])}>Clear</button>
        </div>
        <div className="flex-1 overflow-auto p-2 space-y-1">
          {output.map((line, i) => (
            <div key={i} className={isError && i === output.length - 1 ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}>
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


