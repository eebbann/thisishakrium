import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import heroImg from '../assets/hero.png'

const PLATFORMS = [
  { name: 'RAGE',   status: 'LIVE',    active: true  },
  { name: 'NEXUS',  status: 'Q3 2026', active: false },
  { name: 'VAULT',  status: 'Q4 2026', active: false },
  { name: 'GRID',   status: 'TBA',     active: false },
]

export default function Scene({ play }) {
  const wrapRef   = useRef(null)
  const imgRef    = useRef(null)
  const badgeRef  = useRef(null)
  const tagRef    = useRef(null)
  const h1Ref     = useRef(null)
  const visionRef = useRef(null)
  const ecosRef   = useRef(null)
  const ctaRef    = useRef(null)
  const played    = useRef(false)

  useEffect(() => {
    if (!play || played.current) return
    played.current = true

    const lines = h1Ref.current.querySelectorAll('.line-inner')

    gsap.set(wrapRef.current, { opacity: 1 })
    gsap.set(lines,           { yPercent: 115, skewY: 3 })
    gsap.set([badgeRef.current, tagRef.current, visionRef.current,
              ecosRef.current, ctaRef.current], { opacity: 0, y: 20 })
    gsap.set(imgRef.current,  { scale: 1.1, opacity: 0 })

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl
      .to(imgRef.current,    { scale: 1, opacity: 1, duration: 1.8 })
      .to(badgeRef.current,  { opacity: 1, y: 0, duration: 0.5 },                  '-=1.4')
      .to(tagRef.current,    { opacity: 1, y: 0, duration: 0.5 },                  '-=0.2')
      .to(lines,             { yPercent: 0, skewY: 0, stagger: 0.1, duration: 1 }, '-=0.3')
      .to(visionRef.current, { opacity: 1, y: 0, duration: 0.7 },                  '-=0.3')
      .to(ecosRef.current,   { opacity: 1, y: 0, duration: 0.6 },                  '-=0.4')
      .to(ctaRef.current,    { opacity: 1, y: 0, duration: 0.6 },                  '-=0.3')
  }, [play])

  return (
    <div ref={wrapRef} style={{ ...s.wrap, opacity: 0 }}>

      {/* Scanlines */}
      <div style={s.scanlines} />

      {/* Hero image — right side, orange-tinted vignette */}
      <img ref={imgRef} src={heroImg} alt="" style={s.heroImg} />
      <div style={s.vignette} />

      {/* ── Content ── */}
      <div style={s.content}>

        {/* Coming soon badge */}
        <div ref={badgeRef} style={s.badge}>
          <span style={s.badgeDot} />
          <span style={s.badgeText}>COMING SOON</span>
        </div>

        {/* Tag */}
        <p ref={tagRef} style={s.tag}>
          //THIS IS HAKRIUM
        </p>

        {/* Headline */}
        <h1 ref={h1Ref} style={s.h1}>
          {[
            { word: 'ONE',       color: '#f0f0ee' },
            { word: 'COIN.',     color: '#ff4500' },
            { word: 'INFINITE',  color: 'rgba(240,240,238,0.15)' },
            { word: 'PLATFORMS', color: '#f0f0ee', period: true },
          ].map(({ word, color, period }) => (
            <span key={word} style={s.lineClip}>
              <span className="line-inner" style={{ ...s.lineInner, color }}>
                {word}
                {period && <span style={s.periodOrange}>.</span>}
              </span>
            </span>
          ))}
        </h1>

        {/* Vision */}
        <p ref={visionRef} style={s.vision}>
           Rage is the first child.  
        </p>

        {/* Ecosystem platforms */}
        <div ref={ecosRef} style={s.ecos}>
          <span style={s.ecosLabel}>ECOSYSTEM</span>
          <div style={s.ecosGrid}>
            {PLATFORMS.map(p => (
              <div key={p.name} style={{ ...s.platform, ...(p.active ? s.platformActive : {}) }}>
                <span style={s.platformName}>{p.name}</span>
                <span style={{ ...s.platformStatus, ...(p.active ? s.platformStatusLive : {}) }}>
                  {p.active && <span style={s.liveDot} />}
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} style={s.ctaRow}>
          
          <button data-cursor style={s.btnGhost}>
            Live soon ..
          </button>
        </div>

      </div>

      {/* Corner mark */}
      <div style={s.cornerMark}>
        <span style={s.cornerText}>HKM<span style={{ color: '#ff4500' }}>.</span>GATEWAY</span>
        <span style={s.cornerSub}>PARENT PROTOCOL</span>
      </div>
    </div>
  )
}

const s = {
  wrap: {
    position: 'fixed', inset: 0,
    display: 'flex', alignItems: 'center',
    zIndex: 10, overflow: 'hidden',
  },
  scanlines: {
    position: 'absolute', inset: 0,
    background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)',
    pointerEvents: 'none', zIndex: 4,
  },
  heroImg: {
    position: 'absolute', right: 0, top: 0,
    height: '100%', width: '52%',
    objectFit: 'cover', objectPosition: 'center top',
    opacity: 0, zIndex: 0,
  },
  vignette: {
    position: 'absolute', inset: 0,
    background: `
      radial-gradient(ellipse at 70% 50%, rgba(255,69,0,0.07) 0%, transparent 55%),
      linear-gradient(to right, #0a0a0a 38%, transparent 70%, #0a0a0a 100%)
    `,
    zIndex: 1, pointerEvents: 'none',
  },
  content: {
    position: 'relative', zIndex: 5,
    paddingLeft: 'clamp(1.5rem, 5vw, 7rem)',
    paddingRight: '2rem',
    display: 'flex', flexDirection: 'column',
    maxWidth: 680,
  },

  /* Coming soon badge */
  badge: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'rgba(255,69,0,0.1)',
    border: '1px solid rgba(255,69,0,0.35)',
    padding: '5px 14px',
    width: 'fit-content',
    marginBottom: 20,
  },
  badgeDot: {
    display: 'block', width: 6, height: 6, borderRadius: '50%',
    background: '#ff4500',
    animation: 'pulse-dot 1.4s ease-in-out infinite',
  },
  badgeText: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.6rem',
    letterSpacing: '0.25em',
    color: '#ff4500',
  },

  /* Tag */
  tag: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.6rem',
    letterSpacing: '0.12em',
    color: 'rgba(240,240,238,0.35)',
    marginBottom: 18,
  },

  /* Headline */
  h1: {
    display: 'flex', flexDirection: 'column',
    margin: 0, marginBottom: 28,
  },
  lineClip: {
    display: 'block', overflow: 'hidden',
    paddingBottom: '0.02em',
  },
  lineInner: {
    display: 'block',
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    fontSize: 'clamp(3.8rem, 9vw, 10rem)',
    lineHeight: 0.92,
    letterSpacing: '-0.01em',
    textTransform: 'uppercase',
  },
  periodOrange: { color: '#ff4500' },

  /* Vision */
  vision: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300,
    fontSize: 'clamp(0.82rem, 1.2vw, 1rem)',
    lineHeight: 1.85,
    color: 'rgba(240,240,238,0.55)',
    marginBottom: 36,
    maxWidth: 520,
  },
  highlight: {
    color: 'rgba(240,240,238,0.85)',
    fontWeight: 400,
  },

  /* Ecosystem */
  ecos: {
    display: 'flex', flexDirection: 'column', gap: 10,
    marginBottom: 36,
  },
  ecosLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.58rem',
    letterSpacing: '0.3em',
    color: 'rgba(240,240,238,0.25)',
  },
  ecosGrid: {
    display: 'flex', gap: 8, flexWrap: 'wrap',
  },
  platform: {
    display: 'flex', flexDirection: 'column', gap: 4,
    padding: '10px 16px',
    border: '1px solid rgba(240,240,238,0.08)',
    background: 'rgba(240,240,238,0.02)',
    minWidth: 90,
  },
  platformActive: {
    border: '1px solid rgba(255,69,0,0.3)',
    background: 'rgba(255,69,0,0.05)',
  },
  platformName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    letterSpacing: '0.08em',
    color: '#f0f0ee',
  },
  platformStatus: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.52rem',
    letterSpacing: '0.12em',
    color: 'rgba(240,240,238,0.3)',
    display: 'flex', alignItems: 'center', gap: 5,
  },
  platformStatusLive: { color: '#ff4500' },
  liveDot: {
    display: 'block', width: 5, height: 5, borderRadius: '50%',
    background: '#ff4500',
    animation: 'pulse-dot 1.2s ease-in-out infinite',
  },

  /* CTA */
  ctaRow: {
    display: 'flex', gap: 12,
  },
  btnPrimary: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#0a0a0a',
    background: '#ff4500',
    border: 'none',
    padding: '13px 28px',
    cursor: 'none',
    boxShadow: '0 0 20px rgba(255,69,0,0.35)',
    transition: 'box-shadow 0.2s',
  },
  btnGhost: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'rgba(240,240,238,0.7)',
    background: 'transparent',
    border: '1px solid rgba(240,240,238,0.18)',
    padding: '13px 28px',
    cursor: 'none',
    transition: 'border-color 0.2s',
  },

  /* Corner mark */
  cornerMark: {
    position: 'absolute', top: 28, right: 32,
    display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
    gap: 4, zIndex: 10,
  },
  cornerText: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: '1.05rem',
    letterSpacing: '0.12em',
    color: '#f0f0ee',
    textTransform: 'uppercase',
  },
  cornerSub: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem',
    letterSpacing: '0.2em',
    color: 'rgba(240,240,238,0.3)',
    textTransform: 'uppercase',
  },
}
