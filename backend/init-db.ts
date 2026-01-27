
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('local.db');

async function init() {
  console.log('Initializing database (node:sqlite direct)...');

  // Products
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER DEFAULT 0,
      image_url TEXT,
      description TEXT,
      created_at INTEGER DEFAULT (unixepoch())
    );
  `);

  // Orders
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      total REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at INTEGER DEFAULT (unixepoch())
    );
  `);

  // Order Items
  db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL REFERENCES orders(id),
      product_id INTEGER NOT NULL REFERENCES products(id),
      quantity INTEGER NOT NULL,
      price REAL NOT NULL
    );
  `);

  // Banners
  db.exec(`
    CREATE TABLE IF NOT EXISTS banners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      subtitle TEXT,
      image_url TEXT,
      active INTEGER DEFAULT 1,
      link TEXT,
      button_text TEXT DEFAULT 'Order Now',
      created_at INTEGER DEFAULT (unixepoch())
    );
  `);

  // Categories
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      icon TEXT,
      active INTEGER DEFAULT 1,
      "order" INTEGER DEFAULT 0,
      created_at INTEGER DEFAULT (unixepoch())
    );
  `);

  // Promos
  db.exec(`
    CREATE TABLE IF NOT EXISTS promos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      badge TEXT,
      valid_until INTEGER,
      active INTEGER DEFAULT 1,
      created_at INTEGER DEFAULT (unixepoch())
    );
  `);

  console.log('Database initialized!');

  // Seed
  const stmt = db.prepare('SELECT COUNT(*) as c FROM banners');
  const result = stmt.get() as { c: number };

  if (result && result.c === 0) {
     console.log('Seeding banners...');
     db.exec(`
        INSERT INTO banners (title, subtitle, button_text) VALUES
        ('Cetak Dokumen & Skripsi', 'Cepat, Rapi, & Berkualitas', 'Pesan Sekarang'),
        ('Cetak Banner Kilat', 'Bisa Ditunggu & Hasil Tajam', 'Order via WA');
     `);
  }
}

init().catch(console.error);
