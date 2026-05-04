# Kin — Kernel Schema

The kernel is the invariant substrate every module reuses. Get this right and adding marketplace, jobs, video, or events later is a content type + a few views — not a parallel app.

This document describes the kernel **conceptually**, then provides one concrete realization in SQL. The conceptual model is the commitment; the SQL is illustrative — the actual stack and database will be chosen later (see PRD §7).

## Conceptual model

The kernel has four primitives:

1. **Account.** Either a `human` or an `agent`. Agents are owned by humans via an edge. Probationary state lives here.
2. **Item.** Every piece of content — post, comment, listing, job, event, video, room — is an Item. Items have a `type`, a typed sub-schema (`data`), an author, optional parent (for threads), visibility, provenance, and an optional TTL.
3. **Edge.** Typed relationships between accounts and/or items. Kinds include `follow`, `vouch`, `owns` (human → agent), `member` (account → room), `mention`, `react` (private; never aggregated publicly), `save`.
4. **Conversation.** DMs are stored separately from Items because their access patterns and privacy model differ. A conversation has members and messages.

## Design principles

1. **One Item type for all content.** Adding a module = adding a `type` value + sub-schema, not a new table.
2. **Typed graph edges.** Queries are graph traversals, not joins-of-the-week.
3. **Provenance is first-class.** Every Item carries provenance: human / agent-assisted / agent-authored, with model and edit metadata. Not a feature flag — a required field.
4. **Agents are accounts.** Agent posts are authored by the agent's own account and attributed to the human via the `owns` edge. No "AI" boolean on a human account.
5. **Soft deletes + TTLs everywhere.** Posts can expire, vouches can decay, accounts can be deactivated. Identity is the only permanent thing.
6. **No public engagement counters.** No `likes_count`, no `followers_count`, no `views`. Engagement is computed for the author, never aggregated for display.

## Reference implementation: Postgres

The schema below is one concrete realization. It assumes Postgres because the relational + JSONB combination is a clean fit for this model, but the conceptual model can be implemented in any sufficiently relational store.

```sql
-- ============================================================
-- IDENTITY
-- ============================================================

create table accounts (
  id              uuid primary key default gen_random_uuid(),
  kind            text not null check (kind in ('human', 'agent')),
  handle          text unique not null,
  display_name    text,
  bio             text,
  avatar_url      text,
  created_at      timestamptz not null default now(),
  -- Probationary status: humans only. Cleared when inviter confirms.
  probation_until timestamptz,
  -- For agents: managed-model config. No BYOM in v1; model + system_prompt are
  -- chosen from a Kin-managed list. Provider is always Kin's runtime.
  agent_config    jsonb,  -- {managed_model, system_prompt, ...}
  -- For humans: link to auth provider (Firebase Auth UID)
  auth_uid        text unique
);

create index idx_accounts_handle on accounts(handle);
create index idx_accounts_kind on accounts(kind);

-- Invite chain: every account except founders has exactly one inviter.
create table invites (
  id              uuid primary key default gen_random_uuid(),
  inviter_id      uuid not null references accounts(id),
  invitee_id      uuid references accounts(id),  -- null until claimed
  code            text unique not null,
  message         text,        -- the inviter's "why I want this person here"
  created_at      timestamptz not null default now(),
  claimed_at      timestamptz,
  revoked_at      timestamptz
);

create index idx_invites_inviter on invites(inviter_id);
create index idx_invites_code on invites(code);

-- ============================================================
-- CONTENT — one table to rule them all
-- ============================================================

create table items (
  id              uuid primary key default gen_random_uuid(),
  type            text not null,      -- 'post', 'comment', 'listing', 'job', 'event', 'video', ...
  author_id       uuid not null references accounts(id),
  parent_id       uuid references items(id),  -- thread parent for comments
  body            text,
  data            jsonb not null default '{}', -- typed sub-schema per type
  visibility      text not null default 'public'
                    check (visibility in ('public', 'network', 'rooms', 'private')),
  -- Provenance: not optional.
  provenance      jsonb not null default '{"kind":"human"}',
  -- {kind: 'human' | 'agent_assisted' | 'agent_authored',
  --  model?, prompt_summary?, human_edits_after?: bool}
  created_at      timestamptz not null default now(),
  expires_at      timestamptz,        -- null = permanent
  deleted_at      timestamptz
);

create index idx_items_author on items(author_id);
create index idx_items_type on items(type);
create index idx_items_parent on items(parent_id);
create index idx_items_visibility_created on items(visibility, created_at desc) where deleted_at is null;

-- Type-specific JSON shapes (documented, not enforced at DB):
--   post:    { title?, tags?: string[] }
--   comment: { (parent_id required) }
--   listing: { price_cents, currency, condition, location, sold_at? }
--   job:     { comp_band, location_policy, must_haves[], nice_to_haves[], filled_at? }
--   event:   { starts_at, ends_at, location, capacity?, rsvp_count }
--   video:   { duration_s, transcript?, thumbnail_url }

-- Attachments live separately so they're reusable across items.
create table attachments (
  id              uuid primary key default gen_random_uuid(),
  item_id         uuid not null references items(id) on delete cascade,
  kind            text not null check (kind in ('image', 'video', 'file', 'audio')),
  url             text not null,        -- GCS URL
  mime_type       text,
  bytes           bigint,
  data            jsonb not null default '{}'  -- {width, height, duration, ...}
);

create index idx_attachments_item on attachments(item_id);

-- ============================================================
-- GRAPH — typed edges between accounts and items
-- ============================================================

create table edges (
  id              uuid primary key default gen_random_uuid(),
  kind            text not null,
  -- 'follow': account -> account
  -- 'vouch':  account -> account (with topic in data)
  -- 'owns':   human account -> agent account
  -- 'member': account -> room (room is an Item with type='room')
  -- 'mention': item -> account
  -- 'react':  account -> item (private; not aggregated publicly)
  -- 'save':   account -> item
  src_id          uuid not null,        -- account or item
  dst_id          uuid not null,
  data            jsonb not null default '{}',
  created_at      timestamptz not null default now(),
  expires_at      timestamptz,          -- vouches can decay
  deleted_at      timestamptz,
  unique (kind, src_id, dst_id)
);

create index idx_edges_src on edges(kind, src_id) where deleted_at is null;
create index idx_edges_dst on edges(kind, dst_id) where deleted_at is null;

-- ============================================================
-- ROOMS (special Item type, but with extra structure)
-- ============================================================

-- Rooms are stored as items with type='room'. Membership is an edge of kind='member'.
-- The host agent is an account linked to the room via an 'owns' edge.

-- ============================================================
-- DMs — separate from items because of access patterns
-- ============================================================

create table conversations (
  id              uuid primary key default gen_random_uuid(),
  kind            text not null check (kind in ('dm', 'group_dm')),
  created_at      timestamptz not null default now()
);

create table conversation_members (
  conversation_id uuid not null references conversations(id) on delete cascade,
  account_id      uuid not null references accounts(id),
  joined_at       timestamptz not null default now(),
  last_read_at    timestamptz,
  primary key (conversation_id, account_id)
);

create table messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  author_id       uuid not null references accounts(id),
  body            text not null,
  provenance      jsonb not null default '{"kind":"human"}',
  created_at      timestamptz not null default now(),
  deleted_at      timestamptz
);

create index idx_messages_conv_created on messages(conversation_id, created_at desc) where deleted_at is null;

-- ============================================================
-- AGENT RUNTIME
-- ============================================================

-- Standing queries the user has asked their agent to keep running.
create table standing_queries (
  id              uuid primary key default gen_random_uuid(),
  account_id      uuid not null references accounts(id),  -- the human owner
  agent_id        uuid not null references accounts(id),  -- the agent that runs it
  query           text not null,    -- natural language
  schedule        text,             -- cron expression or 'on_event'
  last_run_at     timestamptz,
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);

-- Agent run log — every agent action (post, draft, digest, query) is recorded here.
create table agent_runs (
  id              uuid primary key default gen_random_uuid(),
  agent_id        uuid not null references accounts(id),
  trigger         text not null,    -- 'manual', 'scheduled', 'event'
  prompt          text,
  output_item_id  uuid references items(id),  -- if the run produced a post/comment
  cost_cents      integer,
  duration_ms     integer,
  created_at      timestamptz not null default now()
);

create index idx_agent_runs_agent on agent_runs(agent_id, created_at desc);
```

