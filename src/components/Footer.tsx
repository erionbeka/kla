import { ArrowUp, Volume2, VolumeX } from 'lucide-react'
import { footer, nav } from '../lib/content'
import { useI18n } from '../lib/i18n'
import { useApp } from '../lib/app'
import { cn } from '../lib/util'

function SoundToggleRow() {
  const { sound, toggleSound } = useApp()
  const { t } = useI18n()
  return (
    <button
      onClick={toggleSound}
      className="flex items-center gap-3 border border-bone/15 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.25em] text-fog transition-colors hover:border-ember hover:text-ember"
      aria-pressed={sound}
    >
      {sound ? <Volume2 className="h-3.5 w-3.5" strokeWidth={1.5} /> : <VolumeX className="h-3.5 w-3.5" strokeWidth={1.5} />}
      {t(footer.sound)} {sound ? t(footer.on) : t(footer.off)}
    </button>
  )
}

export function Footer() {
  const { t, lang, setLang } = useI18n()

  return (
    <footer className="relative border-t border-bone/10 bg-black">
      <div className="mx-auto max-w-[1480px] px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
          <div>
            <p className="font-display text-3xl font-extrabold tracking-[0.12em] text-bone">Liria ka emër</p>
            <p className="mt-3 max-w-xs text-sm text-fog">{t(footer.disclaimer2)}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <SoundToggleRow />
            <div className="flex items-center gap-3 border border-bone/15 px-4 py-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-mist">{t(footer.langLabel)}</span>
              <button
                onClick={() => setLang('sq')}
                className={cn('font-mono text-[9px] uppercase tracking-[0.25em]', lang === 'sq' ? 'text-ember' : 'text-fog hover:text-bone')}
              >
                SQ
              </button>
              <span className="h-3 w-px bg-bone/20" />
              <button
                onClick={() => setLang('en')}
                className={cn('font-mono text-[9px] uppercase tracking-[0.25em]', lang === 'en' ? 'text-ember' : 'text-fog hover:text-bone')}
              >
                EN
              </button>
            </div>
            <a
              href="#top"
              className="flex items-center gap-3 border border-bone/15 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.25em] text-fog transition-colors hover:border-ember hover:text-ember"
            >
              {t(footer.backTop)}
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-mist md:text-sm">{t(footer.disclaimer)}</p>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-bone/10 pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-mist">{t(footer.built)}</p>
          <div className="flex flex-wrap items-center gap-6">
            {nav.items.map((it) => (
              <a key={it.id} href={`#${it.id}`} className="font-mono text-[9px] uppercase tracking-[0.25em] text-fog transition-colors hover:text-bone">
                {t(it.label)}
              </a>
            ))}
            <a
              href="https://www.scp-ks.org"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[9px] uppercase tracking-[0.25em] text-fog transition-colors hover:text-ember"
            >
              spk-ks.org →
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}