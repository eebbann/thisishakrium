import { createContext, useContext, useState, useEffect } from 'react'

const AuthCtx = createContext(null)

const WORDS = [
  'abandon','ability','able','about','above','absent','absorb','abstract',
  'absurd','abuse','access','accident','account','accuse','achieve','acid',
  'acoustic','acquire','across','action','actor','actual','adapt','address',
  'adjust','admit','adult','advance','advice','afford','afraid','again',
  'agent','agree','ahead','alarm','album','alert','alien','alley','allow',
  'almost','alone','alpha','alter','always','amazing','anchor','ancient',
  'anger','angle','animal','ankle','answer','antique','anxiety','apart',
  'arcade','arch','arctic','area','arena','argue','army','arrange','arrive',
  'arrow','artist','aspect','asset','athlete','atom','attack','attend',
  'attract','auction','author','auto','autumn','aware','awesome','axis',
  'badge','balance','bamboo','banner','barrel','basic','basket','battle',
  'beach','beauty','become','believe','below','bench','between','beyond',
  'bicycle','bind','biology','birth','black','blade','blast','blind',
  'blood','blue','blur','board','boat','bone','book','border','bounce',
  'brain','brand','brave','bread','breeze','bridge','bright','bring',
  'broken','bronze','brother','brown','bubble','budget','build','bulk',
  'burden','burst','business','butter','buyer','buzz',
]

export function makeAlias() {
  const adj  = ['dark','neon','void','echo','iron','ghost','nova','cyber','blaze','storm','hex','prism','zero','flux','chrome','vector','sonic','pulse','forge','shadow','frost','lunar','solar','signal','chain']
  const noun = ['hawk','wolf','raven','cipher','nexus','oracle','titan','wraith','viper','phantom','quasar','zenith','vertex','crypt','node','byte','wave','grid','peak','shard','lens','core','arc','mesh','shift']
  return `${adj[Math.floor(Math.random()*adj.length)]}${noun[Math.floor(Math.random()*noun.length)]}${Math.floor(Math.random()*9000)+1000}`
}

export function makePassphrase() {
  return Array.from({ length: 12 }, () => WORDS[Math.floor(Math.random() * WORDS.length)])
}

function makeWallet() {
  return '0x' + Array.from({ length: 40 }, () => '0123456789abcdef'[Math.floor(Math.random()*16)]).join('')
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('hkm_user')
      if (raw) setUser(JSON.parse(raw))
    } catch {}
    setLoading(false)
  }, [])

  const join = (alias, passphrase, interests) => {
    const account = {
      alias, passphrase, interests,
      wallet:   makeWallet(),
      balance:  (Math.random() * 1000 + 50).toFixed(2),
      bnb:      (Math.random() * 0.5 + 0.05).toFixed(4),
      tips:     0, posts: 0,
      joinedAt: Date.now(),
    }
    localStorage.setItem('hkm_user', JSON.stringify(account))
    setUser(account)
    return account
  }

  const restore = (words) => {
    try {
      const raw = localStorage.getItem('hkm_user')
      if (!raw) return null
      const acct = JSON.parse(raw)
      if (acct.passphrase.join(' ') === words.join(' ').trim().toLowerCase()) {
        setUser(acct)
        return acct
      }
    } catch {}
    return null
  }

  const logout = () => {
    localStorage.removeItem('hkm_user')
    setUser(null)
  }

  return (
    <AuthCtx.Provider value={{ user, loading, join, restore, logout }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)
