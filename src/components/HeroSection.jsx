import { useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function HeroSection() {
  const containerRef = useRef(null)

  return (
    <section id="home" className="relative min-h-[92vh] pt-24 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white">
      {/* Decorative animated waves */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute -top-24 left-1/2 -translate-x-1/2 opacity-[0.12]" width="1400" height="600" viewBox="0 0 1400 600" fill="none" aria-hidden="true">
          <path d="M0 300 C 200 200, 400 400, 600 300 S 1000 200, 1400 300" stroke="url(#g1)" strokeWidth="2" />
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            Rooted in Data. Gamely Delivered.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 text-lg text-slate-300"
          >
            Hybrid AI growth engine for Marketing, Engagement, and Operations — powered by Voice AI, Avatar AI, and CX Automation.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#platform" className="inline-flex items-center rounded-full bg-gradient-to-r from-rose-500 to-amber-400 px-6 py-3 text-slate-900 font-semibold shadow-lg shadow-rose-500/20 hover:shadow-amber-400/30 transition">
              Explore Platform
            </a>
            <a href="#ai-demos" className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-white hover:bg-white/5 transition">
              Try Live AI Demos
            </a>
          </div>
        </div>
        <div ref={containerRef} className="relative h-[480px] md:h-[560px] lg:h-[640px] rounded-2xl overflow-hidden ring-1 ring-white/10 bg-slate-900/40 backdrop-blur-sm">
          {/* 3D Spline scene */}
          <Spline scene="https://prod.spline.design/AeAqaKLmGsS-FPBN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          {/* subtle gradient overlay not blocking interaction */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-950/20 via-transparent to-amber-500/10" />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="mt-10 flex justify-center" aria-hidden="true">
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent relative">
          <span className="absolute -left-1 top-0 inline-block h-2 w-2 rounded-full bg-amber-400 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
