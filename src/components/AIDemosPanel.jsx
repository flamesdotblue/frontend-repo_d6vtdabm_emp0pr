import { useState, useEffect, useMemo } from 'react'
import { Play, Mic, User, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function Waveform({ active }) {
  const bars = useMemo(() => Array.from({ length: 28 }).map((_, i) => i), [])
  return (
    <div className="flex items-end gap-[6px] h-36">
      {bars.map((i) => (
        <div
          key={i}
          className={`w-[6px] rounded-sm bg-gradient-to-b from-amber-300 to-rose-400 ${active ? 'animate-[beat_1.2s_ease-in-out_infinite]' : ''}`}
          style={{ height: active ? `${8 + (i % 10) * 10}px` : `${10 + (i % 5) * 6}px`, animationDelay: `${(i % 7) * 0.08}s` }}
        />
      ))}
      <style>{`@keyframes beat {0%,100%{transform:scaleY(0.7)}50%{transform:scaleY(1.8)}}`}</style>
    </div>
  )
}

function AvatarDemo({ text }) {
  return (
    <div className="relative h-48 w-48 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.35),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(244,63,94,0.35),transparent_35%)]" />
      </div>
      <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="relative">
        <div className="h-24 w-24 rounded-full bg-slate-700/60 border border-white/10" />
        <motion.div animate={{ scaleX: [1, 0.6, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} className="absolute left-1/2 -translate-x-1/2 bottom-6 h-2 w-12 rounded-full bg-rose-400/80" />
        <div className="absolute left-1/2 -translate-x-1/2 top-8 flex gap-4">
          <motion.span animate={{ scaleY: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.1 }} className="h-2 w-2 rounded-full bg-amber-300" />
          <motion.span animate={{ scaleY: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.3 }} className="h-2 w-2 rounded-full bg-amber-300" />
        </div>
      </motion.div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-56 text-center text-slate-300 text-sm line-clamp-2">{text}</div>
    </div>
  )
}

function CXFlow() {
  const items = [
    { from: 'User', text: 'Need policy renewal assistance.' },
    { from: 'Agent', text: 'Sure, verifying your details.' },
    { from: 'System', text: 'Sent OTP to your phone. Sentiment: Neutral' },
    { from: 'Agent', text: 'Renewed. Would you like a discount plan?' },
  ]
  return (
    <div className="space-y-3 max-h-48 overflow-auto pr-2">
      {items.map((m, idx) => (
        <div key={idx} className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${m.from === 'User' ? 'bg-white/10 ml-auto text-white' : 'bg-white/5 text-slate-200'}`}> 
          <div className="text-[10px] uppercase tracking-wide opacity-70 mb-0.5">{m.from}</div>
          <div>{m.text}</div>
        </div>
      ))}
      <div className="pt-2">
        <button className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs hover:bg-white/10"><MessageSquare size={14}/> Escalate</button>
      </div>
    </div>
  )
}

export default function AIDemosPanel() {
  const [active, setActive] = useState('voice')
  const [mic, setMic] = useState(false)
  const [avatarText, setAvatarText] = useState('Hello! I am your friendly hybrid AI avatar. How can I help today?')

  useEffect(() => {
    let t
    if (mic) {
      t = setTimeout(() => setMic(false), 3500)
    }
    return () => clearTimeout(t)
  }, [mic])

  return (
    <section id="ai-demos" className="relative py-20 bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left selector */}
          <div className="lg:w-1/3">
            <h3 className="text-2xl font-semibold">AI Demos</h3>
            <p className="mt-2 text-slate-300">Interact with Voice AI, Avatar AI, and CX Automation.</p>
            <div className="mt-6 space-y-3">
              <button onClick={() => setActive('voice')} className={`w-full inline-flex items-center gap-2 rounded-xl px-4 py-3 border ${active==='voice' ? 'border-amber-400 bg-white/5' : 'border-white/10 hover:bg-white/5'}`}><Mic size={18}/> Voice AI</button>
              <button onClick={() => setActive('avatar')} className={`w-full inline-flex items-center gap-2 rounded-xl px-4 py-3 border ${active==='avatar' ? 'border-amber-400 bg-white/5' : 'border-white/10 hover:bg-white/5'}`}><User size={18}/> Avatar AI</button>
              <button onClick={() => setActive('cx')} className={`w-full inline-flex items-center gap-2 rounded-xl px-4 py-3 border ${active==='cx' ? 'border-amber-400 bg-white/5' : 'border-white/10 hover:bg-white/5'}`}><MessageSquare size={18}/> CX Automation</button>
            </div>
          </div>

          {/* Right canvas */}
          <div className="lg:flex-1 rounded-2xl bg-white/5 border border-white/10 p-6 min-h-[360px] backdrop-blur-md shadow-xl">
            <AnimatePresence mode="wait">
              {active === 'voice' && (
                <motion.div key="v" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col items-center justify-center text-center">
                  <Waveform active={mic} />
                  <div className="mt-6 flex gap-3">
                    <button onClick={() => setMic(true)} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-amber-400 px-4 py-2 text-slate-900 font-semibold shadow-lg"><Mic size={16}/> Simulate Mic</button>
                    <button className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white"><Play size={16}/> Play Sample</button>
                  </div>
                  <p className="mt-4 text-slate-300 text-sm">Waveform animates to simulate captured voice. Audio disabled by default.</p>
                </motion.div>
              )}
              {active === 'avatar' && (
                <motion.div key="a" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full grid place-items-center">
                  <div className="flex flex-col items-center gap-4">
                    <AvatarDemo text={avatarText} />
                    <input value={avatarText} onChange={(e)=>setAvatarText(e.target.value)} className="w-[min(520px,90vw)] rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400/40" placeholder="Type what the avatar should say" />
                  </div>
                </motion.div>
              )}
              {active === 'cx' && (
                <motion.div key="c" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full">
                  <div className="flex flex-col md:flex-row gap-6 h-full">
                    <div className="md:w-2/3 rounded-xl bg-slate-950/40 border border-white/10 p-4">
                      <CXFlow />
                    </div>
                    <div className="md:flex-1 rounded-xl bg-slate-950/40 border border-white/10 p-4">
                      <h4 className="text-sm font-semibold text-slate-200">Pipeline</h4>
                      <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                        {['Detect Intent','Verify','Fetch Policy','Offer Plan','Close / Escalate'].map((s) => (
                          <div key={s} className="rounded-lg bg-white/5 border border-white/10 px-2 py-2">{s}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
