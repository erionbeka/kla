import { motion, useReducedMotion } from 'motion/react'
import { ExternalLink } from 'lucide-react'
import { CineParticles } from './cine/CineParticles'
import { ArchiveScene } from './ArchiveScene'
import { CineFrame } from './cine/CineFrame'
import { verdict, type Scene } from '../lib/content'
import { useI18n } from '../lib/i18n'
import { isVerdictDay } from '../lib/clock'
import { useNow } from '../lib/hooks'
import { cn, EASE } from '../lib/util'

const scalesScene: Scene = {
  kind: 'scales',
  label: { sq: 'Peshorja e drejtësisë', en: 'Scales of justice' },
  source: { sq: 'ARKIV', en: 'ARCHIVE' },
  placeholder: true,
}

export function Verdict() {
  const { t } = useI18n()
  const now = useNow(5000)
  const day = isVerdictDay(now)
  const reduce = useReducedMotion()
  const E = EASE

  return (
    <section id="verdict" className="relative scroll-mt-24 overflow-hidden bg-black">
      <span id="live" />
      {day && <CineParticles kind="embers" density={70} maxWidth={1920} maxHeight={1920} />}
      <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
        <CineFrame tone="night" particles="ash" density={24} className="absolute inset-0">
          <ArchiveScene scene={scalesScene} className="h-full w-full" />
        </CineFrame>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 vignette" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1480px] px-5 py-24 md:px-8 md:py-32">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-bone/10 pb-6">
          <div className="flex items-center gap-4">
            {day && <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember/60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ember" />
            </span>}
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-bone md:text-6xl">
              {t(verdict.title)}
            </h2>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs tracking-[0.25em] text-fog">
            <span className="text-bone">{verdict.day}</span>
            <span className="h-1 w-1 rounded-full bg-ember" />
            <span>{t(verdict.time)}</span>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-10 md:flex-row md:gap-20">
          <div className="flex-1">
            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: E }}
              className={cn(
                'flex min-h-[220px] flex-col items-center justify-center border text-center',
                day ? 'border-ember/60 bg-ember/[0.06]' : 'border-bone/15',
              )}
            >
              <p
                className={cn(
                  'flex items-center gap-3 font-display text-4xl font-extrabold tracking-tight md:text-5xl',
                  day ? 'text-ember' : 'text-bone',
                )}
              >
                {!day && <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-ember" />}
                {t(verdict.waiting)}
              </p>
            </motion.div>
          </div>

          <div className="max-w-xl flex-1">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-sm leading-relaxed text-fog md:text-base"
            >
              {t(verdict.status)}
            </motion.p>

            <div className="mt-8 space-y-4 border-l border-bone/15 pl-5">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-ember">01</p>
                <p className="mt-1 text-sm text-bone/85 md:text-base">{t(verdict.phase1)}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-fog">02</p>
                <p className="mt-1 text-sm text-bone/85 md:text-base">{t(verdict.phase2)}</p>
              </div>
            </div>

            <a
              href={verdict.kscUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-3 border border-bone/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/85 transition-colors hover:border-ember hover:text-ember"
            >
              {t(verdict.official)}
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}