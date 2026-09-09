import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'sq' | 'en'

export interface Bilingual {
  sq: string
  en: string
}

export const L = (sq: string, en: string): Bilingual => ({ sq, en })

interface I18nCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (b: Bilingual) => string
}

const Ctx = createContext<I18nCtx | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('sq')
  const t = (b: Bilingual) => b[lang]
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>
}

export function useI18n() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useI18n outside provider')
  return ctx
}