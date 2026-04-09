import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import { useAuth } from '../context/AuthContext'

const TIERS = [
  { n: 0, name: 'Observer', hkm: '0–999',    lock: 'None',    votes: 'None', yield: '0%',   active: false },
  { n: 1, name: 'Delegate', hkm: '1,000+',   lock: '30 days', votes: '1×',   yield: '0.5%', active: true  },
  { n: 2, name: 'Steward',  hkm: '10,000+',  lock: '90 days', votes: '2×',   yield: '1.2%', active: true  },
  { n: 3, name: 'Council',  hkm: '100,000+', lock: '180 days',votes: '5×',   yield: '2.5%', active: true  },
]

const PROPOSALS = [
  {
    id: 'HIP-001', status: 'ACTIVE', title: 'Allocate 2% DAO treasury to Bata liquidity pool',
    desc: 'Proposal to direct 2% of monthly DAO treasury inflows into the Bata HKM/USDT liquidity pool to stabilise the pair.',
    votes: { for: 18204, against: 3811 }, ends: '2 days',
  },
  {
    id: 'HIP-002', status: 'ACTIVE', title: 'Reduce Rage cashout fee from 15% to 12%',
    desc: 'Lower the cashout fee on Rage to improve creator retention and grow overall platform volume.',
    votes: { for: 9120, against: 14500 }, ends: '5 days',
  },
  {
    id: 'HIP-003', status: 'PASSED', title: 'Launch Pulse beta with invite-only creator access',
    desc: 'Phase 2 Pulse platform to launch in closed beta for verified Steward and Council tier members first.',
    votes: { for: 31000, against: 2200 }, ends: 'Ended',
  },
]

