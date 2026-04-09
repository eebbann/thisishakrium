import { useState } from 'react'
import Nav from '../components/Nav'

const CA = '0x9a7ea44ba4eda152eb52522a095fbc98871f7777'

const TOKENOMICS = [
  { label: 'Community Rewards', pct: 35, color: '#ff4500' },
  { label: 'Team & Founders',   pct: 20, color: '#4488ff' },
  { label: 'Ecosystem Fund',    pct: 20, color: '#00c896' },
  { label: 'DAO Treasury',      pct: 15, color: '#ffaa00' },
  { label: 'Public Sale',       pct: 10, color: '#ff4488' },
]

const USECASES = [
  { icon: '💬', title: 'Tip Creators', desc: 'Tip anonymously on Rage, Pulse, Echo. Instant, on-chain.' },
  { icon: '🔒', title: 'Gated Content', desc: 'Pay HKM to unlock gated topics, rooms, and creator content.' },
  { icon: '🔄', title: 'P2P Trade', desc: 'Trade HKM ↔ BNB, USDT, USDC, BTCB on Bata. Atomic settlement.' },
  { icon: '🏛️', title: 'DAO Governance', desc: 'Lock HKM to vote on proposals and earn staking yield.' },
  { icon: '🛒', title: 'Marketplace', desc: 'Buy rare aliases, creator goods, and services on Vault.' },
  { icon: '📣', title: 'Boost Posts', desc: 'Spend HKM to push content into the Discover Explore feed.' },
]

const BUYSTEPS = [
  { n: 1, title: 'Create Your Wallet',  desc: 'Join Hakrium — a BNB Chain wallet is derived from your passphrase automatically.' },
  { n: 2, title: 'Get BNB',             desc: 'Buy BNB via Binance Pay, Quidax, BuyCoins, or any P2P platform. BNB is your gas token.' },
  { n: 3, title: 'Trade for HKM',       desc: 'Use Bata or PancakeSwap to exchange BNB for HKM using the contract address.' },
  { n: 4, title: 'Start Earning',       desc: 'Use HKM across the ecosystem. Tip, vote, trade, and unlock content.' },
]

