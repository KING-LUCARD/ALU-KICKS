// Database client. Defaults to a local SQLite file (./data/vanta.db) so the site
// runs with no external services. Set DATABASE_URL (and DATABASE_AUTH_TOKEN for
// a hosted libSQL/Turso database) in .env to use a remote database instead.
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { mkdirSync } from "node:fs";
import path from "node:path";
import * as schema from "./schema";

const dataDir = path.resolve(import.meta.dirname, "../../../../../data");
const url = process.env.DATABASE_URL || (mkdirSync(dataDir, { recursive: true }), `file:${path.join(dataDir, "vanta.db")}`);

const client = createClient({
  url,
  authToken: process.env.DATABASE_AUTH_TOKEN || undefined,
});

// Create tables on first start (idempotent) — no manual migration step needed.
await client.batch(
  [
    `CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      number TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      items TEXT NOT NULL,
      subtotal REAL NOT NULL,
      shipping REAL NOT NULL,
      total REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'confirmed',
      created_at INTEGER NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      created_at INTEGER NOT NULL
    )`,
  ],
  "write",
);

export const db = drizzle(client, { schema });
