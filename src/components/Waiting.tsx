import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArchiveScene } from './ArchiveScene'
import { CineFrame } from './cine/CineFrame'
import { Countdown, StickyDate } from './Countdown'
import { waiting, hero } from '../lib/content'
import { useI18n } from '../lib/i18n'
import { isVerdictDay } from '../lib/clock'
import { useNow } from '../lib/hooks'
import { EASE } from '../lib/util'

function FaintBackdrop() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setIdx((i) => (i + 1) % waiting.faintScenes.length), 5000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <CineFrame tone="night" particles="embers" density={36} className="absolute inset-0">
            <ArchiveScene scene={waiting.faintScenes[idx]} className="h-full w-full scale-105 blur-[1px]" />
          </CineFrame>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 vignette" />
    </div>
  )
}

export function Waiting() {
  const { t } = useI18n()
  const now = useNow(1000)
  const day = isVerdictDay(now)
  const reduce = useReducedMotion()
  const E = EASE

  return (
    <section id="pritje" className="relative min-h-[140vh] scroll-mt-0 bg-black">
      <div className="sticky top-0 flex min-h-screen items-center justify-center overflow-hidden px-6 py-28">
        <FaintBackdrop />

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.p
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6 }}
            className="font-mono text-[10px] uppercase tracking-[0.6em] text-fog"
          >
            {waiting.mark}
          </motion.p>

          <motion.h2
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 34, letterSpacing: '0.15em' }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: '0.08em' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 2, ease: E }}
            className="mt-8 font-display text-7xl font-extrabold leading-none tracking-[0.08em] text-bone text-glow-soft md:text-[10rem]"
          >
            {day ? t(hero.today) : t(waiting.title)}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.4 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-fog md:text-base"
          >
            {day ? t(hero.verdictNote) : t(waiting.sub)}
          </motion.p>

          <div className="mt-16 flex flex-col items-center gap-6">
            {day ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: E }}
                className="flex flex-col items-center gap-2 border-t border-ember/50 pt-8"
              >
                <p className="font-display text-5xl font-extrabold tracking-tight text-bone md:text-7xl">
                  {t(waiting.dayOf)}
                </p>
                <div className="mt-3 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-bone/80">
                  <span>{t(waiting.time)}</span>
                  <span className="h-1 w-1 rounded-full bg-ember" />
                  <span>{t(waiting.place)}</span>
                </div>
                <p className="mt-6 max-w-sm text-sm leading-relaxed text-fog">{t(waiting.now)}</p>
              </motion.div>
            ) : (
              <>
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-fog/70">
                  {t(waiting.dayBefore)}
                </p>
                <Countdown className="justify-center" />
                <div className="mt-10 flex flex-col items-center gap-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-fog">{t(waiting.dayOf)}</p>
                  <p className="font-mono text-sm tracking-[0.35em] text-bone/90">
                    {t(waiting.time)} · {t(waiting.place)}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* edge markers */}
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
          <StickyDate />
        </div>
      </div>
    </section>
  )
}