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
    <section id="platform" className="relative py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold">Platform</h2>
        <p className="mt-2 text-slate-300">Lego-style modular growth services. Cross-functional AI agent orchestration. Real-time data fabric integration. Human-in-the-loop governance.</p>
      </div>

      <div
        ref={ref}
        role="group"
        tabIndex={0}
        aria-label="Horizontal platform panels"
        className="snap-x snap-mandatory overflow-x-auto overflow-y-hidden whitespace-nowrap grid grid-flow-col auto-cols-[90%] md:auto-cols-[70%] lg:auto-cols-[50%] gap-6 px-4 sm:px-6 lg:px-8"
      >
        {PANELS.map((p, idx) => (
          <motion.div
            key={p.key}
            whileHover={{ scale: 0.99 }}
            className="snap-center relative h-[420px] rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-[0.10]`} aria-hidden="true" />
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              {/* simple nodes animation */}
              <svg className="w-full h-full opacity-20" viewBox="0 0 600 400">
                {Array.from({ length: 18 }).map((_, i) => (
                  <circle key={i} cx={(i*33)%600} cy={(i*53)%400} r="2" fill="white" className="animate-pulse" />
                ))}
              </svg>
            </div>
            <div className="relative z-10 p-6 flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-slate-300 max-w-md">{p.desc}</p>
                <div className="mt-6 h-40 rounded-xl bg-slate-950/40 border border-white/10 flex items-center justify-center text-slate-300">
                  <span className="text-sm">Interactive builder placeholder</span>
                </div>
              </div>
              <div className="pt-4">
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
