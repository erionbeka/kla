import { motion, useReducedMotion } from 'motion/react'
import { CineParticles } from './cine/CineParticles'
import { PunchWords } from './cine/Punch'
import { closing } from '../lib/content'
import { useI18n } from '../lib/i18n'
import { EASE } from '../lib/util'

export function Closing() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const E = EASE

  return (
    <section id="mbyllje" className="relative overflow-hidden bg-black">
      <CineParticles kind="embers" density={30} maxWidth={1920} maxHeight={1920} />
      <div className="mx-auto flex max-w-[1480px] flex-col items-start px-5 py-32 md:px-8 md:py-48">
        <motion.h2
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: E }}
          className="font-display text-6xl font-extrabold leading-[0.9] tracking-tight text-bone md:text-[9rem]"
        >
          {t(closing.question)}
        </motion.h2>
      </div>

<div className="mx-auto flex max-w-[1480px] flex-col gap-40 px-5 py-40 md:gap-64 md:px-8 md:py-64">
        {closing.words.map((w, i) => (
          <motion.p
            key={i}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 50, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 1.6, ease: E }}
            className={i % 2 === 0 ? 'md:self-start' : 'md:self-end'}
          >
            <span className="font-display text-6xl font-extrabold tracking-tight text-bone md:text-[8rem]">
              {t(w)}
            </span>
          </motion.p>
        ))}
      </div>

      {/* the pain */}
      <div className="relative mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="border-t border-bone/10 pt-20 md:pt-28">
          {closing.pains.map((p, i) => (
            <motion.p
              key={i}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.5, ease: E }}
              className="border-b border-bone/10 py-10 font-display text-2xl font-bold leading-tight tracking-tight text-fog first:border-t-0 md:py-14 md:text-5xl"
            >
              {t(p)}
            </motion.p>
          ))}

          <div className="grid gap-px border-b border-bone/10 bg-bone/10 md:grid-cols-4">
            {closing.numbers.map((num, i) => (
              <motion.div
                key={i}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.2, delay: i * 0.08, ease: E }}
                className="bg-black p-6 md:p-8"
              >
                <p className="font-display text-5xl font-extrabold tracking-tight text-ember md:text-6xl">{num.n}</p>
                <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-fog/80">
                  {t(num.label)}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.2 }}
            className="mt-8 max-w-2xl font-mono text-[10px] leading-relaxed tracking-[0.12em] text-fog/50"
          >
            {t(closing.note)}
          </motion.p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1480px] flex-col items-start px-5 pb-40 md:px-8 md:pb-56">
        <div className="h-px w-24 bg-ember/50" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="mt-14 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-bone md:text-6xl"
        >
          {t(closing.line1)}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.35 }}
          className="mt-6 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-fog md:text-6xl"
        >
          {t(closing.line2)}
        </motion.p>

        <div className="mt-32">
          <motion.p
            initial={reduce ? { opacity: 1 } : { opacity: 0, letterSpacing: '0.2em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.12em' }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.6, ease: E }}
className="font-display text-[18vw] font-extrabold leading-none tracking-[0.12em] text-bone md:text-[9rem]"
          >
            <PunchWords words={[closing.final]} className="text-glow-soft" />
          </motion.p>
          <p className="mt-4 font-body text-base text-fog md:text-xl">{t(closing.finalTag)}</p>
        </div>
      </div>
    </section>
  )
}