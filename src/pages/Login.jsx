import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth, makeAlias, makePassphrase } from '../context/AuthContext'
import logoImg from '../assets/logo.png'

const INTERESTS = [
  'Tech','Finance','Crypto','Politics','Science','Art','Gaming',
  'Music','Film','Sports','Books','Health','Environment','Business','Travel','Culture',
]

export default function Login() {
  const { user, join, restore } = useAuth()
  const navigate                = useNavigate()
  const [searchParams]          = useSearchParams()

  // tab driven by ?tab= param — default to 'join' for new visitors
  const [tab, setTab]           = useState(() => searchParams.get('tab') === 'restore' ? 'restore' : 'join')

  // --- Join state ---
  const [step, setStep]         = useState(1)
  const [alias]                 = useState(makeAlias)
  const [phrase]                = useState(makePassphrase)
  const [saved, setSaved]       = useState(false)
  const [interests, setInterests] = useState([])
  const [joinDone, setJoinDone] = useState(false)

  // --- Restore state ---
  const [words, setWords]       = useState(Array(12).fill(''))
  const [restoreErr, setRestoreErr] = useState('')
  const [restoreLoad, setRestoreLoad] = useState(false)

  // Auto-redirect only for returning users (e.g. already logged in, or after restore)
  // NOT after a fresh join — we show the what's-next screen instead
  useEffect(() => {
    if (user && !joinDone) navigate(`/@${user.alias}`, { replace: true })
  }, [user])

  /* ── helpers ── */
  const toggleInterest = i =>
    setInterests(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i])

  const handleCreate = () => {
    join(alias, phrase, interests)
    setJoinDone(true)
    // No auto-redirect — user sees the what's-next screen and picks their own path
  }

  const setWord = (i, val) => {
    const next = [...words]; next[i] = val.trim().toLowerCase(); setWords(next)
    setRestoreErr('')
  }
  const handlePaste = e => {
    const parts = e.clipboardData.getData('text').trim().split(/\s+/)
    if (parts.length === 12) { e.preventDefault(); setWords(parts.map(w => w.toLowerCase())) }
  }
  const handleRestore = () => {
    if (words.some(w => !w)) { setRestoreErr('Fill in all 12 words.'); return }
    setRestoreLoad(true)
    setTimeout(() => {
      const acct = restore(words)
      if (acct) { navigate(`/@${acct.alias}`) }
      else {
        setRestoreErr('Passphrase not recognised. Note: this preview stores accounts locally — make sure you\'re on the same browser you signed up on.')
        setRestoreLoad(false)
      }
    }, 600)
  }
  const filled = words.filter(Boolean).length

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        {/* Logo */}
        <Link to="/" style={s.logoLink}>
          <img src={logoImg} alt="Hakrium" style={s.logo} />
        </Link>

        {/* ═══ WHAT'S NEXT — shown after successful join ═══ */}
        {joinDone && (
          <div style={{ ...s.card, alignItems: 'center', textAlign: 'center', gap: 20 }}>
            <div style={s.successDot} />
            <div>
              <span style={s.kicker}>// IDENTITY CONFIRMED</span>
              <h2 style={{ ...s.h1, marginTop: 8 }}>YOU'RE IN</h2>
            </div>
            <p style={s.sub}>
              Welcome, <span style={{ color: '#ff4500' }}>@{alias}</span>.<br />
              Your anonymous identity and wallet are live.
            </p>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={() => navigate('/discover')} style={{ ...s.btnPrimary, width: '100%', padding: '15px' }}>
                START EXPLORING →
              </button>
              <button onClick={() => navigate('/wallet')} style={{ ...s.btnGhost, width: '100%', padding: '12px', textAlign: 'center' }}>
                VIEW MY WALLET
              </button>
            </div>
          </div>
        )}

        {/* Tabs — only show when not in post-join state */}
        {!joinDone && (
          <div style={s.tabs}>
            <button onClick={() => { setTab('join'); setStep(1) }}
              style={{ ...s.tab, ...(tab === 'join' ? s.tabActive : {}) }}>
              CREATE ACCOUNT
            </button>
            <button onClick={() => { setTab('restore'); setStep(1) }}
              style={{ ...s.tab, ...(tab === 'restore' ? s.tabActive : {}) }}>
              SIGN IN
            </button>
          </div>
        )}

        {/* ═══ RESTORE / SIGN IN ═══ */}
        {tab === 'restore' && !joinDone && (
          <div style={s.card}>
            <span style={s.kicker}>// RESTORE WITH PASSPHRASE</span>
            <h1 style={s.h1}>WELCOME BACK</h1>
            <p style={s.sub}>Enter your 12-word passphrase to restore your account. You can paste all words at once.</p>

            <div style={s.phraseGrid}>
              {words.map((w, i) => (
                <div key={i} style={s.wordCell}>
                  <span style={s.wordNum}>{i + 1}</span>
                  <input
                    value={w}
                    onChange={e => setWord(i, e.target.value)}
                    onPaste={i === 0 ? handlePaste : undefined}
                    placeholder={`word ${i + 1}`}
                    style={s.wordInput}
                    autoCapitalize="none" autoCorrect="off" spellCheck={false}
                  />
                </div>
              ))}
            </div>

            <div style={s.progress}>
              <div style={{ ...s.progressBar, width: `${(filled / 12) * 100}%` }} />
            </div>
            <span style={s.progressLabel}>{filled} / 12</span>

            {restoreErr && <div style={s.error}>{restoreErr}</div>}

            <button
              onClick={handleRestore}
              disabled={restoreLoad || filled < 12}
              style={{ ...s.btnPrimary, opacity: filled === 12 && !restoreLoad ? 1 : 0.35 }}
            >
              {restoreLoad ? 'RESTORING…' : 'SIGN IN →'}
            </button>

            <p style={s.switchLine}>
              No account?{' '}
              <button onClick={() => setTab('join')} style={s.switchBtn}>Create one free →</button>
            </p>
          </div>
        )}

        {/* ═══ JOIN — Step 1: Alias ═══ */}
        {tab === 'join' && !joinDone && step === 1 && (
          <div style={s.card}>
            <div style={s.stepBar}>
              {[1,2,3].map(n => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ ...s.stepDot, ...(step >= n ? s.stepDotActive : {}) }}>{n}</div>
                  {n < 3 && <div style={{ ...s.stepLine, ...(step > n ? s.stepLineActive : {}) }} />}
                </div>
              ))}
            </div>

            <span style={s.kicker}>// YOUR IDENTITY</span>
            <h1 style={s.h1}>YOUR ALIAS IS READY</h1>
            <p style={s.sub}>
              Permanent and anonymous. No real name, no email, no phone.
              One alias works across every Hakrium platform.
            </p>

            <div style={s.aliasBox}>
              <span style={{ color: '#ff4500', fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.2rem' }}>@</span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.2rem', color: '#f0f0ee', letterSpacing: '0.04em' }}>{alias}</span>
            </div>

            <div style={s.infoRow}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(240,240,238,0.28)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span style={s.infoText}>Alias is permanent and cannot be changed after creation.</span>
            </div>

            <button onClick={() => setStep(2)} style={s.btnPrimary}>CONTINUE →</button>

            <p style={s.switchLine}>
              Already have an account?{' '}
              <button onClick={() => setTab('restore')} style={s.switchBtn}>Sign in →</button>
            </p>
          </div>
        )}

        {/* ═══ JOIN — Step 2: Passphrase ═══ */}
        {tab === 'join' && !joinDone && step === 2 && (
          <div style={s.card}>
            <div style={s.stepBar}>
              {[1,2,3].map(n => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ ...s.stepDot, ...(step >= n ? s.stepDotActive : {}) }}>
                    {step > n ? '✓' : n}
                  </div>
                  {n < 3 && <div style={{ ...s.stepLine, ...(step > n ? s.stepLineActive : {}) }} />}
                </div>
              ))}
            </div>

            <span style={s.kicker}>// SAVE YOUR PASSPHRASE</span>
            <h1 style={s.h1}>WRITE THESE DOWN</h1>
            <p style={s.sub}>
              12 words. Your password and your wallet key in one. Write them on paper — do not screenshot or copy to Notes.
            </p>

            <div style={s.phraseGrid}>
              {phrase.map((word, i) => (
                <div key={i} style={{ ...s.wordCell, cursor: 'default' }}>
                  <span style={s.wordNum}>{i + 1}</span>
                  <span style={{ fontFamily: "'Fragment Mono', monospace", fontSize: '0.7rem', color: '#f0f0ee', letterSpacing: '0.03em' }}>
                    {word}
                  </span>
                </div>
              ))}
            </div>

            <div style={s.storageNote}>
              <span style={s.storageNoteIcon}>⚠</span>
              <span style={s.storageNoteText}>
                Preview build — account is stored locally in this browser. In production, your passphrase derives your wallet on BNB Chain and works from any device.
              </span>
            </div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
              <input type="checkbox" checked={saved} onChange={e => setSaved(e.target.checked)}
                style={{ accentColor: '#ff4500', width: 15, height: 15, marginTop: 2 }} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', color: 'rgba(240,240,238,0.55)', lineHeight: 1.5 }}>
                I have written down my 12-word passphrase somewhere safe.
              </span>
            </label>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep(1)} style={s.btnGhost}>← BACK</button>
              <button onClick={() => setStep(3)} disabled={!saved}
                style={{ ...s.btnPrimary, flex: 1, opacity: saved ? 1 : 0.35 }}>CONTINUE →</button>
            </div>
          </div>
        )}

        {/* ═══ JOIN — Step 3: Interests ═══ */}
        {tab === 'join' && !joinDone && step === 3 && (
          <div style={s.card}>
            <div style={s.stepBar}>
              {[1,2,3].map(n => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ ...s.stepDot, ...(step >= n ? s.stepDotActive : {}) }}>
                    {n < 3 ? '✓' : n}
                  </div>
                  {n < 3 && <div style={{ ...s.stepLine, background: 'rgba(255,69,0,0.4)' }} />}
                </div>
              ))}
            </div>

            <span style={s.kicker}>// PERSONALISE YOUR FEED</span>
            <h1 style={s.h1}>WHAT ARE YOU INTO?</h1>
            <p style={s.sub}>Pick at least 3 topics. Shapes your Discover feed across all platforms.</p>

            <div style={s.interestGrid}>
              {INTERESTS.map(i => (
                <button key={i} onClick={() => toggleInterest(i)}
                  style={{ ...s.interestBtn, ...(interests.includes(i) ? s.interestOn : {}) }}>
                  {i}
                </button>
              ))}
            </div>

            <div style={{ fontFamily: "'Fragment Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.08em', textAlign: 'center',
              color: interests.length >= 3 ? '#00c896' : 'rgba(240,240,238,0.3)' }}>
              {interests.length < 3 ? `${3 - interests.length} more required` : `✓ ${interests.length} selected`}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep(2)} style={s.btnGhost}>← BACK</button>
              <button onClick={handleCreate} disabled={interests.length < 3}
                style={{ ...s.btnPrimary, flex: 1, opacity: interests.length >= 3 ? 1 : 0.35 }}>
                CREATE ACCOUNT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const s = {
  page: {
    background: '#0a0a0a', color: '#f0f0ee', minHeight: '100vh',
    display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
    padding: '48px clamp(1rem,4vw,2rem) 80px',
  },
  wrap: {
    width: '100%', maxWidth: 520,
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
  },
  logoLink: { display: 'flex' },
  logo: { height: 32, width: 'auto' },

  tabs: {
    display: 'flex', width: '100%',
    background: '#0f0f0f', border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 8, padding: 4, gap: 4,
  },
  tab: {
    flex: 1, fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em',
    background: 'transparent', border: 'none',
    color: 'rgba(240,240,238,0.35)', padding: '10px', cursor: 'pointer',
    borderRadius: 5, transition: 'all 0.15s', textTransform: 'uppercase',
  },
  tabActive: { background: '#141414', color: '#ff4500', border: '1px solid rgba(255,69,0,0.25)' },

  card: {
    width: '100%',
    background: '#0f0f0f', border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 12, padding: '32px',
    display: 'flex', flexDirection: 'column', gap: 18,
  },
  kicker: {
    fontFamily: "'Fragment Mono', monospace",
    fontSize: '0.56rem', letterSpacing: '0.22em', color: '#ff4500',
  },
  h1: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 'clamp(1.8rem,4vw,2.5rem)',
    textTransform: 'uppercase', color: '#f0f0ee', lineHeight: 1, margin: 0,
  },
  sub: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 400, fontSize: '0.88rem',
    color: 'rgba(240,240,238,0.5)', lineHeight: 1.75, margin: 0,
  },

  phraseGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6,
  },
  wordCell: {
    display: 'flex', alignItems: 'center', gap: 6,
    background: '#141414', border: '1px solid rgba(240,240,238,0.07)',
    borderRadius: 5, padding: '8px 10px',
  },
  wordNum: {
    fontFamily: "'Fragment Mono', monospace",
    fontSize: '0.42rem', color: 'rgba(240,240,238,0.22)', minWidth: 12,
  },
  wordInput: {
    background: 'transparent', border: 'none', outline: 'none',
    fontFamily: "'Fragment Mono', monospace",
    fontSize: '0.68rem', color: '#f0f0ee', width: '100%',
  },

  storageNote: {
    display: 'flex', alignItems: 'flex-start', gap: 8,
    background: 'rgba(255,170,0,0.06)',
    border: '1px solid rgba(255,170,0,0.22)',
    borderRadius: 6, padding: '10px 12px',
  },
  storageNoteIcon: {
    fontSize: '0.7rem', color: '#ffaa00', flexShrink: 0, marginTop: 1,
  },
  storageNoteText: {
    fontFamily: "'Fragment Mono', monospace",
    fontSize: '0.56rem', letterSpacing: '0.04em',
    color: 'rgba(240,240,238,0.38)', lineHeight: 1.7,
  },

  progress: { height: 2, background: 'rgba(240,240,238,0.07)', overflow: 'hidden' },
  progressBar: { height: '100%', background: '#ff4500', transition: 'width 0.2s' },
  progressLabel: {
    fontFamily: "'Fragment Mono', monospace",
    fontSize: '0.48rem', letterSpacing: '0.1em',
    color: 'rgba(240,240,238,0.28)',
  },

  error: {
    background: 'rgba(255,69,0,0.08)', border: '1px solid rgba(255,69,0,0.3)',
    borderRadius: 6, padding: '10px 14px',
    fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.82rem',
    color: 'rgba(240,240,238,0.6)', lineHeight: 1.6,
  },

  aliasBox: {
    background: '#141414', border: '1px solid rgba(255,69,0,0.3)',
    borderRadius: 8, padding: '18px 22px',
    display: 'flex', alignItems: 'center', gap: 4,
  },

  infoRow: {
    display: 'flex', alignItems: 'flex-start', gap: 8,
    background: 'rgba(240,240,238,0.03)',
    border: '1px solid rgba(240,240,238,0.07)',
    borderRadius: 6, padding: '10px 12px',
  },
  infoText: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.78rem', color: 'rgba(240,240,238,0.38)', lineHeight: 1.6,
  },

  stepBar: { display: 'flex', alignItems: 'center', gap: 0 },
  stepDot: {
    width: 26, height: 26, borderRadius: '50%',
    border: '1px solid rgba(240,240,238,0.15)', background: '#141414',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Fragment Mono', monospace", fontSize: '0.58rem',
    color: 'rgba(240,240,238,0.3)', flexShrink: 0,
  },
  stepDotActive: { border: '1px solid #ff4500', color: '#ff4500', background: 'rgba(255,69,0,0.1)' },
  stepLine: { width: 36, height: 1, background: 'rgba(240,240,238,0.1)' },
  stepLineActive: { background: 'rgba(255,69,0,0.4)' },

  interestGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 6,
  },
  interestBtn: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.72rem', fontWeight: 500,
    background: '#141414', border: '1px solid rgba(240,240,238,0.07)',
    borderRadius: 5, padding: '9px 10px',
    color: 'rgba(240,240,238,0.4)', cursor: 'pointer', transition: 'all 0.15s',
  },
  interestOn: {
    background: 'rgba(255,69,0,0.1)', border: '1px solid rgba(255,69,0,0.4)', color: '#ff4500',
  },

  btnPrimary: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '1rem', letterSpacing: '0.12em',
    background: '#ff4500', color: '#0a0a0a',
    border: 'none', padding: '13px', cursor: 'pointer', transition: 'background 0.15s',
    borderRadius: 4,
  },
  btnGhost: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em',
    background: 'transparent', color: 'rgba(240,240,238,0.5)',
    border: '1px solid rgba(240,240,238,0.12)',
    padding: '13px 18px', cursor: 'pointer', borderRadius: 4,
  },

  switchLine: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.82rem', color: 'rgba(240,240,238,0.35)',
    textAlign: 'center', margin: 0,
  },
  switchBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#ff4500', fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.82rem', padding: 0,
  },

  successDot: {
    width: 18, height: 18, borderRadius: '50%',
    background: '#00c896', boxShadow: '0 0 24px rgba(0,200,150,0.55)',
    animation: 'pulse-dot 1s ease-in-out infinite',
    flexShrink: 0,
  },
}
