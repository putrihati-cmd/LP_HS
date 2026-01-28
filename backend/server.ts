
import { serve } from '@hono/node-server';
import { createApp } from './src/index';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as tables from './src/__generated__/db_schema';

const sqlite = new Database('local.db');

const db = drizzle(sqlite, { schema: tables });

const app = createApp({ db } as any);

app.use('*', async (c, next) => {
  await next();
  c.res.headers.set('Access-Control-Allow-Origin', '*');
  c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
});

app.options('*', (c) => c.text('', 204));

console.log('Server running on http://localhost:3000');

serve({
  fetch: app.fetch,
  port: 3000
});
