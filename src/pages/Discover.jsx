import { useState } from 'react'
import Nav from '../components/Nav'
import { useAuth } from '../context/AuthContext'

const PLATFORMS = ['ALL', 'RAGE', 'PULSE', 'ECHO']

const PLATFORM_COLOR = { RAGE: '#ff4500', PULSE: '#4488ff', ECHO: '#ff4488' }

const POSTS = [
  { id: 1, platform: 'RAGE', alias: 'shadowwraith4821', content: 'The anonymous economy is the only real economy. Everything else is surveillance capitalism with a friendly UI.', tips: 1204, time: '3m', reactions: { fire: 891, agree: 340 } },
  { id: 2, platform: 'RAGE', alias: 'novacipher9023',   content: 'Hot take: if you need to know who said something to evaluate whether it\'s true, you\'ve already failed at critical thinking.', tips: 847, time: '11m', reactions: { fire: 400, agree: 220 } },
  { id: 3, platform: 'PULSE', alias: 'voidlens3311',    content: '[VIDEO] 4 minutes on why centralised social media is structurally incapable of rewarding honest creators.', tips: 3450, time: '22m', reactions: { fire: 1200, agree: 880 } },
  { id: 4, platform: 'RAGE', alias: 'hexgrid7812',      content: 'Every cashout burns 2% of HKM permanently. The platform literally gets more valuable the more people use it.', tips: 620, time: '38m', reactions: { fire: 310, agree: 180 } },
  { id: 5, platform: 'ECHO', alias: 'chromearc5509',    content: '[REPORT] Internal documents show major social platform adjusted content visibility for political clients 14 months before public knowledge.', tips: 5800, time: '1h', reactions: { fire: 2100, agree: 1600 } },
  { id: 6, platform: 'RAGE', alias: 'ironmesh2201',     content: 'AI will not replace writers. It will replace writers who refuse to evolve. The identity-free web gives humans the edge back.', tips: 430, time: '1h', reactions: { fire: 200, agree: 160 } },
  { id: 7, platform: 'PULSE', alias: 'zerosignal8844',  content: '[VIDEO] Live testing Bata P2P — traded 500 HKM for USDT in 18 seconds. No slippage. No KYC.', tips: 2100, time: '2h', reactions: { fire: 780, agree: 540 } },
  { id: 8, platform: 'RAGE', alias: 'lunarorbit6650',   content: 'Imagine a world where your income doesn\'t depend on platforms knowing your name. That\'s exactly what this builds.', tips: 980, time: '2h', reactions: { fire: 560, agree: 300 } },
  { id: 9, platform: 'ECHO', alias: 'forgepeak1177',    content: '[INVESTIGATION] Who owns the infrastructure behind the top 12 "decentralised" social networks? More than you think.', tips: 4200, time: '3h', reactions: { fire: 1800, agree: 1400 } },
  { id: 10, platform: 'RAGE', alias: 'sonicvault3388',  content: 'Freedom of speech means nothing if the algorithm decides who hears it. Hakrium fixes the algorithm problem.', tips: 760, time: '4h', reactions: { fire: 410, agree: 280 } },
]

