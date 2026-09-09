import { motion, useReducedMotion } from 'motion/react'
import { ExternalLink } from 'lucide-react'
import { ArchiveScene } from './ArchiveScene'
import { CineFrame } from './cine/CineFrame'
import { hague } from '../lib/content'
import { useI18n } from '../lib/i18n'
import { EASE } from '../lib/util'
import { cn } from '../lib/util'

const kindStyles: Record<'allegation' | 'fact' | 'procedure', string> = {
  allegation: 'border-ember/60 text-ember bg-ember/10',
  fact: 'border-bone/30 text-bone/80 bg-bone/5',
  procedure: 'border-fog/40 text-fog bg-transparent',
}

function kindLabel(kind: 'allegation' | 'fact' | 'procedure', t: (b: { sq: string; en: string }) => string) {
  const map = {
    allegation: hague.legend.allegation,
    fact: hague.legend.fact,
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
            scene={{ kind: 'court', label: hague.title, source: hague.title, placeholder: true }}
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
          {(Object.keys(hague.legend) as Array<'allegation' | 'fact' | 'procedure'>).map((k) => (
            <span
              key={k}
              className={cn('border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em]', kindStyles[k])}
            >
              {kindLabel(k, t)}
            </span>
          ))}
        </motion.div>
      </div>

{/* procedure timeline */}
      <div className="relative z-10 mx-auto max-w-[1480px] px-5 pb-16 md:px-8">
        <div className="relative border-l border-bone/10 pl-8 md:pl-12">
          {hague.items.map((it, i) => (
            <motion.div
              key={it.year}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: i * 0.05, ease: E }}
              className="relative pb-14 last:pb-0 md:pb-20"
            >
              <span
                className={cn(
                  'absolute -left-[9.5px] top-1.5 h-[3px] w-[3px] rounded-full md:-left-[13.5px]',
                  it.current ? 'bg-ember' : 'bg-fog/60',
                )}
              />
              <div className="grid gap-3 md:grid-cols-[140px_1fr] md:gap-10">
                <div className="flex items-baseline justify-between md:block">
                  <span
                    className={cn(
                      'font-display text-4xl font-extrabold tracking-tight md:text-5xl',
                      it.current ? 'text-ember' : 'text-bone',
                    )}
                  >
                    {it.year}
                  </span>
                  <span
                    className={cn(
                      'ml-3 inline-block border px-2 py-0.5 align-middle font-mono text-[8px] uppercase tracking-[0.2em] md:ml-0 md:mt-2',
                      kindStyles[it.kind],
                    )}
                  >
                    {kindLabel(it.kind, t)}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-bone md:text-2xl">
                    {t(it.title)}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-fog">{t(it.text)}</p>
                  <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-mist">§ {t(it.source)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

{/* charge note */}
      <div className="relative z-10 mx-auto max-w-[1480px] px-5 pb-24 md:px-8 md:pb-32">
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: E }}
          className="border-t border-bone/10 pt-12"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-ember">{t(hague.charge)}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fog md:text-base">{t(hague.chargeText)}</p>
          <p className="mt-6 max-w-2xl font-display text-2xl font-bold tracking-tight text-bone md:text-3xl">
            {t(hague.away)}
          </p>
          <a
            href="https://www.scp-ks.org"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/80 transition-colors hover:text-ember"
          >
            {t(hague.official)}
            <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}