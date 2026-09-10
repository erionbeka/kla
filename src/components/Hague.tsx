import { motion, useReducedMotion } from 'motion/react'
import { ExternalLink } from 'lucide-react'
import { ArchiveScene } from './ArchiveScene'
import { CineFrame } from './cine/CineFrame'
import { hague } from '../lib/content'
import { useI18n } from '../lib/i18n'
import { EASE } from '../lib/util'
import { cn } from '../lib/util'

const kindStyles: Record<'fact' | 'concern' | 'procedure', string> = {
  fact: 'border-bone/30 text-bone/80 bg-bone/5',
  concern: 'border-ember/60 text-ember bg-ember/10',
  procedure: 'border-fog/40 text-fog bg-transparent',
}

type ConcernKind = 'fact' | 'concern' | 'procedure'

function kindLabel(kind: ConcernKind, t: (b: { sq: string; en: string }) => string) {
  const map = {
    fact: hague.legend.fact,
    concern: hague.legend.concern,
    procedure: hague.legend.procedure,
  }
  return t(map[kind])
}

export function Hague() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const E = EASE

  return (
    <section id="haga" className="relative scroll-mt-20 overflow-hidden bg-black">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.10]">
        <CineFrame particles="embers" tone="night" density={30} className="absolute inset-0">
          <ArchiveScene
            scene={{ kind: 'court', label: hague.title, source: hague.title, placeholder: false }}
            className="h-full w-full"
          />
        </CineFrame>
      </div>

      <div className="relative z-10 mx-auto max-w-[1480px] px-5 py-24 md:px-8 md:py-32">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-fog">{t(hague.kicker)}</p>
        <motion.h2
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: E }}
          className="mt-6 font-display text-8xl font-extrabold leading-none tracking-tight text-bone text-glow-soft md:text-[12rem]"
        >
          {t(hague.title)}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-8 max-w-2xl text-sm leading-relaxed text-fog md:text-base"
        >
          {t(hague.lead)}
        </motion.p>

        {/* legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          {(Object.keys(hague.legend) as ConcernKind[]).map((k) => (
            <span
              key={k}
              className={cn('border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em]', kindStyles[k])}
            >
              {kindLabel(k, t)}
            </span>
          ))}
        </motion.div>
      </div>

      {/* contestations */}
      <div className="relative z-10 mx-auto max-w-[1480px] px-5 pb-16 md:px-8">
        <div className="grid gap-px border border-bone/10 bg-bone/10 md:grid-cols-2">
          {hague.concerns.map((it, i) => (
            <motion.article
              key={it.year + i}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: i * 0.04, ease: E }}
              className={cn(
                'relative flex flex-col justify-between bg-ink p-6 md:p-9',
                it.current && 'border-em border-white/0',
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={cn(
                      'font-display text-3xl font-extrabold tracking-tight md:text-4xl',
                      it.current ? 'text-ember' : 'text-bone',
                    )}
                  >
                    {it.year}
                  </span>
                  <span
                    className={cn(
                      'inline-block border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em]',
                      kindStyles[it.kind],
                    )}
                  >
                    {kindLabel(it.kind, t)}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-bone md:text-2xl">
                  {t(it.title)}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-fog">{t(it.text)}</p>
              </div>
              <p className="mt-6 border-t border-bone/10 pt-4 font-mono text-[9px] uppercase tracking-[0.22em] text-mist">
                § {t(it.source)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1480px] px-5 pb-24 md:px-8 md:pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex items-center gap-3 border-t border-bone/10 pt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/80"
        >
          <a
            href="https://www.scp-ks.org"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-ember"
          >
            KSC · spk-ks.org
            <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}