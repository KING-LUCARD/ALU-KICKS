# ALU KICKS (Vanta)

Self-contained storefront: React + Vite frontend, Hono/oRPC API, SQLite database.
No external services or accounts required.

## Run it

```bash
bun install
bun run build     # builds the frontend into packages/web/dist
bun run start     # serves site + API on http://localhost:3000  (set PORT to change)
```

Development with hot reload: `bun run dev` (http://localhost:4200).

The database is a local SQLite file at `data/vanta.db`, created automatically on first
start (orders and newsletter signups are stored there). To use a hosted libSQL/Turso
database instead, copy `.env.example` to `.env` and set `DATABASE_URL` / `DATABASE_AUTH_TOKEN`
(then start with `bun --env-file=.env packages/web/src/__server.ts`).

Deploy anywhere that can run Bun (a VPS, Railway, Fly.io, Render, etc.). Keep the `data/`
folder on persistent storage so orders survive restarts.

See `design.md` for the design system and `packages/web/src/api/data/catalog.ts` for products.
