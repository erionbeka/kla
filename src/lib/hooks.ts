import { useEffect, useState } from 'react'

export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])
  return now
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    setMatches(mq.matches)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export const isDesktopQuery = '(min-width: 1024px)'
export const useIsDesktop = () => useMediaQuery(isDesktopQuery)

export function useElementWidth<T extends HTMLElement>() {
  const [width, setWidth] = useState(0)
  return {
    ref: (node: T | null) => {
      if (!node) return
      const measured = node.getBoundingClientRect().width
      if (measured !== width) setWidth(measured)
    },
    width,
  }
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export function pad2(n: number) {
  return n.toString().padStart(2, '0')
}