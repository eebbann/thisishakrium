import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Nav from '../components/Nav'
import { useAuth, makeAlias, makePassphrase } from '../context/AuthContext'

const INTERESTS = [
  'Tech','Finance','Crypto','Politics','Science','Art','Gaming',
  'Music','Film','Sports','Books','Health','Environment','Business','Travel','Culture',
]

export default function Join() {
  const { user, join }        = useAuth()
  const navigate              = useNavigate()
  const [step, setStep]       = useState(1)
  const [alias]               = useState(makeAlias)
  const [phrase]              = useState(makePassphrase)
  const [saved, setSaved]     = useState(false)
  const [interests, setInterests] = useState([])
  const [done, setDone]       = useState(false)

  useEffect(() => { if (user) navigate(`/@${user.alias}`, { replace: true }) }, [user])

  const toggleInterest = (i) =>
    setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])

  const handleCreate = () => {
    join(alias, phrase, interests)
    setDone(true)
    setTimeout(() => navigate(`/wallet`), 2200)
  }

  if (done) return (
    <div style={s.page}>
      <Nav />
      <div style={s.successWrap}>
        <div style={s.successBox}>
          <div style={s.successDot} />
          <h2 style={s.successH}>ACCOUNT CREATED</h2>
          <p style={s.successSub}>Welcome to the ecosystem, <span style={{ color: '#ff4500' }}>@{alias}</span></p>
          <p style={{ ...s.successSub, fontSize: '0.75rem', opacity: 0.5 }}>Redirecting to wallet…</p>
        </div>
      </div>
    </div>
  )

  return (
    <div style={s.page}>
      <Nav />

      <div style={s.wrap}>
        {/* Step indicator */}
        <div style={s.steps}>
          {[1,2,3].map(n => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ ...s.stepDot, ...(step >= n ? s.stepDotActive : {}) }}>
                {step > n
                  ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  : n
                }
              </div>
              {n < 3 && <div style={{ ...s.stepLine, ...(step > n ? s.stepLineActive : {}) }} />}
            </div>
          ))}
        </div>

        {/* ── Step 1: Alias ── */}
        {step === 1 && (
          <div style={s.card}>
            <span style={s.kicker}>// STEP 1 OF 3</span>
            <h1 style={s.h1}>YOUR ALIAS IS READY</h1>
            <p style={s.sub}>
              This is your permanent identity across every Hakrium platform.
              Aliases are randomly generated — no real name, no email, no phone.
            </p>

            <div style={s.aliasBox}>
              <span style={s.aliasAt}>@</span>
              <span style={s.aliasName}>{alias}</span>
            </div>

            <div style={s.infoRow}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(240,240,238,0.3)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span style={s.infoText}>Your alias cannot be changed after account creation.</span>
            </div>

            <button onClick={() => setStep(2)} style={s.btnPrimary}>
              CONTINUE →
            </button>
          </div>
        )}

        {/* ── Step 2: Passphrase ── */}
        {step === 2 && (
          <div style={s.card}>
            <span style={s.kicker}>// STEP 2 OF 3</span>
            <h1 style={s.h1}>SAVE YOUR PASSPHRASE</h1>
            <p style={s.sub}>
              These 12 words are your password, your wallet key, and your only way to
              restore your account. Write them down somewhere safe. We cannot recover
              them for you.
            </p>

            <div style={s.phraseGrid}>
              {phrase.map((word, i) => (
                <div key={i} style={s.phraseCell}>
                  <span style={s.phraseNum}>{i + 1}</span>
                  <span style={s.phraseWord}>{word}</span>
                </div>
              ))}
            </div>

            <label style={s.checkRow}>
              <input
                type="checkbox"
                checked={saved}
                onChange={e => setSaved(e.target.checked)}
                style={{ accentColor: '#ff4500', width: 15, height: 15 }}
              />
              <span style={s.checkLabel}>I have written down my 12-word passphrase in a safe place.</span>
            </label>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(1)} style={s.btnGhost}>← BACK</button>
              <button onClick={() => setStep(3)} disabled={!saved} style={{ ...s.btnPrimary, opacity: saved ? 1 : 0.35 }}>
                CONTINUE →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Interests ── */}
        {step === 3 && (
          <div style={s.card}>
            <span style={s.kicker}>// STEP 3 OF 3</span>
            <h1 style={s.h1}>WHAT ARE YOU INTO?</h1>
            <p style={s.sub}>
              Select at least 3 topics. This shapes your Discover feed and connects you
              with content across the ecosystem.
            </p>

            <div style={s.interestGrid}>
              {INTERESTS.map(i => (
                <button
                  key={i}
                  onClick={() => toggleInterest(i)}
                  style={{
                    ...s.interestBtn,
                    ...(interests.includes(i) ? s.interestActive : {}),
                  }}
                >
                  {i}
                </button>
              ))}
            </div>

            <div style={s.interestCount}>
              {interests.length < 3
                ? <span style={{ color: 'rgba(240,240,238,0.35)' }}>Select {3 - interests.length} more</span>
                : <span style={{ color: '#00c896' }}>✓ {interests.length} selected</span>
              }
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(2)} style={s.btnGhost}>← BACK</button>
              <button
                onClick={handleCreate}
                disabled={interests.length < 3}
                style={{ ...s.btnPrimary, opacity: interests.length >= 3 ? 1 : 0.35 }}
              >
                CREATE ACCOUNT
              </button>
            </div>
          </div>
        )}

        <p style={s.restoreLink}>
          Already have an account?{' '}
          <Link to="/restore" style={{ color: '#ff4500', textDecoration: 'none' }}>Restore with passphrase →</Link>
        </p>
      </div>
    </div>
  )
}

