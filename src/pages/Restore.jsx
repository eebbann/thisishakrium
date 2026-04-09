import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Nav from '../components/Nav'
import { useAuth } from '../context/AuthContext'

export default function Restore() {
  const { user, restore } = useAuth()
  const navigate          = useNavigate()
  const [words, setWords] = useState(Array(12).fill(''))
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { if (user) navigate(`/@${user.alias}`, { replace: true }) }, [user])

  const setWord = (i, val) => {
    const next = [...words]
    next[i] = val.trim().toLowerCase()
    setWords(next)
    setError('')
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').trim().split(/\s+/)
    if (pasted.length === 12) {
      e.preventDefault()
      setWords(pasted.map(w => w.toLowerCase()))
    }
  }

  const handleRestore = () => {
    if (words.some(w => !w)) { setError('Please fill in all 12 words.'); return }
    setLoading(true)
    setTimeout(() => {
      const acct = restore(words)
      if (acct) {
        navigate(`/@${acct.alias}`)
      } else {
        setError('Passphrase not recognised. Check your words and try again.')
        setLoading(false)
      }
    }, 600)
  }

  const filled = words.filter(Boolean).length

  return (
    <div style={s.page}>
      <Nav />
      <div style={s.wrap}>
        <div style={s.card}>
          <span style={s.kicker}>// RESTORE ACCOUNT</span>
          <h1 style={s.h1}>ENTER YOUR PASSPHRASE</h1>
          <p style={s.sub}>
            Enter your 12-word passphrase in order. Your wallet and identity will be
            restored automatically. You can also paste all 12 words at once.
          </p>

          <div style={s.grid}>
            {words.map((w, i) => (
              <div key={i} style={s.wordWrap}>
                <span style={s.wordNum}>{i + 1}</span>
                <input
                  type="text"
                  value={w}
                  onChange={e => setWord(i, e.target.value)}
                  onPaste={i === 0 ? handlePaste : undefined}
                  placeholder={`word ${i + 1}`}
                  style={s.input}
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                />
              </div>
            ))}
          </div>

          {error && (
            <div style={s.errorBox}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff4500" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <div style={s.progress}>
            <div style={{ ...s.progressBar, width: `${(filled / 12) * 100}%` }} />
          </div>
          <span style={s.progressLabel}>{filled} / 12 words entered</span>

          <button
            onClick={handleRestore}
            disabled={loading || filled < 12}
            style={{ ...s.btnPrimary, opacity: filled === 12 && !loading ? 1 : 0.35 }}
          >
            {loading ? 'RESTORING…' : 'RESTORE ACCOUNT'}
          </button>
        </div>

        <p style={s.joinLink}>
          Don't have an account?{' '}
          <Link to="/join" style={{ color: '#ff4500', textDecoration: 'none' }}>Create one free →</Link>
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
  card: {
    width: '100%',
    background: '#0f0f0f',
    border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 12, padding: '36px',
    display: 'flex', flexDirection: 'column', gap: 20,
  },
  kicker: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.58rem', letterSpacing: '0.22em', color: '#ff4500',
  },
  h1: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.4rem)',
    textTransform: 'uppercase', color: '#f0f0ee',
    lineHeight: 1, margin: 0,
  },
  sub: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300, fontSize: '0.88rem',
    color: 'rgba(240,240,238,0.5)', lineHeight: 1.75, margin: 0,
  },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
  },
  wordWrap: {
    display: 'flex', alignItems: 'center', gap: 6,
    background: '#141414', border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 6, padding: '8px 10px',
  },
  wordNum: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.44rem', color: 'rgba(240,240,238,0.25)', minWidth: 12,
  },
  input: {
    background: 'transparent', border: 'none', outline: 'none',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.7rem', color: '#f0f0ee', width: '100%',
    letterSpacing: '0.04em',
  },
  errorBox: {
    background: 'rgba(255,69,0,0.08)',
    border: '1px solid rgba(255,69,0,0.3)',
    borderRadius: 6, padding: '12px 14px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.82rem', color: 'rgba(240,240,238,0.6)',
    display: 'flex', alignItems: 'center', gap: 10,
  },
  progress: {
    height: 2, background: 'rgba(240,240,238,0.08)', borderRadius: 1,
    overflow: 'hidden',
  },
  progressBar: { height: '100%', background: '#ff4500', transition: 'width 0.2s' },
  progressLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem', letterSpacing: '0.1em',
    color: 'rgba(240,240,238,0.3)',
  },
  btnPrimary: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.62rem', letterSpacing: '0.2em',
    background: '#ff4500', color: '#0a0a0a', fontWeight: 700,
    border: 'none', padding: '14px', cursor: 'pointer',
  },
  joinLink: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.82rem', color: 'rgba(240,240,238,0.35)',
    marginTop: 24, textAlign: 'center',
  },
}
