import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

const PLATFORMS = [
  {
    name: 'RAGE', slug: 'rage', phase: 1, status: 'LIVE', color: '#ff4500',
    sub: 'Anonymous Opinion Platform',
    desc: 'Say anything. React to everything. Tip the voices that matter. No usernames, no history, no consequences — just raw opinion.',
    features: ['Anonymous posting', 'HKM tipping', 'Reaction economy', 'Trending topics', 'Gated rooms'],
    url: 'rage.thisishakrium.com',
  },
  {
    name: 'BATA', slug: 'bata', phase: 1, status: 'PHASE 1', color: '#00c896',
    sub: 'P2P Coin Exchange',
    desc: 'Trade HKM peer-to-peer against BNB, USDT, USDC, BTCB and ETH. Atomic swaps via HTLC escrow — no custodian, no slippage risk.',
    features: ['Atomic HTLC escrow', 'HKM ↔ BNB / USDT / USDC', '0.5% trade fee', 'Auto-refund on timeout', 'MEV protection'],
    url: 'bata.thisishakrium.com',
  },
  {
    name: 'PULSE', slug: 'pulse', phase: 2, status: 'PHASE 2', color: '#4488ff',
    sub: 'Short Video Platform',
    desc: 'Create, upload, and monetise short video content. Viewers tip with HKM. Creators earn without giving up their identity.',
    features: ['HKM video tips', 'Anonymous creator profiles', 'Gated content', 'Explore feed', 'Revenue share'],
    url: 'pulse.thisishakrium.com',
  },
  {
    name: 'VAULT', slug: 'vault', phase: 2, status: 'PHASE 2', color: '#ffaa00',
    sub: 'Marketplace',
    desc: 'Buy and sell digital and physical goods using HKM. Rare aliases, creator merch, services — all priced in the coin.',
    features: ['HKM payments', 'Alias marketplace', 'Creator storefronts', 'Escrow', 'Dispute resolution'],
    url: 'vault.thisishakrium.com',
  },
  {
    name: 'ECHO', slug: 'echo', phase: 3, status: 'PHASE 3', color: '#ff4488',
    sub: 'Anonymous Journalism',
    desc: 'Fund investigative reporting anonymously. Journalists publish under aliases. HKM tips fund ongoing coverage.',
    features: ['Tip-funded journalism', 'ZK source protection', 'Anonymous bylines', 'Document drops', 'Community editing'],
    url: 'echo.thisishakrium.com',
  },
  {
    name: 'ARENA', slug: 'arena', phase: 3, status: 'PHASE 3', color: '#00ccbb',
    sub: 'Prediction Markets',
    desc: 'Bet on real-world outcomes using HKM. Anonymous positions. Decentralised resolution via DAO oracles.',
    features: ['HKM prediction markets', 'DAO oracle resolution', 'Anonymous positions', 'Public liquidity', 'Yield for liquidity providers'],
    url: 'arena.thisishakrium.com',
  },
]

export default function Ecosystem() {
  return (
    <div style={s.page}>
      <Nav />

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.container}>
          <span style={s.kicker}>// HAKRIUM ECOSYSTEM</span>
          <h1 style={s.h1}>
            SIX PLATFORMS.<br />
            <span style={{ color: 'rgba(240,240,238,0.14)' }}>ONE</span> COIN.
          </h1>
          <p style={s.heroSub}>
            Every platform runs on HKM. One account unlocks all of them.
            No reconnecting wallets, no re-registering — one identity, everywhere.
          </p>
        </div>
      </div>

      {/* Platforms */}
      <div style={s.container}>
        <div style={s.list}>
          {PLATFORMS.map((p, i) => (
            <div key={p.name} style={{ ...s.platformRow, ...(i % 2 !== 0 ? s.platformRowAlt : {}) }}>
              <div style={s.platformLeft}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ ...s.phaseCircle, borderColor: p.color, color: p.color, background: `${p.color}10` }}>
                    {p.phase}
                  </div>
                  <span style={{ ...s.statusBadge,
                    color: p.status === 'LIVE' ? p.color : 'rgba(240,240,238,0.35)',
                    background: p.status === 'LIVE' ? `${p.color}14` : 'rgba(240,240,238,0.04)',
                    borderColor: p.status === 'LIVE' ? `${p.color}44` : 'rgba(240,240,238,0.1)',
                  }}>
                    {p.status === 'LIVE' && <span style={{ ...s.liveDot, background: p.color }} />}
                    {p.status}
                  </span>
                </div>

                <h2 style={{ ...s.platformName, color: p.color }}>{p.name}</h2>
                <span style={s.platformSub}>{p.sub}</span>
                <p style={s.platformDesc}>{p.desc}</p>

                <div style={s.featureList}>
                  {p.features.map(f => (
                    <div key={f} style={s.featureItem}>
                      <span style={{ ...s.featureDot, background: p.color }} />
                      <span style={s.featureText}>{f}</span>
                    </div>
                  ))}
                </div>

                {p.status === 'LIVE' && (
                  <a href={`https://${p.url}`} target="_blank" rel="noopener noreferrer" style={{ ...s.liveBtn, background: p.color }}>
                    LAUNCH {p.name} →
                  </a>
                )}
              </div>

              <div style={{ ...s.platformCard, borderTop: `3px solid ${p.color}` }}>
                <div style={{ ...s.bigName, color: `${p.color}20` }}>{p.name}</div>
                <div style={s.urlTag}>{p.url}</div>
                <div style={s.phaseLabel}>
                  <span style={s.phaseLabelText}>PHASE {p.phase}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={s.cta}>
        <div style={s.container}>
          <h2 style={{ ...s.h1, fontSize: 'clamp(1.8rem,4vw,3rem)', marginBottom: 12 }}>
            ONE ACCOUNT.<br />EVERY PLATFORM.
          </h2>
          <p style={{ ...s.heroSub, marginBottom: 28 }}>
            Join free. No email, no phone, no name required.
          </p>
          <Link to="/join" style={s.joinBtn}>CREATE ACCOUNT</Link>
        </div>
      </div>
    </div>
  )
}

