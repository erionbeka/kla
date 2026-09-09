import { useEffect, useMemo, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

type Kind = 'embers' | 'ash' | 'rain'

interface Opts {
  kind: Kind
  density?: number
  maxWidth?: number
  maxHeight?: number
}

export function CineParticles({ kind, density = 60, maxWidth = 900, maxHeight = 900 }: Opts) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  const seed = useMemo(() => Math.floor(Math.random() * 1e6), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf = 0
    let last = 0
    let w = 0
    let h = 0

    const rnd = (i: number, spread: number, base = 0) => {
      // deterministic-ish per-seed hash so particles persist across frames in one lifetime
      const x = Math.sin(seed + i * 12.9898) * 43758.5453
      const frac = x - Math.floor(x)
      return base + frac * spread
    }

    const parts = Array.from({ length: density }).map((_, i) => ({
      x: rnd(i, 1) * 1200,
      y: rnd(i + 97, 1) * 900,
      size: kind === 'embers' ? rnd(i + 31, 2.4, 0.8) : rnd(i + 31, kind === 'ash' ? 1.6 : 2.2, 0.7),
      speed: kind === 'embers' ? rnd(i + 7, 30, 22) / 60 : rnd(i + 7, 14, 6) / 60,
      drift: rnd(i + 11, 24, -12) / 60,
      life: rnd(i + 3, 1),
      flick: rnd(i + 5, Math.PI * 2),
    }))

    const setSize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      w = Math.min(rect.width || 1200, maxWidth)
      h = Math.min(rect.height || 800, maxHeight)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()
    const ro = new ResizeObserver(setSize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw)
      if (t - last < 1000 / 30) return
      last = t
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        if (kind === 'embers') {
          p.y -= p.speed
          p.x += p.drift + Math.sin(t / 900 + p.flick) * 0.35
          p.flick += 0.05
          if (p.y < -10) {
            p.y = h + 10
            p.x = rnd(i * 3, w)
          }
          const a = 0.55 + Math.sin(t / 160 + p.flick * 4) * 0.45
          ctx.shadowBlur = 12 * a
          ctx.shadowColor = 'rgba(255,170,90,0.9)'
          ctx.fillStyle = `rgba(${255 * (0.6 + 0.4 * a)},${150 + 60 * a},${70 + 40 * a},${0.5 + a * 0.5})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          p.y += p.speed
          p.x += p.drift + Math.sin(t / 1200 + p.flick) * 0.4
          p.flick += 0.03
          if (p.y > h + 10) {
            p.y = -10
            p.x = rnd(i * 5, w)
          }
          ctx.fillStyle = kind === 'ash' ? 'rgba(232,228,218,0.26)' : 'rgba(150,150,160,0.28)'
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
    if (reduced) return () => ro.disconnect()
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [kind, density, maxWidth, maxHeight, reduced, seed])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
}