# HAKRIUM — Build Log & Roadmap
**Last updated:** March 2026
**Stack:** React 19 + Vite · React Router v7 · GSAP · Vite

---

## Session 1 — UX Audit & Auth Flow Fix

### Problems identified

| # | Problem | Impact |
|---|---|---|
| 1 | Three overlapping entry points — `/login`, `/join`, `/restore` — each with duplicated logic | Decision fatigue, maintainability hell |
| 2 | Nav "JOIN" and "SIGN IN" both pointed to `/login` without specifying intent | Wrong tab shown, friction on first touch |
| 3 | Landing "CREATE ACCOUNT" CTA went to `/login` without tab context | New users landed on Restore tab |

| 4 | Preloader animation ran 1.9 seconds — full blocking wall before any content | Drop-off, feels slow on YC demo |
| 5 | After signup: `/join` page redirected to `/wallet`, `/login` tab redirected to `/@alias` | Inconsistent post-signup destination |
| 6 | No clear "what do I do now" moment after signup | Users saw wallet balance but had no obvious next action |
| 7 | Passphrase step said "your only way back in" — but restore only works on same browser (localStorage demo) | Trust gap, false promise of portability |
| 8 | Wrong fonts in inline styles across auth pages (Inter, Barlow Condensed, Space Mono) | Off-brand — brand spec is Bebas Neue / Space Grotesk / Fragment Mono |

---

### Changes made

#### `src/components/Preloader.jsx`
- Bar + counter animation: `1.9s` → `0.8s`
- Total preloader wall time: ~3.5s → ~1.8s

#### `src/App.jsx`
- Removed imports for `Join` and `Restore` (standalone pages)
- `/join` → `<Navigate to="/login?tab=join" replace />`
- `/restore` → `<Navigate to="/login?tab=restore" replace />`
- Single canonical auth page at `/login`

#### `src/pages/Login.jsx` (major rewrite)
- Reads `?tab=` query param on mount — `join` or `restore`
- **Default tab changed to `join`** (was `restore`) — correct for new visitors
- `useEffect` no longer auto-redirects after join (`joinDone` guard added)
- After `CREATE ACCOUNT` → shows **"YOU'RE IN"** screen with:
  - Primary CTA: `START EXPLORING →` → `/discover`
  - Secondary ghost: `VIEW MY WALLET` → `/wallet`
  - No blind redirect — user picks their own first action
- Passphrase step now has an amber `⚠` callout:
  *"Preview build — account stored locally. In production, passphrase derives your wallet on BNB Chain and works from any device."*
- Restore error message updated: tells user the account may only exist in the original browser session
- All inline fonts corrected to brand spec throughout

#### `src/components/Nav.jsx`
- "JOIN" → `/login?tab=join`
- "SIGN IN" → `/login?tab=restore`

#### `src/pages/Landing.jsx`
- "CREATE ACCOUNT" CTA → `/login?tab=join`
- "SIGN IN" CTA → `/login?tab=restore`

---

## What's Next — Prioritised

### P0 — Before any YC showing (days)

| Task | Why it matters |
|---|---|
| **Replace Vite/React SPA → Next.js 15 App Router** | OG images per page (required for YC demo links to share well), SSR for SEO, subdomains per platform become easier. Currently zero meta tags. |
| **Real passphrase → wallet derivation** | Replace `makeWallet()` random hex with actual BIP-39 HDNode derivation via `ethers.js`. Passphrase then genuinely derives the same wallet on any device. Kills the localStorage trust gap permanently. |
| **Persistent auth via signed JWT** | Once wallet is derived, sign a JWT with the private key. Store in `httpOnly` cookie. Session is then cryptographic, not localStorage-dependent. Share cookie across `*.thisishakrium.com` subdomains. |
| **Rage MVP — post + feed** | The flagship Phase 1 platform. Even a read-only feed with 10 seeded posts makes the demo tangible. |
| **`/discover` feed — seed content** | Currently a blank page. YC evaluators will click the "START EXPLORING →" CTA you just built. It needs to show something. |

---

### P1 — Phase 1 Core (weeks)

#### Auth & Identity
- [ ] BIP-39 passphrase → BNB Chain keypair (`ethers.js` `HDNodeWallet.fromPhrase()`)
- [ ] JWT signed by wallet private key, verified server-side by public key
- [ ] `httpOnly` cookie shared across all `*.thisishakrium.com` subdomains
- [ ] Alias registry — on-chain or DB — prevent duplicates
- [ ] Account preview on restore (show alias + truncated wallet before confirming)

#### Rage
- [ ] Post creation — text, 280 chars, anonymous
- [ ] Feed — chronological + trending sort
- [ ] Tip flow — HKM amount input → mock transaction → balance update
- [ ] React system (fire emoji, etc.)
- [ ] Boost post → Discover feed (HKM deducted)

#### Wallet Dashboard
- [ ] Real HKM balance from BSC RPC (or mock with price feed)
- [ ] Transaction history list
- [ ] Cashout flow (Paystack NGN on-ramp — Phase 1 mock)
- [ ] Receive address QR code

#### Creator Profile `/@alias`
- [ ] Post history
- [ ] Total tips received
- [ ] Join date, interests
- [ ] Public share link with OG image

#### Discover Feed
- [ ] Cross-platform post aggregation
- [ ] Interest-filtered view (uses onboarding selections)
- [ ] "Trending on Rage" section

---

