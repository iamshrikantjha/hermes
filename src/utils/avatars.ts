export function getAvatarUrl(name: string) {
  const seed = encodeURIComponent(name || 'Anonymous')
  return `https://api.dicebear.com/9.x/shapes/svg?seed=${seed}&backgroundType=gradientLinear&radius=50`
}