export default function Discover() {
  const { user }       = useAuth()
  const [filter, setFilter] = useState('ALL')

  const posts = filter === 'ALL' ? POSTS : POSTS.filter(p => p.platform === filter)

  return (
    <div style={s.page}>
      <Nav />

      <div style={s.layout}>
        {/* Main feed */}
        <main style={s.main}>
          <div style={s.feedHeader}>
            <h1 style={s.h1}>DISCOVER</h1>
            <div style={s.filters}>
              {PLATFORMS.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{ ...s.filterBtn, ...(filter === f ? s.filterActive : {}) }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={s.feed}>
            {posts.map(post => {
              const color = PLATFORM_COLOR[post.platform] || '#ff4500'
              return (
                <article key={post.id} style={s.post}>
                  <div style={s.postHead}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ ...s.platformBadge, color, borderColor: `${color}44`, background: `${color}10` }}>
                        {post.platform}
                      </span>
                      <span style={s.alias}>@{post.alias}</span>
                    </div>
                    <span style={s.time}>{post.time}</span>
                  </div>

                  <p style={s.content}>{post.content}</p>

                  <div style={s.postFoot}>
                    <div style={s.reactions}>
                      <button style={s.reactionBtn}>
                        🔥 <span style={s.reactionCount}>{post.reactions.fire}</span>
                      </button>
                      <button style={s.reactionBtn}>
                        ✓ <span style={s.reactionCount}>{post.reactions.agree}</span>
                      </button>
                    </div>
                    <button style={s.tipBtn}>
                      <span style={s.tipAmount}>{post.tips.toLocaleString()} HKM</span>
                      <span style={s.tipLabel}>TIP</span>
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </main>

        {/* Sidebar */}
        <aside style={s.sidebar}>
          {/* Trending */}
          <div style={s.widget}>
            <span style={s.widgetTitle}>TRENDING TOPICS</span>
            {['#AnonymousEconomy','#HKMBurn','#BataP2P','#DAOVote001','#EchoInvestigation','#PulseCreators','#BNBChain'].map((tag, i) => (
              <div key={tag} style={s.trendRow}>
                <span style={s.trendNum}>{i + 1}</span>
                <span style={s.trendTag}>{tag}</span>
              </div>
            ))}
          </div>

          {/* Who to follow */}
          <div style={s.widget}>
            <span style={s.widgetTitle}>ACTIVE CREATORS</span>
            {[
              { alias: 'chromearc5509', tips: '12.4K HKM', platform: 'ECHO' },
              { alias: 'voidlens3311',  tips: '8.1K HKM',  platform: 'PULSE' },
              { alias: 'forgepeak1177', tips: '6.9K HKM',  platform: 'ECHO' },
              { alias: 'novacipher9023',tips: '5.2K HKM',  platform: 'RAGE' },
            ].map(c => (
              <div key={c.alias} style={s.creatorRow}>
                <div>
                  <div style={s.creatorAlias}>@{c.alias}</div>
                  <div style={s.creatorMeta}>{c.platform} · {c.tips} earned</div>
                </div>
                <span style={{ ...s.platformBadge, color: PLATFORM_COLOR[c.platform], borderColor: `${PLATFORM_COLOR[c.platform]}33`, background: `${PLATFORM_COLOR[c.platform]}0d`, fontSize: '0.42rem' }}>
                  {c.platform}
                </span>
              </div>
            ))}
          </div>

          {!user && (
            <div style={s.joinWidget}>
              <span style={s.joinWidgetTitle}>JOIN HAKRIUM</span>
              <p style={s.joinWidgetDesc}>Post, tip, and earn HKM — no name, no email, no phone.</p>
              <a href="/join" style={s.joinWidgetBtn}>CREATE ACCOUNT</a>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

const s = {
  page:   { background: '#0a0a0a', color: '#f0f0ee', minHeight: '100vh' },
  layout: {
    maxWidth: 1200, margin: '0 auto',
    padding: '40px clamp(1.5rem,4vw,3rem)',
    display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32,
  },
  main:   {},
  feedHeader: { marginBottom: 28 },
  h1: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.5rem)',
    textTransform: 'uppercase', color: '#f0f0ee',
    lineHeight: 1, marginBottom: 20,
  },
  filters: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  filterBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.54rem', letterSpacing: '0.14em',
    background: 'transparent',
    border: '1px solid rgba(240,240,238,0.1)',
    color: 'rgba(240,240,238,0.4)', padding: '6px 14px', cursor: 'pointer',
    transition: 'all 0.15s',
  },
  filterActive: {
    background: 'rgba(255,69,0,0.1)',
    border: '1px solid rgba(255,69,0,0.4)',
    color: '#ff4500',
  },

  feed: { display: 'flex', flexDirection: 'column', gap: 2 },
  post: {
    background: '#0f0f0f',
    border: '1px solid rgba(240,240,238,0.07)',
    borderRadius: 10, padding: '20px',
    display: 'flex', flexDirection: 'column', gap: 14,
    transition: 'background 0.2s',
  },
  postHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  platformBadge: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.46rem', letterSpacing: '0.1em',
    border: '1px solid', padding: '2px 8px',
  },
  alias: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.58rem', letterSpacing: '0.06em',
    color: 'rgba(240,240,238,0.5)',
  },
  time: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.46rem', color: 'rgba(240,240,238,0.25)',
  },
  content: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400, fontSize: '0.95rem',
    color: 'rgba(240,240,238,0.82)', lineHeight: 1.7,
  },
  postFoot: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  reactions: { display: 'flex', gap: 8 },
  reactionBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.56rem', letterSpacing: '0.06em',
    background: 'rgba(240,240,238,0.04)',
    border: '1px solid rgba(240,240,238,0.07)',
    borderRadius: 20, padding: '5px 12px', cursor: 'pointer',
    color: 'rgba(240,240,238,0.55)', display: 'flex', alignItems: 'center', gap: 5,
  },
  reactionCount: { color: 'rgba(240,240,238,0.45)' },
  tipBtn: {
    display: 'flex', alignItems: 'center', gap: 8,
    background: 'rgba(255,69,0,0.08)',
    border: '1px solid rgba(255,69,0,0.25)',
    padding: '6px 14px', cursor: 'pointer',
    borderRadius: 4,
  },
  tipAmount: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.54rem', color: '#ff4500', letterSpacing: '0.04em',
  },
  tipLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem', letterSpacing: '0.14em',
    color: 'rgba(240,240,238,0.45)',
  },

  sidebar: { display: 'flex', flexDirection: 'column', gap: 16 },
  widget: {
    background: '#0f0f0f',
    border: '1px solid rgba(240,240,238,0.07)',
    borderRadius: 10, padding: '20px',
    display: 'flex', flexDirection: 'column', gap: 12,
  },
  widgetTitle: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.52rem', letterSpacing: '0.2em',
    color: 'rgba(240,240,238,0.35)',
    borderBottom: '1px solid rgba(240,240,238,0.07)',
    paddingBottom: 10, marginBottom: 2,
  },
  trendRow: { display: 'flex', alignItems: 'center', gap: 10 },
  trendNum: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.46rem', color: 'rgba(240,240,238,0.2)', minWidth: 14,
  },
  trendTag: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.58rem', letterSpacing: '0.04em',
    color: 'rgba(240,240,238,0.65)',
  },
  creatorRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  creatorAlias: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.58rem', color: 'rgba(240,240,238,0.7)',
  },
  creatorMeta: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.46rem', color: 'rgba(240,240,238,0.3)',
  },
  joinWidget: {
    background: 'rgba(255,69,0,0.07)',
    border: '1px solid rgba(255,69,0,0.25)',
    borderRadius: 10, padding: '20px',
    display: 'flex', flexDirection: 'column', gap: 10,
  },
  joinWidgetTitle: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.54rem', letterSpacing: '0.18em', color: '#ff4500',
  },
  joinWidgetDesc: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300, fontSize: '0.82rem',
    color: 'rgba(240,240,238,0.5)', lineHeight: 1.6,
  },
  joinWidgetBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.54rem', letterSpacing: '0.16em',
    background: '#ff4500', color: '#0a0a0a', fontWeight: 700,
    textDecoration: 'none', padding: '10px', textAlign: 'center',
    display: 'block',
  },
}
