import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${
      scrolled ? 'backdrop-blur-md bg-slate-950/60 shadow-[0_2px_24px_rgba(0,0,0,0.35)]' : 'bg-transparent'
    }`}
    aria-label="Primary">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" aria-label="Main navigation">
        <a href="#home" className="flex items-center gap-2 text-white font-semibold tracking-wide">
          <span className="inline-block w-2 h-6 bg-gradient-to-b from-amber-300 to-rose-400 rounded-sm" aria-hidden="true" />
          <span className="text-lg">Vriksha.ai</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm">
          {['Home','Platform','Use Cases','AI Demos','About','Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g,'-')}`} className="text-slate-200 hover:text-amber-300 transition-colors">
              {item}
            </a>
          ))}
          <a href="#contact" className="ml-2 inline-flex items-center rounded-full bg-gradient-to-r from-rose-500 to-amber-400 px-4 py-2 text-slate-900 font-semibold shadow-lg shadow-rose-500/20 hover:shadow-amber-400/30 transition">Book Demo</a>
        </div>
        <button aria-label="Open menu" className="md:hidden text-white" onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </nav>
      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur" onClick={() => setOpen(false)} />
        <div role="dialog" aria-modal="true" aria-label="Mobile Menu" className={`absolute top-0 right-0 h-full w-80 max-w-[80%] bg-slate-900/95 border-l border-white/10 p-6 transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between mb-6">
            <span className="text-white font-semibold">Vriksha.ai</span>
            <button aria-label="Close menu" className="text-white" onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>
          <ul className="space-y-4">
            {['Home','Platform','Use Cases','AI Demos','About','Contact'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(/\s+/g,'-')}`} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-slate-200 hover:bg-white/5">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setOpen(false)} className="mt-6 inline-flex items-center rounded-full bg-gradient-to-r from-rose-500 to-amber-400 px-4 py-2 text-slate-900 font-semibold shadow-lg shadow-rose-500/20 hover:shadow-amber-400/30 transition">Book Demo</a>
        </div>
      </div>
    </header>
  )
}
