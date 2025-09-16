// Minimal browser polyfills for libs expecting Node globals
declare global {
  interface Window { global?: any; process?: any }
}

if (typeof globalThis !== 'undefined') {
  const g: any = globalThis as any
  if (typeof g.global === 'undefined') {
    g.global = g
  }
  if (typeof g.process === 'undefined') {
    g.process = { env: {} }
  } else if (typeof g.process.env === 'undefined') {
    g.process.env = {}
  }
}


