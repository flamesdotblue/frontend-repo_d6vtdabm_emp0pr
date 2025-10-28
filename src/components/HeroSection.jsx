import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-24 overflow-hidden bg-slate-950 text-white"
    >
      {/* Full-width Spline cover background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/z3DRq211g66TkBow/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Decorative SVG gradient lines (non-blocking) */}
      <div className="pointer-events-none absolute inset-0">
        <svg
          className="absolute -top-28 left-1/2 -translate-x-1/2 opacity-[0.16]"
          width="1600"
          height="900"
          viewBox="0 0 1600 900"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <linearGradient id="g2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
            <linearGradient id="g3" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
          <path d="M-50 420 C 200 320, 400 540, 650 430 S 1100 320, 1650 420" stroke="url(#g1)" strokeWidth="2" />
          <path d="M-50 480 C 220 360, 420 600, 700 470 S 1080 360, 1650 460" stroke="url(#g2)" strokeWidth="1.5" opacity="0.8" />
          <path d="M-50 540 C 260 420, 460 660, 730 520 S 1060 400, 1650 520" stroke="url(#g3)" strokeWidth="1.2" opacity="0.65" />
          <g opacity="0.5">
            <path d="M-50 360 C 180 320, 380 380, 640 360 S 1120 320, 1650 350" stroke="url(#g2)" strokeWidth="0.8" />
            <path d="M-50 590 C 220 560, 420 620, 700 600 S 1120 560, 1650 590" stroke="url(#g1)" strokeWidth="0.8" />
          </g>
        </svg>
        <svg className="absolute top-0 right-0 opacity-[0.12]" width="900" height="900" viewBox="0 0 900 900" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="g4" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1={-100 + i * 80} y1={0} x2={300 + i * 80} y2={900} stroke="url(#g4)" strokeWidth="0.6" />
          ))}
        </svg>

        {/* Soft gradient overlay to blend Spline with site palette */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/30 via-transparent to-amber-500/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight"
          >
            Rooted in Data. Gamely Delivered.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 text-lg text-slate-200"
          >
            Hybrid AI growth engine for Marketing, Engagement, and Operations — powered by Voice AI, Avatar AI, and CX Automation.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a
              href="#platform"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-rose-500 to-amber-400 px-6 py-3 text-slate-900 font-semibold shadow-lg shadow-rose-500/20 hover:shadow-amber-400/30 transition"
            >
              Explore Platform
            </a>
            <a
              href="#ai-demos"
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-white hover:bg-white/5 transition"
            >
              Try Live AI Demos
            </a>
          </div>
        </div>

        {/* Accent stats / badges */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {[
            { k: 'Latency', v: '~200ms', sub: 'Voice AI responses' },
            { k: 'Uptime', v: '99.9%', sub: 'SLA-backed' },
            { k: 'Channels', v: '10+', sub: 'Omnichannel' },
            { k: 'Guardrails', v: 'HITL', sub: 'Human-in-the-loop' },
          ].map((b) => (
            <motion.div
              key={b.k}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xl"
            >
              <div className="text-slate-300 text-xs">{b.k}</div>
              <div className="text-2xl font-semibold">{b.v}</div>
              <div className="text-slate-400 text-xs">{b.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="mt-12 flex justify-center" aria-hidden="true">
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent relative">
          <span className="absolute -left-1 top-0 inline-block h-2 w-2 rounded-full bg-amber-400 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
