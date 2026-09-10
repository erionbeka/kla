import { lazy, Suspense } from 'react'
import { MotionConfig } from 'motion/react'
import { useApp, AppProvider } from './lib/app'
import { I18nProvider } from './lib/i18n'
import { FilmProvider } from './lib/film'
import { FilmOverlay } from './components/cine/FilmOverlay'
import { SnakeRail } from './components/SnakeRail'
import { Intro } from './components/Intro'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Reel } from './components/Reel'
import { Footer } from './components/Footer'

const History = lazy(() => import('./components/History').then((m) => ({ default: m.History })))
const Memorial = lazy(() => import('./components/Memorial').then((m) => ({ default: m.Memorial })))
const Years27 = lazy(() => import('./components/Years').then((m) => ({ default: m.Years27 })))
const Four = lazy(() => import('./components/Four').then((m) => ({ default: m.Four })))
const Hague = lazy(() => import('./components/Hague').then((m) => ({ default: m.Hague })))
const Waiting = lazy(() => import('./components/Waiting').then((m) => ({ default: m.Waiting })))
const Verdict = lazy(() => import('./components/Verdict').then((m) => ({ default: m.Verdict })))
const Arkiiv = lazy(() => import('./components/Archive').then((m) => ({ default: m.Arkiiv })))
const Closing = lazy(() => import('./components/Closing').then((m) => ({ default: m.Closing })))

function Lazy({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center bg-coal/60">
          <span className="h-px w-24 bg-bone/20" />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

function Shell() {
  const { entered, enter } = useApp()

  return (
    <>
      {!entered && <Intro onEnter={enter} />}

      <div className="grain min-h-screen">
        <div className="relative bg-ink">
          {entered && <Nav />}
          <main>
            <Hero />
            <Lazy>
              <History />
            </Lazy>
            <Reel label="KADRE NGA VITET 1998–1999" />
            <Lazy>
              <Memorial />
            </Lazy>
            <Lazy>
              <Years27 />
            </Lazy>
            <Lazy>
              <Four />
              <Hague />
              <Waiting />
              <Verdict />
              <Arkiiv />
            </Lazy>
            <Reel dense label="KOSOVË, PARA VENDIMIT" />
            <Lazy>
              <Closing />
            </Lazy>
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="never">
      <I18nProvider>
        <AppProvider>
          <FilmProvider>
            <Shell />
            <SnakeRail />
            <FilmOverlay />
          </FilmProvider>
        </AppProvider>
      </I18nProvider>
    </MotionConfig>
  )
}