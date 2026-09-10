import { motion, useReducedMotion } from 'motion/react'
import { years27 } from '../lib/content'
import { getMemorialFrames } from '../lib/media'
import { useI18n } from '../lib/i18n'

export function Years27() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const shot = getMemorialFrames().find((f) => !f.isVideo) ?? null

  return (
    <section id="vitet" className="relative bg-black">
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

      {/* real archive frame — the ground under the years */}
      {shot && (
        <div className="mx-auto max-w-[1480px] px-5 md:px-8">
          <motion.figure
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[16/9] overflow-hidden md:aspect-[21/9]"
          >
            <img src={shot.url} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/50" />
            <div className="absolute inset-0 vignette" />
            <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
              <span className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-bone/70">
                {t(years27.caption)}
              </span>
              {shot.credit && (
                <span className="hidden max-w-[45%] text-right font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-fog/60 md:block">
                  {shot.credit}
                </span>
              )}
            </figcaption>
          </motion.figure>
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
            className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-bone md:text-6xl"
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