import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import HeroVisual from './HeroVisual'
import logoImg from '../assets/logo.png'

const CA          = '0x9a7ea44ba4eda152eb52522a095fbc98871f7777'
const PAIR_ADDR   = '0xc174bc50058487a5243e7beca4ed5e4fab448226'

const LINKS = [
  {
    label: 'X / TWITTER',
    href: 'https://x.com/thisishakrium',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'GMGN',
    href: `https://gmgn.ai/bsc/token/${CA}`,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/>
        <path d="M16.5 3.5a9 9 0 0 1 0 17"/>
      </svg>
    ),
  },
  {
    label: 'DEXSCREENER',
    href: `https://dexscreener.com/bsc/${PAIR_ADDR}`,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
  {
    label: 'BSCSCAN',
    href: `https://bscscan.com/token/${CA}`,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    label: 'PANCAKESWAP',
    href: `https://pancakeswap.finance/swap?outputCurrency=${CA}&chain=bsc`,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>
      </svg>
    ),
  },
]

const PLATFORMS = [
  { name: 'RAGE',     status: 'LIVE',    active: true,  num: 1, color: '#ff4500' },
  { name: 'BATA',     status: 'PHASE 1', active: false, num: 2, color: '#00c896' },
  { name: 'PULSE',    status: 'PHASE 2', active: false, num: 3, color: '#4488ff' },
  { name: 'VAULT',    status: 'PHASE 2', active: false, num: 4, color: '#ffaa00' },
  { name: 'ECHO',     status: 'PHASE 3', active: false, num: 5, color: '#ff4488' },
  { name: 'ARENA',    status: 'PHASE 3', active: false, num: 6, color: '#00ccbb' },
]

