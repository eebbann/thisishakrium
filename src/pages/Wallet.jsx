import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import { useAuth } from '../context/AuthContext'

const TX = [
  { type: 'tip_in',   amount: '+125',    desc: 'Tip received',         from: 'ghostnexus8811', platform: 'RAGE',  time: '2h ago' },
  { type: 'tip_in',   amount: '+88',     desc: 'Tip received',         from: 'ironwolf4422',   platform: 'RAGE',  time: '5h ago' },
  { type: 'tip_out',  amount: '-50',     desc: 'Tip sent',             to:   'chromearc5509',  platform: 'ECHO',  time: '8h ago' },
  { type: 'earn',     amount: '+340',    desc: 'DAO yield distribution',from: 'treasury',      platform: 'DAO',   time: '1d ago' },
  { type: 'cashout',  amount: '-1000',   desc: 'Cashout to bank',      burn: '20 HKM burned',  platform: 'BATA',  time: '2d ago' },
  { type: 'tip_in',   amount: '+210',    desc: 'Tip received',         from: 'solarshard9921', platform: 'RAGE',  time: '3d ago' },
  { type: 'buy',      amount: '+500',    desc: 'HKM purchased',        from: 'PancakeSwap',    platform: 'BNB',   time: '5d ago' },
]

const TYPE_COLOR = {
  tip_in:  '#00c896',
  earn:    '#00c896',
  buy:     '#4488ff',
  tip_out: 'rgba(240,240,238,0.45)',
  cashout: '#ffaa00',
}

