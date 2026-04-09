import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

const TIERS = [
  {
    name: 'CORE',    price: 'Free', color: 'rgba(240,240,238,0.4)',
    features: ['SDK access', 'Testnet HKM', 'Community forum', 'Basic docs', '100 req/min API'],
  },
  {
    name: 'GROWTH',  price: '500 HKM/mo', color: '#ff4500',
    features: ['Everything in Core', 'Priority API (1k req/min)', 'HKM payment integration', 'Analytics dashboard', 'Dedicated support'],
  },
  {
    name: 'SCALE',   price: '2,500 HKM/mo', color: '#ffaa00',
    features: ['Everything in Growth', 'Unlimited API', 'Custom subdomains', 'DAO listing', 'White-glove onboarding', 'Revenue share opt-in'],
  },
]

const FEATURED = [
  { name: 'RageClips',  category: 'Video',      desc: 'Short-form clips from Rage posts. HKM tips shared 80/20 with creators.', status: 'LIVE', hkm: true },
  { name: 'HKMStats',   category: 'Analytics',  desc: 'Real-time HKM ecosystem analytics — supply, burn rate, volume.', status: 'LIVE', hkm: false },
  { name: 'DeepEcho',   category: 'Journalism', desc: 'Long-form anonymous journalism platform powered by HKM subscriptions.', status: 'BETA', hkm: true },
  { name: 'ArenaFeed',  category: 'Predictions',desc: 'Curated Arena market feed with probability tracking.', status: 'BUILDING', hkm: true },
  { name: 'VaultDrop',  category: 'Marketplace',desc: 'Limited-edition digital drops priced and settled in HKM.', status: 'BUILDING', hkm: true },
  { name: 'PulseClips', category: 'Video',      desc: 'Pulse content discovery and cross-platform curation engine.', status: 'BUILDING', hkm: true },
]

const STATUS_COLOR = { LIVE: '#00c896', BETA: '#4488ff', BUILDING: 'rgba(240,240,238,0.35)' }

const STEPS = [
  { n: '01', title: 'Create a Hakrium account',  desc: 'You need a Hakrium alias and HKM wallet. Join free at thisishakrium.com/join.' },
  { n: '02', title: 'Apply for Builder access',  desc: 'Submit your project concept, expected user volume, and HKM integration plan.' },
  { n: '03', title: 'Integrate the SDK',         desc: 'Use our JavaScript/TypeScript SDK to handle auth, payments, and HKM tipping.' },
  { n: '04', title: 'Submit for DAO listing',    desc: 'Community votes to feature your platform in the official Hakrium ecosystem.' },
]

