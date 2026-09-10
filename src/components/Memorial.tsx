import { motion, useReducedMotion } from 'motion/react'
import { ArchiveScene } from './ArchiveScene'
import { CineFrame } from './cine/CineFrame'
import { memorial } from '../lib/content'
import { getMemorialFrames } from '../lib/media'
import { useI18n } from '../lib/i18n'
import { cn, EASE } from '../lib/util'

function QuoteBlock({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-3xl px-6 text-center"
    >
      <p className="font-display text-3xl font-bold leading-snug tracking-tight text-bone md:text-5xl">{text}</p>
    </motion.div>
  )
}

export function Memorial() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const memorialFrames = getMemorialFrames()

  const Names = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <ul aria-hidden={ariaHidden} className="flex flex-col">
      {memorial.names.map((n) => (
        <li
          key={n}
          className="flex items-baseline justify-between gap-4 py-3 font-body text-sm text-bone/70 md:py-4 md:text-base"
        >
          <span>{n}</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-fog/50">1999</span>
        </li>
      ))}
    </ul>
  )

  return (
    <section id="kujtesa" className="relative scroll-mt-20 overflow-hidden bg-ink">
      {/* faint archival backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <CineFrame letterbox particles="ash" className="absolute inset-0">
          <ArchiveScene
            scene={{ kind: 'ruins', label: memorial.title, source: memorial.title, placeholder: true }}
            className="h-full w-full"
          />
        </CineFrame>
      </div>

      <div className="relative z-10 mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="pt-24 md:pt-32">
          <motion.h2
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-bone md:text-8xl"
          >
            {t(memorial.title)}
          </motion.h2>

          <p className="mt-5 max-w-2xl border-l border-ember/50 pl-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-fog md:text-[10px]">
            {t(memorial.datasetLabel)}
          </p>
        </div>
      </div>

      {/* scrolling names */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="relative z-10 mx-auto mt-12 grid max-w-[1480px] gap-x-16 overflow-hidden px-5 md:mt-16 md:grid-cols-2 md:px-8"
      >
        <div
          className={cn('relative h-[58vh] overflow-hidden lg:h-[70vh]', reduce && 'overflow-y-auto')}
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
          }}
        >
          {!reduce && (
            <div className="marquee-y absolute inset-0">
              <Names />
              <Names ariaHidden />
            </div>
          )}
          {reduce && (
            <div className="absolute inset-0 overflow-y-auto py-8">
              <Names />
            </div>
          )}
        </div>

        <div className="hidden md:block">
          <div className="flex h-[58vh] flex-col justify-between border-b border-bone/10 py-8 lg:h-[70vh]">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">¶ 1998 – 1999</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog/50">{t(memorial.source)}</span>
          </div>
        </div>
      </motion.div>

      {/* film frames */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="relative z-10 mx-auto mt-20 max-w-[1480px] px-5 md:mt-28 md:px-8"
      >
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {memorial.frames.map((s, i) => {
            const m = memorialFrames[i]
            return (
              <div key={i} className="group relative">
                <CineFrame
                  tone={i % 2 === 0 ? 'night' : 'day'}
                  particles={i % 3 === 0 ? 'embers' : 'ash'}
                  duration={14 + i * 2}
                  className="aspect-[4/3]"
                >
                  {m ? (
                    m.isVideo ? (
                      <video
                        src={m.url}
                        muted
                        loop
                        autoPlay
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img
                        src={m.url}
                        alt={t(s.label)}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    )
                  ) : (
                    <ArchiveScene scene={s} className="h-full w-full" />
                  )}
                </CineFrame>
                <div className="mt-2">
                  {m?.credit ? (
                    <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-fog/70">
                      {m.credit}
                    </p>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* the three quiet sentences */}
      <div className="relative z-10 mx-auto flex max-w-[1480px] flex-col gap-28 px-5 py-28 md:gap-40 md:px-8 md:py-44">
        <QuoteBlock text={t(memorial.quote1)} />
        <QuoteBlock text={t(memorial.quote2)} delay={0.1} />
        <QuoteBlock text={t(memorial.quote3)} delay={0.2} />
      </div>
    </section>
  )
}