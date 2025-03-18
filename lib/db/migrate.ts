import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

config({
  path: '.env.local',
});

const runMigrate = async () => {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL is not defined');
  }

  const sql = postgres(process.env.POSTGRES_URL, { max: 1 });
  const db = drizzle(sql);

  console.log('⏳ Running migrations...');

  const start = Date.now();
  
  try {
    await migrate(db, {
      migrationsFolder: 'lib/db/migrations',
    });
    const end = Date.now();
    console.log('✅ Migrations completed in', end - start, 'ms');
  } catch (error) {
    console.error('❌ Migration failed');
    console.error(error);
    process.exit(1);
  }

  await sql.end();
  process.exit(0);
};

runMigrate();