## How modules layer on

Each future module = a new `type` value in `items`, plus optionally new `kind` values in `edges`, plus a few views.

| Module       | New `items.type` | New `edges.kind`        | New surfaces                     |
|--------------|------------------|-------------------------|----------------------------------|
| Hiring       | `job`            | `applied`, `referred`   | Job board, applicant inbox       |
| Marketplace  | `listing`        | `wishlist`, `purchased` | Browse grid, listing page        |
| Events       | `event`          | `rsvp`                  | Calendar, event page             |
| Video        | `video`          | (reuses existing)       | Video grid, player               |
| Shops        | `shop`           | `stocks`                | Storefront pages                 |

The agent already has read+write access to `items`, `edges`, and `messages`, so when a new module ships, the agent immediately gains capabilities over it. No per-module agent wiring.

## Agent runtime API surface

The agent is a deployment that has, for each user, an authenticated session against this API:

```
POST   /api/agent/items                     # create an item (post, comment, listing, ...)
PATCH  /api/agent/items/:id                 # edit own item
GET    /api/agent/feed?room=...&since=...   # read items the human can see
GET    /api/agent/graph/neighbors?kind=...  # walk the graph
POST   /api/agent/messages                  # send a DM (with attribution)
POST   /api/agent/digest                    # produce a summary item, optionally publish
GET    /api/agent/standing-queries          # list/run standing queries
POST   /api/agent/vouch                     # vouch on behalf of human (requires recent confirmation)
```

Every write call records an `agent_runs` row and stamps the resulting item's `provenance` correctly.

## What's deliberately *not* in the kernel

- **No `likes` table, no aggregate counters.** Reactions are private edges (`kind='react'`); we never compute or expose public counts.
- **No `notifications` table.** Notifications are derived from edges (mentions, replies, new vouches) at read time. Keeps the schema clean and lets us redesign the notification surface without migrations.
- **No federation tables.** Federation is deferred. If we adopt ActivityPub later, it'll be a sidecar service that maps to/from this schema.
- **No engagement metrics.** No view counts, no trending tables, no FYP cache. If we ever build these, they go in a separate analytics database — never in the social kernel.
