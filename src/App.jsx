import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import PlatformScroller from './components/PlatformScroller'
import AIDemosPanel from './components/AIDemosPanel'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white">
      <Navigation />
      <main>
        <HeroSection />
        <PlatformScroller />
        <AIDemosPanel />
      </main>
      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Vriksha.ai — Rooted in Data. Gamely Delivered.</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-amber-300">Privacy</a>
            <a href="#terms" className="hover:text-amber-300">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
