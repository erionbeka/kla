import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useFilm } from '../../lib/film'

function GrainCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  const pausedRef = useRef(false)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf = 0
    let last = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const setSize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()
    window.addEventListener('resize', setSize)

    const onVis = () => {
      pausedRef.current = document.hidden
    }
    document.addEventListener('visibilitychange', onVis)
    onVis()

    let scratchY = -40
    let spliceTimer = 2
    let spliceY = -80

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw)
      if (t - last < 1000 / 30) return
      last = t
      if (pausedRef.current) return
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      const img = ctx.getImageData(0, 0, Math.ceil(w), Math.ceil(h))
      const d = img.data
      for (let y = 0; y < h; y += 2) {
        for (let x = 0; x < w; x += 2) {
          const v = Math.random() * 255
          const o = (y * w + x) * 4
          d[o] = v
          d[o + 1] = v
          d[o + 2] = v
          d[o + 3] = 17
        }
      }
      ctx.putImageData(img, 0, 0)

      scratchY += 0.6
      if (scratchY > h) scratchY = -100 - Math.random() * 700
      if (scratchY > 0 && scratchY < h) {
        ctx.strokeStyle = `rgba(232,228,218,${0.05 + Math.random() * 0.05})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, scratchY)
        ctx.bezierCurveTo(w * 0.32, scratchY + 9, w * 0.62, scratchY - 7, w, scratchY + 4)
        ctx.stroke()
      }

      spliceTimer -= 1 / 30
      if (spliceTimer <= 0) {
        spliceTimer = 2.5 + Math.random() * 12
        spliceY = Math.random() * h
      }
      if (spliceTimer > 1.7) {
        ctx.fillStyle = 'rgba(232,228,218,0.04)'
        ctx.fillRect(0, spliceY, w, 2 + Math.random() * 3)
      }
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', setSize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])
  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[180] h-full w-full opacity-80 mix-blend-overlay"
      aria-hidden="true"
    />
  )
}

export function FilmOverlay() {
  const { flashSeq } = useFilm()
  const last = useRef(0)
  const active = flashSeq > 0 && last.current !== flashSeq
  last.current = flashSeq

  return (
    <>
      <GrainCanvas />
      <AnimatePresence>
        {active && (
          <motion.div
            key={flashSeq}
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="pointer-events-none fixed inset-0 z-[200] bg-white"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  )
}