### P2 — Phase 2 (post-YC)
- [ ] Pulse (video platform)
- [ ] Vault (marketplace)
- [ ] HKM BEP-20 contract deploy on BSC mainnet
- [ ] DAO voting (lock HKM → vote weight)
- [ ] Bata P2P — HTLC contracts on BSC testnet

---

### P3 — Phase 3
- [ ] Echo (journalism)
- [ ] Arena (prediction markets)
- [ ] ZK transfers
- [ ] Binance / Gate.io listing
- [ ] Mobile (React Native + Expo)

---

## Backend — Recommendation

### Decision: **Supabase** for Phase 1

Supabase gives you a production-grade Postgres backend in hours, not weeks. For a YC demo this is the right call. Here's the full reasoning:

#### Why not custom Fastify + Railway right now
The CLAUDE.md spec calls for Node.js + Fastify + PostgreSQL + Redis on Railway. That's the right architecture at scale. It is not the right move at "we need to demo in 2 weeks." Building auth middleware, connection pooling, Redis session store, and deployment pipelines from scratch adds 3–4 weeks before you can write a single product feature.

#### Why Supabase wins for Phase 1

| Need | Supabase answer |
|---|---|
| Anonymous identity (no email) | `supabase.auth.signInAnonymously()` — built-in. Or bring your own JWT (wallet-signed). |
| Postgres with row-level security | Native. RLS policies keyed on `wallet_address` column. |
| Real-time social feed | Supabase Realtime — Postgres change streams over WebSocket. No extra infra. |
| File storage (post media, avatars) | Supabase Storage — S3-compatible, CDN-backed. |
| Edge functions for blockchain calls | Supabase Edge Functions (Deno) — call BSC RPC, verify signatures, settle balances. |
| Dashboard for YC demo | Supabase Studio — show DB tables, row counts, live queries. Very impressive in a demo. |
| Cost at zero users | Free tier: 500MB DB, 2GB storage, 50MB edge function invocations. Enough. |

#### Supabase auth strategy for Hakrium

Do NOT use Supabase email/OAuth auth. Use **custom JWT auth**:

```
1. User generates alias + passphrase on client
2. ethers.js derives BNB Chain wallet from passphrase (BIP-39)
3. Client calls Supabase Edge Function: POST /auth/identify
   body: { wallet_address, signature_of_nonce }
4. Edge Function verifies signature on-chain (ecrecover)
5. Edge Function mints a Supabase custom JWT: { sub: wallet_address, alias }
6. Client stores JWT — sets Supabase session
7. All subsequent DB calls are authenticated as that wallet address
8. RLS policies: users can only read/write rows where wallet_address = auth.jwt()->>'sub'
```

No email. No phone. No OAuth. The passphrase IS the identity because it derives the private key that signs the auth nonce. Truly self-sovereign.

#### Database schema (Phase 1 starter)

```sql
-- Users
create table users (
  wallet_address  text primary key,           -- 0x... derived from passphrase
  alias           text unique not null,
  interests       text[] default '{}',
  balance_hkm     numeric(20,8) default 0,
  balance_bnb     numeric(20,8) default 0,
  joined_at       timestamptz default now()
);

-- Posts (Rage)
create table posts (
  id              uuid primary key default gen_random_uuid(),
  author_wallet   text references users(wallet_address),
  content         text not null check (length(content) <= 280),
  tip_total       numeric(20,8) default 0,
  boost_score     int default 0,
  created_at      timestamptz default now()
);

-- Tips
create table tips (
  id              uuid primary key default gen_random_uuid(),
  from_wallet     text references users(wallet_address),
  to_wallet       text references users(wallet_address),
  post_id         uuid references posts(id),
  amount_hkm      numeric(20,8) not null,
  tx_hash         text,                       -- BSC tx hash (null until confirmed)
  created_at      timestamptz default now()
);

-- RLS: users only see/write their own sensitive data
alter table users enable row level security;
create policy "own row" on users
  using (wallet_address = auth.jwt()->>'sub');
```

#### Migration path (Phase 2)
When you outgrow Supabase's free tier or need more control (custom rate limiting, Redis queues for Bata trades, BSC node connection pooling):
- Export Postgres → Railway Postgres
- Port Edge Functions → Fastify routes on Railway
- Keep Supabase Realtime OR replace with a WebSocket server

This migration is clean because Supabase is just Postgres underneath. No vendor lock-in on the data model.

---

#### Alternative considered: PocketBase
Single Go binary, SQLite or Postgres, built-in realtime and file storage. Excellent for solo devs. Rejected because:
- Less ecosystem tooling for Web3 JWT auth
- SQLite won't hold up at scale without manual migration
- No edge functions — blockchain calls would need a separate service anyway

#### Alternative considered: Firebase
Rejected outright. Google-owned, closed-source infrastructure conflicts with Hakrium's anonymous/privacy ethos. Would be a PR liability in the community.

---

## Current Stack (live)

```
Frontend:    React 19 + Vite (SPA — migrate to Next.js 15 before launch)
Routing:     React Router v7
Animation:   GSAP 3
Styling:     Inline CSS (brand token vars in index.css)
Auth:        localStorage mock (replace with Supabase custom JWT + BIP-39)
Blockchain:  None yet (mock wallet addresses)
Backend:     None yet → Supabase (Phase 1) → Fastify/Railway (Phase 2)
Hosting:     Vercel (frontend) · Supabase (backend Phase 1)
```
