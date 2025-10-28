import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const PANELS = [
  { key: 'A', title: 'AI Orchestration', desc: 'Drag-and-drop pipelines. Cross-functional agents that chain research, creation, testing, and scale.', accent: 'from-rose-500/80 to-amber-400/80' },
  { key: 'B', title: 'Marketing Engine', desc: 'Research → Create → Test → Scale. Multi-channel experimentation with smart guardrails.', accent: 'from-amber-400/80 to-rose-500/80' },
  { key: 'C', title: 'Engagement Engine', desc: 'Personalized journeys and gamified loops that drive retention and LTV.', accent: 'from-emerald-400/70 to-teal-400/70' },
  { key: 'D', title: 'Operations Engine', desc: 'Voice AI, Avatar AI, and CX Automation that resolve and escalate with care.', accent: 'from-sky-400/70 to-violet-400/70' },
  { key: 'E', title: 'Governance & Insights', desc: 'Human-in-the-loop reviews, neutral data fabric, and real-time analytics.', accent: 'from-fuchsia-400/70 to-rose-400/70' },
]

export default function PlatformScroller() {
  const ref = useRef(null)

  // Keyboard navigation: left/right arrows
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handler = (e) => {
      if (e.key === 'ArrowRight') el.scrollBy({ left: el.clientWidth * 0.9, behavior: 'smooth' })
      if (e.key === 'ArrowLeft') el.scrollBy({ left: -el.clientWidth * 0.9, behavior: 'smooth' })
    }
    el.addEventListener('keydown', handler)
    return () => el.removeEventListener('keydown', handler)
  }, [])

  return (
    <section id="platform" className="relative py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold">Platform</h2>
            <p className="mt-3 text-slate-300 max-w-3xl">Lego-style modular growth services. Cross-functional AI agent orchestration. Real-time data fabric integration. Human-in-the-loop governance.</p>
          </div>
          <p className="hidden md:block text-xs text-slate-400">Tip: Use ← → to navigate</p>
        </div>
      </div>

      <div
        ref={ref}
        role="group"
        tabIndex={0}
        aria-label="Horizontal platform panels"
        className="snap-x snap-mandatory overflow-x-auto overflow-y-hidden whitespace-nowrap grid grid-flow-col auto-cols-[88%] md:auto-cols-[68%] lg:auto-cols-[48%] gap-8 px-4 sm:px-6 lg:px-8"
      >
        {PANELS.map((p) => (
          <motion.div
            key={p.key}
            whileHover={{ y: -6 }}
            className="snap-center relative h-[460px] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-[0.10]`} aria-hidden="true" />
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              {/* structural grid */}
              <svg className="w-full h-full opacity-15" viewBox="0 0 600 400">
                {Array.from({ length: 16 }).map((_, i) => (
                  <rect key={i} x={(i%8)*75} y={Math.floor(i/8)*200} width="60" height="60" rx="8" fill="none" stroke="white" strokeOpacity="0.2" />
                ))}
              </svg>
            </div>
            <div className="relative z-10 p-7 flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-slate-300 max-w-md leading-relaxed">{p.desc}</p>
                <div className="mt-7 h-44 rounded-2xl bg-slate-950/40 border border-white/10 flex items-center justify-center text-slate-300">
                  <span className="text-sm">Interactive builder placeholder</span>
                </div>
              </div>
              <div className="pt-5 flex items-center justify-between">
                <div className="text-xs text-slate-400">Gov. + Insights • Real-time</div>
                <button className="inline-flex items-center rounded-full bg-white/10 hover:bg-white/15 border border-white/20 px-4 py-2 text-sm">Expand</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="sr-only">Use left and right arrow keys to navigate panels.</p>
    </section>
  )
}