const s = {
  page: { background: '#0a0a0a', color: '#f0f0ee', minHeight: '100vh' },
  wrap: {
    maxWidth: 560, margin: '0 auto',
    padding: '56px clamp(1.5rem,4vw,2rem) 80px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
  },
  steps: { display: 'flex', alignItems: 'center', gap: 0, marginBottom: 40 },
  stepDot: {
    width: 28, height: 28, borderRadius: '50%',
    border: '1px solid rgba(240,240,238,0.15)',
    background: '#0f0f0f',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Space Mono', monospace", fontSize: '0.6rem',
    color: 'rgba(240,240,238,0.35)', flexShrink: 0,
  },
  stepDotActive: {
    border: '1px solid #ff4500', color: '#ff4500', background: 'rgba(255,69,0,0.1)',
  },
  stepLine: { width: 48, height: 1, background: 'rgba(240,240,238,0.1)' },
  stepLineActive: { background: 'rgba(255,69,0,0.4)' },

  card: {
    width: '100%',
    background: '#0f0f0f',
    border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 12, padding: '36px',
    display: 'flex', flexDirection: 'column', gap: 20,
  },
  kicker: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.58rem', letterSpacing: '0.22em',
    color: '#ff4500',
  },
  h1: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.6rem)',
    letterSpacing: '-0.01em', textTransform: 'uppercase',
    color: '#f0f0ee', lineHeight: 1, margin: 0,
  },
  sub: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300, fontSize: '0.9rem',
    color: 'rgba(240,240,238,0.5)', lineHeight: 1.75, margin: 0,
  },

  aliasBox: {
    background: '#141414',
    border: '1px solid rgba(255,69,0,0.3)',
    borderRadius: 8, padding: '20px 24px',
    display: 'flex', alignItems: 'center', gap: 4,
  },
  aliasAt: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700, fontSize: '2rem', color: '#ff4500',
  },
  aliasName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: '2rem', color: '#f0f0ee', letterSpacing: '0.02em',
  },

  infoRow: {
    display: 'flex', alignItems: 'flex-start', gap: 10,
    background: 'rgba(240,240,238,0.03)',
    border: '1px solid rgba(240,240,238,0.07)',
    borderRadius: 6, padding: '12px 14px',
  },
  infoText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.8rem', color: 'rgba(240,240,238,0.4)', lineHeight: 1.6,
  },

  phraseGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 8,
  },
  phraseCell: {
    background: '#141414',
    border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 6, padding: '10px 12px',
    display: 'flex', alignItems: 'center', gap: 8,
  },
  phraseNum: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.45rem', color: 'rgba(240,240,238,0.25)',
    minWidth: 14,
  },
  phraseWord: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.72rem', color: '#f0f0ee', letterSpacing: '0.04em',
  },

  checkRow: {
    display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer',
  },
  checkLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.85rem', color: 'rgba(240,240,238,0.6)', lineHeight: 1.5,
  },

  interestGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
    gap: 8,
  },
  interestBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.6rem', letterSpacing: '0.1em',
    background: '#141414',
    border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 6, padding: '10px 12px',
    color: 'rgba(240,240,238,0.45)', cursor: 'pointer',
    transition: 'all 0.15s',
  },
  interestActive: {
    background: 'rgba(255,69,0,0.1)',
    border: '1px solid rgba(255,69,0,0.4)',
    color: '#ff4500',
  },
  interestCount: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.6rem', letterSpacing: '0.1em',
    textAlign: 'center',
  },

  btnPrimary: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.62rem', letterSpacing: '0.2em',
    background: '#ff4500', color: '#0a0a0a', fontWeight: 700,
    border: 'none', padding: '13px 28px', cursor: 'pointer',
    flex: 1, transition: 'background 0.15s',
  },
  btnGhost: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.62rem', letterSpacing: '0.15em',
    background: 'transparent', color: 'rgba(240,240,238,0.55)',
    border: '1px solid rgba(240,240,238,0.14)',
    padding: '13px 20px', cursor: 'pointer',
  },

  restoreLink: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.82rem', color: 'rgba(240,240,238,0.35)',
    marginTop: 24, textAlign: 'center',
  },

  successWrap: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: 'calc(100vh - 58px)',
  },
  successBox: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
    textAlign: 'center',
  },
  successDot: {
    width: 16, height: 16, borderRadius: '50%',
    background: '#00c896', boxShadow: '0 0 20px rgba(0,200,150,0.6)',
    animation: 'pulse-dot 1s ease-in-out infinite',
  },
  successH: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: '2.5rem', letterSpacing: '0.04em', margin: 0,
  },
  successSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.9rem', color: 'rgba(240,240,238,0.55)', margin: 0,
  },
}
