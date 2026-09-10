import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { getReelFrames } from '../lib/media'
import { cn } from '../lib/util'

export function Reel({ label, dense = false }: { label?: string; dense?: boolean }) {
  const frames = useMemo(() => getReelFrames(), [])
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setIdx((i) => (i + 1) % frames.length), 7000)
    return () => window.clearInterval(id)
  }, [frames.length])

  if (frames.length === 0) return null

  const f = frames[idx % frames.length]

  return (
    <section className={cn('relative w-full overflow-hidden bg-black', dense ? 'h-[60vh] md:h-[72vh]' : 'h-[78vh] md:h-[92vh]')}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {f.isVideo ? (
            <video src={f.url} autoPlay muted loop playsInline className="h-full w-full object-cover" />
          ) : (
            <img
              src={f.url}
              alt=""
              loading="lazy"
              decoding="async"
              className={idx % 2 === 0 ? 'kb-a h-full w-full object-cover' : 'kb-b h-full w-full object-cover'}
              style={{ filter: 'brightness(0.78) saturate(0.95) contrast(1.04)' }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* cinematic letterbox */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[9%] bg-black/72" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[9%] bg-black/72" />
      <div className="pointer-events-none absolute inset-0 vignette" />

      {/* slate frame edge */}
      <div className="pointer-events-none absolute inset-[1.5%] border border-bone/[0.06] md:inset-[0.8%]" />

      <div className="absolute inset-x-0 bottom-[10%] flex items-end justify-between gap-6 px-5 md:px-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">
          {label ?? 'KADRE NGA ARKIVI'}
        </span>
        <span className="font-mono text-[10px] tracking-[0.25em] text-fog/70">
          {String(idx + 1).padStart(2, '0')} / {String(frames.length).padStart(2, '0')}
        </span>
      </div>
      {f.credit && (
        <div className="absolute bottom-[10%] right-5 hidden max-w-[45%] text-right font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-fog/70 md:block md:px-10">
          {f.credit}
        </div>
      )}
    </section>
  )
}