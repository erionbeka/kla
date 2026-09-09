import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

interface FilmCtx {
  intensity: number
  flashSeq: number
  flash: () => void
}

const Ctx = createContext<FilmCtx>({ intensity: 1, flashSeq: 0, flash: () => {} })

export function FilmProvider({ intensity = 1, children }: { intensity?: number; children: ReactNode }) {
  const [flashSeq, setFlashSeq] = useState(0)
  const flash = useCallback(() => setFlashSeq((s) => s + 1), [])
  return <Ctx.Provider value={{ intensity, flashSeq, flash }}>{children}</Ctx.Provider>
}

export function useFilm() {
  return useContext(Ctx)
}