import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X, Mic, FileText, Image as ImageIcon, Calendar, MapPin } from 'lucide-react'
import { ArchiveScene } from './ArchiveScene'
import { PunchWords } from './cine/Punch'
import { archive, type ArchiveItem, type ArchiveCategory } from '../lib/content'
import { getRealItems } from '../lib/media'
import { useI18n } from '../lib/i18n'
import { cn } from '../lib/util'

const catIcon: Record<ArchiveCategory, typeof FileText> = {
  FOTOGRAFI: ImageIcon,
  DOKUMENTE: FileText,
  FJALIME: Mic,
  KRONOLOGJI: Calendar,
  HAGA: FileText,
}

const aspect: Record<ArchiveCategory, string> = {
  FOTOGRAFI: 'aspect-[4/3]',
  DOKUMENTE: 'aspect-[3/4]',
  FJALIME: 'aspect-[16/10]',
  KRONOLOGJI: 'aspect-[5/4]',
  HAGA: 'aspect-[4/3]',
}

function ItemCard({ item, onOpen }: { item: ArchiveItem; onOpen: (i: ArchiveItem) => void }) {
  const { t } = useI18n()
  const Icon = catIcon[item.cat]
  return (
    <button
      onClick={() => onOpen(item)}
      className="group mb-6 block w-full break-inside-avoid overflow-hidden bg-ink text-left"
    >
      <div className={cn('relative overflow-hidden', aspect[item.cat])}>
        {item.media ? (
          item.media.isVideo ? (
            <video
              src={item.media.url}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={item.media.url}
              alt={t(item.title)}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          )
        ) : (
          <div className="h-full w-full">
            <ArchiveScene
              scene={item.scene}
              className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-ink/25 transition-opacity duration-500 group-hover:opacity-0" />
        <div className="absolute inset-0 vignette" />
        <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.25em] text-bone/80">
          <Icon className="h-3 w-3" strokeWidth={1.5} />
          {t(archive.catLabels[item.cat])}
        </div>
        <div className="absolute right-4 top-4 flex items-center gap-2">
          {item.media?.isVideo && (
            <span className="flex items-center gap-1.5 border border-ember/50 bg-ink/70 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-ember">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
              FILM
            </span>
          )}
        </div>
      </div>

      <div className="border-x border-b border-bone/10 p-4">
        <h3 className="font-display text-base font-bold leading-snug tracking-tight text-bone">
          {t(item.title)}
        </h3>
        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[9px] uppercase tracking-[0.2em] text-fog">
          <span>{t(item.date)}</span>
          <span className="h-1 w-1 rounded-full bg-fog/40" />
          <span>{t(item.loc)}</span>
        </p>
      </div>
    </button>
  )
}

function Viewer({ item, onClose }: { item: ArchiveItem | null; onClose: () => void }) {
  const { t } = useI18n()
  useEffect(() => {
    document.body.style.overflow = item ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [item])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm md:p-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.98, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.98, y: 12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'relative flex w-full max-w-5xl flex-col overflow-hidden border border-bone/15 bg-ink',
              item.kind === 'document' ? 'md:flex-row' : 'md:flex-row',
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center border border-bone/25 text-bone transition-colors hover:border-ember hover:text-ember"
              aria-label="Close"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>

            <div className={cn('relative shrink-0', item.kind === 'document' ? 'h-[36vh] md:h-[70vh] md:w-1/2' : 'h-[36vh] md:h-[70vh] md:w-[58%]')}>
              {item.media ? (
                item.media.isVideo ? (
                  <video
                    src={item.media.url}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <img src={item.media.url} alt={t(item.title)} className="h-full w-full object-contain" />
                )
              ) : (
                <ArchiveScene scene={item.scene} className="h-full w-full" />
              )}
              <div className="absolute inset-0 vignette" />
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[0.25em] text-fog">
                <span>{item.id}</span>
                <span className="h-1 w-1 rounded-full bg-fog/40" />
                <span className="border border-ember/40 px-2 py-0.5 text-ember">{t(archive.catLabels[item.cat])}</span>
              </div>

              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-bone md:text-4xl">
                {t(item.title)}
              </h2>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                <span className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} /> {t(item.date)}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} /> {t(item.loc)}
                </span>
              </div>

              <p className="mt-6 max-w-xl text-sm leading-relaxed text-bone/85 md:text-base">
                {t(item.desc)}
              </p>

              <div className="mt-8 border-t border-bone/10 pt-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-mist">SOURCE / BURIMI</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fog">{t(item.source)}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Arkiiv() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const [cat, setCat] = useState<ArchiveCategory | 'ALL'>('ALL')
  const [open, setOpen] = useState<ArchiveItem | null>(null)

  const all = useMemo(() => [...getRealItems(), ...archive.items], [])
  const items = cat === 'ALL' ? all : all.filter((i) => i.cat === cat)

  const realCount = useMemo(() => all.filter((i) => i.media).length, [all])

  return (
    <section id="arkivi" className="scroll-mt-20 bg-coal">
      <div className="mx-auto max-w-[1480px] px-5 py-24 md:px-8 md:py-32">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-fog">{t(archive.kicker)}</p>
        <motion.h2
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-6xl font-extrabold leading-none tracking-tight text-bone md:text-9xl"
        ><PunchWords words={['A', 'R', 'K', 'I', 'V', 'I']} mark={2} className="text-glow-soft" /></motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 max-w-2xl text-sm leading-relaxed text-fog md:text-base"
        >
          {t(archive.lead)}
        </motion.p>

        {/* filters */}
        {realCount > 0 && (
          <div className="mt-8 inline-flex items-center gap-2 border border-ember/40 bg-ember/5 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.25em] text-ember">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
            {realCount} {t(archive.procured)}
          </div>
        )}
        <div className="mt-12 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setCat('ALL')}
            className={cn(
              'border px-4 py-2 font-mono text-[9px] uppercase tracking-[0.22em] transition-colors',
              cat === 'ALL' ? 'border-ember bg-ember/10 text-ember' : 'border-bone/15 text-fog hover:border-bone/40 hover:text-bone',
            )}
          >
            ALL · {all.length}
          </button>
          {archive.cats.map((c) => {
            const count = all.filter((i) => i.cat === c).length
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  'border px-4 py-2 font-mono text-[9px] uppercase tracking-[0.22em] transition-colors',
                  cat === c ? 'border-ember bg-ember/10 text-ember' : 'border-bone/15 text-fog hover:border-bone/40 hover:text-bone',
                )}
              >
                {t(archive.catLabels[c])} · {count}
              </button>
            )
          })}
        </div>
      </div>

      <motion.div
        layout
        className="mx-auto max-w-[1480px] columns-1 gap-6 px-5 pb-24 md:columns-2 md:px-8 lg:columns-3 lg:pb-32"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ItemCard item={item} onOpen={setOpen} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <Viewer item={open} onClose={() => setOpen(null)} />
    </section>
  )
}