import { Sun, Moon } from 'lucide-react'

export function ThemeSwitcher() {
  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle">
      <input type="checkbox" onChange={(e) => {
        const theme = e.target.checked ? 'dark' : 'light'
        document.documentElement.setAttribute('data-theme', theme)
        // Ensure class is also toggled for Tailwind dark mode if configured by class
        if (theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }} />

      {/* Sun icon - shows when unchecked (light theme) */}
      <Sun className="swap-off w-5 h-5" />

      {/* Moon icon - shows when checked (dark theme) */}
      <Moon className="swap-on w-5 h-5" />
    </label>
  )
}