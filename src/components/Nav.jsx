import { useState, useEffect } from 'react'
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <>
      <nav style={n.nav}>
        <div style={n.inner}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logoImg} alt="Hakrium" style={n.logo} />
          </Link>

          {/* Desktop links */}
          {!isMobile && (
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
          )}

          <div style={n.right}>
            {/* Desktop auth */}
            {!isMobile && (
              <>
                {user ? (
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
                ) : (
                  <>
                    <Link to="/login?tab=restore" style={n.restoreBtn}>SIGN IN</Link>
                    <Link to="/login?tab=join" style={n.joinBtn}>JOIN</Link>
                  </>
                )}
              </>
            )}

            {/* Mobile: balance chip (always visible if logged in) + hamburger */}
            {isMobile && (
              <>
                {user && (
                  <Link to="/wallet" style={n.chip}>
                    <span style={n.dot} />
                    {Number(user.balance).toLocaleString()} <span style={{ opacity: 0.55, marginLeft: 3 }}>HKM</span>
                  </Link>
                )}
                <button
                  onClick={() => setMenuOpen(o => !o)}
                  style={n.hamburger}
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                >
                  {menuOpen ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <line x1="3" y1="12" x2="21" y2="12"/>
                      <line x1="3" y1="18" x2="21" y2="18"/>
                    </svg>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {isMobile && menuOpen && (
        <div style={n.drawer}>
          <div style={n.drawerLinks}>
            {LINKS.map(l => (
              <Link
                key={l.to} to={l.to}
                style={{ ...n.drawerLink, ...(pathname.startsWith(l.to) ? n.drawerLinkActive : {}) }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div style={n.drawerDivider} />

          <div style={n.drawerAuth}>
            {user ? (
              <>
                <Link to={`/@${user.alias}`} style={n.drawerAlias}>
                  @{user.alias}
                </Link>
                <button onClick={handleLogout} style={n.drawerLogout}>
                  SIGN OUT
                </button>
              </>
            ) : (
              <>
                <Link to="/login?tab=join" style={n.drawerJoin}>CREATE ACCOUNT</Link>
                <Link to="/login?tab=restore" style={n.drawerSignin}>SIGN IN</Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
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
    fontFamily: "'Fragment Mono', monospace",
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
    fontFamily: "'Fragment Mono', monospace",
    fontSize: '0.56rem', letterSpacing: '0.05em',
    color: '#ff4500', textDecoration: 'none',
  },
  dot: {
    display: 'block', width: 5, height: 5, borderRadius: '50%',
    background: '#ff4500', animation: 'pulse-dot 1.4s ease-in-out infinite',
    flexShrink: 0,
  },
  aliasBtn: {
    fontFamily: "'Fragment Mono', monospace",
    fontSize: '0.54rem', letterSpacing: '0.08em',
    color: 'rgba(240,240,238,0.5)',
    textDecoration: 'none',
    border: '1px solid rgba(240,240,238,0.1)',
    borderRadius: 4,
    padding: '5px 12px',
  },
  logoutBtn: {
    background: 'transparent', border: 'none', cursor: 'pointer',
    color: 'rgba(240,240,238,0.28)', padding: '5px',
    display: 'flex', alignItems: 'center',
    transition: 'color 0.15s',
  },
  restoreBtn: {
    fontFamily: "'Fragment Mono', monospace",
    fontSize: '0.54rem', letterSpacing: '0.16em',
    color: 'rgba(240,240,238,0.4)',
    textDecoration: 'none',
    border: '1px solid rgba(240,240,238,0.1)',
    borderRadius: 4,
    padding: '6px 12px',
  },
  joinBtn: {
    fontFamily: "'Fragment Mono', monospace",
    fontSize: '0.56rem', letterSpacing: '0.2em',
    background: '#ff4500', color: '#0a0a0a',
    textDecoration: 'none', fontWeight: 700,
    padding: '7px 18px', borderRadius: 6,
  },

  // Hamburger
  hamburger: {
    background: 'transparent', border: 'none', cursor: 'pointer',
    color: 'rgba(240,240,238,0.6)', padding: '6px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'color 0.15s',
  },

  // Mobile drawer
  drawer: {
    position: 'sticky', top: 58, zIndex: 99,
    background: 'rgba(10,10,10,0.97)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(240,240,238,0.08)',
    padding: '12px 0 20px',
  },
  drawerLinks: {
    display: 'flex', flexDirection: 'column',
  },
  drawerLink: {
    fontFamily: "'Fragment Mono', monospace",
    fontSize: '0.7rem', letterSpacing: '0.2em',
    color: 'rgba(240,240,238,0.45)',
    textDecoration: 'none',
    padding: '14px clamp(1.5rem,4vw,3rem)',
    borderBottom: '1px solid rgba(240,240,238,0.04)',
    transition: 'color 0.15s',
  },
  drawerLinkActive: { color: '#ff4500' },
  drawerDivider: {
    height: 1,
    background: 'rgba(240,240,238,0.06)',
    margin: '8px 0',
  },
  drawerAuth: {
    display: 'flex', flexDirection: 'column', gap: 8,
    padding: '8px clamp(1.5rem,4vw,3rem) 0',
  },
  drawerAlias: {
    fontFamily: "'Fragment Mono', monospace",
    fontSize: '0.65rem', letterSpacing: '0.1em',
    color: 'rgba(240,240,238,0.5)',
    textDecoration: 'none',
    padding: '10px 0',
  },
  drawerLogout: {
    fontFamily: "'Fragment Mono', monospace",
    fontSize: '0.6rem', letterSpacing: '0.18em',
    background: 'transparent',
    border: '1px solid rgba(240,240,238,0.12)',
    color: 'rgba(240,240,238,0.4)',
    padding: '11px', cursor: 'pointer', borderRadius: 4,
    textTransform: 'uppercase',
  },
  drawerJoin: {
    fontFamily: "'Fragment Mono', monospace",
    fontSize: '0.65rem', letterSpacing: '0.18em',
    background: '#ff4500', color: '#0a0a0a', fontWeight: 700,
    textDecoration: 'none', textAlign: 'center',
    padding: '13px', borderRadius: 6,
  },
  drawerSignin: {
    fontFamily: "'Fragment Mono', monospace",
    fontSize: '0.62rem', letterSpacing: '0.16em',
    color: 'rgba(240,240,238,0.45)',
    textDecoration: 'none', textAlign: 'center',
    border: '1px solid rgba(240,240,238,0.1)',
    padding: '11px', borderRadius: 4,
  },
}
