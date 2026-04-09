import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logoImg from '../assets/logo.png'

const LINKS = [
  { label: 'ECOSYSTEM', to: '/ecosystem' },
  { label: 'HKM',       to: '/hkm' },
  { label: 'DAO',       to: '/dao' },
  { label: 'DISCOVER',  to: '/discover' },
  { label: 'BUILDERS',  to: '/builders' },
]

export default function Nav() {
  const { user, logout } = useAuth()
  const { pathname }     = useLocation()
  const navigate         = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <nav style={n.nav}>
      <div style={n.inner}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logoImg} alt="Hakrium" style={n.logo} />
        </Link>

        <div style={n.links}>
          {LINKS.map(l => (
            <Link
              key={l.to} to={l.to}
              style={{ ...n.link, ...(pathname.startsWith(l.to) ? n.active : {}) }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div style={n.right}>
          {user && (
            <>
              <Link to="/wallet" style={n.chip}>
                <span style={n.dot} />
                {Number(user.balance).toLocaleString()} <span style={{ opacity: 0.55, marginLeft: 3 }}>HKM</span>
              </Link>
              <Link to={`/@${user.alias}`} style={n.aliasBtn}>
                @{user.alias.slice(0, 14)}
              </Link>
              <button onClick={handleLogout} style={n.logoutBtn} title="Log out">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </button>
            </>
          )}
          {!user && (
            <>
              <Link to="/login?tab=restore" style={n.restoreBtn}>SIGN IN</Link>
              <Link to="/login?tab=join" style={n.joinBtn}>JOIN</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

const n = {
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(10,10,10,0.92)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(240,240,238,0.07)',
  },
  inner: {
    maxWidth: 1280, margin: '0 auto',
    padding: '0 clamp(1.5rem,4vw,3rem)',
    height: 58,
    display: 'flex', alignItems: 'center', gap: 16,
  },
  logo: { height: 28, width: 'auto', objectFit: 'contain' },
  links: { display: 'flex', alignItems: 'center', flex: 1, gap: 0, flexWrap: 'nowrap' },
  link: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.55rem', letterSpacing: '0.18em',
    color: 'rgba(240,240,238,0.38)',
    textDecoration: 'none', padding: '5px 10px',
    transition: 'color 0.15s', whiteSpace: 'nowrap',
  },
  active: { color: '#ff4500' },
  right: { display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', flexShrink: 0 },
  chip: {
    display: 'flex', alignItems: 'center', gap: 6,
    background: 'rgba(255,69,0,0.08)',
    border: '1px solid rgba(255,69,0,0.28)',
    borderRadius: 20, padding: '4px 12px',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.56rem', letterSpacing: '0.05em',
    color: '#ff4500', textDecoration: 'none',
  },
  dot: {
    display: 'block', width: 5, height: 5, borderRadius: '50%',
    background: '#ff4500', animation: 'pulse-dot 1.4s ease-in-out infinite',
    flexShrink: 0,
  },
  aliasBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.54rem', letterSpacing: '0.08em',
    color: 'rgba(240,240,238,0.5)',
    textDecoration: 'none',
    border: '1px solid rgba(240,240,238,0.1)',
    padding: '5px 12px',
  },
  logoutBtn: {
    background: 'transparent', border: 'none', cursor: 'pointer',
    color: 'rgba(240,240,238,0.28)', padding: '5px',
    display: 'flex', alignItems: 'center',
    transition: 'color 0.15s',
  },
  restoreBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.54rem', letterSpacing: '0.16em',
    color: 'rgba(240,240,238,0.4)',
    textDecoration: 'none',
    border: '1px solid rgba(240,240,238,0.1)',
    padding: '6px 12px',
  },
  joinBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.56rem', letterSpacing: '0.2em',
    background: '#ff4500', color: '#0a0a0a',
    textDecoration: 'none', fontWeight: 700,
    padding: '7px 18px',
  },
}
