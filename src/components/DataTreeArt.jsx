import { useEffect, useRef } from 'react'

// Procedural "data tree" canvas art: roots to branches with glowing particles
export default function DataTreeArt({ accentA = '#fb7185', accentB = '#f59e0b' }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = canvas.clientWidth
    let h = canvas.clientHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = (e.clientX - rect.left) / rect.width - 0.5
      mouseRef.current.y = (e.clientY - rect.top) / rect.height - 0.5
    }
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMove)

    const branches = []
    const particles = []
    const rootY = h - 10
    const baseX = w * 0.5
    const rand = (a, b) => a + Math.random() * (b - a)

    function spawn() {
      branches.length = 0
      particles.length = 0
      for (let i = 0; i < 9; i++) {
        branches.push({
          x: baseX + (i - 4) * 10,
          y: rootY,
          vx: rand(-0.2, 0.2),
          vy: rand(-1.8, -1.2),
          life: rand(120, 180),
          width: rand(2, 3.5),
        })
      }
    }

    function step() {
      ctx.clearRect(0, 0, w, h)

      // background subtle grid
      ctx.save()
      ctx.globalAlpha = 0.08
      ctx.strokeStyle = '#94a3b8'
      ctx.lineWidth = 1
      const grid = 32
      for (let gx = 0; gx < w; gx += grid) {
        ctx.beginPath()
        ctx.moveTo(gx, 0)
        ctx.lineTo(gx, h)
        ctx.stroke()
      }
      for (let gy = 0; gy < h; gy += grid) {
        ctx.beginPath()
        ctx.moveTo(0, gy)
        ctx.lineTo(w, gy)
        ctx.stroke()
      }
      ctx.restore()

      // draw branches
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      branches.forEach((b) => {
        ctx.save()
        const grad = ctx.createLinearGradient(b.x, b.y, b.x, b.y - 120)
        grad.addColorStop(0, accentA)
        grad.addColorStop(1, accentB)
        ctx.strokeStyle = grad
        ctx.lineWidth = b.width
        ctx.beginPath()
        ctx.moveTo(b.x, b.y)
        const cp1x = b.x + Math.sin((b.life % 60) / 60 * Math.PI * 2) * 30 + mx * 40
        const cp1y = b.y - 60 + my * 20
        const endx = b.x + b.vx * 30
        const endy = b.y + b.vy * 30
        ctx.bezierCurveTo(cp1x, cp1y, endx, endy - 30, endx, endy)
        ctx.stroke()
        ctx.restore()

        // advance branch
        b.x = endx
        b.y = endy
        b.vx += rand(-0.15, 0.15) + mx * 0.2
        b.vy += rand(-0.05, -0.01)
        b.life -= 1

        // spawn sub-branches / particles
        if (Math.random() < 0.12) {
          branches.push({ x: b.x, y: b.y, vx: b.vx + rand(-0.4, 0.4), vy: b.vy + rand(-0.2, 0), life: rand(40, 90), width: Math.max(1, b.width - 0.4) })
        }
        if (Math.random() < 0.3) {
          particles.push({ x: b.x, y: b.y, r: rand(1, 2.5), a: 1, hue: Math.random() < 0.5 ? accentA : accentB })
        }
      })

      // recycle
      for (let i = branches.length - 1; i >= 0; i--) {
        if (branches[i].life <= 0 || branches[i].y < 40) branches.splice(i, 1)
      }
      if (branches.length < 60) {
        branches.push({ x: baseX + rand(-60, 60), y: rootY, vx: rand(-0.3, 0.3), vy: rand(-1.6, -1.1), life: rand(80, 160), width: rand(1.2, 3) })
      }

      // particles glow
      particles.forEach((p) => {
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        ctx.globalAlpha = p.a * 0.8
        ctx.fillStyle = p.hue
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        p.y -= 0.4
        p.x += Math.sin(p.y * 0.05) * 0.6
        p.a -= 0.02
      })
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].a <= 0) particles.splice(i, 1)
      }

      rafRef.current = requestAnimationFrame(step)
    }

    spawn()
    rafRef.current = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
    }
  }, [accentA, accentB])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      role="img"
      aria-label="Animated data tree visualization"
    />
  )
}
