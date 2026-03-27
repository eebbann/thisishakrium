import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import logoImg from '../assets/logo.png'

export default function Preloader({ onComplete }) {
  const wrapRef    = useRef(null)
  const logoRef    = useRef(null)
  const tagRef     = useRef(null)
  const barRef     = useRef(null)
  const counterRef = useRef(null)
  const dotRef     = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(wrapRef.current, {
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut',
          onComplete,
        })
      },
    })

    gsap.set([logoRef.current, tagRef.current], { opacity: 0, y: 12 })
    gsap.set(barRef.current,     { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(counterRef.current, { opacity: 0 })
    gsap.set(dotRef.current,     { opacity: 0 })

    tl
      .to(dotRef.current,     { opacity: 1, duration: 0.3 })
      .to(logoRef.current,    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.1')
      .to(tagRef.current,     { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to(counterRef.current, { opacity: 1, duration: 0.3 }, '-=0.2')
      .to(barRef.current,     { scaleX: 1, duration: 1.9, ease: 'power2.inOut' }, '-=0.1')
      .to(counterRef.current, {
          innerText: 100,
          snap: { innerText: 1 },
          suffix: '%',
          duration: 1.9,
          ease: 'power2.inOut',
        }, '<')
      .to([logoRef.current, tagRef.current], {
          opacity: 0, y: -10,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.in',
        }, '+=0.2')
  }, [onComplete])

  return (
    <div ref={wrapRef} style={s.wrap}>
      {/* Scanline overlay */}
      <div style={s.scanlines} />

      <div style={s.center}>
        <div style={s.dotRow}>
          <span ref={dotRef} style={s.dot} />
        </div>
        <h1 ref={logoRef} style={s.logo}>THIS<span style={s.orange}>IS</span>HAKRIUM</h1>
        <p  ref={tagRef}  style={s.tag}>// INITIALISING PARENT PROTOCOL</p>
      </div>

      <div style={s.bottom}>
        <div style={s.track}>
          <div ref={barRef} style={s.bar} />
        </div>
        <span ref={counterRef} style={s.counter}>0%</span>
      </div>
    </div>
  )
}

const s = {
  wrap: {
    position: 'fixed', inset: 0,
    background: '#0a0a0a',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    overflow: 'hidden',
  },
  scanlines: {
    position: 'absolute', inset: 0,
    background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.18) 2px,rgba(0,0,0,0.18) 4px)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  center: {
    position: 'relative', zIndex: 2,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 12,
  },
  dotRow: {
    display: 'flex', gap: 6, marginBottom: 8,
  },
  dot: {
    display: 'block',
    width: 6, height: 6,
    borderRadius: '50%',
    background: '#ff4500',
    animation: 'pulse-dot 1.2s ease-in-out infinite',
  },
  logo: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
    letterSpacing: '0.12em',
    color: '#f0f0ee',
    textTransform: 'uppercase',
  },
  orange: { color: '#ff4500' },
  tag: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    letterSpacing: '0.18em',
    color: 'rgba(240,240,238,0.4)',
    textTransform: 'uppercase',
  },
  bottom: {
    position: 'absolute', bottom: 44,
    left: 48, right: 48,
    display: 'flex', alignItems: 'center', gap: 20,
    zIndex: 2,
  },
  track: {
    flex: 1, height: 1,
    background: 'rgba(240,240,238,0.1)',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    background: '#ff4500',
    boxShadow: '0 0 8px rgba(255,69,0,0.6)',
  },
  counter: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.7rem',
    color: 'rgba(240,240,238,0.45)',
    minWidth: 38, textAlign: 'right',
  },
}
