import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X, ArrowUpRight } from 'lucide-react'
import { ArchiveScene, PhotoMeta } from './ArchiveScene'
import { CineFrame } from './cine/CineFrame'
import { getProfilePhoto } from '../lib/media'
import { four } from '../lib/content'
import { useI18n } from '../lib/i18n'
import { cn } from '../lib/util'

function ProfilePanel({
  p,
  index,
  hovered,
  onHover,
  onOpen,
}: {
  p: (typeof four.profiles)[number]
  index: number
  hovered: string | null
  onHover: (id: string | null) => void
  onOpen: (id: string) => void
}) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const isHovered = hovered === p.id
  const dimmed = hovered !== null && !isHovered
  const photo = getProfilePhoto(p.id)

  return (
    <button
      onClick={() => onOpen(p.id)}
      onMouseEnter={() => onHover(p.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(p.id)}
      onBlur={() => onHover(null)}
      className="group relative block h-[78vh] w-full cursor-pointer overflow-hidden bg-ink text-left focus:outline-none lg:h-[86vh]"
      aria-label={`${t(p.name)} — ${t(p.role)}`}
    >
      {/* red edge line */}
      <span
        className={cn(
          'absolute left-0 top-0 z-20 w-[3px] bg-ember transition-all duration-500',
          isHovered ? 'h-full' : 'h-0',
        )}
      />

      <motion.div
        initial={{ scale: 1 }}
        animate={{
          filter: reduce
            ? 'none'
            : isHovered
              ? 'brightness(1.15) saturate(1.05)'
              : dimmed
                ? 'brightness(0.28) saturate(0.6)'
                : 'brightness(0.9)',
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <CineFrame tone={index % 2 === 0 ? 'night' : 'day'} particles={index === 3 ? 'embers' : 'ash'} density={24} className="absolute inset-0">
          {photo ? (
            <img src={photo} alt={t(p.name)} className="h-full w-full object-cover" />
          ) : (
            <ArchiveScene scene={p.scene} className="h-full w-full" />
          )}
        </CineFrame>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/45" />
      <div className="absolute inset-0 vignette" />

      {/* top meta */}
      <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-bone/60">
        <span>
          {t(four.docPrefix)} {p.code}
        </span>
        <span className="text-fog/70">{index + 1}/04</span>
      </div>

      {/* bottom name block */}
      <div className="absolute inset-x-4 bottom-5 z-10 md:inset-x-5 md:bottom-7">
        <div className="mb-2 h-px w-8 bg-ember transition-all duration-700 group-hover:w-16" />
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-fog">{t(p.born)}</p>
        <h3
          className={cn(
            'mt-1 font-display font-bold leading-none tracking-tight text-bone transition-all duration-500',
            isHovered ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl',
          )}
        >
          {t(p.name)}
        </h3>

        <motion.div
          initial={false}
          animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="mt-3 max-w-[30ch] text-xs leading-relaxed text-fog md:text-[13px]">{t(p.role)}</p>
          <p className="mt-3 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-bone/70 transition-colors">
            OPEN {t(p.hagueTag)}
            <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
          </p>
        </motion.div>
      </div>
    </button>
  )
}

function ProfileOverlay({ id, onClose }: { id: string | null; onClose: () => void }) {
  const { t } = useI18n()
  const p = four.profiles.find((x) => x.id === id)
  const photo = p ? getProfilePhoto(p.id) : null

  useEffect(() => {
    document.body.style.overflow = id ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[95] flex flex-col bg-ink lg:flex-row"
        >
          {/* image side */}
          <div className="relative h-[34vh] shrink-0 lg:h-full lg:w-[44%]">
<CineFrame tone="day" particles="embers" density={30} className="absolute inset-0">
          {photo ? (
            <img src={photo} alt={t(p.name)} className="h-full w-full object-cover" />
          ) : (
            <ArchiveScene scene={p.scene} className="h-full w-full" />
          )}
        </CineFrame>
            <div className="absolute inset-0 bg-ink/25" />
            <div className="absolute inset-0 vignette" />
            <div className="absolute bottom-5 left-5 z-10">
              <PhotoMeta scene={p.scene} />
            </div>
          </div>

          {/* document side */}
          <div className="relative flex-1 overflow-y-auto">
            <div className="relative mx-auto max-w-2xl px-6 py-10 md:px-10 lg:max-w-none lg:px-14 lg:py-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-ember">
                {t(four.docPrefix)} {p.code} · KSC
              </p>
              <h2 className="mt-4 font-display text-5xl font-extrabold leading-none tracking-tight text-bone md:text-7xl">
                {t(p.name)}
              </h2>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-fog">{t(p.born)}</p>

              <div className="mt-8 max-w-xl">
                <p className="text-sm leading-relaxed text-fog md:text-base">{t(p.blurb)}</p>
              </div>

              <div className="mt-10">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-fog">TIMELINE</p>
                <ul className="divide-y divide-bone/[0.07] border-y border-bone/[0.07]">
                  {p.timeline.map((row) => (
                    <li key={row.y} className="flex items-baseline gap-6 py-3">
                      <span className="w-16 shrink-0 font-mono text-[10px] tracking-[0.15em] text-fog">{row.y}</span>
                      <span className="text-sm text-bone/85">{t(row.t)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <div className="border-l-2 border-ember/50 pl-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-mist">{t(p.hagueTag)} · {four.sourceKsc}</p>
                  <p className="mt-2 text-sm leading-relaxed text-bone/85">{t(p.hague)}</p>
                </div>
                <div className="border-l border-bone/15 pl-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-mist">SOURCES</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fog">{four.sourceKsc} · Kosovo</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center border border-bone/25 text-bone transition-colors hover:border-ember hover:text-ember"
            aria-label="Close"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Four() {
  const { t } = useI18n()
  const [hovered, setHovered] = useState<string | null>(null)
  const [open, setOpen] = useState<string | null>(null)
  const reduce = useReducedMotion()

  return (
    <section id="kater" className="scroll-mt-0 bg-ink">
      <div className="mx-auto max-w-[1480px] px-5 pb-10 pt-24 md:px-8 md:pt-32">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-fog">{t(four.kicker)}</p>
        <motion.h2
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-8xl font-extrabold leading-none tracking-tight text-bone md:text-[11rem]"
        >
          {t(four.title)}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 max-w-xl text-sm leading-relaxed text-fog md:text-base"
        >
          {t(four.subtitle)} {t(four.matter)}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4">
        {four.profiles.map((p, i) => (
          <ProfilePanel key={p.id} p={p} index={i} hovered={hovered} onHover={setHovered} onOpen={setOpen} />
        ))}
      </div>

      <ProfileOverlay id={open} onClose={() => setOpen(null)} />
    </section>
  )
}