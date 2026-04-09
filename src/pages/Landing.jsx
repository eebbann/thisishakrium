import { Link } from 'react-router-dom'
import Scene from '../components/Scene'

const PLATFORMS = [
  { name: 'RAGE',  phase: '01', status: 'LIVE',    color: '#ff4500', desc: 'Anonymous opinions. Post, tip, react — no attribution.' },
  { name: 'BATA',  phase: '02', status: 'PHASE 1', color: '#00c896', desc: 'P2P coin trade. HKM ↔ BNB, USDT, USDC, BTCB.' },
  { name: 'PULSE', phase: '03', status: 'PHASE 2', color: '#4488ff', desc: 'Short video platform. Create content. Earn HKM tips.' },
  { name: 'VAULT', phase: '04', status: 'PHASE 2', color: '#ffaa00', desc: 'Marketplace. Buy and sell goods and services with HKM.' },
  { name: 'ECHO',  phase: '05', status: 'PHASE 3', color: '#ff4488', desc: 'Anonymous journalism. Tips fund investigative reporting.' },
  { name: 'ARENA', phase: '06', status: 'PHASE 3', color: '#00ccbb', desc: 'Prediction markets. Bet with HKM. Win HKM. No identity.' },
]

const STATS = [
  { val: '1,000,000,000', label: 'Fixed Supply' },
  { val: 'BNB Chain',     label: 'Network' },
  { val: '2%',            label: 'Burned / Cashout' },
  { val: '~$0.10',        label: 'Avg Gas Fee' },
]

const TIERS = [
  { n: 0, name: 'Observer', hkm: '0–999',    lock: 'None',     votes: 'None', yield: '0%'   },
  { n: 1, name: 'Delegate', hkm: '1,000+',   lock: '30 days',  votes: '1×',   yield: '0.5%' },
  { n: 2, name: 'Steward',  hkm: '10,000+',  lock: '90 days',  votes: '2×',   yield: '1.2%' },
  { n: 3, name: 'Council',  hkm: '100,000+', lock: '180 days', votes: '5×',   yield: '2.5%' },
]

