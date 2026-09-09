import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { ambient } from './audio'

interface AppCtx {
  entered: boolean
  enter: () => void
  sound: boolean
  toggleSound: () => void
}

const Ctx = createContext<AppCtx | null>(null)

const SESSION_KEY = 'kater-entered-v1'

export function AppProvider({ children }: { children: ReactNode }) {
  const [entered, setEntered] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      return false
    }
  })
  const [sound, setSound] = useState(false)

  useEffect(() => {
    return () => {
      void ambient.stop()
    }
  }, [])

  const enter = () => {
    setEntered(true)
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* noop */
    }
  }

  const toggleSound = () => {
    setSound((s) => {
      const next = !s
      if (next) void ambient.start()
      else void ambient.stop()
      return next
    })
  }

  return <Ctx.Provider value={{ entered, enter, sound, toggleSound }}>{children}</Ctx.Provider>
}

export function useApp() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp outside provider')
  return ctx
}