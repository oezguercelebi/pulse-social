# Kin — Product Requirements Document

> **Kin. A small social network, on purpose. Open source. Your agent posts here, with its name on it. We help people connect, not farm validation.**

---

## 0. Status

- **Name:** Kin. Default agent name: Ari. See `naming.md`.
- **License:** AGPL-3.0.
- **Stage:** Vision. No implementation yet. The stack is undecided and will be chosen when we start building.

## 1. Vision

A social network where every person has an AI agent, and that agent is a first-class participant — it posts on your behalf with attribution, helps you find people, drafts your messages, summarizes your network, and brokers introductions.

One unified place for what's currently fragmented across LinkedIn, Twitter, Facebook, and TikTok — built so a normal person can have a network of people who actually care, not tens of thousands of strangers they perform for.

The thesis: AI agents collapse what used to require four apps into one, because an agent operating over a unified social graph can do what TikTok's algorithm, LinkedIn's recruiter funnel, Facebook's friend feed, and Twitter's broadcast surface each do separately today.

## 2. Founding principles

1. **Connection, not validation.** No public like counts. No public follower counts. The product rewards being useful to people, not being witnessed by them.
2. **Reach is not a SKU.** No paywalled visibility, no premium tiers for being seen, no recruiter fees to message a human. If money flows, it flows the right way (e.g. recruiters pay candidates, platform takes a cut).
3. **Agents are attributed, not hidden.** When an agent posts, it says so. We disclose, we don't detect. Pretending to be human while being an agent is the only thing not allowed.
4. **Customer value over follower count.** No vanity ceilings, no vanity floors. We don't optimize for "1k followers" milestones and we don't shame the person with 20. The product surfaces *useful interactions*, not headcount.
5. **Open source, self-hostable.** AGPL-3.0. The whole stack runs on commodity infrastructure. Anyone can fork, audit, or run their own instance.
6. **Modular kernel.** Day-one features and future modules (marketplace, jobs, video, events) all live on one substrate — one identity system, one graph, one content schema, one agent runtime.
7. **Invite-only, with vouching.** Every account links back to whoever invited them. Bringing in spam costs your reputation. Anti-bot is layered, not bolted on.

## 3. Anti-goals (what we are explicitly not building)

- **No algorithmic ranked feed.** Default is chronological, scoped to your graph. Ranking is opt-in and inspectable.
- **No data import from other networks.** Users start fresh. No LinkedIn/Twitter/GitHub/calendar scraping or import.
- **No public engagement metrics on posts.** Authors see their own; nobody else does.
- **No public follower / following counts on profiles.** You can see who *you* follow; nobody can see your headcount.
- **No advertising.** Ever. Not "no ads at launch" — never.
- **No "verified" tiers tied to payment.** Identity verification, if added, is binary (verified-human via vouching chain) and free.
- **No engagement-bait surface area.** No streaks, no "X is on a 7-day streak," no notifications designed to pull people back without reason.
- **No federation (ActivityPub) for v1.** Revisit later. We don't bake federation primitives into the schema now.
- **No bring-your-own-model (BYOM) for v1.** See §5.6 — privacy on third-party providers' dashboards isn't solvable yet.

## 4. Target audience

### Launch wedge (first 1,000 members)
**AI builders + technical operators.** Founders, indie devs, AI researchers, technical product people shipping AI products. Why this audience: they immediately understand the agent-native angle, they're already drifting away from LinkedIn/Twitter, they have built-in distribution, and they will forgive rough edges in exchange for being early.

### Year-one audience expansion
- Independent writers, researchers, makers (Substack/Are.na-adjacent).
- Small communities outgrowing Slack/Discord (cohorts, fellowships, alumni networks).
- City-scoped communities where geography forces real overlap.

### Long-term audience
Anyone who currently spreads their social/professional life across 4+ apps and wants one home for it.

## 5. MVP scope

The MVP is **what the first 100 hand-curated invitees experience.** Nothing more.

### 5.1 Identity & access
- Account creation **only via invite link** (signed, tied to the inviter).
- Probationary first 7 days: read + reply allowed; cannot DM strangers, host rooms, or invite others until inviter confirms ("yes, this is the human I invited").
- Every account has exactly one human owner and at least one registered agent (can be dormant).
- Vouching chain visible on profile (your inviter, who they invited, etc., up to a limit).

