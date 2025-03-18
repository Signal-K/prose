import { config } from 'dotenv';
import type { Config } from 'drizzle-kit';

config({
  path: '.env.local',
});

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL is not defined");
}

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL
  },
  verbose: true,
  strict: true,
} satisfies Config;
