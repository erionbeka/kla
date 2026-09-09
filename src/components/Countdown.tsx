import { motion, useReducedMotion } from 'motion/react'
import { getParts, isVerdictDay } from '../lib/clock'
import { useNow, pad2 } from '../lib/hooks'
import { useI18n } from '../lib/i18n'
import { hero } from '../lib/content'
import { cn, EASE } from '../lib/util'

export function Countdown({
  compact = false,
  className = '',
}: {
  compact?: boolean
  className?: string
}) {
  const now = useNow(1000)
  const reduce = useReducedMotion()
  const { t } = useI18n()
  const day = isVerdictDay(now)
  const p = getParts(now)

  if (day) {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <span className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/80">{t(hero.today)}</span>
        </span>
        <span className="font-mono text-sm tracking-[0.18em] text-fog">{t(hero.verdictNote)}</span>
      </div>
    )
  }

  const cells: { n: number; label: string }[] = [
    { n: p.d, label: t(hero.countdown.days) },
    { n: p.h, label: t(hero.countdown.hours) },
    { n: p.m, label: t(hero.countdown.minutes) },
    { n: p.s, label: t(hero.countdown.seconds) },
  ]

  return (
    <div className={cn('flex items-center gap-[2vw] text-bone lg:gap-6', className)}>
      {cells.map((c, i) => (
        <motion.div
          key={c.label}
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.7, ease: EASE }}
          className="flex flex-col"
        >
          <span
            className={cn(
              'font-display font-bold leading-none tracking-tight tabular-nums',
              compact ? 'text-4xl md:text-6xl' : 'text-6xl md:text-8xl lg:text-[7.5rem] lg:leading-[0.9]',
            )}
          >
            {pad2(c.n)}
          </span>
          <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-fog md:text-[10px]">
            {c.label}
          </span>
        </motion.div>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="hidden pb-1 font-mono text-[9px] uppercase tracking-[0.3em] text-mist lg:block"
      >
        {t(hero.countdown.dot)}
      </motion.span>
    </div>
  )
}

export function StickyDate() {
  const now = useNow(1000)
  const { t } = useI18n()
  if (isVerdictDay(now)) {
    return (
      <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-ember">
        <span className="h-1.5 w-1.5 rounded-full bg-ember" />
        {t(hero.today)}
      </span>
    )
  }
  return <span className="font-mono text-[10px] tracking-[0.2em] text-fog">{hero.date}</span>
}

export { pad2 }