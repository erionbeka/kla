import { motion, useReducedMotion } from 'motion/react'
import { ArchiveScene, PhotoMeta } from './ArchiveScene'
import { CineFrame } from './cine/CineFrame'
import { history } from '../lib/content'
import { useI18n } from '../lib/i18n'
import { cn, EASE } from '../lib/util'

function VarFull({ step, index }: { step: (typeof history.chapters)[number]; index: number }) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const E = EASE
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.6, ease: E }}
      >
        <CineFrame
          letterbox
          particles={index % 2 === 0 ? 'embers' : 'ash'}
          tone={index % 2 === 0 ? 'night' : 'day'}
          className="absolute inset-0"
        >
          <ArchiveScene scene={step.scene} className="h-full w-full" />
        </CineFrame>
        <div className="absolute inset-0 vignette" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[1480px] flex-col justify-between px-5 py-24 md:px-8 md:py-28">
        <div className={cn('flex items-start justify-between', index % 2 === 0 ? '' : 'md:flex-row-reverse')}>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="pointer-events-none font-display text-[26vw] font-extrabold leading-none text-bone/[0.04] md:text-[16rem]"
          >
            {step.year}
          </motion.span>
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.3em] text-fog md:block">
            {t(step.tag)}
          </span>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: E }}
          className={cn('max-w-xl', index % 2 === 0 ? '' : 'md:ml-auto md:text-right')}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">{step.year}</p>
          <h3 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-bone md:text-5xl">
            {t(step.title)}
          </h3>
          <p className={cn('mt-4 text-sm leading-relaxed text-fog md:text-base', index % 2 === 0 ? 'max-w-md' : 'md:ml-auto md:max-w-md')}>
            {t(step.text)}
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-5 z-10 max-w-[52%] md:bottom-6 md:left-8">
        <PhotoMeta scene={step.scene} />
      </div>
    </section>
  )
}

function VarSplit({ step, index: _index }: { step: (typeof history.chapters)[number]; index: number }) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const E = EASE
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="mx-auto grid max-w-[1480px] gap-0 lg:grid-cols-2">
        <div className="relative flex min-h-[70vh] items-end px-5 py-20 md:px-8 lg:min-h-screen lg:py-28">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: E }}
            className="max-w-md"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">{step.year}</p>
            <h3 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-bone md:text-6xl">
              {t(step.title)}
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-fog md:text-base">{t(step.text)}</p>
            <div className="mt-8 h-px w-24 bg-ember/40" />
          </motion.div>
        </div>

        <div className="relative min-h-[60vh] lg:min-h-screen">
          <div className="sticky top-0 h-[60vh] overflow-hidden lg:h-screen">
            <CineFrame particles="embers" tone="night" className="absolute inset-0">
              <ArchiveScene scene={step.scene} className="h-full w-full" />
            </CineFrame>
            <div className="absolute inset-0 vignette" />
            <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6">
              <PhotoMeta scene={step.scene} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function VarQuiet({ step, index: _index }: { step: (typeof history.chapters)[number]; index: number }) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const E = EASE
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1480px] px-5 py-24 md:px-8 md:py-36">
        <div className="mb-16 max-w-2xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember"
          >
            {step.year}
          </motion.p>
          <motion.h3
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: E }}
            className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-bone md:text-7xl"
          >
            {t(step.title)}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-fog md:text-base"
          >
            {t(step.text)}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: E }}
          className="relative aspect-[16/10] overflow-hidden md:aspect-[21/9]"
        >
          <CineFrame letterbox particles="ash" className="absolute inset-0">
            <ArchiveScene scene={step.scene} className="h-full w-full" />
          </CineFrame>
          <div className="absolute inset-0 vignette" />
          <div className="absolute bottom-5 left-5">
            <PhotoMeta scene={step.scene} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function VarFinale({ step, index: _index }: { step: (typeof history.chapters)[number]; index: number }) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const E = EASE
  return (
    <section className="relative min-h-screen overflow-hidden bg-ink">
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-ember"
        >
          {step.year}
        </motion.p>
        <motion.h3
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: E }}
          className="mt-6 font-display text-6xl font-extrabold leading-none tracking-tight text-bone md:text-[9rem]"
        >
          PAVARËSIA
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 max-w-md text-sm leading-relaxed text-fog md:text-base"
        >
          {t(step.title)}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.45 }}
          className="mt-3 max-w-md text-xs leading-relaxed text-mist md:text-sm"
        >
          {t(step.text)}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="relative mt-16 aspect-[21/9] w-full max-w-3xl overflow-hidden"
        >
          <CineFrame particles="embers" tone="night" className="absolute inset-0">
            <ArchiveScene scene={step.scene} className="h-full w-full" />
          </CineFrame>
          <div className="absolute inset-0 vignette" />
          <div className="absolute bottom-4 left-4">
            <PhotoMeta scene={step.scene} />
          </div>
        </motion.div>
      </div>

      <span className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none font-display text-[40vw] font-extrabold leading-none text-bone/[0.03]">
        2008
      </span>
    </section>
  )
}

export function History() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const chapters = history.chapters
  const layoutByIndex = [VarFull, VarSplit, VarFull, VarQuiet, VarSplit, VarFinale]

  return (
    <section id="historia" className="scroll-mt-20 bg-coal">
      <div className="border-b border-bone/5">
        <div className="mx-auto max-w-[1480px] px-5 py-24 md:px-8 md:py-32">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-fog">{t(history.kicker)}</p>
          <motion.h2
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: EASE }}
            className="mt-6 font-display text-7xl font-extrabold leading-none tracking-tight text-bone md:text-[10rem]"
          >
            {t(history.title)}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-6 max-w-md font-body text-lg text-fog md:text-2xl"
          >
            {t(history.subtitle)}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-8 max-w-2xl text-sm leading-relaxed text-fog/80 md:text-base"
          >
            {t(history.lead)}
          </motion.p>
        </div>
      </div>

      {chapters.map((step, i) => {
        const V = layoutByIndex[i] ?? VarFull
        return <V key={step.year + i} step={step} index={i} />
      })}
    </section>
  )
}
