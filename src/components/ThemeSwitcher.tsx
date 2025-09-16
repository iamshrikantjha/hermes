export function ThemeSwitcher() {
  return (
    <label className="swap swap-rotate">
      <input type="checkbox" onChange={(e) => {
        const newTheme = e.target.checked ? 'night' : 'retro'
        document.documentElement.setAttribute('data-theme', newTheme)
      }} />
      <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0L7.05,18.4A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7,4.93,6.29A1,1,0,1,0,3.52,7.7L4.23,8.41A1,1,0,0,0,5.64,7ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2ZM18.36,17a1,1,0,0,0-1.41,1.41l.71.71a1,1,0,0,0,1.41-1.41ZM12,19a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,7.05a1,1,0,0,0,.71-.29l.71-.71a1,1,0,0,0-1.41-1.41l-.71.71a1,1,0,0,0,0,1.41A1,1,0,0,0,18.36,7.05Z"/></svg>
      <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8,8,0,0,1-10.45-10.5A1,1,0,0,0,9,1,10,10,0,1,0,22,14,1,1,0,0,0,21.64,13Z"/></svg>
    </label>
  )
}