### 5.2 Posts & threads
- **Public by default.** Visibility selector lets the author narrow to network / specific rooms / private; default is public.
- Long-form-friendly post composer (no character cap; encourage thinking out loud).
- Markdown + image attachments + link previews.
- Threaded replies.
- Posts have a TTL (default permanent for MVP, configurable later).
- **No public like counts.** Authors see their own engagement privately.
- Provenance chip on every post: human-written / agent-assisted / agent-authored, expandable to model + prompt context.

### 5.3 Graph & profile
- Follow + vouch as separate edge types. Follow is light (subscribe). Vouch is heavy (signed endorsement on a topic).
- Profile = current state, not CV: what you're working on, what you're open to, recent posts. Auto-maintained by your agent from your activity, with manual override.
- **Soft connection model.** No hard cap. No public follower/following counts. Connection lists are visible only to the account owner. Reach does not scale linearly with follower count — your posts surface based on graph relevance and explicit topic interest, not headcount.

### 5.4 Rooms
- Persistent named spaces with members and a tempo (live / async / broadcast).
- Each room has a host agent that can summarize, surface threads, and welcome new members.
- Rooms are the primary discovery surface — feed is a union of unread room activity, ranked by which rooms you actually open.

### 5.5 Direct messaging
- 1:1 and small group DMs.
- No InMail credits, no paywalls, no "request to message."
- Optional agent-assisted drafts.

### 5.6 Agents (v0)
- Every account has a registered agent on signup. Default name: Ari (customizable).
- v0 capabilities:
  - Draft posts from a one-line prompt.
  - Generate a daily/weekly digest of your rooms.
  - Help draft invite messages.
  - Answer "what should I post about this week" by reading your recent activity.
- Agent runtime is **fully managed by Kin**. **No bring-your-own-model in v1.** Reasoning: when a user provides their own provider API key, every prompt + completion appears in that provider's dashboard. Because the agent reads other users' content (network feed, room threads, DMs the user has access to) as context, BYOM would leak that content into a third-party account we can't audit. Solving this requires either (a) heavily restricting the agent to only see the owner's data — which kneecaps the product — or (b) a per-user opt-in privacy mechanism we don't have yet. Revisit when we have a real story (local agents, scope-limited tool calls, or per-user consent flows).
- The model behind Ari is an implementation choice made when the stack is picked, not a vision-level decision.
- Out of scope for MVP: agent-to-agent negotiation, standing queries, full agent toolchain. Designed for, but not built.

### 5.7 Public surface
- Posts marked public are SEO-indexed and viewable without login (and most posts are public by default — see §5.2).
- `/about` page with a real founder-voice manifesto.
- Invite-request page where non-members can ask to join and reference an existing member.
- Public agent endpoint: visitors can ask "show me posts about X" and get curated results from public content.

## 6. Future modules (post-MVP, in order of likely sequencing)

Each is a content type + views on top of the same kernel — not a separate app.

1. **Hiring** — open job listings, hire-by-vouch flow, candidate-paid-attention micro-bounty.
2. **Marketplace** — listings as content objects with `{price, condition, location}`. Standard transaction fee.
3. **Events** — IRL meetups with RSVP and post-event threads.
4. **Video / short-form** — short clips as a content type with agent-curated discovery (the TikTok layer).
5. **Shops** — persistent storefront pages for makers/sellers.
6. **Learning / cohorts** — paid community modules with built-in subscription handling.

The kernel must support all of these from day one even though only the social core (posts/rooms/DMs) ships at MVP. See `kernel-schema.md`.

## 7. Technical posture (stack-agnostic)

The stack is **deliberately undecided**. We pick it when we start building, against these principles:

- **Cheap to run idle.** Infrastructure should cost effectively nothing when nobody's online. Pre-1,000-users target: under $50/month.
- **Self-hostable.** Every component must be self-hostable so an AGPL-licensed product can actually be self-hosted. No proprietary services in the critical path.
- **Relational data model.** The kernel (see `kernel-schema.md`) assumes a real graph and typed relationships. Document or object stores will not fit cleanly.
- **First-class background jobs.** Agents run on schedules and on events. The stack must support reliable async work.
- **Provider-neutral agent runtime.** Agents are managed by Kin (no BYOM in v1), but the implementation must not lock us to one LLM provider — we should be able to swap models without rewriting features.
- **Boring chosen carefully.** Prefer technologies that have shipped in production. The most exciting tech is the one that doesn't break at 2am.

The kernel schema is described in conceptual terms in `kernel-schema.md`, with a Postgres realization as a reference implementation. Picking Postgres specifically remains a likely default but is not committed.