export default function Wallet() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab]           = useState('overview')
  const [sendAmount, setSendAmount] = useState('')
  const [sendAddr, setSendAddr]   = useState('')
  const [cashoutAmt, setCashoutAmt] = useState('')

  if (!user) return (
    <div style={s.page}>
      <Nav />
      <div style={s.gateWrap}>
        <div style={s.gateBox}>
          <span style={s.kicker}>// WALLET</span>
          <h2 style={s.h2}>JOIN TO ACCESS WALLET</h2>
          <p style={s.gateSub}>Create a Hakrium account to manage your HKM balance.</p>
          <Link to="/join" style={s.orangeBtn}>CREATE ACCOUNT</Link>
        </div>
      </div>
    </div>
  )

  const balance = Number(user.balance)
  const bnb     = Number(user.bnb)

  return (
    <div style={s.page}>
      <Nav />
      <div style={s.container}>

        {/* Balance Card */}
        <div style={s.balanceCard}>
          <div style={s.balanceLine}>
            <div>
              <span style={s.balanceLabel}>HKM BALANCE</span>
              <div style={s.balanceAmount}>
                {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                <span style={s.balanceCurrency}> HKM</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={s.balanceLabel}>BNB BALANCE</span>
              <div style={{ ...s.balanceAmount, fontSize: '1.5rem', color: '#f3ba2f' }}>
                {bnb} <span style={{ fontSize: '0.8rem' }}>BNB</span>
              </div>
            </div>
          </div>
          <div style={s.walletAddr}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(240,240,238,0.3)" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/></svg>
            <span style={s.addrText}>{user.wallet}</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={s.tabs}>
          {[['overview','Overview'],['send','Send'],['receive','Receive'],['cashout','Cashout']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              style={{ ...s.tab, ...(tab === id ? s.tabActive : {}) }}>
              {label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div style={s.panel}>
            <div style={s.statsRow}>
              {[
                { label: 'Tips Received', val: '763 HKM' },
                { label: 'Tips Sent',     val: '50 HKM' },
                { label: 'DAO Yield',     val: '340 HKM' },
                { label: 'Total Burned',  val: '20 HKM' },
              ].map(stat => (
                <div key={stat.label} style={s.miniStat}>
                  <span style={s.miniStatLabel}>{stat.label}</span>
                  <span style={s.miniStatVal}>{stat.val}</span>
                </div>
              ))}
            </div>

            <span style={s.sectionTitle}>TRANSACTION HISTORY</span>
            <div style={s.txList}>
              {TX.map((tx, i) => (
                <div key={i} style={s.txRow}>
                  <div style={s.txLeft}>
                    <div style={{ ...s.txDot, background: TYPE_COLOR[tx.type] || 'rgba(240,240,238,0.3)' }} />
                    <div>
                      <div style={s.txDesc}>{tx.desc}</div>
                      <div style={s.txMeta}>
                        {tx.from && `from @${tx.from}`}
                        {tx.to   && `to @${tx.to}`}
                        {tx.burn && ` · ${tx.burn}`}
                        {' · '}{tx.platform} · {tx.time}
                      </div>
                    </div>
                  </div>
                  <span style={{ ...s.txAmount, color: TYPE_COLOR[tx.type] || 'rgba(240,240,238,0.5)' }}>
                    {tx.amount} HKM
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Send */}
        {tab === 'send' && (
          <div style={{ ...s.panel, maxWidth: 480 }}>
            <span style={s.kicker}>// SEND HKM</span>
            <p style={s.panelSub}>Send HKM to any Hakrium wallet address on BNB Chain.</p>
            <div style={s.formGroup}>
              <label style={s.formLabel}>Recipient Address</label>
              <input
                style={s.formInput}
                placeholder="0x..."
                value={sendAddr}
                onChange={e => setSendAddr(e.target.value)}
              />
            </div>
            <div style={s.formGroup}>
              <label style={s.formLabel}>Amount (HKM)</label>
              <input
                style={s.formInput}
                type="number"
                placeholder="0.00"
                value={sendAmount}
                onChange={e => setSendAmount(e.target.value)}
              />
              <span style={s.formHint}>Balance: {balance.toLocaleString()} HKM · Gas ~$0.10 BNB</span>
            </div>
            <button style={{ ...s.orangeBtn, width: '100%', justifyContent: 'center' }} disabled>
              SEND HKM <span style={{ opacity: 0.5, marginLeft: 8, fontSize: '0.44rem' }}>(MAINNET SOON)</span>
            </button>
          </div>
        )}

        {/* Receive */}
        {tab === 'receive' && (
          <div style={{ ...s.panel, maxWidth: 480 }}>
            <span style={s.kicker}>// RECEIVE HKM</span>
            <p style={s.panelSub}>Share your wallet address to receive HKM on BNB Chain (BEP-20).</p>
            <div style={s.qrPlaceholder}>
              <svg width="80" height="80" viewBox="0 0 100 100">
                {[0,1,2,3,4,5,6].map(r => [0,1,2,3,4,5,6].map(c => {
                  const show = (r < 3 && c < 3) || (r < 3 && c > 3) || (r > 3 && c < 3) || Math.random() > 0.4
                  return show ? <rect key={`${r}${c}`} x={c*14+1} y={r*14+1} width={12} height={12} fill="rgba(255,69,0,0.7)" rx={1} /> : null
                }))}
              </svg>
              <span style={s.qrLabel}>QR (Mainnet)</span>
            </div>
            <div style={s.addrBox}>
              <span style={s.addrBoxText}>{user.wallet}</span>
              <button onClick={() => navigator.clipboard.writeText(user.wallet)} style={s.copyBtn}>
                COPY
              </button>
            </div>
            <div style={s.networkBadge}>
              <span style={s.bnbBadge}>BNB CHAIN · BEP-20 · CHAIN ID 56</span>
            </div>
          </div>
        )}

        {/* Cashout */}
        {tab === 'cashout' && (
          <div style={{ ...s.panel, maxWidth: 480 }}>
            <span style={s.kicker}>// CASHOUT HKM</span>
            <p style={s.panelSub}>
              Convert HKM to fiat via Paystack (NGN) or bank transfer.
              A 15% cashout fee applies. 2% is permanently burned.
            </p>
            <div style={s.feeBreakdown}>
              <div style={s.feeRow}>
                <span style={s.feeLbl}>Cashout Fee</span>
                <span style={s.feeVal}>15%</span>
              </div>
              <div style={s.feeRow}>
                <span style={s.feeLbl}>Burn (of fee)</span>
                <span style={s.feeVal}>2% permanent</span>
              </div>
              <div style={s.feeRow}>
                <span style={s.feeLbl}>You receive</span>
                <span style={{ ...s.feeVal, color: '#00c896' }}>
                  {cashoutAmt ? ((Number(cashoutAmt) * 0.85).toFixed(2) + ' HKM worth') : '85% of amount'}
                </span>
              </div>
            </div>
            <div style={s.formGroup}>
              <label style={s.formLabel}>Amount to Cashout (HKM)</label>
              <input
                style={s.formInput}
                type="number"
                placeholder="Min: 100 HKM"
                value={cashoutAmt}
                onChange={e => setCashoutAmt(e.target.value)}
              />
            </div>
            <button style={{ ...s.orangeBtn, width: '100%', justifyContent: 'center', opacity: 0.5 }} disabled>
              REQUEST CASHOUT <span style={{ marginLeft: 8, fontSize: '0.44rem' }}>(SOON)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const s = {
  page: { background: '#0a0a0a', color: '#f0f0ee', minHeight: '100vh' },
  container: { maxWidth: 1100, margin: '0 auto', padding: '40px clamp(1.5rem,4vw,3rem) 80px' },
  kicker: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.6rem', letterSpacing: '0.22em', color: '#ff4500',
    display: 'block', marginBottom: 10,
  },
  h2: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: '2.5rem', textTransform: 'uppercase',
    color: '#f0f0ee', marginBottom: 14,
  },

  gateWrap: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 58px)' },
  gateBox:  { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 },
  gateSub:  { fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.9rem', color: 'rgba(240,240,238,0.5)' },

  balanceCard: {
    background: '#0f0f0f',
    border: '1px solid rgba(255,69,0,0.2)',
    borderTop: '3px solid #ff4500',
    borderRadius: 10, padding: '28px',
    marginBottom: 24,
  },
  balanceLine: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 },
  balanceLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.52rem', letterSpacing: '0.18em',
    color: 'rgba(240,240,238,0.35)', display: 'block', marginBottom: 6,
  },
  balanceAmount: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)',
    color: '#ff4500', lineHeight: 1,
  },
  balanceCurrency: { fontSize: '1rem', opacity: 0.7 },
  walletAddr: {
    display: 'flex', alignItems: 'center', gap: 8,
    background: '#141414', border: '1px solid rgba(240,240,238,0.07)',
    borderRadius: 6, padding: '8px 12px',
  },
  addrText: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.52rem', color: 'rgba(240,240,238,0.4)',
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  },

  tabs: { display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid rgba(240,240,238,0.07)' },
  tab: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.56rem', letterSpacing: '0.14em',
    background: 'transparent', border: 'none', borderBottom: '2px solid transparent',
    color: 'rgba(240,240,238,0.4)', padding: '12px 18px', cursor: 'pointer',
    marginBottom: '-1px', transition: 'all 0.15s',
  },
  tabActive: { color: '#ff4500', borderBottomColor: '#ff4500' },

  panel: { paddingTop: 8 },
  panelSub: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300, fontSize: '0.88rem',
    color: 'rgba(240,240,238,0.5)', lineHeight: 1.7, marginBottom: 24,
  },

  statsRow: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 12, marginBottom: 32,
  },
  miniStat: {
    background: '#0f0f0f', border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 8, padding: '16px',
    display: 'flex', flexDirection: 'column', gap: 4,
  },
  miniStatLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.46rem', letterSpacing: '0.12em', color: 'rgba(240,240,238,0.3)',
  },
  miniStatVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700, fontSize: '1.1rem', color: '#f0f0ee',
  },

  sectionTitle: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.52rem', letterSpacing: '0.2em',
    color: 'rgba(240,240,238,0.3)', display: 'block', marginBottom: 12,
  },
  txList: { display: 'flex', flexDirection: 'column', gap: 2 },
  txRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: '#0f0f0f', border: '1px solid rgba(240,240,238,0.06)',
    borderRadius: 6, padding: '14px 16px', gap: 12,
  },
  txLeft: { display: 'flex', alignItems: 'center', gap: 12 },
  txDot:  { width: 8, height: 8, borderRadius: '50%', flexShrink: 0 },
  txDesc: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.85rem', color: 'rgba(240,240,238,0.75)', marginBottom: 3,
  },
  txMeta: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.46rem', color: 'rgba(240,240,238,0.28)', letterSpacing: '0.04em',
  },
  txAmount: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700, fontSize: '1.05rem', flexShrink: 0,
  },

  formGroup: { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 },
  formLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem', letterSpacing: '0.14em', color: 'rgba(240,240,238,0.4)',
  },
  formInput: {
    background: '#141414', border: '1px solid rgba(240,240,238,0.1)',
    borderRadius: 6, padding: '12px 14px', outline: 'none',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.78rem', color: '#f0f0ee', letterSpacing: '0.04em',
  },
  formHint: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.46rem', color: 'rgba(240,240,238,0.28)',
  },

  qrPlaceholder: {
    background: '#141414', border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 8, padding: '24px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
    marginBottom: 16,
  },
  qrLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem', color: 'rgba(240,240,238,0.3)',
  },
  addrBox: {
    display: 'flex', alignItems: 'center', gap: 10,
    background: '#141414', border: '1px solid rgba(240,240,238,0.08)',
    borderRadius: 6, padding: '10px 14px', marginBottom: 12,
  },
  addrBoxText: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.52rem', color: 'rgba(240,240,238,0.5)', flex: 1,
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  },
  copyBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem', letterSpacing: '0.12em',
    background: 'rgba(255,69,0,0.1)', border: '1px solid rgba(255,69,0,0.3)',
    color: '#ff4500', padding: '5px 12px', cursor: 'pointer', flexShrink: 0,
  },
  networkBadge: {},
  bnbBadge: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.46rem', letterSpacing: '0.1em',
    color: '#f3ba2f',
    background: 'rgba(243,186,47,0.08)',
    border: '1px solid rgba(243,186,47,0.25)',
    padding: '4px 10px', borderRadius: 20,
  },

  feeBreakdown: {
    background: '#141414', border: '1px solid rgba(240,240,238,0.07)',
    borderRadius: 6, padding: '16px', marginBottom: 20,
    display: 'flex', flexDirection: 'column', gap: 10,
  },
  feeRow:  { display: 'flex', justifyContent: 'space-between' },
  feeLbl: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.5rem', color: 'rgba(240,240,238,0.35)',
  },
  feeVal: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.54rem', color: 'rgba(240,240,238,0.7)',
  },

  orangeBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.62rem', letterSpacing: '0.2em',
    background: '#ff4500', color: '#0a0a0a', fontWeight: 700,
    border: 'none', padding: '14px 28px', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center',
    textDecoration: 'none',
  },
}
