import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArchiveScene } from './ArchiveScene'
import { CineFrame } from './cine/CineFrame'
import { timeline } from '../lib/content'
import { useI18n } from '../lib/i18n'
import { cn } from '../lib/util'

function Card({ m, x, first = false }: { m: (typeof timeline.milestones)[number]; x?: MotionValue<number>; first?: boolean }) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const current = !!m.current
  return (
    <motion.article
      style={x ? { x } : undefined}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'relative flex h-full w-[86vw] shrink-0 snap-center flex-col justify-between border-t p-6 sm:w-[72vw] lg:w-[640px] lg:p-10',
        current ? 'border-ember/60 bg-ember/[0.04]' : 'border-bone/15',
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            'font-display text-6xl font-extrabold leading-none tracking-tight md:text-8xl',
            current ? 'text-ember' : 'text-bone',
          )}
        >
          {m.year}
        </span>
        <span className="hidden font-mono text-[9px] uppercase tracking-[0.3em] text-fog md:block">
          {String(first ? 'START' : m.kicker)}
        </span>
      </div>

      <div className="my-8 grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="flex flex-col justify-center">
          <h3 className="font-display text-3xl font-bold leading-tight tracking-tight text-bone md:text-4xl">
            {t(m.title)}
          </h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-fog">{t(m.text)}</p>
          <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.22em] text-mist">§ {t(m.source)}</p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden">
          <CineFrame tone={current ? 'night' : 'day'} particles={current ? 'embers' : 'ash'} className="absolute inset-0">
            <ArchiveScene scene={m.scene} className="h-full w-full" />
          </CineFrame>
          <div className="absolute inset-0 vignette" />
        </div>
      </div>

      {current && (
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-ember">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
          {t(timeline.note)}
        </p>
      )}
    </motion.article>
  )
}

function HeaderBlock() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  return (
    <div className="mx-auto max-w-[1480px] px-5 md:px-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-fog">{t(timeline.kicker)}</p>
      <motion.h2
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 max-w-5xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-bone md:text-8xl"
      >
        {t(timeline.title)}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mt-6 max-w-lg text-sm leading-relaxed text-fog md:text-base"
      >
        {t(timeline.recent)} {t(timeline.note)}
      </motion.p>
    </div>
  )
}

function DesktopTimeline() {
  const wrap = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollable, setScrollable] = useState(0)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current
      if (!el) return
      setScrollable(Math.max(0, el.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const x = useTransform(scrollYProgress, [0, 0.95], [0, -scrollable])
  const prog = useTransform(scrollYProgress, [0, 0.95], ['0%', '100%'])

  return (
    <div ref={wrap} className="relative hidden h-[380vh] lg:block">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <HeaderBlock />
        <motion.div
          ref={trackRef}
          style={reduce ? undefined : { x }}
          className="mt-12 flex w-max items-stretch gap-6 px-0 pl-[max(24px,calc((100vw-1480px)/2+32px))]"
        >
          {timeline.milestones.map((m, i) => (
            <Card key={m.year} m={m} first={i === 0} />
          ))}
        </motion.div>
        <div className="mx-auto mt-14 w-full max-w-[1480px] px-8">
          <div className="h-px w-full bg-bone/10">
            <motion.div style={reduce ? undefined : { width: prog }} className="h-px bg-ember" />
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileTimeline() {
  const { t } = useI18n()
  return (
    <div className="lg:hidden">
      <div className="py-16">
        <HeaderBlock />
      </div>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-8 [-webkit-overflow-scrolling:touch]" style={{ scrollbarWidth: 'none' }}>
        {timeline.milestones.map((m, i) => (
          <div key={m.year} className="h-[420px]">
            <Card m={m} first={i === 0} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 px-5 pb-12">
        <span className="h-1 w-1 rounded-full bg-bone/30" />
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-fog">
          ← {t(timeline.kicker)} →
        </span>
      </div>
    </div>
  )
}

export function Rrugetimi() {
  return (
    <section id="rrugetimi" className="scroll-mt-20 bg-coal">
      <DesktopTimeline />
      <MobileTimeline />
    </section>
  )
}