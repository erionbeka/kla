import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X, Volume2, VolumeX } from 'lucide-react'
import { nav, hero } from '../lib/content'
import { useI18n, type Lang } from '../lib/i18n'
import { useApp } from '../lib/app'
import { isVerdictDay } from '../lib/clock'
import { useNow } from '../lib/hooks'
import { cn } from '../lib/util'

function LangSwitch({ className, light = false }: { className?: string; light?: boolean }) {
  const { lang, setLang } = useI18n()
  const btn = (l: Lang) =>
    cn(
      'font-mono text-[10px] uppercase tracking-[0.25em] transition-colors',
      lang === l ? (light ? 'text-bone' : 'text-bone') : light ? 'text-fog hover:text-bone' : 'text-fog hover:text-bone',
    )
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <button onClick={() => setLang('sq')} className={btn('sq')}>
        SQ
      </button>
      <span className="h-3 w-px bg-bone/20" />
      <button onClick={() => setLang('en')} className={btn('en')}>
        EN
      </button>
    </div>
  )
}

function SoundToggle({ className }: { className?: string }) {
  const { sound, toggleSound } = useApp()
  return (
    <button
      onClick={toggleSound}
      className={cn(
        'flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-fog transition-colors hover:text-bone',
        className,
      )}
      aria-pressed={sound}
    >
      {sound ? <Volume2 className="h-3.5 w-3.5" strokeWidth={1.5} /> : <VolumeX className="h-3.5 w-3.5" strokeWidth={1.5} />}
      {sound ? 'ON' : 'OFF'}
    </button>
  )
}

export function Nav() {
  const { t } = useI18n()
  const now = useNow(5000)
  const day = isVerdictDay(now)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const items = day ? nav.dayItems : nav.items

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[80] transition-all duration-500',
          scrolled || open ? 'bg-ink/85 backdrop-blur-md' : 'bg-transparent',
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-[1480px] items-center justify-between px-5 transition-all duration-500 md:px-8',
            open ? 'h-16 md:h-16' : 'h-16 md:h-[72px] lg:h-20',
          )}
        >
          <a href="#top" className="flex items-baseline gap-2">
            <span className="font-display text-xl font-extrabold tracking-[0.08em] text-bone">Liria ka emër</span>
            <span className="hidden font-mono text-[8px] uppercase tracking-[0.2em] text-fog sm:inline">// 2026</span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {items.map((it) => {
              const live = it.id === 'live'
              return (
                <a
                  key={it.id}
                  href={`#${it.id}`}
                  className={cn(
                    'group relative font-mono text-[10px] uppercase tracking-[0.28em] transition-colors',
                    live ? 'text-ember' : 'text-bone/75 hover:text-bone',
                  )}
                >
                  {t(it.label)}
                  {live && <span className="ml-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-ember transition-all duration-300 group-hover:w-full" />
                </a>
              )
            })}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <span className="font-mono text-[10px] tracking-[0.22em] text-fog">{nav.date}</span>
            <LangSwitch />
            <SoundToggle />
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bone"
              aria-label={open ? t(nav.close) : t(nav.menu)}
            >
              {open ? <X className="h-4 w-4" strokeWidth={1.5} /> : <Menu className="h-4 w-4" strokeWidth={1.5} />}
              {open ? t(nav.close) : t(nav.menu)}
            </button>
          </div>
        </div>

        <div className="h-px w-full bg-bone/[0.07]" />
      </header>

      {/* day-mode banner */}
      {day && (
        <div className="fixed inset-x-0 top-16 z-[75] border-b border-bone/5 bg-ink/70 px-5 py-2 backdrop-blur-sm md:px-8 lg:top-20">
          <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-4">
            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-ember">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
              {t(nav.liveTag)}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-fog">
              {hero.date} · {t(hero.time)}
            </span>
          </div>
        </div>
      )}

      {/* mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[85] flex flex-col bg-ink lg:hidden"
          >
            <div className="h-16" />
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
              {items.map((it, i) => {
                const live = it.id === 'live'
                return (
                  <motion.a
                    key={it.id}
                    href={`#${it.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      'flex items-center justify-between border-b border-bone/10 py-5 font-display text-4xl font-bold tracking-tight',
                      live ? 'text-ember' : 'text-bone',
                    )}
                  >
                    <span className="flex items-center gap-3">
                      {live && <span className="h-2 w-2 animate-pulse rounded-full bg-ember" />}
                      {t(it.label)}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-fog">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </motion.a>
                )
              })}
            </nav>
            <div className="flex items-center justify-between px-6 pb-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">{nav.date}</span>
              <div className="flex items-center gap-6">
                <LangSwitch />
                <SoundToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}