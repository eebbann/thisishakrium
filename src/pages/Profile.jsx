import { useParams, Link } from 'react-router-dom'
import Nav from '../components/Nav'
import { useAuth } from '../context/AuthContext'

const SAMPLE_POSTS = [
  { id: 1, platform: 'RAGE', content: 'Anonymity is not hiding. It\'s the refusal to let your identity be weaponised against your ideas.', tips: 420, time: '1h ago' },
  { id: 2, platform: 'RAGE', content: 'HKM burns 2% on every cashout. The more the platform grows, the more deflationary it gets. This is engineered scarcity.', tips: 880, time: '3h ago' },
  { id: 3, platform: 'RAGE', content: 'The next 10 years of the internet will be about who controls identity — and who refuses to be controlled.', tips: 1240, time: '1d ago' },
  { id: 4, platform: 'RAGE', content: 'Building in public as an anon is the ultimate proof of concept. The work speaks, not the name.', tips: 650, time: '2d ago' },
]

const PLATFORM_COLOR = { RAGE: '#ff4500', PULSE: '#4488ff', ECHO: '#ff4488' }

const BADGES = [
  { label: 'RAGE', color: '#ff4500', earned: true  },
  { label: 'BATA', color: '#00c896', earned: true  },
  { label: 'PULSE', color: '#4488ff', earned: false },
  { label: 'VAULT', color: '#ffaa00', earned: false },
  { label: 'ECHO', color: '#ff4488', earned: false  },
  { label: 'ARENA', color: '#00ccbb', earned: false },
]

