import { useApp, AppProvider } from './lib/app'
import { I18nProvider } from './lib/i18n'
import { FilmProvider } from './lib/film'
import { FilmOverlay } from './components/cine/FilmOverlay'
import { Intro } from './components/Intro'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { History } from './components/History'
import { Memorial } from './components/Memorial'
import { Rrugetimi } from './components/Timeline'
import { Years27 } from './components/Years'
import { Four } from './components/Four'
import { Hague } from './components/Hague'
import { Waiting } from './components/Waiting'
import { Verdict } from './components/Verdict'
import { Closing } from './components/Closing'
import { Arkiiv } from './components/Archive'
import { Footer } from './components/Footer'

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
            <History />
            <Memorial />
            <Rrugetimi />
            <Years27 />
            <Four />
            <Hague />
            <Waiting />
            <Verdict />
            <Arkiiv />
            <Closing />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <AppProvider>
        <FilmProvider>
          <Shell />
          <FilmOverlay />
        </FilmProvider>
      </AppProvider>
    </I18nProvider>
  )
}