export default function Builders() {
  return (
    <div style={s.page}>
      <Nav />

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.container}>
          <span style={s.kicker}>// BUILDERS HUB</span>
          <h1 style={s.h1}>BUILD ON<br /><span style={{ color: '#ff4500' }}>HAKRIUM.</span></h1>
          <p style={s.heroSub}>
            Integrate HKM payments, anonymous auth, and ecosystem access into any platform.
            One SDK. One coin. Access to every Hakrium user.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#submit" style={s.orangeBtn}>SUBMIT YOUR PLATFORM</a>
            <a href="#sdk" style={s.ghostBtn}>VIEW SDK DOCS</a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={s.statsBar}>
        <div style={s.container}>
          <div style={s.statsGrid}>
            {[
              { label: 'Active Builders', val: '38' },
              { label: 'Platforms Listed', val: '6 Official + Community' },
              { label: 'HKM Integrated',  val: '100%' },
              { label: 'SDK Languages',   val: 'JS / TS / Python' },
            ].map(item => (
              <div key={item.label} style={s.statItem}>
                <span style={s.statLabel}>{item.label}</span>
                <span style={s.statVal}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <section style={s.section}>
        <div style={s.container}>
          <span style={s.kicker}>// GET STARTED</span>
          <h2 style={s.h2}>HOW IT WORKS</h2>
          <div style={s.stepsGrid}>
            {STEPS.map(step => (
              <div key={step.n} style={s.stepCard}>
                <div style={s.stepNum}>{step.n}</div>
                <h3 style={s.stepTitle}>{step.title}</h3>
                <p style={s.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDK */}
      <section id="sdk" style={{ ...s.section, background: '#0d0d0d' }}>
        <div style={s.container}>
          <span style={s.kicker}>// SDK</span>
          <h2 style={s.h2}>INTEGRATE IN MINUTES</h2>
          <p style={s.sub}>One package. Anonymous auth, HKM payments, tipping, and wallet access — all on BNB Chain.</p>

          <div style={s.codeBlock}>
            <div style={s.codeHeader}>
              <span style={s.codeLang}>bash</span>
            </div>
            <pre style={s.code}>{`npm install @hakrium/sdk`}</pre>
          </div>

          <div style={s.codeBlock}>
            <div style={s.codeHeader}>
              <span style={s.codeLang}>javascript</span>
            </div>
            <pre style={s.code}>{`import { HakriumSDK } from '@hakrium/sdk'

const sdk = new HakriumSDK({
  apiKey:  'hkm_builder_xxx',
  network: 'bsc-mainnet',
})

// Restore session from passphrase
const user = await sdk.auth.restore(passphrase)

// Tip a creator
await sdk.tip({
  to:       '0xabc...def',
  amount:   100, // HKM
  platform: 'my-platform',
})

// Subscribe via HKM payment
const sub = await sdk.pay({
  to:      '0xabc...def',
  amount:  500,
  memo:    'Monthly subscription',
})`}</pre>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section style={s.section}>
        <div style={s.container}>
          <span style={s.kicker}>// REGISTRATION TIERS</span>
          <h2 style={s.h2}>CHOOSE YOUR PLAN</h2>
          <div style={s.tierGrid}>
            {TIERS.map(t => (
              <div key={t.name} style={{ ...s.tierCard, ...(t.name === 'GROWTH' ? s.tierFeatured : {}) }}>
                {t.name === 'GROWTH' && <div style={s.featuredBadge}>MOST POPULAR</div>}
                <div style={{ ...s.tierName, color: t.color }}>{t.name}</div>
                <div style={s.tierPrice}>{t.price}</div>
                <div style={s.tierFeatures}>
                  {t.features.map(f => (
                    <div key={f} style={s.tierFeature}>
                      <span style={{ color: '#00c896' }}>✓</span>
                      <span style={s.featureText}>{f}</span>
                    </div>
                  ))}
                </div>
                <button style={{ ...s.tierBtn, ...(t.name === 'GROWTH' ? s.tierBtnActive : {}) }} disabled>
                  GET STARTED <span style={{ opacity: 0.5, marginLeft: 6, fontSize: '0.44rem' }}>(SOON)</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community platforms */}
      <section style={{ ...s.section, background: '#0d0d0d' }}>
        <div style={s.container}>
          <span style={s.kicker}>// COMMUNITY PLATFORMS</span>
          <h2 style={s.h2}>BUILT BY THE ECOSYSTEM</h2>
          <p style={s.sub}>Third-party platforms that integrate HKM and Hakrium auth. Community-built, DAO-listed.</p>

          <div style={s.platformGrid}>
            {FEATURED.map(p => (
              <div key={p.name} style={s.platformCard}>
                <div style={s.platformHead}>
                  <span style={s.platformCat}>{p.category}</span>
                  <span style={{ ...s.statusBadge, color: STATUS_COLOR[p.status] || 'rgba(240,240,238,0.35)', borderColor: `${STATUS_COLOR[p.status] || 'rgba(240,240,238,0.15)'}44` }}>
                    {p.status}
                  </span>
                </div>
                <h3 style={s.platformName}>{p.name}</h3>
                <p style={s.platformDesc}>{p.desc}</p>
                {p.hkm && <span style={s.hkmTag}>✓ HKM INTEGRATED</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit */}
      <section id="submit" style={s.section}>
        <div style={s.container}>
          <span style={s.kicker}>// SUBMIT YOUR PLATFORM</span>
          <h2 style={s.h2}>JOIN THE ECOSYSTEM</h2>
          <p style={s.sub}>Tell us what you're building. The DAO reviews and votes on new listings monthly.</p>

          <div style={s.form}>
            {[
              { label: 'Platform Name', ph: 'e.g. MyApp' },
              { label: 'Website URL',   ph: 'https://...' },
              { label: 'Category',      ph: 'e.g. Social, Finance, Media' },
              { label: 'Hakrium Alias', ph: '@youralias' },
            ].map(f => (
              <div key={f.label} style={s.formGroup}>
                <label style={s.formLabel}>{f.label}</label>
                <input style={s.formInput} placeholder={f.ph} />
              </div>
            ))}
            <div style={s.formGroup}>
              <label style={s.formLabel}>Description (max 300 chars)</label>
              <textarea style={s.formTextarea} placeholder="What does your platform do? How does it use HKM?" rows={4} />
            </div>
            <button style={{ ...s.orangeBtn, opacity: 0.5 }} disabled>
              SUBMIT FOR REVIEW <span style={{ opacity: 0.5, marginLeft: 8, fontSize: '0.44rem' }}>(SOON)</span>
            </button>
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

  hero: { padding: '80px 0 60px', borderBottom: '1px solid rgba(240,240,238,0.06)' },
  kicker: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.62rem', letterSpacing: '0.22em',
    color: '#ff4500', display: 'block', marginBottom: 18,
  },
  h1: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: 'clamp(2.5rem,7vw,6rem)',
    textTransform: 'uppercase', color: '#f0f0ee',
    lineHeight: 1, marginBottom: 20,
  },
  heroSub: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300, fontSize: '1rem',
    color: 'rgba(240,240,238,0.5)', lineHeight: 1.8,
    maxWidth: 520, marginBottom: 32,
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

  statsBar: {
    padding: '28px 0', background: '#0d0d0d',
    borderBottom: '1px solid rgba(240,240,238,0.06)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 28,
  },
  statItem: { display: 'flex', flexDirection: 'column', gap: 4 },
  statLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.46rem', letterSpacing: '0.14em', color: 'rgba(240,240,238,0.3)',
  },
  statVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700, fontSize: '1.15rem', color: '#f0f0ee',
  },

  stepsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 16, marginTop: 40,
  },
  stepCard: {
    background: '#0f0f0f', border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 10, padding: '24px',
  },
  stepNum: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: '3rem', color: 'rgba(255,69,0,0.2)',
    lineHeight: 1, marginBottom: 12,
  },
  stepTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700, fontSize: '1.2rem', color: '#f0f0ee', marginBottom: 8,
  },
  stepDesc: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300, fontSize: '0.85rem',
    color: 'rgba(240,240,238,0.5)', lineHeight: 1.7,
  },

  codeBlock: {
    background: '#0f0f0f', border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 8, overflow: 'hidden', marginBottom: 16,
  },
  codeHeader: {
    background: '#141414', padding: '8px 16px',
    borderBottom: '1px solid rgba(240,240,238,0.07)',
  },
  codeLang: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem', letterSpacing: '0.1em', color: 'rgba(240,240,238,0.3)',
  },
  code: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.75rem', color: 'rgba(240,240,238,0.75)',
    lineHeight: 1.8, padding: '20px', margin: 0, overflowX: 'auto',
    whiteSpace: 'pre',
  },

  tierGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 16, marginTop: 40,
  },
  tierCard: {
    background: '#0f0f0f', border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 10, padding: '28px',
    display: 'flex', flexDirection: 'column', gap: 16, position: 'relative',
  },
  tierFeatured: {
    border: '1px solid rgba(255,69,0,0.3)',
    background: 'rgba(255,69,0,0.04)',
  },
  featuredBadge: {
    position: 'absolute', top: -1, left: '50%',
    transform: 'translateX(-50%)',
    background: '#ff4500', color: '#0a0a0a',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.44rem', letterSpacing: '0.14em', fontWeight: 700,
    padding: '3px 12px',
  },
  tierName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: '1.8rem', letterSpacing: '0.04em',
  },
  tierPrice: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.78rem', color: 'rgba(240,240,238,0.6)',
  },
  tierFeatures: { display: 'flex', flexDirection: 'column', gap: 8, flex: 1 },
  tierFeature: { display: 'flex', alignItems: 'flex-start', gap: 8 },
  featureText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.84rem', color: 'rgba(240,240,238,0.55)',
  },
  tierBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.56rem', letterSpacing: '0.14em',
    background: 'rgba(240,240,238,0.05)', border: '1px solid rgba(240,240,238,0.12)',
    color: 'rgba(240,240,238,0.5)', padding: '11px', cursor: 'not-allowed',
  },
  tierBtnActive: {
    background: 'rgba(255,69,0,0.12)', border: '1px solid rgba(255,69,0,0.35)',
    color: '#ff4500',
  },

  platformGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 14, marginTop: 40,
  },
  platformCard: {
    background: '#0f0f0f', border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 10, padding: '20px',
    display: 'flex', flexDirection: 'column', gap: 10,
  },
  platformHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  platformCat: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.46rem', letterSpacing: '0.12em',
    color: 'rgba(240,240,238,0.3)',
  },
  statusBadge: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.44rem', letterSpacing: '0.1em',
    border: '1px solid', padding: '2px 8px',
  },
  platformName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: '1.4rem', color: '#f0f0ee',
  },
  platformDesc: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300, fontSize: '0.84rem',
    color: 'rgba(240,240,238,0.5)', lineHeight: 1.65,
  },
  hkmTag: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.44rem', letterSpacing: '0.1em',
    color: '#00c896', marginTop: 'auto',
  },

  form: { maxWidth: 540, display: 'flex', flexDirection: 'column', gap: 16, marginTop: 40 },
  formGroup: { display: 'flex', flexDirection: 'column', gap: 6 },
  formLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem', letterSpacing: '0.14em', color: 'rgba(240,240,238,0.4)',
  },
  formInput: {
    background: '#141414', border: '1px solid rgba(240,240,238,0.1)',
    borderRadius: 6, padding: '12px 14px', outline: 'none',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.88rem', color: '#f0f0ee',
  },
  formTextarea: {
    background: '#141414', border: '1px solid rgba(240,240,238,0.1)',
    borderRadius: 6, padding: '12px 14px', outline: 'none',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.88rem', color: '#f0f0ee', resize: 'vertical',
  },

  orangeBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.62rem', letterSpacing: '0.2em',
    background: '#ff4500', color: '#0a0a0a', fontWeight: 700,
    border: 'none', padding: '14px 28px', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', textDecoration: 'none',
  },
  ghostBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.62rem', letterSpacing: '0.18em',
    background: 'transparent', color: 'rgba(240,240,238,0.6)',
    border: '1px solid rgba(240,240,238,0.15)',
    textDecoration: 'none', padding: '14px 24px', display: 'inline-flex',
  },
}