export default function Profile() {
  const { alias }  = useParams()
  const { user }   = useAuth()

  const isOwn    = user?.alias === alias
  const tipTotal = SAMPLE_POSTS.reduce((a, p) => a + p.tips, 0)

  return (
    <div style={s.page}>
      <Nav />

      {/* Profile Header */}
      <div style={s.headerBg}>
        <div style={s.container}>
          <div style={s.profileHeader}>
            <div style={s.avatarWrap}>
              <div style={s.avatar}>
                <span style={s.avatarInitial}>{alias ? alias[0].toUpperCase() : '?'}</span>
              </div>
              {isOwn && <span style={s.ownBadge}>YOU</span>}
            </div>

            <div style={s.profileInfo}>
              <div style={s.aliasRow}>
                <h1 style={s.alias}>@{alias}</h1>
                {isOwn && (
                  <Link to="/wallet" style={s.walletLink}>
                    <span style={s.walletDot} />
                    {Number(user.balance).toLocaleString()} HKM
                  </Link>
                )}
              </div>

              <div style={s.statsRow}>
                <div style={s.statItem}>
                  <span style={s.statVal}>{SAMPLE_POSTS.length}</span>
                  <span style={s.statLabel}>Posts</span>
                </div>
                <div style={s.statItem}>
                  <span style={s.statVal}>{tipTotal.toLocaleString()}</span>
                  <span style={s.statLabel}>HKM Earned</span>
                </div>
                <div style={s.statItem}>
                  <span style={s.statVal}>248</span>
                  <span style={s.statLabel}>Supporters</span>
                </div>
                <div style={s.statItem}>
                  <span style={s.statVal}>Delegate</span>
                  <span style={s.statLabel}>DAO Tier</span>
                </div>
              </div>

              {/* Platform badges */}
              <div style={s.badges}>
                {BADGES.map(b => (
                  <span
                    key={b.label}
                    style={{
                      ...s.badge,
                      color:       b.earned ? b.color : 'rgba(240,240,238,0.2)',
                      borderColor: b.earned ? `${b.color}44` : 'rgba(240,240,238,0.08)',
                      background:  b.earned ? `${b.color}0d` : 'transparent',
                      opacity:     b.earned ? 1 : 0.4,
                    }}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            </div>

            {!isOwn && (
              <div style={s.actions}>
                <button style={s.tipBtn}>TIP HKM</button>
                <button style={s.followBtn}>FOLLOW</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wallet card if own */}
      {isOwn && (
        <div style={s.ownerBanner}>
          <div style={s.container}>
            <div style={s.ownerBannerInner}>
              <span style={s.kicker}>// YOUR WALLET</span>
              <code style={s.walletAddrText}>{user.wallet}</code>
              <span style={s.walletBnb}>{user.bnb} BNB available for gas</span>
              <Link to="/wallet" style={s.walletBtn}>OPEN WALLET →</Link>
            </div>
          </div>
        </div>
      )}

      {/* Posts */}
      <div style={s.container}>
        <div style={s.content}>
          {/* Feed */}
          <main style={s.main}>
            <span style={s.sectionTitle}>POSTS</span>
            <div style={s.posts}>
              {SAMPLE_POSTS.map(post => {
                const color = PLATFORM_COLOR[post.platform] || '#ff4500'
                return (
                  <article key={post.id} style={s.post}>
                    <div style={s.postTop}>
                      <span style={{ ...s.platBadge, color, borderColor: `${color}44`, background: `${color}0d` }}>
                        {post.platform}
                      </span>
                      <span style={s.postTime}>{post.time}</span>
                    </div>
                    <p style={s.postContent}>{post.content}</p>
                    <div style={s.postFoot}>
                      <button style={s.reactBtn}>🔥</button>
                      <button style={s.reactBtn}>✓</button>
                      <span style={s.tipLine}>
                        <span style={s.tipAmount}>{post.tips.toLocaleString()} HKM</span>
                        <button style={s.tipSmallBtn}>TIP</button>
                      </span>
                    </div>
                  </article>
                )
              })}
            </div>
          </main>

          {/* Sidebar */}
          <aside style={s.sidebar}>
            <div style={s.sideCard}>
              <span style={s.sectionTitle}>ECOSYSTEM PRESENCE</span>
              <div style={s.ecosList}>
                {BADGES.filter(b => b.earned).map(b => (
                  <div key={b.label} style={s.ecosItem}>
                    <span style={{ ...s.ecosDot, background: b.color }} />
                    <span style={{ ...s.ecosLabel, color: b.color }}>{b.label}</span>
                    <span style={s.ecosStatus}>Active</span>
                  </div>
                ))}
                {BADGES.filter(b => !b.earned).slice(0,2).map(b => (
                  <div key={b.label} style={{ ...s.ecosItem, opacity: 0.3 }}>
                    <span style={{ ...s.ecosDot, background: 'rgba(240,240,238,0.2)' }} />
                    <span style={s.ecosLabel}>{b.label}</span>
                    <span style={s.ecosStatus}>Not joined</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={s.sideCard}>
              <span style={s.sectionTitle}>TIP THIS CREATOR</span>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(240,240,238,0.45)', lineHeight: 1.6, marginBottom: 12 }}>
                Send HKM directly. Tips are instant and on-chain.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                {[50, 100, 250, 500].map(amt => (
                  <button key={amt} style={s.presetBtn}>{amt} HKM</button>
                ))}
              </div>
              <button style={{ ...s.tipBtn, width: '100%', justifyContent: 'center' }}>
                SEND TIP
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

const s = {
  page: { background: '#0a0a0a', color: '#f0f0ee', minHeight: '100vh' },
  container: { maxWidth: 1100, margin: '0 auto', padding: '0 clamp(1.5rem,4vw,3rem)' },
  kicker: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.52rem', letterSpacing: '0.2em', color: '#ff4500',
    display: 'block',
  },

  headerBg: {
    borderBottom: '1px solid rgba(240,240,238,0.07)',
    padding: '40px 0',
    background: 'linear-gradient(to bottom, rgba(255,69,0,0.04) 0%, transparent 100%)',
  },
  profileHeader: {
    display: 'flex', alignItems: 'flex-start', gap: 28, flexWrap: 'wrap',
  },
  avatarWrap: { position: 'relative', flexShrink: 0 },
  avatar: {
    width: 80, height: 80, borderRadius: '50%',
    background: 'rgba(255,69,0,0.15)',
    border: '2px solid rgba(255,69,0,0.4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  avatarInitial: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: '2.5rem', color: '#ff4500',
  },
  ownBadge: {
    position: 'absolute', bottom: 0, right: -4,
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.4rem', letterSpacing: '0.1em',
    background: '#ff4500', color: '#0a0a0a',
    padding: '1px 5px',
  },

  profileInfo: { flex: 1, display: 'flex', flexDirection: 'column', gap: 16 },
  aliasRow: { display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' },
  alias: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,3rem)',
    color: '#f0f0ee', letterSpacing: '0.02em', margin: 0,
  },
  walletLink: {
    display: 'flex', alignItems: 'center', gap: 6,
    background: 'rgba(255,69,0,0.08)', border: '1px solid rgba(255,69,0,0.25)',
    borderRadius: 20, padding: '4px 12px',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.56rem', color: '#ff4500', textDecoration: 'none',
  },
  walletDot: {
    display: 'block', width: 5, height: 5, borderRadius: '50%',
    background: '#ff4500', animation: 'pulse-dot 1.4s ease-in-out infinite',
  },

  statsRow: { display: 'flex', gap: 24, flexWrap: 'wrap' },
  statItem: { display: 'flex', flexDirection: 'column', gap: 2 },
  statVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: '1.4rem', color: '#f0f0ee',
  },
  statLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.46rem', letterSpacing: '0.1em',
    color: 'rgba(240,240,238,0.35)',
  },

  badges: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  badge: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.46rem', letterSpacing: '0.12em',
    border: '1px solid', padding: '3px 9px',
  },

  actions: { display: 'flex', flexDirection: 'column', gap: 8 },
  tipBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.58rem', letterSpacing: '0.16em',
    background: '#ff4500', border: 'none',
    color: '#0a0a0a', fontWeight: 700, padding: '10px 18px',
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
  },
  followBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.58rem', letterSpacing: '0.16em',
    background: 'transparent', border: '1px solid rgba(240,240,238,0.15)',
    color: 'rgba(240,240,238,0.55)', padding: '10px 18px', cursor: 'pointer',
  },

  ownerBanner: {
    background: '#0d0d0d',
    borderBottom: '1px solid rgba(240,240,238,0.06)',
    padding: '20px 0',
  },
  ownerBannerInner: {
    display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
  },
  walletAddrText: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.52rem', color: 'rgba(240,240,238,0.35)',
    background: 'rgba(240,240,238,0.04)',
    border: '1px solid rgba(240,240,238,0.07)',
    padding: '4px 10px', borderRadius: 4,
    maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  },
  walletBnb: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem', color: '#f3ba2f',
  },
  walletBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.54rem', letterSpacing: '0.14em',
    background: 'rgba(255,69,0,0.1)', border: '1px solid rgba(255,69,0,0.3)',
    color: '#ff4500', padding: '6px 14px',
    textDecoration: 'none', marginLeft: 'auto',
  },

  content: {
    display: 'grid', gridTemplateColumns: '1fr 280px',
    gap: 32, padding: '36px 0 80px',
  },
  main: {},
  sectionTitle: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.52rem', letterSpacing: '0.2em',
    color: 'rgba(240,240,238,0.3)',
    display: 'block', marginBottom: 16,
  },
  posts: { display: 'flex', flexDirection: 'column', gap: 2 },
  post: {
    background: '#0f0f0f', border: '1px solid rgba(240,240,238,0.07)',
    borderRadius: 10, padding: '20px',
    display: 'flex', flexDirection: 'column', gap: 12,
  },
  postTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  platBadge: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.46rem', letterSpacing: '0.1em',
    border: '1px solid', padding: '2px 8px',
  },
  postTime: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.44rem', color: 'rgba(240,240,238,0.25)',
  },
  postContent: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400, fontSize: '0.95rem',
    color: 'rgba(240,240,238,0.82)', lineHeight: 1.7,
  },
  postFoot: { display: 'flex', alignItems: 'center', gap: 8 },
  reactBtn: {
    fontFamily: "'Space Mono', monospace", fontSize: '0.7rem',
    background: 'rgba(240,240,238,0.04)', border: '1px solid rgba(240,240,238,0.07)',
    borderRadius: 20, padding: '4px 10px', cursor: 'pointer', color: '#f0f0ee',
  },
  tipLine: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 },
  tipAmount: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.54rem', color: '#ff4500',
  },
  tipSmallBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.48rem', letterSpacing: '0.14em',
    background: 'rgba(255,69,0,0.1)', border: '1px solid rgba(255,69,0,0.3)',
    color: '#ff4500', padding: '4px 10px', cursor: 'pointer',
  },

  sidebar: { display: 'flex', flexDirection: 'column', gap: 14 },
  sideCard: {
    background: '#0f0f0f', border: '1px solid rgba(240,240,238,0.07)',
    borderRadius: 10, padding: '20px',
    display: 'flex', flexDirection: 'column', gap: 12,
  },
  ecosList: { display: 'flex', flexDirection: 'column', gap: 8 },
  ecosItem: { display: 'flex', alignItems: 'center', gap: 10 },
  ecosDot:  { width: 7, height: 7, borderRadius: '50%', flexShrink: 0 },
  ecosLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.56rem', letterSpacing: '0.08em', flex: 1,
  },
  ecosStatus: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.44rem', color: 'rgba(240,240,238,0.25)',
  },
  presetBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.54rem', letterSpacing: '0.06em',
    background: '#141414', border: '1px solid rgba(240,240,238,0.1)',
    color: 'rgba(240,240,238,0.55)', padding: '6px 12px', cursor: 'pointer',
    borderRadius: 4,
  },
}
