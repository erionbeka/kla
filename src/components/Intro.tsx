import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArchiveScene } from './ArchiveScene'
import { intro, type Scene } from '../lib/content'
import { useI18n, type Lang } from '../lib/i18n'
import { cn, EASE } from '../lib/util'

type Step = 'kicker' | '1998' | '1999' | '2008' | '2020' | '2026' | 'title'

const yearSteps: readonly Step[] = ['1998', '1999', '2008', '2020', '2026']
const durations: Record<Step, number> = {
  kicker: 1500,
  '1998': 1100,
  '1999': 1100,
  '2008': 1100,
  '2020': 1100,
  '2026': 1300,
  title: 4000,
}

function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang } = useI18n()
  const set = (l: Lang) => setLang(l)
  return (
    <div className={cn('flex items-center gap-3 font-mono text-[10px] tracking-[0.25em]', className)}>
      <button
        onClick={() => set('sq')}
        className={cn('uppercase transition-colors', lang === 'sq' ? 'text-bone' : 'text-fog hover:text-bone/70')}
      >
        SQ
      </button>
      <span className="h-3 w-px bg-bone/20" />
      <button
        onClick={() => set('en')}
        className={cn('uppercase transition-colors', lang === 'en' ? 'text-bone' : 'text-fog hover:text-bone/70')}
      >
        EN
      </button>
    </div>
  )
}

export function Intro({ onEnter }: { onEnter: () => void }) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const [step, setStep] = useState<Step>(reduce ? 'title' : 'kicker')
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (reduce) {
      setStep('title')
      return
    }
    const timers: number[] = []
    const order: Step[] = ['kicker', ...yearSteps, 'title']
    let i = 0
    const run = () => {
      if (i >= order.length) return
      setStep(order[i])
      timers.push(window.setTimeout(run, durations[order[i]]))
      i++
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [reduce])

  const scene = useMemo<Scene>(
    () => ({
      kind: 'landscape',
      label: intro.tagline,
      source: intro.kicker,
      placeholder: true,
    }),
    [],
  )

  const year = yearSteps.includes(step) ? step : null

  const leave = () => {
    if (leaving) return
    setLeaving(true)
    window.setTimeout(onEnter, reduce ? 60 : 900)
  }

  return (
    <motion.div
      className={cn('fixed inset-0 z-[100] flex flex-col bg-ink', leaving && 'animate-flicker')}
      animate={{ opacity: leaving ? 0.98 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* faint archival art, visible through the whole sequence */}
      <AnimatePresence>
        {!leaving && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step === 'title' ? 0.5 : 0.34 }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <ArchiveScene scene={scene} className="h-full w-full object-cover grayscale" />
            <div className="absolute inset-0 bg-ink/35" />
            <div className="absolute inset-0 vignette" />
          </motion.div>
        )}
      </AnimatePresence>

      <LangSwitch className="absolute right-6 top-6 z-20 md:right-8 md:top-8" />

      <div className="relative z-10 flex min-h-full flex-1 flex-col items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          {step === 'kicker' && (
            <motion.div
              key="k"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="font-mono text-[11px] uppercase tracking-[0.5em] text-fog md:text-xs"
            >
              {t(intro.kicker)}
            </motion.div>
          )}

          {year && (
            <motion.div
              key={year}
              initial={{ opacity: 0, filter: 'brightness(0.2)' }}
              animate={{ opacity: 1, filter: 'brightness(1.25)' }}
              exit={{ opacity: 0, filter: 'brightness(1.6)' }}
              transition={{ duration: 0.9, ease: EASE }}
              className="font-display text-[26vw] font-bold leading-none tracking-tighter text-bone text-glow-soft md:text-[20vw]"
            >
              {year}
            </motion.div>
          )}

          {step === 'title' && (
            <motion.div
              key="title"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: EASE }}
              className="flex w-full flex-col items-center"
            >
              <motion.h1
                initial={{ opacity: 0, letterSpacing: '0.2em' }}
                animate={{ opacity: 1, letterSpacing: '0.12em' }}
                transition={{ duration: 1.6, ease: EASE }}
                className="font-display text-[19vw] font-extrabold leading-none tracking-[0.12em] text-bone md:text-[11rem]"
              >
                {intro.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="mt-5 max-w-md font-body text-base text-fog md:text-lg"
              >
                {t(intro.tagline)}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 1 }}
                className="mt-8 font-mono text-[10px] uppercase tracking-[0.35em] text-bone/60 md:text-[11px]"
              >
                {t(intro.names)}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 1 }}
                className="mt-10 flex flex-col items-center gap-1 font-mono text-xs tracking-[0.3em] text-bone"
              >
                <span>{t(intro.date)}</span>
                <span className="text-fog">{t(intro.time)}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.8 }}
                className="mt-12"
              >
                <button
                  onClick={leave}
                  className="group relative inline-flex items-center gap-4 border border-bone/30 px-9 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-bone transition-colors duration-300 hover:border-ember hover:text-white"
                >
                  <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  {t(intro.enter)}
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </button>
                <button
                  onClick={leave}
                  className="mt-6 block text-center font-mono text-[9px] uppercase tracking-[0.25em] text-fog/50 transition-colors hover:text-fog"
                >
                  {t(intro.skip)}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex items-center justify-between px-6 pb-5 font-mono text-[9px] uppercase tracking-[0.3em] text-fog/40 md:px-8">
        <span>{t(intro.kicker)}</span>
        <span>{t(intro.time)}</span>
      </div>
    </motion.div>
  )
}