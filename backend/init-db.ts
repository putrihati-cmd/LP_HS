import Database from 'better-sqlite3';

const db = new Database('local.db');

console.log('Initializing database (better-sqlite3)...');

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