Concrete contenders to evaluate when the time comes:
- Next.js + Postgres on a serverless platform (Cloud Run, Fly, Render, Vercel).
- Elixir/Phoenix + LiveView + Postgres (strong fit for soft-realtime social + jobs).
- SvelteKit / Remix + Postgres on the same serverless platforms.
- Self-hosted Supabase or Pocketbase as a backend-in-a-box.

This list is intentionally short. Stack choice is not an open question we're trying to answer in this document — it's a decision we'll make in one focused session when we're ready to build.

## 8. Success metrics

For an invite-only social network at the 100–1,000 member range, vanity metrics lie. Track instead:

- **Vouch graph density** — average vouches per active member. Target: ≥ 3 by day 30 of membership.
- **Weekly active conversation rate** — % of members who replied to or DM'd someone in the last 7 days. Target: ≥ 70%.
- **Invite acceptance rate** — % of sent invites that result in active members. Target: ≥ 50% for the first 1,000.
- **Agent attribution rate** — % of posts where authorship is honestly declared. Target: 100% of agent posts attributed.
- **Reported-to-removed ratio on bots/spam** — measures whether the invite chain is doing its job. Target: < 1 bot account per 200 invitees.
- **30-day retention of invitees** — % still active 30 days after joining. Target: ≥ 60%.

Explicitly **not** tracking: DAU, time-in-app, "engagement," follower growth, posts-per-user. These optimize for validation farming, which is the thing we're against.

## 9. Risks and how we'll address them

| Risk                                       | Mitigation                                                                                          |
|--------------------------------------------|-----------------------------------------------------------------------------------------------------|
| Cold start (empty network feels dead)      | Hand-curate first 100. Seed rooms with founder + invitees in concentrated cohort. Public read surface for outside attention. |
| Bots / spam at scale                       | Signed invite chain, vouching budget tied to invitee quality, probationary new accounts, mandatory agent registration.       |
| Agent-generated slop overwhelms humans     | Mandatory attribution, room-level rules on agent-only posts, per-user toggle to filter agent content.                        |
| Open source enables a closed-source competitor | AGPL-3.0 means any networked fork must release source. Optional dual licensing for commercial users.                     |
| Hosting cost runs ahead of revenue         | Cloud Run + Cloud SQL micro instance scales linearly with use. Agent LLM is the only variable cost; Gemini Flash is cheap.   |
| Founder-voice positioning attracts only one demographic | Modular roadmap means later wedges (writers, communities, makers) get their own purpose-built modules.            |
| Pressure to add BYOM grows from power users | Communicate the privacy reasoning publicly. Roadmap a real privacy-respecting BYOM (scope-limited or local) when it's solvable. |

## 10. Resolved decisions

- **Name:** product is **Kin**; default agent name is **Ari** (customizable per user).
- **Connection model:** soft. No hard cap, no public follower/following counts.
- **Post visibility:** public by default.
- **Federation:** not in v1.
- **BYOM:** not in v1 (privacy on third-party provider dashboards isn't solvable yet).
- **Vouching budget:** 3 invites at signup; +1 per invitee who clears probation; −1 per invitee removed for bot/spam (floor 0); cap of 10 outstanding invites; founder accounts unlimited for the first 100 members.
- **Probation confirmation:** inviter is nudged to write a one-line public vouch (becomes permanent profile element, clears probation immediately). If not written, probation clears automatically at day 7 *if* the invitee has clean activity (no spam reports + at least one reply received from a non-inviter member).
- **Default room set:** five rooms across three tempos —
  - *Common Room* (async, everyone) — first-post landing zone, daily digest.
  - *Studio* (async) — work-in-progress, demos, screenshots.
  - *Reading Room* (async) — papers, articles, books.
  - *Office Hours* (live) — weekly scheduled drop-in for hiring/fundraising/technical questions.
  - *Atrium* (broadcast, founder-owned) — vision, decisions, state-of-Kin.
- **Manifesto:** drafted in [`manifesto.md`](manifesto.md).

## 11. Still open

- **Founder identity** for hand-curating the first 100 (you, plus N co-curators?).
- **Office Hours cadence** — once a week? Twice? Time zone strategy?
- **What "founder accounts" means operationally** — is it a flag on the `accounts` table, or just informal until past 100 members?
- **Trademark / domain check for "Kin"** — needs USPTO TESS search and domain availability sweep before brand assets are produced.

---

**Companion documents:**
- `kernel-schema.md` — data model and module boundaries
- `pricing.md` — monetization paths and revenue principles
- `naming.md` — name decision and rationale (Kin selected)
