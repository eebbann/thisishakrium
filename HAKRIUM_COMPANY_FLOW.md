# Hakrium — Company Flow & Product Architecture

**Purpose:** Deep product narrative for founders, product, and backend — how Hakrium works as a company and as a user journey.  
**Last updated:** April 2026  
**Domain:** thisishakrium.com  

---

## 1. What Hakrium Is

Hakrium Verse is an **anonymous multi-platform economy** on **BNB Chain (BEP-20)**.

- **One identity:** `@alias` + 12-word passphrase (no email, no phone, no real name in UI).
- **One coin:** **HKM** — used across every platform in the verse.
- **One promise:** *One Coin. Infinite Platforms.*

Platforms (by phase):

| Platform | Role | Phase |
|----------|------|--------|
| **Rage** | Social / tipping / flagship | 1 |
| **Bata** | P2P **trade / transfer / deal / barter** (never “swap” in copy) | 1 |
| **Wallet, Discover, Builders** | Core rails + distribution + ecosystem | 1 |
| **Pulse, Vault** | Video, marketplace | 2 |
| **Echo, Arena** | Journalism, predictions | 3 |

---

## 2. Company Flow (Macro — How the Business Moves)

Think of Hakrium as **one economic operating system** with products on top. The flow is **identity → activity → value capture → circulation → governance → expansion** — not “pages” first.

### 2.1 Attention → Identity

- Discovery: Rage content, creators, community, referrals.
- **First conversion is not “buy HKM.”** It is **create anonymous identity** (`@alias` + passphrase).
- That identity is the **root key** to every platform.

### 2.2 Identity → Utility

- User gets **immediate practical use**:
  - tip / send HKM
  - discover content
  - participate in live platform actions
- **Goal:** value before speculation.

### 2.3 Utility → Transactions

Product actions generate **real transaction volume**:

- Tips, boosts, gated unlocks  
- Bata trades / transfers  
- Cashouts, purchases, DAO locks  

HKM behaves as **behavioral currency**, not only a ticker.

### 2.4 Transactions → Revenue + Burn

Each flow routes economics per product rules:

- Platform / gateway fees  
- Treasury (e.g. DAO allocation)  
- **Burn** where tokenomics define it (e.g. cashout burn narrative)  

**Loop:** usage funds operations + reinforces token design.

### 2.5 Revenue → Ecosystem Growth

Revenue and treasury fund:

- Infrastructure  
- Creator incentives  
- Builder grants  
- New vertical launches (Pulse, Vault, Echo, Arena)

### 2.6 Growth → Governance

- As participation grows, **DAO** (HKM lock tiers) steers treasury and priorities.
- Governance should **follow** product-market fit, not lead it on day one.

---

## 3. Hakrium User Flow (End-to-End)

### Stage A — Entry

- Land on brand hub.  
- Core message: **one coin, one identity, many platforms.**  
- CTAs: **Create account** | **Restore account** (single canonical path in product is ideal).

### Stage B — Identity Creation

1. Alias generated (anonymous by default).  
2. 12-word passphrase shown + acknowledged.  
3. Interests selected (feeds / discovery).  
4. Wallet / address bound to identity (design: deterministic from seed or server-assisted — product decision).  
5. **Session** established (cookie / JWT — backend owns truth).

### Stage C — First Activation (Critical)

Push **one** obvious next action:

- Tip someone, post, explore Rage, or a guided “starter” task.

If this step is weak, **retention collapses** even with strong branding.

### Stage D — Habit Loop

Return drivers:

- Earnings / tips  
- Social signal and discovery relevance  
- Low-friction micro-transactions  
- **Persistent HKM balance** in nav (brand + economic context)

### Stage E — Economic Maturity

Same identity branches:

- **Creator** — earns tips / gated revenue  
- **Trader** — Bata  
- **Governor** — lock + vote  
- **Builder** — submits / integrates platforms  

### Stage F — Retention + Advocacy

- Reputation of `@alias` + history + (later) governance weight.  
- Switching cost rises; word-of-mouth compounds.

---

## 4. Internal Operating Flow (How the Company Should Run)

### Product engine

- **Ship one flagship loop** (Rage + tipping) until retention is stable.  
- Add adjacent modules only when **identity + wallet + session** are solid.

### Economic engine

Monitor:

- Value moved (GMV-style)  
- HKM velocity by product  
- Fee yield by surface  
- Burn vs. supply narrative  

Optimize for **healthy circulation**, not vanity volume.

### Growth engine

- Acquire: creators + community flywheel.  
- Convert: frictionless anonymous onboarding.  
- Retain: utility + earnings + status.  
- Expand: Builders + new verticals.

### Trust engine

- Anonymous UX **without** feeling scammy: clear fees, restore path, cashout honesty, security posture.

---

## 5. The Hakrium Flywheel

1. Better activity on Rage (and live platforms)  
2. More tips / transfers in HKM  
3. More fees + burns (where designed)  
4. Stronger **utility** perception of HKM  
5. More users and creators  
6. More builders and integrations  
7. More reasons to hold and use HKM  
8. Loop accelerates  

**Failure mode:** big ecosystem story, weak **first activation** → flywheel never spins.

---

## 6. Where Flows Usually Break (Reality Check)

| Risk | Why it hurts |
|------|----------------|
| Too many entry routes | Decision fatigue; nav/auth mismatch |
| Token story before product loop | Users bounce; no habit |
| Weak post-signup moment | “What now?” drop-off |
| Restore / wallet promises vs. implementation | Trust cliff (e.g. demo-only storage) |
| Governance surfaced too early | Noise before users care |
| Cashout unclear or unreliable | Kills belief in “real economy” |

---

## 7. Strategic Priority Order (Company-Level)

1. **Identity reliability** — join / restore / session flawless  
2. **One sticky product loop** — Rage + tipping  
3. **Wallet trust** — balances, history, transparency  
4. **Cashout confidence** — fees, timing, support path  
5. **Bata depth** — atomic trade story, safety, UX  
6. **DAO maturity** — lock, vote, yield, treasury visibility  
7. **Multi-platform expansion** — Pulse, Vault, Echo, Arena  

---

## 8. Backend Handoff — Minimal System Picture

*High level only; your engineer details schemas and APIs.*

- **Auth service:** join, restore, session, logout; rate limits on restore.  
- **User / profile:** alias uniqueness, interests, public `@alias` profile.  
- **Wallet / ledger:** balances, pending vs settled, idempotent money APIs.  
- **Chain / settlement:** BNB RPC, indexer, tx status, reconciler.  
- **Product modules:** Rage (posts, tips), Bata (offers, deals), Discover (aggregation), DAO (locks, votes), Builders (submissions).  
- **Events:** `user.joined`, `tip.sent`, `cashout.requested`, etc. for analytics, risk, notifications.

**Ledger discipline:** every balance change = auditable event (who, what, amount, fees, burn, correlation id, optional `tx_hash`).

---

## 9. One-Paragraph Elevator (For Investors / Partners)

Hakrium is an anonymous multi-platform economy on BNB Chain where one identity (`@alias` + passphrase) and one coin (HKM) power social tipping, P2P trades, discovery, and governance across a growing verse of products. The company wins when users **activate once** and **transact often**; revenue and token mechanics follow from real usage — tips, transfers, boosts, and cashouts — while treasury and DAO align long-term expansion with community ownership.

---

## Related Docs

- `HAKRIUM_BUILDLOG.md` — implementation changelog and UX fixes in this repo.