export default function Scene({ play }) {
  const wrapRef   = useRef(null)
  const badgeRef  = useRef(null)
  const tagRef    = useRef(null)
  const h1Ref     = useRef(null)
  const visionRef = useRef(null)
  const ecosRef   = useRef(null)
  const ctaRef    = useRef(null)
  const bottomRef = useRef(null)
  const played    = useRef(false)
  const [copied, setCopied]  = useState(false)

  const copyCA = () => {
    navigator.clipboard.writeText(CA)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  useEffect(() => {
    if (!play || played.current) return
    played.current = true

    const lines = h1Ref.current.querySelectorAll('.line-inner')

    gsap.set(wrapRef.current, { opacity: 1 })
    gsap.set(lines,           { yPercent: 115, skewY: 3 })
    gsap.set(
      [badgeRef.current, tagRef.current, visionRef.current,
       ecosRef.current, ctaRef.current, bottomRef.current],
      { opacity: 0, y: 22 }
    )

    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .to(badgeRef.current,  { opacity: 1, y: 0, duration: 0.5 },                  '+=0.3')
      .to(tagRef.current,    { opacity: 1, y: 0, duration: 0.6 },                  '-=0.15')
      .to(lines,             { yPercent: 0, skewY: 0, stagger: 0.1, duration: 1 }, '-=0.3')
      .to(visionRef.current, { opacity: 1, y: 0, duration: 0.7 },                  '-=0.3')
      .to(ecosRef.current,   { opacity: 1, y: 0, duration: 0.6 },                  '-=0.4')
      .to(ctaRef.current,    { opacity: 1, y: 0, duration: 0.6 },                  '-=0.3')
      .to(bottomRef.current, { opacity: 1, y: 0, duration: 0.6 },                  '-=0.2')
  }, [play])

  return (
    <div ref={wrapRef} className="scene-wrap" style={{ opacity: 0 }}>

      <div style={s.scanlines} />
      <HeroVisual play={play} />
      <div className="scene-vignette" />

      {/* ── Top-left logo ── */}
      <div style={s.logoWrap}>
        <img src={logoImg} alt="Hakrium" style={s.logo} />
      </div>

      {/* ── Main content ── */}
      <div className="scene-content">

        <div ref={badgeRef} style={s.badge}>
          <span style={s.badgeDot} />
          <span style={s.badgeText}>COMING SOON</span>
        </div>

        <p ref={tagRef} style={s.tagHakrium}>
          THIS IS&nbsp;<span style={s.tagGlow}>HAKRIUM</span>
        </p>

        <h1 ref={h1Ref} style={s.h1}>
          {[
            { word: 'ONE',       color: '#f0f0ee' },
            { word: 'COIN.',     color: '#ff4500' },
            { word: 'INFINITE',  color: 'rgba(240,240,238,0.14)' },
            { word: 'PLATFORMS', color: '#f0f0ee', period: true },
          ].map(({ word, color, period }) => (
            <span key={word} style={s.lineClip}>
              <span className="line-inner" style={{ ...s.lineInner, color }}>
                {word}{period && <span style={{ color: '#ff4500' }}>.</span>}
              </span>
            </span>
          ))}
        </h1>

        <p ref={visionRef} style={s.vision}>
          Rage is the first child.
        </p>

        <div ref={ecosRef} style={s.ecos}>
          <span style={s.ecosLabel}>ECOSYSTEM — PHASE 1 &amp; BEYOND</span>
          <div className="scene-ecos-grid" style={s.ecosGrid}>
            {PLATFORMS.map(p => (
              <div
                key={p.name}
                className="scene-platform"
                style={{
                  ...s.platform,
                  ...(p.active ? {
                    border: `1px solid ${p.color}4d`,
                    background: `${p.color}0d`,
                    borderTop: `3px solid ${p.color}`,
                  } : {}),
                  ...(!p.active ? s.platformBlur : {}),
                }}
              >
                <span style={{
                  ...s.numBadge,
                  ...(p.active ? {
                    color: p.color,
                    background: `${p.color}1f`,
                    border: `1px solid ${p.color}66`,
                  } : {}),
                }}>
                  #{p.num}
                </span>
                <span style={s.platformName}>{p.name}</span>
                <span style={{ ...s.platformStatus, ...(p.active ? { color: p.color } : {}) }}>
                  {p.active && <span style={{ ...s.liveDot, background: p.color }} />}
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div ref={ctaRef} style={s.ctaRow}>
          <Link to="/login" style={s.btnPrimary}>JOIN FREE</Link>
          <Link to="/ecosystem" style={s.btnGhost}>EXPLORE →</Link>
        </div>

      </div>

      {/* ── Bottom bar: contract + socials ── */}
      <div ref={bottomRef} style={s.bottomBar}>

        {/* Contract address — click to copy */}
        <button onClick={copyCA} style={s.caBtn} title={copied ? 'Copied!' : 'Click to copy contract address'}>
          <span style={s.caLabel}>{copied ? '✓ COPIED' : 'CA'}</span>
          <span style={s.caAddress} className="ca-full">{CA}</span>
          <span style={s.caIcon}>
            {copied
              ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ff4500" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            }
          </span>
        </button>

        <div style={s.divider} />

        {/* Social links */}
        <div style={s.socials}>
          {LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              style={s.socialLink}
              title={l.label}
              data-cursor
            >
              {l.icon}
              <span style={s.socialLabel}>{l.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Corner watermark */}
      <div style={s.corner}>
        <span style={s.cornerName}>
          HKM<span style={{ color: '#ff4500' }}>.</span>GATEWAY
        </span>
        <span style={s.cornerSub}>PARENT PROTOCOL</span>
      </div>
    </div>
  )
}

const s = {
  scanlines: {
    position: 'absolute', inset: 0,
    background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)',
    pointerEvents: 'none', zIndex: 3,
  },

  /* Logo top-left */
  logoWrap: {
    position: 'absolute', top: 20, left: 'clamp(1.5rem, 5vw, 7rem)',
    zIndex: 10,
  },
  logo: {
    height: 36, width: 'auto',
    objectFit: 'contain',
    filter: 'brightness(1.1)',
  },

  badge: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'rgba(255,69,0,0.1)',
    border: '1px solid rgba(255,69,0,0.35)',
    padding: '5px 14px', width: 'fit-content', marginBottom: 16,
    marginTop: 56, // clear below logo
  },
  badgeDot: {
    display: 'block', width: 6, height: 6, borderRadius: '50%',
    background: '#ff4500', animation: 'pulse-dot 1.4s ease-in-out infinite',
  },
  badgeText: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.58rem', letterSpacing: '0.25em', color: '#ff4500',
  },

  tagHakrium: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: 'clamp(1rem, 2.2vw, 1.55rem)',
    letterSpacing: '0.32em', textTransform: 'uppercase',
    color: 'rgba(240,240,238,0.45)', marginBottom: 12,
  },
  tagGlow: {
    color: '#f0f0ee',
    textShadow: '0 0 10px rgba(255,69,0,1), 0 0 28px rgba(255,69,0,0.7), 0 0 55px rgba(255,69,0,0.3)',
  },

  h1: { display: 'flex', flexDirection: 'column', margin: 0, marginBottom: 20 },
  lineClip: { display: 'block', overflow: 'hidden', paddingBottom: '0.02em' },
  lineInner: {
    display: 'block',
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    fontSize: 'clamp(3.4rem, 9vw, 10rem)',
    lineHeight: 0.92, letterSpacing: '-0.01em', textTransform: 'uppercase',
  },

  vision: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300,
    fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
    lineHeight: 1.85, color: 'rgba(240,240,238,0.48)',
    marginBottom: 22, maxWidth: 480,
  },

  ecos: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 },
  ecosLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.56rem', letterSpacing: '0.3em',
    color: 'rgba(240,240,238,0.22)',
  },
  ecosGrid: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  platform: {
    display: 'flex', flexDirection: 'column', gap: 3,
    padding: '10px 14px',
    border: '1px solid rgba(240,240,238,0.08)',
    background: 'rgba(240,240,238,0.02)', minWidth: 88,
  },
  platformActive: {
    border: '1px solid rgba(255,69,0,0.3)',
    background: 'rgba(255,69,0,0.05)',
  },
  platformBlur: { filter: 'blur(4px)', pointerEvents: 'none', userSelect: 'none', opacity: 0.45 },
  numBadge: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.47rem', letterSpacing: '0.08em',
    color: 'rgba(240,240,238,0.28)',
    background: 'rgba(240,240,238,0.04)',
    border: '1px solid rgba(240,240,238,0.1)',
    borderRadius: '2px', padding: '1px 5px', width: 'fit-content', marginBottom: 2,
  },
  numBadgeActive: {
    color: '#ff4500', background: 'rgba(255,69,0,0.12)',
    border: '1px solid rgba(255,69,0,0.4)',
  },
  platformName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.08em', color: '#f0f0ee',
  },
  platformStatus: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem', letterSpacing: '0.1em',
    color: 'rgba(240,240,238,0.28)', display: 'flex', alignItems: 'center', gap: 5,
  },
  statusLive: { color: '#ff4500' },
  liveDot: {
    display: 'block', width: 5, height: 5, borderRadius: '50%',
    background: '#ff4500', animation: 'pulse-dot 1.2s ease-in-out infinite',
  },

  ctaRow: { display: 'flex', gap: 12, marginBottom: 80, flexWrap: 'wrap' },
  btnPrimary: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.63rem', letterSpacing: '0.2em', textTransform: 'uppercase',
    background: '#ff4500', color: '#0a0a0a', fontWeight: 700,
    textDecoration: 'none',
    padding: '13px 28px', display: 'inline-flex', alignItems: 'center',
    transition: 'background 0.15s',
  },
  btnGhost: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.63rem', letterSpacing: '0.15em', textTransform: 'uppercase',
    color: 'rgba(240,240,238,0.65)', background: 'transparent',
    border: '1px solid rgba(240,240,238,0.18)',
    textDecoration: 'none',
    padding: '13px 26px', display: 'inline-flex', alignItems: 'center',
    transition: 'border-color 0.2s',
  },

  /* Bottom bar */
  bottomBar: {
    position: 'absolute', bottom: 24, left: 'clamp(1.5rem, 5vw, 7rem)',
    right: '2rem',
    display: 'flex', alignItems: 'center', gap: 12,
    zIndex: 10, flexWrap: 'wrap',
  },
  caBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'rgba(255,69,0,0.08)',
    border: '1px solid rgba(255,69,0,0.4)',
    padding: '8px 14px',
    cursor: 'pointer',
    color: 'inherit', outline: 'none',
    transition: 'background 0.2s, border-color 0.2s',
    flexShrink: 0,
  },
  caLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.55rem', letterSpacing: '0.2em',
    color: '#ff4500', fontWeight: 700,
  },
  caAddress: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.52rem', letterSpacing: '0.05em',
    color: 'rgba(240,240,238,0.65)',
  },
  caIcon: { display: 'flex', alignItems: 'center', color: 'rgba(240,240,238,0.5)', marginLeft: 2 },
  divider: { width: 1, height: 22, background: 'rgba(240,240,238,0.12)', flexShrink: 0 },
  socials: { display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' },
  socialLink: {
    display: 'inline-flex', alignItems: 'center', gap: 5,
    padding: '7px 10px',
    color: 'rgba(240,240,238,0.5)',
    textDecoration: 'none',
    border: '1px solid transparent',
    transition: 'color 0.2s, border-color 0.2s',
    cursor: 'pointer',
  },
  socialLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.48rem', letterSpacing: '0.12em',
    textTransform: 'uppercase',
  },

  corner: {
    position: 'absolute', top: 24, right: 28,
    display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
    gap: 3, zIndex: 10,
  },
  cornerName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700, fontSize: '1rem',
    letterSpacing: '0.12em', color: '#f0f0ee', textTransform: 'uppercase',
  },
  cornerSub: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.48rem', letterSpacing: '0.2em',
    color: 'rgba(240,240,238,0.28)', textTransform: 'uppercase',
  },
}
