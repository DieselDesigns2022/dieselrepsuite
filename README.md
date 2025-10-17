# RepSuite MVP

## Quick Start
1. `pnpm install`
2. Copy `.env.local` and fill keys
3. Create Supabase buckets: `promos`, `proofs` (private)
4. Run SQL from /docs or your notes
5. `pnpm dev` → http://localhost:3000

## Deploy
- Push to GitHub → Import repo in Vercel → set env vars → Deploy
- Map domain: app.repsuite.com → Vercel project
- Stripe webhook → /api/stripe/webhook (copy secret to env)