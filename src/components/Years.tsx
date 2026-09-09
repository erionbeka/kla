import { useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'motion/react'
import { ArchiveScene, PhotoMeta } from './ArchiveScene'
import { CineFrame } from './cine/CineFrame'
import { years27 } from '../lib/content'
import { useI18n } from '../lib/i18n'
import { cn } from '../lib/util'

export function Years27() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const wrap = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })

  const opacities = [
    useTransform(scrollYProgress, [0, 0.22, 0.36], [1, 1, 0]),
    useTransform(scrollYProgress, [0.3, 0.46, 0.6, 0.72], [0, 1, 1, 0]),
    useTransform(scrollYProgress, [0.62, 0.78, 0.9, 1], [0, 1, 1, 0]),
    useTransform(scrollYProgress, [0.86, 1], [0, 1]),
  ]

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = v < 0.3 ? 0 : v < 0.64 ? 1 : v < 0.9 ? 2 : 3
    setActive((prev) => (prev === idx ? prev : idx))
  })

  return (
    <section className="relative bg-black">
      {/* opener */}
      <div className="mx-auto flex min-h-[92vh] max-w-[1480px] flex-col items-center justify-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-mist"
        >
          {t(years27.kicker)}
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[34vw] font-extrabold leading-none tracking-tighter text-bone text-glow-soft md:text-[24rem]"
        >
          {years27.big}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="-mt-4 font-display text-4xl font-bold text-bone md:-mt-12 md:text-8xl"
        >
          {t(years27.unit)}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 font-mono text-xs tracking-[0.4em] text-fog md:text-sm"
        >
          {years27.span}
        </motion.p>
      </div>

      {reduce ? (
        /* static fallback: simple stacked progression */
        <div className="flex flex-col gap-2">
          {years27.steps.map((s) => (
            <div key={s.year} className="relative aspect-[16/10] overflow-hidden">
              <ArchiveScene scene={s.scene} className="h-full w-full" />
              <div className="absolute inset-0 vignette" />
              <div className="absolute left-5 top-5 font-display text-6xl font-extrabold text-bone">
                {s.year}
              </div>
              <div className="absolute bottom-5 left-5">
                <PhotoMeta scene={s.scene} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* pinned crossfade */
        <div ref={wrap} className="relative h-[360vh]">
          <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-ink" />

            {years27.steps.slice(0, 3).map((s, i) => (
              <motion.div
                key={s.year}
                style={{ opacity: opacities[i] }}
                className="absolute inset-0"
              >
                <CineFrame tone={i === 1 ? 'day' : 'night'} particles={i === 1 ? 'embers' : 'ash'} className="absolute inset-0">
                  <ArchiveScene scene={s.scene} className="h-full w-full" />
                </CineFrame>
                <div className="absolute inset-0 vignette" />
              </motion.div>
            ))}

            {/* 2026 — fades in at the end */}
            <motion.div
              style={{ opacity: opacities[3] }}
              className="absolute inset-0"
            >
              <CineFrame particles="embers" tone="night" className="absolute inset-0">
                <ArchiveScene scene={years27.steps[3].scene} className="h-full w-full" />
              </CineFrame>
              <div className="absolute inset-0 vignette" />
            </motion.div>

            {/* year counter */}
            <div className="relative z-10 text-center">
              <span className="font-display text-[20vw] font-extrabold leading-none tracking-tight text-bone/95 md:text-[13rem]">
                {years27.steps[active].year}
              </span>
            </div>

            {/* mini progress */}
            <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
              {years27.steps.map((s, i) => (
                <span
                  key={s.year}
                  className={cn(
                    'font-mono text-[9px] uppercase tracking-[0.25em] transition-colors',
                    i === active ? 'text-bone' : 'text-fog/40',
                  )}
                >
                  {s.year}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* lines */}
      <div className="mx-auto flex max-w-[1480px] flex-col items-start gap-16 px-5 py-28 md:gap-24 md:px-8 md:py-44">
        {years27.lines.map((line, i) => (
          <motion.p
            key={i}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1.1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-bone md:text-6xl"
          >
            {t(line)}
          </motion.p>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4 }}
          className="mt-8"
        >
          <div className="flex items-end gap-4">
            <span className="font-display text-9xl font-extrabold leading-none tracking-tighter text-bone md:text-[11rem]">
              27
            </span>
            <span className="pb-2 font-display text-4xl font-bold text-fog md:text-6xl">
              {t(years27.unit)}
            </span>
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.35em] text-mist">{years27.span}</p>
        </motion.div>
      </div>
    </section>
  )
}