const s = {
  page: { background: '#0a0a0a', color: '#f0f0ee', minHeight: '100vh' },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.5rem,4vw,3rem)' },

  hero: { padding: '80px 0 64px', borderBottom: '1px solid rgba(240,240,238,0.06)' },
  kicker: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.62rem', letterSpacing: '0.22em',
    color: '#ff4500', display: 'block', marginBottom: 18,
  },
  h1: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: 'clamp(2.5rem,6vw,5rem)',
    textTransform: 'uppercase', color: '#f0f0ee',
    lineHeight: 1, marginBottom: 20,
  },
  heroSub: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300, fontSize: '1rem',
    color: 'rgba(240,240,238,0.5)', lineHeight: 1.8,
    maxWidth: 540, marginBottom: 0,
  },

  list: { padding: '64px 0', display: 'flex', flexDirection: 'column', gap: 2 },
  platformRow: {
    display: 'grid', gridTemplateColumns: '1fr 280px',
    gap: 48, alignItems: 'center',
    padding: '56px 0',
    borderBottom: '1px solid rgba(240,240,238,0.06)',
  },
  platformRowAlt: {},
  platformLeft: { display: 'flex', flexDirection: 'column' },

  phaseCircle: {
    width: 32, height: 32, borderRadius: '50%',
    border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', letterSpacing: '0',
    flexShrink: 0,
  },
  statusBadge: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem', letterSpacing: '0.12em',
    border: '1px solid', padding: '3px 10px',
    display: 'inline-flex', alignItems: 'center', gap: 5,
  },
  liveDot: {
    display: 'block', width: 5, height: 5, borderRadius: '50%',
    animation: 'pulse-dot 1.2s ease-in-out infinite',
  },
  platformName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: 'clamp(2.5rem,4vw,4rem)',
    letterSpacing: '0.02em', lineHeight: 1, marginBottom: 6,
  },
  platformSub: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.58rem', letterSpacing: '0.12em',
    color: 'rgba(240,240,238,0.35)', marginBottom: 16, display: 'block',
  },
  platformDesc: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300, fontSize: '0.95rem',
    color: 'rgba(240,240,238,0.55)', lineHeight: 1.75, marginBottom: 24,
  },
  featureList: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 },
  featureItem: { display: 'flex', alignItems: 'center', gap: 10 },
  featureDot: { width: 5, height: 5, borderRadius: '50%', flexShrink: 0 },
  featureText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.84rem', color: 'rgba(240,240,238,0.55)',
  },
  liveBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.6rem', letterSpacing: '0.18em',
    color: '#0a0a0a', fontWeight: 700, textDecoration: 'none',
    padding: '12px 24px', display: 'inline-flex', alignItems: 'center',
    width: 'fit-content',
  },

  platformCard: {
    background: '#0f0f0f', border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 10, padding: '28px',
    display: 'flex', flexDirection: 'column', gap: 16,
    position: 'relative', overflow: 'hidden',
  },
  bigName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: '5rem', letterSpacing: '0.04em',
    lineHeight: 1, userSelect: 'none',
  },
  urlTag: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem', letterSpacing: '0.08em',
    color: 'rgba(240,240,238,0.25)',
    background: 'rgba(240,240,238,0.04)',
    border: '1px solid rgba(240,240,238,0.07)',
    padding: '4px 10px', borderRadius: 4, width: 'fit-content',
  },
  phaseLabel: { marginTop: 'auto' },
  phaseLabelText: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.48rem', letterSpacing: '0.2em',
    color: 'rgba(240,240,238,0.2)',
  },

  cta: {
    borderTop: '1px solid rgba(240,240,238,0.06)',
    padding: '80px 0',
    background: '#0d0d0d',
    textAlign: 'center',
  },
  joinBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.62rem', letterSpacing: '0.2em',
    background: '#ff4500', color: '#0a0a0a', fontWeight: 700,
    textDecoration: 'none', padding: '14px 32px', display: 'inline-flex',
  },
}