export default function HKM() {
  const [copied, setCopied] = useState(false)

  const copyCA = () => {
    navigator.clipboard.writeText(CA)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div style={s.page}>
      <Nav />

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.container}>
          <span style={s.kicker}>// HKM TOKEN</span>
          <h1 style={s.h1}>THE COIN THAT<br /><span style={{ color: 'rgba(240,240,238,0.14)' }}>POWERS</span> EVERYTHING.</h1>
          <p style={s.heroSub}>
            BEP-20 on BNB Chain. Fixed supply. Deflationary burn. One coin for every platform in the Hakrium ecosystem.
          </p>

          {/* CA */}
          <button onClick={copyCA} style={s.caBtn}>
            <span style={s.caLabel}>{copied ? '✓ COPIED' : 'CONTRACT'}</span>
            <span style={s.caAddr}>{CA}</span>
            <span style={s.caIcon}>
              {copied
                ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ff4500" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              }
            </span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={s.statsBar}>
        <div style={s.statsInner}>
          {[
            { label: 'Total Supply',  val: '1,000,000,000 HKM' },
            { label: 'Chain',         val: 'BNB Chain (BEP-20)' },
            { label: 'Chain ID',      val: '56 (Mainnet)' },
            { label: 'Burn Rate',     val: '2% per cashout' },
            { label: 'Gas Fee',       val: '~$0.05–$0.20' },
            { label: 'Block Time',    val: '~3 seconds' },
            { label: 'DEX',           val: 'PancakeSwap' },
            { label: 'Decimals',      val: '18' },
          ].map(item => (
            <div key={item.label} style={s.statItem}>
              <span style={s.statLabel}>{item.label}</span>
              <span style={s.statVal}>{item.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tokenomics */}
      <section style={s.section}>
        <div style={s.container}>
          <span style={s.kicker}>// TOKENOMICS</span>
          <h2 style={s.h2}>SUPPLY ALLOCATION</h2>
          <p style={s.sub}>Fixed forever at 1,000,000,000 HKM. No minting. 2% of every cashout is permanently burned.</p>

          <div style={s.tokoGrid}>
            <div style={s.tokoChart}>
              {TOKENOMICS.map((t, i) => {
                const offset = TOKENOMICS.slice(0, i).reduce((a, x) => a + x.pct, 0)
                const dash   = `${t.pct * 2.827} ${(100 - t.pct) * 2.827}`
                const dashOff= `-${offset * 2.827}`
                return (
                  <circle key={t.label}
                    cx="90" cy="90" r="45"
                    fill="none"
                    stroke={t.color}
                    strokeWidth="38"
                    strokeDasharray={dash}
                    strokeDashoffset={dashOff}
                    style={{ transition: 'all 0.3s' }}
                  />
                )
              })}
              <text x="90" y="86" textAnchor="middle" fontFamily="'Barlow Condensed', sans-serif" fontSize="18" fontWeight="900" fill="#f0f0ee">HKM</text>
              <text x="90" y="100" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="6" fill="rgba(240,240,238,0.4)" letterSpacing="1">1 BILLION</text>
            </div>

            <div style={s.tokoLegend}>
              {TOKENOMICS.map(t => (
                <div key={t.label} style={s.tokoRow}>
                  <div style={{ ...s.tokoDot, background: t.color }} />
                  <span style={s.tokoLabel}>{t.label}</span>
                  <span style={{ ...s.tokoPct, color: t.color }}>{t.pct}%</span>
                </div>
              ))}
              <div style={s.tokoNote}>
                Team & Founders: 4-year vest, 12-month cliff.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section style={{ ...s.section, background: '#0d0d0d' }}>
        <div style={s.container}>
          <span style={s.kicker}>// USE CASES</span>
          <h2 style={s.h2}>WHAT YOU CAN DO WITH HKM</h2>
          <div style={s.usecaseGrid}>
            {USECASES.map(u => (
              <div key={u.title} style={s.usecaseCard}>
                <span style={s.usecaseIcon}>{u.icon}</span>
                <h3 style={s.usecaseTitle}>{u.title}</h3>
                <p style={s.usecaseDesc}>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Buy */}
      <section style={s.section}>
        <div style={s.container}>
          <span style={s.kicker}>// HOW TO BUY</span>
          <h2 style={s.h2}>GET HKM IN FOUR STEPS</h2>
          <div style={s.buyGrid}>
            {BUYSTEPS.map(step => (
              <div key={step.n} style={s.buyCard}>
                <div style={s.buyNum}>{String(step.n).padStart(2, '0')}</div>
                <h3 style={s.buyTitle}>{step.title}</h3>
                <p style={s.buyDesc}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={s.linksRow}>
            <a href={`https://pancakeswap.finance/swap?outputCurrency=${CA}&chain=bsc`} target="_blank" rel="noopener noreferrer" style={s.extBtn}>
              PANCAKESWAP →
            </a>
            <a href={`https://dexscreener.com/bsc/0xc174bc50058487a5243e7beca4ed5e4fab448226`} target="_blank" rel="noopener noreferrer" style={s.ghostBtn}>
              DEXSCREENER
            </a>
            <a href={`https://bscscan.com/token/${CA}`} target="_blank" rel="noopener noreferrer" style={s.ghostBtn}>
              BSCSCAN
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

const s = {
  page: { background: '#0a0a0a', color: '#f0f0ee', minHeight: '100vh' },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.5rem,4vw,3rem)' },
  section:   { padding: '80px 0' },

  hero: { padding: '80px 0 48px', borderBottom: '1px solid rgba(240,240,238,0.06)' },
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
    maxWidth: 520, marginBottom: 28,
  },
  h2: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,3rem)',
    textTransform: 'uppercase', color: '#f0f0ee',
    lineHeight: 1, marginBottom: 16,
  },
  sub: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300, fontSize: '0.95rem',
    color: 'rgba(240,240,238,0.5)', lineHeight: 1.8,
    marginBottom: 40, maxWidth: 520,
  },

  caBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    background: 'rgba(255,69,0,0.08)', border: '1px solid rgba(255,69,0,0.35)',
    padding: '10px 16px', cursor: 'pointer', outline: 'none',
    transition: 'background 0.2s',
  },
  caLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.52rem', letterSpacing: '0.18em', color: '#ff4500', fontWeight: 700,
  },
  caAddr: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.52rem', color: 'rgba(240,240,238,0.6)',
    maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  },
  caIcon: { display: 'flex', alignItems: 'center', color: 'rgba(240,240,238,0.4)' },

  statsBar: {
    background: '#0d0d0d',
    borderBottom: '1px solid rgba(240,240,238,0.06)',
    padding: '28px clamp(1.5rem,4vw,3rem)',
  },
  statsInner: {
    maxWidth: 1200, margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 20,
  },
  statItem: { display: 'flex', flexDirection: 'column', gap: 4 },
  statLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.48rem', letterSpacing: '0.14em',
    color: 'rgba(240,240,238,0.3)',
  },
  statVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700, fontSize: '1.1rem', color: '#f0f0ee',
  },

  tokoGrid: {
    display: 'grid', gridTemplateColumns: '240px 1fr',
    gap: 56, alignItems: 'center', marginTop: 40,
  },
  tokoChart: {
    width: 180, height: 180,
    flexShrink: 0,
  },
  tokoLegend: { display: 'flex', flexDirection: 'column', gap: 12 },
  tokoRow: { display: 'flex', alignItems: 'center', gap: 12 },
  tokoDot: { width: 10, height: 10, borderRadius: '50%', flexShrink: 0 },
  tokoLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.88rem', color: 'rgba(240,240,238,0.6)', flex: 1,
  },
  tokoPct: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700, fontSize: '1.1rem',
  },
  tokoNote: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem', letterSpacing: '0.08em',
    color: 'rgba(240,240,238,0.25)',
    borderTop: '1px solid rgba(240,240,238,0.06)',
    paddingTop: 12, marginTop: 4,
  },

  usecaseGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 16, marginTop: 40,
  },
  usecaseCard: {
    background: '#0f0f0f', border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 10, padding: '24px',
  },
  usecaseIcon: { fontSize: '1.6rem', display: 'block', marginBottom: 12 },
  usecaseTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: '1.4rem', color: '#f0f0ee', marginBottom: 8,
  },
  usecaseDesc: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300, fontSize: '0.87rem',
    color: 'rgba(240,240,238,0.5)', lineHeight: 1.7,
  },

  buyGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 16, marginTop: 40, marginBottom: 40,
  },
  buyCard: {
    background: '#0f0f0f', border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 10, padding: '24px',
  },
  buyNum: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: '3rem', color: 'rgba(255,69,0,0.2)',
    lineHeight: 1, marginBottom: 12,
  },
  buyTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700, fontSize: '1.2rem', color: '#f0f0ee', marginBottom: 8,
  },
  buyDesc: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300, fontSize: '0.87rem',
    color: 'rgba(240,240,238,0.5)', lineHeight: 1.7,
  },

  linksRow: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  extBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.6rem', letterSpacing: '0.18em',
    background: '#ff4500', color: '#0a0a0a', fontWeight: 700,
    textDecoration: 'none', padding: '12px 24px', display: 'inline-flex',
  },
  ghostBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.6rem', letterSpacing: '0.18em',
    background: 'transparent', color: 'rgba(240,240,238,0.55)',
    border: '1px solid rgba(240,240,238,0.15)',
    textDecoration: 'none', padding: '12px 24px', display: 'inline-flex',
  },
}
