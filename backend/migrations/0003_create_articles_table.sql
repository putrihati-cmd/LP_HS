CREATE TABLE articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  author TEXT NOT NULL DEFAULT 'Admin',
  category TEXT NOT NULL DEFAULT 'General',
  tags TEXT, -- JSON string
  status TEXT DEFAULT 'draft', -- draft, published
  created_at INTEGER DEFAULT (unixepoch())
);
CREATE INDEX idx_articles_slug ON articles(slug);
