import { useEffect, useRef } from 'react'

// AuroraFlow: high-performance gradient flow lines with parallax and glow
// Replaces the previous "data tree" with elegant multi-layer ribbons
export default function DataTreeArt({ accentA = '#fb7185', accentB = '#fbbf24' }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = canvas.clientWidth
    let h = canvas.clientHeight

    const setSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }
    setSize()

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }

    window.addEventListener('resize', setSize)
    canvas.addEventListener('mousemove', onMove)

    // Parameters for flow ribbons
    const LAYERS = 3 // depth layers for parallax
    const STRANDS_PER_LAYER = 26
    const POINTS = 36
    let t = 0

    function drawBackground() {
      // subtle dark base + diagonal sheen lines
      ctx.clearRect(0, 0, w, h)
      ctx.save()
      const grad = ctx.createLinearGradient(0, 0, w, h)
      grad.addColorStop(0, 'rgba(2,6,23,0.6)')
      grad.addColorStop(1, 'rgba(2,6,23,0.25)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // faint diagonal guide lines
      ctx.globalAlpha = 0.07
      ctx.strokeStyle = '#94a3b8'
      ctx.lineWidth = 1
      const step = 28
      for (let x = -h; x < w + h; x += step) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x + h, h)
        ctx.stroke()
      }
      ctx.restore()
    }

    function ribbonColor(layerIdx) {
      // alternate accentA/accentB with slight hue drift
      const grad = ctx.createLinearGradient(0, 0, w, 0)
      const a = accentA
      const b = accentB
      const mid = `rgba(255,255,255,${0.12 + layerIdx * 0.04})`
      grad.addColorStop(0, a)
      grad.addColorStop(0.5, mid)
      grad.addColorStop(1, b)
      return grad
    }

    function render() {
      t += 0.015
      drawBackground()

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // composite for glow
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'

      for (let L = 0; L < LAYERS; L++) {
        const depth = L / (LAYERS - 1 || 1)
        const amp = 28 + L * 10
        const speed = 0.6 + L * 0.15
        const parallaxX = mx * (8 + L * 6)
        const parallaxY = my * (6 + L * 4)
        const stroke = 1.3 + (LAYERS - L) * 0.6

        for (let s = 0; s < STRANDS_PER_LAYER; s++) {
          const phase = (s / STRANDS_PER_LAYER) * Math.PI * 2 + t * speed
          const path = []
          for (let i = 0; i < POINTS; i++) {
            const px = (i / (POINTS - 1)) * w
            const baseY = h * 0.55 + Math.sin(phase + i * 0.3) * amp
            const wave2 = Math.cos(phase * 0.7 + i * 0.55) * amp * 0.4
            const y = baseY + wave2 + parallaxY * (0.4 + depth * 0.6)
            path.push({ x: px + parallaxX * (0.2 + depth * 0.5), y })
          }

          // Draw smooth ribbon using quadratic curves
          ctx.lineWidth = stroke
          ctx.strokeStyle = ribbonColor(L)
          ctx.shadowColor = L % 2 === 0 ? accentA : accentB
          ctx.shadowBlur = 12 + 10 * (1 - depth)
          ctx.beginPath()
          ctx.moveTo(path[0].x, path[0].y)
          for (let i = 1; i < path.length - 1; i++) {
            const xc = (path[i].x + path[i + 1].x) / 2
            const yc = (path[i].y + path[i + 1].y) / 2
            ctx.quadraticCurveTo(path[i].x, path[i].y, xc, yc)
          }
          ctx.stroke()
        }
      }

      ctx.restore()

      // sparkles
      ctx.save()
      ctx.globalAlpha = 0.35
      for (let i = 0; i < 140; i++) {
        const x = ((i * 97.3) % w) + (Math.sin(t * 0.6 + i) * 8)
        const y = ((i * 53.7) % h) + (Math.cos(t * 0.8 + i) * 6)
        const r = (Math.sin(t + i) * 0.5 + 0.5) * 1.2 + 0.3
        ctx.fillStyle = i % 3 === 0 ? accentA : accentB
        ctx.globalCompositeOperation = 'lighter'
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', setSize)
      canvas.removeEventListener('mousemove', onMove)
    }
  }, [accentA, accentB])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      role="img"
      aria-label="Animated gradient flow ribbons"
    />
  )
}
