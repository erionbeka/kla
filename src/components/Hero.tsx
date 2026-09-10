import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { ArchiveScene } from './ArchiveScene'
import { Countdown } from './Countdown'
import { CineFrame } from './cine/CineFrame'
import { hero } from '../lib/content'
import { getHeroBackdrop, getMemorialFrames, type MediaItem } from '../lib/media'
import { useI18n } from '../lib/i18n'
import { useFilm } from '../lib/film'
import { isVerdictDay } from '../lib/clock'
import { useNow } from '../lib/hooks'
import { cn, EASE } from '../lib/util'

const HERO_BACKDROP = getHeroBackdrop()

function HeroBackdrop({ frames }: { frames: MediaItem[] }) {
  const { t } = useI18n()
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (frames.length < 2) return
    const id = window.setInterval(() => setIdx((i) => (i + 1) % frames.length), 6500)
    return () => window.clearInterval(id)
  }, [frames.length])

  if (frames.length === 0) {
    return <ArchiveScene scene={hero.scene()} className="h-full w-full scale-105" />
  }

  const frame = frames[idx % frames.length]

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={idx}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        className="absolute inset-0"
      >
        {frame.isVideo ? (
          <video
            src={frame.url}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            style={{ filter: 'brightness(0.55) saturate(0.9) contrast(1.05)' }}
          />
        ) : (
          <motion.img
            src={frame.url}
            alt=""
            loading="lazy"
            decoding="async"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, ease: 'linear' }}
            className="h-full w-full object-cover"
            style={{ filter: 'brightness(0.5) saturate(0.9) contrast(1.05)' }}
          />
        )}
      </motion.div>
      <div className="absolute bottom-4 left-4 z-10 hidden font-mono text-[9px] uppercase tracking-[0.18em] text-bone/50 md:block">
        {frame.credit ?? t(hero.codaShort)}
      </div>
    </AnimatePresence>
  )
}

export function Hero() {
  const { t } = useI18n()
  const now = useNow(5000)
  const day = isVerdictDay(now)
  const reduce = useReducedMotion()
  const flash = useFilm().flash
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  const frames = useMemo<MediaItem[]>(() => {
    if (HERO_BACKDROP) {
      return [{ url: HERO_BACKDROP, isVideo: false }, ...getMemorialFrames()].filter((f) => !f.isVideo)
    }
    return getMemorialFrames().filter((f) => !f.isVideo)
  }, [])

  useFlashOnce(flash)

  return (
    <section id="hero" ref={ref} className="relative min-h-[100dvh] overflow-hidden bg-ink">
      <span id="top" className="absolute top-0" />

      <motion.div style={reduce ? undefined : { y: imgY }} className="absolute inset-0">
        <CineFrame letterbox particles="embers" tone="night" className="absolute inset-0">
          {reduce ? (
            frames[0] ? (
              <img src={frames[0].url} alt="" className="h-full w-full object-cover" style={{ filter: 'brightness(0.55)' }} />
            ) : (
              <ArchiveScene scene={hero.scene()} className="h-full w-full scale-105" />
            )
          ) : (
            <HeroBackdrop frames={frames} />
          )}
        </CineFrame>
      </motion.div>

      {/* ember ground glow */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%]"
        style={{
          background: 'linear-gradient(0deg, rgba(166,16,31,0.22) 0%, rgba(166,16,31,0.05) 40%, rgba(0,0,0,0) 100%)',
        }}
      />

      <motion.div
        style={{ opacity: reduce ? undefined : fade }}
        className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1480px] flex-col justify-between px-5 pb-8 pt-24 md:px-8 md:pt-28"
      >
        <div className="flex-1" />

        <div className="flex flex-col justify-end">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-3xl">
              <motion.h2
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 34, scale: 0.96, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.4, ease: EASE }}
                className="font-display text-[16vw] font-extrabold leading-[0.85] tracking-tighter text-bone [text-shadow:0_0_40px_rgba(232,228,218,0.16)] md:text-[9rem] lg:text-[12rem]"
              >
                {hero.title}
              </motion.h2>

              <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-1">
                {hero.lines.map((l, i) => (
                  <motion.span
                    key={i}
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.25 + i * 0.12, duration: 0.9, ease: EASE }}
                    className={cn(
                      'font-body font-normal leading-tight',
                      i === 2 ? 'animate-flicker text-2xl text-bone md:text-4xl' : 'text-lg text-fog md:text-2xl',
                    )}
                  >
                    {t(l)}
                  </motion.span>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="mt-5 max-w-xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-fog/80"
              >
                {day ? t(hero.codaShort) : t(hero.coda)}
              </motion.p>

              <div className="mt-8 flex items-center gap-4">
                <span className="h-px w-10 bg-ember/70" />
                <span className="font-mono text-xs tracking-[0.3em] text-bone/90">{hero.date}</span>
              </div>
            </div>

            <div className="shrink-0">
              <Countdown />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function useFlashOnce(flash: () => void) {
  const done = useRef(false)
  useEffect(() => {
    if (done.current) return
    done.current = true
    const id = setTimeout(flash, 700)
    return () => clearTimeout(id)
  }, [flash])
}