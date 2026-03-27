import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const COUNT = 140

function rand(min, max) { return min + Math.random() * (max - min) }

function makeParticle(cx, cy, burst) {
  const angle  = Math.random() * Math.PI * 2
  const speed  = burst ? rand(3, 9) : rand(0.06, 0.22)
  return {
    x:     burst ? cx + rand(-60, 60) : rand(0, window.innerWidth),
    y:     burst ? cy + rand(-60, 60) : rand(0, window.innerHeight),
    r:     rand(0.5, burst ? 2.5 : 1.8),
    vx:    Math.cos(angle) * speed,
    vy:    Math.sin(angle) * (burst ? speed : rand(-0.18, -0.04)),
    alpha: rand(0.15, burst ? 0.9 : 0.55),
    color: Math.random() < 0.28 ? 'orange' : 'white',
    decay: burst ? rand(0.94, 0.97) : 1,
  }
}

export default function Particles({ active }) {
  const canvasRef = useRef(null)
  const stateRef  = useRef({ particles: [], raf: null, w: 0, h: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const s      = stateRef.current

    const resize = () => {
      canvas.width = s.w = window.innerWidth
      canvas.height = s.h = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const s      = stateRef.current

    const cx = s.w / 2, cy = s.h / 2

    // Half burst from center, half scattered
    s.particles = [
      ...Array.from({ length: COUNT * 0.55 | 0 }, () => makeParticle(cx, cy, true)),
      ...Array.from({ length: COUNT * 0.45 | 0 }, () => makeParticle(cx, cy, false)),
    ]

    gsap.to(canvas, { opacity: 1, duration: 0.6, ease: 'power2.out' })

    const draw = () => {
      ctx.clearRect(0, 0, s.w, s.h)

      s.particles.forEach(p => {
        const fill = p.color === 'orange'
          ? `rgba(255,69,0,${p.alpha})`
          : `rgba(240,240,238,${p.alpha})`

        // glow for larger particles
        if (p.r > 1.5) {
          ctx.shadowBlur  = 8
          ctx.shadowColor = p.color === 'orange' ? 'rgba(255,69,0,0.6)' : 'rgba(255,255,255,0.3)'
        } else {
          ctx.shadowBlur = 0
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = fill
        ctx.fill()

        // velocity decay (burst settling)
        if (p.decay < 1) {
          p.vx *= p.decay
          p.vy *= p.decay
          if (Math.abs(p.vx) < 0.12) p.vx = rand(-0.08, 0.08)
          if (Math.abs(p.vy) < 0.12) { p.vy = rand(-0.18, -0.05); p.decay = 1 }
        }

        p.x += p.vx
        p.y += p.vy

        // wrap
        if (p.y < -6)      p.y = s.h + 6
        if (p.x < -6)      p.x = s.w + 6
        if (p.x > s.w + 6) p.x = -6
        if (p.y > s.h + 6) p.y = -6
      })

      s.raf = requestAnimationFrame(draw)
    }
    draw()

    return () => cancelAnimationFrame(s.raf)
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  )
}
