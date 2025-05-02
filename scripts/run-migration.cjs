#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Load env from .env.local
function loadEnv(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return content.split(/\r?\n/).reduce((env, line) => {
    if (!line || line.startsWith('#')) return env;
    const [key, ...rest] = line.split('=');
    env[key] = rest.join('=');
    return env;
  }, {});
}

(async () => {
  const env = loadEnv(path.resolve(__dirname, '../.env.local'));
  const pool = new Pool({ connectionString: env.NILEDB_POSTGRES_URL, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();
  try {
    console.log('Applying migration...');
    const sql = fs.readFileSync(path.resolve(__dirname, '../migrations/001_create_tables.sql'), 'utf8');
    const stmts = sql.split(';').map(s => s.trim()).filter(s => s);
    for (const stmt of stmts) {
      // Skip extension since pg client chokes on that tag
      if (/^CREATE EXTENSION/i.test(stmt)) {
        console.log('Skipping:', stmt.split(/\r?\n/)[0]);
        continue;
      }
      console.log('Running:', stmt.split(/\r?\n/)[0]);
      await client.query(stmt);
    }

    console.log('\nChecking tables...');
    const tables = ['workflows', 'servers', 'uis'];
    for (const t of tables) {
      const { rows } = await client.query(`SELECT to_regclass('public.${t}') AS exists;`);
      console.log(`${t}:`, rows[0].exists !== null ? 'exists' : 'missing');
    }
  } catch (err) {
    console.error('Error during migration:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
})();