export default function Landing({ play }) {
  return (
    <div style={{ background: '#0a0a0a', color: '#f0f0ee' }}>

      {/* ── Hero ── */}
      <div style={{ position: 'relative', height: '100dvh', overflow: 'hidden' }}>
        <Scene play={play} />
      </div>

      {/* ── Ecosystem ── */}
      <section style={s.section}>
        <div style={s.container}>
          <span style={s.kicker}>// THE ECOSYSTEM</span>
          <h2 style={s.h2}>
            ONE ACCOUNT.<br />
            <span style={{ color: 'rgba(240,240,238,0.14)' }}>EVERY</span> PLATFORM.
          </h2>
          <p style={s.sub}>
            Six platforms. One HKM wallet. One anonymous identity.<br />
            No re-login, no reconnecting — your alias follows you everywhere.
          </p>

          <div style={s.platformGrid}>
            {PLATFORMS.map(p => (
              <div key={p.name} style={{ ...s.card, borderTop: `3px solid ${p.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <span style={{ ...s.phaseTag, color: p.color, borderColor: `${p.color}44`, background: `${p.color}12` }}>
                    {p.phase}
                  </span>
                  <span style={{
                    ...s.pill,
                    color: p.status === 'LIVE' ? p.color : 'rgba(240,240,238,0.28)',
                    background: p.status === 'LIVE' ? `${p.color}14` : 'rgba(240,240,238,0.04)',
                    borderColor: p.status === 'LIVE' ? `${p.color}44` : 'rgba(240,240,238,0.1)',
                  }}>
                    {p.status === 'LIVE' && <span style={{ ...s.liveDot, background: p.color }} />}
                    {p.status}
                  </span>
                </div>
                <h3 style={{ ...s.platformName, color: p.color }}>{p.name}</h3>
                <p style={s.platformDesc}>{p.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/ecosystem" style={s.outlineBtn}>EXPLORE ALL PLATFORMS</Link>
          </div>
        </div>
      </section>

      {/* ── HKM Coin ── */}
      <section style={{ ...s.section, background: '#0d0d0d' }}>
        <div style={s.container}>
          <div style={s.twoCol}>
            <div>
              <span style={s.kicker}>// THE COIN</span>
              <h2 style={s.h2}>
                HKM.<br />
                <span style={{ color: 'rgba(240,240,238,0.14)' }}>ONE</span> COIN.
              </h2>
              <p style={s.sub}>
                BEP-20 on BNB Chain. Fixed supply of 1,000,000,000 HKM.
                2% burned on every cashout — deflationary by design.
              </p>

              <div style={s.statGrid}>
                {STATS.map(stat => (
                  <div key={stat.label} style={s.stat}>
                    <span style={s.statVal}>{stat.val}</span>
                    <span style={s.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>

              <Link to="/hkm" style={s.orangeBtn}>GET HKM</Link>
            </div>

            <div style={s.coinVisual}>
              <div style={s.coinRing}>
                <div style={s.coinCore}>
                  <span style={s.coinTicker}>HKM</span>
                  <span style={s.coinChain}>BNB CHAIN</span>
                </div>
              </div>
              <div style={s.coinOrbitDot1} />
              <div style={s.coinOrbitDot2} />
            </div>
          </div>
        </div>
      </section>

      {/* ── DAO ── */}
      <section style={s.section}>
        <div style={s.container}>
          <span style={s.kicker}>// GOVERNANCE</span>
          <h2 style={s.h2}>
            LOCK HKM.<br />
            <span style={{ color: 'rgba(240,240,238,0.14)' }}>GOVERN</span> EVERYTHING.
          </h2>
          <p style={s.sub}>
            Four tiers of governance. Lock HKM to vote on proposals, earn yield,
            and shape the direction of every platform in the ecosystem.
          </p>

          <div style={s.tierGrid}>
            {TIERS.map(t => (
              <div key={t.n} style={{
                ...s.tierCard,
                ...(t.n > 0 ? { borderColor: 'rgba(255,69,0,0.2)', background: 'rgba(255,69,0,0.03)' } : {}),
              }}>
                <span style={{ ...s.tierNum, color: t.n > 0 ? '#ff4500' : 'rgba(240,240,238,0.28)' }}>
                  TIER {t.n}
                </span>
                <h3 style={{ ...s.tierName, color: t.n > 0 ? '#ff4500' : 'rgba(240,240,238,0.5)' }}>
                  {t.name}
                </h3>
                <div style={s.tierRows}>
                  <div style={s.tierRow}>
                    <span style={s.tierRowL}>HKM</span>
                    <span style={s.tierRowR}>{t.hkm}</span>
                  </div>
                  <div style={s.tierRow}>
                    <span style={s.tierRowL}>Lock</span>
                    <span style={s.tierRowR}>{t.lock}</span>
                  </div>
                  <div style={s.tierRow}>
                    <span style={s.tierRowL}>Votes</span>
                    <span style={s.tierRowR}>{t.votes}</span>
                  </div>
                  <div style={s.tierRow}>
                    <span style={s.tierRowL}>Yield</span>
                    <span style={{ ...s.tierRowR, color: t.n > 0 ? '#00c896' : undefined }}>{t.yield}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/dao" style={s.outlineBtn}>GO TO DAO</Link>
          </div>
        </div>
      </section>

      {/* ── Join CTA ── */}
      <section style={{ ...s.section, background: '#0d0d0d', textAlign: 'center' }}>
        <div style={{ ...s.container, maxWidth: 680 }}>
          <span style={s.kicker}>// GET STARTED</span>
          <h2 style={{ ...s.h2, textAlign: 'center' }}>
            NO EMAIL.<br />
            <span style={{ color: 'rgba(240,240,238,0.14)' }}>NO</span> PHONE.<br />
            NO NAME.
          </h2>
          <p style={{ ...s.sub, textAlign: 'center', maxWidth: '100%', marginBottom: 36 }}>
            One alias. One 12-word passphrase. That's your entire identity
            across every platform in the Hakrium ecosystem.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login?tab=join" style={s.orangeBtn}>CREATE ACCOUNT</Link>
            <Link to="/login?tab=restore" style={s.outlineBtn}>SIGN IN</Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={s.footer}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.5rem,4vw,3rem)' }}>
          <div style={s.footerGrid}>
            <div>
              <div style={s.footerBrand}>HKM<span style={{ color: '#ff4500' }}>.</span>GATEWAY</div>
              <div style={s.footerTagline}>ONE COIN. INFINITE PLATFORMS.</div>
            </div>
            <div style={s.footerLinks}>
              {[['Ecosystem','/ecosystem'],['HKM','/hkm'],['DAO','/dao'],['Discover','/discover'],['Builders','/builders']].map(([l,t]) => (
                <Link key={t} to={t} style={s.footerLink}>{l}</Link>
              ))}
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={s.footerMeta}>BNB CHAIN · BEP-20</div>
              <div style={s.footerMeta}>thisishakrium.com</div>
            </div>
          </div>
          <div style={s.footerBar}>
            <span style={s.footerMeta}>© 2026 Hakrium. All rights reserved.</span>
            <span style={s.footerMeta}>CA: 0x9a7ea44ba4eda152eb52522a095fbc98871f7777</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

const s = {
  section:   { padding: '96px 0' },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.5rem,4vw,3rem)' },
  kicker: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.62rem', letterSpacing: '0.22em',
    color: '#ff4500', display: 'block', marginBottom: 18,
  },
  h2: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: 'clamp(2.2rem,5vw,4.2rem)',
    letterSpacing: '-0.01em', textTransform: 'uppercase',
    color: '#f0f0ee', marginBottom: 20, lineHeight: 1,
  },
  sub: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300, fontSize: '1rem',
    color: 'rgba(240,240,238,0.55)', lineHeight: 1.8,
    marginBottom: 40, maxWidth: 560,
  },

  platformGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 16, marginTop: 48,
  },
  card: {
    background: '#0f0f0f',
    border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 10,
    padding: '22px 24px',
    transition: 'background 0.2s',
  },
  phaseTag: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.52rem', letterSpacing: '0.1em',
    border: '1px solid', borderRadius: 2,
    padding: '2px 8px',
  },
  pill: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem', letterSpacing: '0.1em',
    border: '1px solid', padding: '3px 9px',
    display: 'flex', alignItems: 'center', gap: 5,
  },
  liveDot: {
    display: 'block', width: 5, height: 5, borderRadius: '50%',
    animation: 'pulse-dot 1.2s ease-in-out infinite',
  },
  platformName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: '1.6rem', letterSpacing: '0.04em',
    marginBottom: 8,
  },
  platformDesc: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300, fontSize: '0.87rem',
    color: 'rgba(240,240,238,0.48)', lineHeight: 1.7,
  },

  twoCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 64, alignItems: 'center',
  },
  statGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: 16, marginBottom: 36,
  },
  stat: {
    background: '#0f0f0f',
    border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 8, padding: '16px 18px',
    display: 'flex', flexDirection: 'column', gap: 4,
  },
  statVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700, fontSize: '1.3rem',
    color: '#f0f0ee',
  },
  statLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.52rem', letterSpacing: '0.1em',
    color: 'rgba(240,240,238,0.35)',
  },

  coinVisual: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative', height: 320,
  },
  coinRing: {
    width: 220, height: 220, borderRadius: '50%',
    border: '2px solid rgba(255,69,0,0.3)',
    boxShadow: '0 0 60px rgba(255,69,0,0.12), inset 0 0 40px rgba(255,69,0,0.06)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  coinCore: {
    width: 140, height: 140, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,69,0,0.2) 0%, rgba(255,69,0,0.05) 60%, transparent 100%)',
    border: '1px solid rgba(255,69,0,0.5)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: 4,
  },
  coinTicker: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: '2.4rem', letterSpacing: '0.1em', color: '#ff4500',
  },
  coinChain: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.44rem', letterSpacing: '0.2em',
    color: 'rgba(255,69,0,0.6)',
  },
  coinOrbitDot1: {
    position: 'absolute', width: 8, height: 8, borderRadius: '50%',
    background: '#ff4500', top: 40, right: '30%',
    boxShadow: '0 0 12px rgba(255,69,0,0.8)',
  },
  coinOrbitDot2: {
    position: 'absolute', width: 5, height: 5, borderRadius: '50%',
    background: 'rgba(255,69,0,0.5)', bottom: 60, left: '28%',
  },

  tierGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 14, marginTop: 48,
  },
  tierCard: {
    background: '#0f0f0f',
    border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 10, padding: '24px',
  },
  tierNum: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem', letterSpacing: '0.2em',
    display: 'block', marginBottom: 8,
  },
  tierName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: '1.6rem', letterSpacing: '0.04em',
    marginBottom: 16,
  },
  tierRows: { display: 'flex', flexDirection: 'column', gap: 8 },
  tierRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  tierRowL: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.52rem', letterSpacing: '0.08em',
    color: 'rgba(240,240,238,0.35)',
  },
  tierRowR: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.56rem', letterSpacing: '0.05em',
    color: 'rgba(240,240,238,0.7)',
  },

  orangeBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.62rem', letterSpacing: '0.2em',
    background: '#ff4500', color: '#0a0a0a', fontWeight: 700,
    textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
    padding: '13px 28px',
  },
  outlineBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.62rem', letterSpacing: '0.2em',
    background: 'transparent', color: 'rgba(240,240,238,0.7)',
    border: '1px solid rgba(240,240,238,0.2)',
    textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
    padding: '13px 28px',
  },

  footer: {
    borderTop: '1px solid rgba(240,240,238,0.07)',
    padding: '48px 0 32px',
    background: '#0a0a0a',
  },
  footerGrid: {
    display: 'grid', gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'start', gap: 32, marginBottom: 32,
  },
  footerBrand: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: '1.2rem', letterSpacing: '0.1em',
    color: '#f0f0ee', marginBottom: 6,
  },
  footerTagline: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem', letterSpacing: '0.18em',
    color: 'rgba(240,240,238,0.25)',
  },
  footerLinks: { display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' },
  footerLink: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.52rem', letterSpacing: '0.12em',
    color: 'rgba(240,240,238,0.35)', textDecoration: 'none',
    padding: '4px 8px',
  },
  footerMeta: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.48rem', letterSpacing: '0.1em',
    color: 'rgba(240,240,238,0.22)', display: 'block', marginBottom: 4,
  },
  footerBar: {
    paddingTop: 24,
    borderTop: '1px solid rgba(240,240,238,0.05)',
    display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
  },
}
