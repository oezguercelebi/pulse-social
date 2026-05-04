# Kin — Pricing & Monetization

## The principle

Open source ≠ free of revenue. AGPL controls what *others* can do with the code; it doesn't restrict what we charge for.

What we will *never* charge for:
- **Reach, visibility, or being seen.** No promoted posts, no algorithmic boosts, no "premium" surfacing.
- **Connection.** No paywalled DMs, no "InMail credits," no "request to message" with a price tag.
- **The agent itself.** Every user gets a working agent for free. Premium models cost more compute — that's a real cost, charged at a real margin, not a fake gate.
- **The social product itself.** Posting, replying, joining rooms, vouching, hiring intros — never gated by payment.

What we *will* charge for:
- Infrastructure (custom domains, larger storage, premium models).
- Tools for organizations and communities.
- A cut of value moving through the network when we broker it.

## Revenue streams, ranked

### 1. Hosted plans (the cleanest line)

The canonical instance at the hosted domain. Code is AGPL — anyone can self-host — but ~99% won't, because operating a social network is annoying.

| Tier | Price (rough) | Includes                                                                 |
|------|---------------|--------------------------------------------------------------------------|
| Free        | $0       | Full social experience. Default agent (Ari) on the standard model. Modest storage allowance. |
| Member      | ~$8/mo  | Custom subdomain. Ari upgraded to a stronger model class. Larger storage. Standing queries with longer history. |
| Pro         | ~$20/mo | Custom domain. Multiple registered agents. Unlimited standing queries. Priority compute for digests.     |

**Important:** every paid tier upgrade is about *infrastructure or compute*, never social privilege. A free user is never less visible or less reachable than a paid user.

### 2. Community / organization plans

This is where the real margin lives — communities, fellowships, alumni networks, accelerators, cohorts that need:
- A private space with their own member directory.
- Branded subdomain or custom domain.
- Admin tooling (member approval flows, moderation, exports).
- SSO and audit logs (later).
- A community-host agent that runs digests and welcomes new members.

Pricing: per-org subscription, ~$50–500/mo depending on size and features. This is how Discourse, Slack-clones, and Mighty Networks make their money. It's where former LinkedIn-spend goes.

### 3. Transaction take on modules

When a future module (`hiring`, `marketplace`, `events`, `shops`, paid `cohorts`) brokers value, we take a small cut. The headline economics:

- **Hiring:** flat fee per successful hire, ~$200–500. **Split: 60% to the voucher who introduced the candidate, 20% to the candidate as an attention-bounty refund, 20% to platform.** This is the LinkedIn-killer math — recruiters pay, the network is paid for working, and the platform earns only when a hire actually happens.
- **Marketplace:** 3% transaction fee on completed sales. Comparable to Stripe + small platform margin.
- **Events:** 2% on paid ticket sales when we host the checkout.
- **Cohorts / paid rooms:** 5% on subscription revenue routed through us.

Members never pay to *list* anything. We only earn when value actually moves.

### 4. Optional dual licensing

AGPL says: *if you run a modified version as a network service, you must release your modifications.* This is a real moat. If a Big Tech company wants to embed our code in something proprietary, they need a separate commercial license.

We make this quietly available — an "enterprise license" inquiry email — but never lead with it. Reference: MongoDB, Mattermost, Plausible, Sidekiq all do/did this profitably.

### 5. Donations, sponsorships, grants

GitHub Sponsors, Open Collective, NLnet, Mozilla, foundation grants. The transparency + open-source + anti-LinkedIn story is genuinely fundable in the early years. Won't be the long-term answer, but useful runway.

## Cost structure (shape, not numbers)

The pricing model assumes infrastructure is cheap when idle and that the agent LLM is the dominant variable cost. Actual numbers depend on the stack chosen later, but the shape is:

- **Web + database + storage**: low fixed cost, scales gently with users. Aim for under a Member subscription's worth per month at MVP scale.
- **Agent LLM**: dominant variable cost. Pick a model class where per-user monthly cost is well under a dollar at typical use; budget headroom for power users.
- **Email + ancillary services**: rounding error.
- **Break-even**: roughly when paid-tier conversion (target ~5–10% of active members) covers fixed + variable costs. We'll model exact numbers when the stack is chosen.

## Pricing principles, written down

1. **Charge for compute and infrastructure, not for visibility or connection.**
2. **When we earn, the people who created the value earn more.** Vouchers earn more on hires than the platform does. Sellers keep most of every sale.
3. **No surprise pricing.** Every fee is on a public page with the math.
4. **Free tier is fully functional, not crippled.** Free users have the same social rights as paid users.
5. **No annual commitments. Cancel anytime. Export everything.**
6. **No dark patterns on cancellation.** Same number of clicks to leave as to join.

## Out of scope as monetization

- **Advertising.** Not at launch, not at scale. Never.
- **Selling user data.** Not even "anonymized analytics."
- **Algorithmic visibility tiers.** Pay-to-rank is the LinkedIn cancer; we don't get it.
- **Engagement-driven monetization.** No revenue stream is allowed to incentivize keeping people on the app longer than serves them.