export default function DAO() {
  const { user } = useAuth()

  return (
    <div style={s.page}>
      <Nav />

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.container}>
          <span style={s.kicker}>// HAKRIUM DAO</span>
          <h1 style={s.h1}>
            LOCK HKM.<br />
            <span style={{ color: 'rgba(240,240,238,0.14)' }}>VOTE.</span> EARN.
          </h1>
          <p style={s.heroSub}>
            The DAO governs every platform in the ecosystem. Lock HKM to gain voting power,
            earn staking yield, and shape the direction of Hakrium.
          </p>
        </div>
      </div>

      {/* Treasury */}
      <div style={s.treasuryBar}>
        <div style={s.container}>
          <div style={s.treasuryGrid}>
            {[
              { label: 'Treasury Structure', val: '3-of-5 Multisig' },
              { label: 'Team Seats',         val: '1 of 5' },
              { label: 'Community Seats',    val: '4 elected' },
              { label: 'Election Cycle',     val: 'Every 6 months' },
              { label: 'Treasury Allocation',val: '15% of supply' },
              { label: 'Governance Fee',     val: '3% of tx volume' },
            ].map(item => (
              <div key={item.label} style={s.treasuryItem}>
                <span style={s.tLabel}>{item.label}</span>
                <span style={s.tVal}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tiers */}
      <section style={s.section}>
        <div style={s.container}>
          <span style={s.kicker}>// GOVERNANCE TIERS</span>
          <h2 style={s.h2}>FOUR TIERS OF POWER</h2>
          <p style={s.sub}>Lock HKM for the required duration to unlock voting power and yield. Higher tiers, more influence.</p>

          <div style={s.tierGrid}>
            {TIERS.map(t => (
              <div key={t.n} style={{
                ...s.tierCard,
                ...(t.active ? { border: '1px solid rgba(255,69,0,0.22)', background: 'rgba(255,69,0,0.03)' } : {}),
              }}>
                <div style={s.tierHeader}>
                  <span style={{ ...s.tierNum, color: t.active ? '#ff4500' : 'rgba(240,240,238,0.25)' }}>TIER {t.n}</span>
                  {t.active && <span style={s.tierBadge}>STAKEABLE</span>}
                </div>
                <h3 style={{ ...s.tierName, color: t.active ? '#ff4500' : 'rgba(240,240,238,0.4)' }}>{t.name}</h3>

                <div style={s.tierDetails}>
                  {[['HKM Required', t.hkm], ['Lock Period', t.lock], ['Voting Power', t.votes], ['Yield / Year', t.yield]].map(([l, v]) => (
                    <div key={l} style={s.tierRow}>
                      <span style={s.tierRowL}>{l}</span>
                      <span style={{ ...s.tierRowR, color: l === 'Yield / Year' && t.active ? '#00c896' : undefined }}>{v}</span>
                    </div>
                  ))}
                </div>

                {t.active && (
                  <button style={s.lockBtn} disabled>
                    LOCK HKM <span style={{ opacity: 0.5, marginLeft: 6, fontSize: '0.45rem' }}>(SOON)</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Proposals */}
      <section style={{ ...s.section, background: '#0d0d0d' }}>
        <div style={s.container}>
          <span style={s.kicker}>// GOVERNANCE</span>
          <h2 style={s.h2}>ACTIVE PROPOSALS</h2>
          <p style={s.sub}>Delegate tier and above can vote. Votes are weighted by tier level.</p>

          <div style={s.proposalList}>
            {PROPOSALS.map(p => {
              const total = p.votes.for + p.votes.against
              const forPct = Math.round((p.votes.for / total) * 100)
              return (
                <div key={p.id} style={s.proposalCard}>
                  <div style={s.proposalHead}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={s.proposalId}>{p.id}</span>
                      <span style={{ ...s.proposalStatus, ...(p.status === 'ACTIVE' ? s.statusActive : s.statusPassed) }}>
                        {p.status === 'ACTIVE' && <span style={s.activeDot} />}
                        {p.status}
                      </span>
                    </div>
                    <span style={s.proposalEnds}>
                      {p.status === 'ACTIVE' ? `${p.ends} remaining` : 'Closed'}
                    </span>
                  </div>

                  <h3 style={s.proposalTitle}>{p.title}</h3>
                  <p style={s.proposalDesc}>{p.desc}</p>

                  <div style={s.voteBar}>
                    <div style={{ ...s.voteFor, width: `${forPct}%` }} />
                  </div>
                  <div style={s.voteStats}>
                    <span style={{ ...s.voteLabel, color: '#00c896' }}>FOR {p.votes.for.toLocaleString()} ({forPct}%)</span>
                    <span style={{ ...s.voteLabel, color: 'rgba(240,240,238,0.35)' }}>AGAINST {p.votes.against.toLocaleString()}</span>
                  </div>

                  {p.status === 'ACTIVE' && (
                    <div style={s.voteActions}>
                      <button style={s.voteFor_btn} disabled>VOTE FOR</button>
                      <button style={s.voteAgainst_btn} disabled>VOTE AGAINST</button>
                      <span style={s.voteNote}>Requires Delegate tier</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...s.section, textAlign: 'center' }}>
        <div style={{ ...s.container, maxWidth: 580 }}>
          <span style={s.kicker}>// PARTICIPATE</span>
          <h2 style={{ ...s.h2, textAlign: 'center' }}>JOIN THE DAO</h2>
          <p style={{ ...s.sub, textAlign: 'center', maxWidth: '100%' }}>
            Start with a free account. Earn HKM. Lock it to become a Delegate and start voting.
          </p>
          {!user
            ? <Link to="/join" style={s.orangeBtn}>CREATE ACCOUNT</Link>
            : <Link to="/wallet" style={s.orangeBtn}>GO TO WALLET</Link>
          }
        </div>
      </section>
    </div>
  )
}

const s = {
  page: { background: '#0a0a0a', color: '#f0f0ee', minHeight: '100vh' },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.5rem,4vw,3rem)' },
  section:   { padding: '80px 0' },

  hero: { padding: '80px 0 56px', borderBottom: '1px solid rgba(240,240,238,0.06)' },
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
    maxWidth: 520,
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

  treasuryBar: {
    padding: '28px 0',
    borderBottom: '1px solid rgba(240,240,238,0.06)',
    background: '#0d0d0d',
  },
  treasuryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: 24,
  },
  treasuryItem: { display: 'flex', flexDirection: 'column', gap: 4 },
  tLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.46rem', letterSpacing: '0.14em',
    color: 'rgba(240,240,238,0.3)',
  },
  tVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700, fontSize: '1.05rem', color: '#f0f0ee',
  },

  tierGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 14, marginTop: 40,
  },
  tierCard: {
    background: '#0f0f0f',
    border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 10, padding: '24px',
    display: 'flex', flexDirection: 'column', gap: 16,
  },
  tierHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  tierNum: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem', letterSpacing: '0.2em',
  },
  tierBadge: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.42rem', letterSpacing: '0.1em',
    background: 'rgba(255,69,0,0.1)', color: '#ff4500',
    border: '1px solid rgba(255,69,0,0.3)',
    padding: '2px 7px',
  },
  tierName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: '1.7rem', letterSpacing: '0.02em',
  },
  tierDetails: { display: 'flex', flexDirection: 'column', gap: 8 },
  tierRow:  { display: 'flex', justifyContent: 'space-between' },
  tierRowL: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem', letterSpacing: '0.08em',
    color: 'rgba(240,240,238,0.3)',
  },
  tierRowR: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.54rem', color: 'rgba(240,240,238,0.65)',
  },
  lockBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.56rem', letterSpacing: '0.14em',
    background: 'rgba(255,69,0,0.12)',
    border: '1px solid rgba(255,69,0,0.3)',
    color: '#ff4500', padding: '10px', cursor: 'not-allowed',
    marginTop: 'auto',
  },

  proposalList: { display: 'flex', flexDirection: 'column', gap: 16, marginTop: 40 },
  proposalCard: {
    background: '#0f0f0f',
    border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 10, padding: '24px',
    display: 'flex', flexDirection: 'column', gap: 14,
  },
  proposalHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 },
  proposalId: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.6rem', letterSpacing: '0.1em', color: '#ff4500',
  },
  proposalStatus: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.48rem', letterSpacing: '0.1em',
    border: '1px solid', padding: '3px 9px',
    display: 'inline-flex', alignItems: 'center', gap: 5,
  },
  statusActive: { color: '#00c896', borderColor: 'rgba(0,200,150,0.35)', background: 'rgba(0,200,150,0.08)' },
  statusPassed: { color: 'rgba(240,240,238,0.35)', borderColor: 'rgba(240,240,238,0.1)', background: 'transparent' },
  activeDot: {
    display: 'block', width: 5, height: 5, borderRadius: '50%',
    background: '#00c896', animation: 'pulse-dot 1.2s ease-in-out infinite',
  },
  proposalEnds: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.48rem', color: 'rgba(240,240,238,0.3)',
  },
  proposalTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700, fontSize: '1.3rem', color: '#f0f0ee',
  },
  proposalDesc: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300, fontSize: '0.87rem',
    color: 'rgba(240,240,238,0.5)', lineHeight: 1.7,
  },
  voteBar: {
    height: 4, background: 'rgba(240,240,238,0.07)',
    borderRadius: 2, overflow: 'hidden',
  },
  voteFor: { height: '100%', background: '#00c896', transition: 'width 0.3s' },
  voteStats: { display: 'flex', justifyContent: 'space-between' },
  voteLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.48rem', letterSpacing: '0.08em',
  },
  voteActions: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  voteFor_btn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.56rem', letterSpacing: '0.14em',
    background: 'rgba(0,200,150,0.12)', border: '1px solid rgba(0,200,150,0.3)',
    color: '#00c896', padding: '9px 18px', cursor: 'not-allowed',
  },
  voteAgainst_btn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.56rem', letterSpacing: '0.14em',
    background: 'rgba(240,240,238,0.04)', border: '1px solid rgba(240,240,238,0.1)',
    color: 'rgba(240,240,238,0.4)', padding: '9px 18px', cursor: 'not-allowed',
  },
  voteNote: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.46rem', letterSpacing: '0.08em',
    color: 'rgba(240,240,238,0.25)',
  },

  orangeBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.62rem', letterSpacing: '0.2em',
    background: '#ff4500', color: '#0a0a0a', fontWeight: 700,
    textDecoration: 'none', padding: '14px 32px', display: 'inline-flex',
  },
}
