import { pad2 } from './hooks'

export const JUDGMENT_TS = Date.UTC(2026, 8, 16, 8, 0, 0) // 10:00 CEST, The Hague

export interface CountParts {
  d: number
  h: number
  m: number
  s: number
  elapsed: boolean
}

export function getParts(now: number): CountParts {
  const diff = JUDGMENT_TS - now
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, elapsed: true }
  const total = Math.floor(diff / 1000)
  const d = Math.floor(total / 86400)
  const h = Math.floor((total % 86400) / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return { d, h, m, s, elapsed: false }
}

export const isVerdictDay = (now: number) => now >= JUDGMENT_TS

export function fmtDateEN(now: number) {
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(now)
}

export { pad2 }