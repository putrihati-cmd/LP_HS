# 🚀 PANDUAN IMPLEMENTASI EDGESPARK DI ANTIGRAVITY

## 📋 DAFTAR ISI
1. [Persiapan Awal](#1-persiapan-awal)
2. [Setup EdgeSpark Account](#2-setup-edgespark-account)
3. [Konfigurasi Database D1](#3-konfigurasi-database-d1)
4. [Konfigurasi Storage R2](#4-konfigurasi-storage-r2)
5. [Deploy Backend](#5-deploy-backend)
6. [Deploy Admin Panel](#6-deploy-admin-panel)
7. [Integrasi Frontend](#7-integrasi-frontend)
8. [Testing & Monitoring](#8-testing--monitoring)

---

## 1. PERSIAPAN AWAL

### 1.1 Install Wrangler CLI (di VPS Anda)

```bash
# SSH ke VPS Anda
ssh user@your-vps-ip

# Install Node.js jika belum ada
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Wrangler globally
npm install -g wrangler

# Verify installation
wrangler --version
```

### 1.2 Login ke Cloudflare Account

```bash
# Login via browser
wrangler login

# Atau login dengan API token (lebih aman)
export CLOUDFLARE_API_TOKEN=your-api-token-here
```

### 1.3 Struktur Folder Backend

Buat struktur folder untuk backend EdgeSpark:

```bash
cd /var/www
mkdir -p hscopycenter-backend
cd hscopycenter-backend

# Struktur folder
mkdir -p src/{db,api,utils,middleware}
mkdir -p migrations
mkdir -p storage
```

---

## 2. SETUP EDGESPARK ACCOUNT

### 2.1 Daftar ke EdgeSpark

1. Buka https://edgespark.dev
2. Sign up dengan email Anda
3. Verifikasi email
4. Create new project: "hscopycenter"

### 2.2 Get EdgeSpark Credentials

Setelah membuat project, Anda akan mendapat:

```env
EDGESPARK_PROJECT_ID=your-project-id
EDGESPARK_API_KEY=your-api-key
EDGESPARK_REGION=auto  # atau pilih asia-southeast1
```

Simpan credentials ini dengan aman!

---

## 3. KONFIGURASI DATABASE D1

### 3.1 Create D1 Database

```bash
# Create D1 database
wrangler d1 create hscopycenter-db

# Output akan memberikan database_id
# Database created: hscopycenter-db
# database_id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### 3.2 Buat File wrangler.toml

```bash
cd /var/www/hscopycenter-backend
nano wrangler.toml
```

Isi dengan:

```toml
name = "hscopycenter-backend"
main = "src/index.ts"
compatibility_date = "2024-01-01"

# D1 Database Binding
[[d1_databases]]
binding = "DB"
database_name = "hscopycenter-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # Ganti dengan ID Anda

# R2 Storage Binding
[[r2_buckets]]
binding = "STORAGE"
bucket_name = "hscopycenter-uploads"

# Environment Variables
[vars]
ENVIRONMENT = "production"
CORS_ORIGIN = "https://hscopycenter.site"
```

### 3.3 Buat Schema Database

Buat file `migrations/0001_initial_schema.sql`:

```sql
-- Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL,
  customer_role TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK(rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  is_verified INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  base_price REAL,
  unit TEXT DEFAULT 'lembar',
  icon TEXT,
  is_active INTEGER DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Price List Table
CREATE TABLE IF NOT EXISTS price_list (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service_id INTEGER NOT NULL,
  item_name TEXT NOT NULL,
  price REAL NOT NULL,
  notes TEXT,
  is_active INTEGER DEFAULT 1,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  service_type TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  total_price REAL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_gallery_active ON gallery(is_active);
CREATE INDEX idx_testimonials_active ON testimonials(is_active);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at);
```

### 3.4 Apply Schema Migration

```bash
# Apply migration to local database (for testing)
wrangler d1 execute hscopycenter-db --local --file=./migrations/0001_initial_schema.sql

# Apply migration to production database
wrangler d1 execute hscopycenter-db --file=./migrations/0001_initial_schema.sql
```

### 3.5 Seed Data Awal

Buat file `migrations/0002_seed_data.sql`:

```sql
-- Seed Services
INSERT INTO services (name, category, description, base_price, unit, icon, display_order) VALUES
('Fotocopy Hitam Putih', 'fotocopy', 'Fotocopy dokumen hitam putih A4', 150, 'lembar', '📄', 1),
('Print Hitam Putih', 'print', 'Print dokumen hitam putih A4', 500, 'lembar', '🖨️', 2),
('Jilid Soft Cover', 'jilid', 'Jilid soft cover dengan spiral plastik', 5000, 'buku', '📚', 3),
('Jilid Hard Cover', 'jilid', 'Jilid hard cover profesional', 35000, 'buku', '📕', 4),
('Laminating A4', 'finishing', 'Laminating dokumen ukuran A4', 3000, 'lembar', '🛡️', 5);

-- Seed Price List
INSERT INTO price_list (service_id, item_name, price, notes) VALUES
(1, 'A4 Hitam Putih', 150, 'Diskon 10% untuk >100 lembar'),
(1, 'F4 Hitam Putih', 200, NULL),
(1, 'A3 Hitam Putih', 500, NULL),
(2, 'A4 Print B/W', 500, NULL),
(2, 'A4 Print Warna', 1500, NULL),
(3, 'Jilid Spiral Plastik', 5000, NULL),
(4, 'Hard Cover Standard', 35000, NULL),
(4, 'Hard Cover Premium', 50000, 'Dengan emboss logo'),
(5, 'Laminating A4', 3000, NULL),
(5, 'Laminating F4', 4000, NULL);

-- Seed Settings
INSERT INTO settings (key, value, description) VALUES
('shop_name', 'HS Copy Center', 'Nama toko'),
('shop_phone', '+6285659055374', 'Nomor WhatsApp'),
('shop_address', 'Gg. 2 No.7, Tegalmulya, Ledug, Kec. Kembaran, Banyumas, Jawa Tengah 53182', 'Alamat lengkap'),
('shop_hours', 'Senin - Minggu: 06.30 - 21.30 WIB', 'Jam operasional'),
('google_maps_url', 'https://maps.app.goo.gl/VDNrgixt9HqZWSDq5', 'Link Google Maps');
```

Apply seed data:

```bash
# Local
wrangler d1 execute hscopycenter-db --local --file=./migrations/0002_seed_data.sql

# Production
wrangler d1 execute hscopycenter-db --file=./migrations/0002_seed_data.sql
```

---

## 4. KONFIGURASI STORAGE R2

### 4.1 Create R2 Bucket

```bash
# Create R2 bucket untuk upload gambar
wrangler r2 bucket create hscopycenter-uploads

# Verify bucket
wrangler r2 bucket list
```

### 4.2 Configure CORS untuk R2

Buat file `r2-cors-config.json`:

```json
{
  "cors": [
    {
      "origins": ["https://hscopycenter.site"],
      "methods": ["GET", "PUT", "POST", "DELETE"],
      "allowedHeaders": ["*"],
      "maxAgeSeconds": 3600
    }
  ]
}
```

Apply CORS:

```bash
# Note: R2 CORS belum fully supported via CLI
# Anda perlu set via Cloudflare Dashboard:
# 1. Buka Cloudflare Dashboard
# 2. R2 > hscopycenter-uploads
# 3. Settings > CORS Policy
# 4. Paste JSON config di atas
```

---

## 5. DEPLOY BACKEND

### 5.1 Create Backend Code

Buat file `src/index.ts`:

```typescript
/**
 * EdgeSpark Backend untuk HS Copy Center
 */

export interface Env {
  DB: D1Database;
  STORAGE: R2Bucket;
  ENVIRONMENT: string;
  CORS_ORIGIN: string;
}

// CORS Headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle CORS preflight
function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// Main Handler
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    try {
      // Route handling
      if (url.pathname === '/api/health') {
        return new Response(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Gallery API
      if (url.pathname === '/api/gallery' && request.method === 'GET') {
        const results = await env.DB.prepare(
          'SELECT * FROM gallery WHERE is_active = 1 ORDER BY display_order ASC'
        ).all();
        
        return new Response(JSON.stringify(results.results), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Testimonials API
      if (url.pathname === '/api/testimonials' && request.method === 'GET') {
        const results = await env.DB.prepare(
          'SELECT * FROM testimonials WHERE is_active = 1 ORDER BY created_at DESC LIMIT 10'
        ).all();
        
        return new Response(JSON.stringify(results.results), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Services API
      if (url.pathname === '/api/services' && request.method === 'GET') {
        const results = await env.DB.prepare(
          'SELECT * FROM services WHERE is_active = 1 ORDER BY display_order ASC'
        ).all();
        
        return new Response(JSON.stringify(results.results), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Price List API
      if (url.pathname === '/api/prices' && request.method === 'GET') {
        const results = await env.DB.prepare(`
          SELECT pl.*, s.name as service_name, s.category 
          FROM price_list pl 
          JOIN services s ON pl.service_id = s.id 
          WHERE pl.is_active = 1 
          ORDER BY s.display_order ASC, pl.id ASC
        `).all();
        
        return new Response(JSON.stringify(results.results), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Settings API
      if (url.pathname === '/api/settings' && request.method === 'GET') {
        const results = await env.DB.prepare(
          'SELECT key, value FROM settings'
        ).all();
        
        // Convert to key-value object
        const settings: Record<string, string> = {};
        results.results.forEach((row: any) => {
          settings[row.key] = row.value;
        });
        
        return new Response(JSON.stringify(settings), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // 404 Not Found
      return new Response('Not Found', { 
        status: 404,
        headers: corsHeaders 
      });

    } catch (error: any) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
```

### 5.2 Create package.json

```json
{
  "name": "hscopycenter-backend",
  "version": "1.0.0",
  "description": "EdgeSpark backend for HS Copy Center",
  "main": "src/index.ts",
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy",
    "test": "wrangler dev --test"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20241127.0",
    "wrangler": "^3.84.1"
  }
}
```

### 5.3 Install Dependencies & Deploy

```bash
cd /var/www/hscopycenter-backend

# Install dependencies
npm install

# Test locally
npm run dev
# Buka http://localhost:8787/api/health

# Deploy to production
npm run deploy
```

Setelah deploy, Anda akan mendapat URL seperti:
```
https://hscopycenter-backend.your-subdomain.workers.dev
```

---

## 6. DEPLOY ADMIN PANEL

### 6.1 Create Admin Panel Structure

```bash
cd /var/www
mkdir hscopycenter-admin
cd hscopycenter-admin

# Initialize React + Vite + TypeScript
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install
npm install -D tailwindcss postcss autoprefixer
npm install @tanstack/react-query zustand zod react-hook-form

# Initialize Tailwind
npx tailwindcss init -p
```

### 6.2 Create Basic Admin Panel

Buat file `src/App.tsx`:

```tsx
import React, { useState, useEffect } from 'react';

// API Base URL
const API_URL = 'https://hscopycenter-backend.your-subdomain.workers.dev';

interface Gallery {
  id: number;
  title: string;
  image_url: string;
  category: string;
}

function App() {
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch(`${API_URL}/api/gallery`);
      const data = await response.json();
      setGallery(data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">HS Copy Center - Admin Panel</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Gallery Management</h2>
          
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="border rounded p-4">
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
```

### 6.3 Deploy Admin Panel ke Cloudflare Pages

```bash
cd /var/www/hscopycenter-admin

# Build production
npm run build

# Install Wrangler Pages (jika belum)
npm install -g wrangler

# Deploy ke Cloudflare Pages
wrangler pages deploy dist --project-name=hscopycenter-admin

# Atau manual upload via dashboard:
# 1. Login ke Cloudflare Dashboard
# 2. Pages > Create a project
# 3. Upload dist/ folder
```

Admin panel akan tersedia di:
```
https://hscopycenter-admin.pages.dev
```

---

## 7. INTEGRASI FRONTEND

### 7.1 Create API Client di Frontend

Buat file `/var/www/hscopycenter/js/api-client.js`:

```javascript
/**
 * API Client untuk HS Copy Center
 */

const API_BASE_URL = 'https://hscopycenter-backend.your-subdomain.workers.dev/api';

class HSCopyAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.cache = new Map();
    this.cacheDuration = 5 * 60 * 1000; // 5 minutes
  }

  async fetch(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    // Check cache first
    const cached = this.cache.get(url);
    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return cached.data;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Cache the response
      this.cache.set(url, {
        data,
        timestamp: Date.now(),
      });

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Get all gallery items
  async getGallery() {
    return this.fetch('/gallery');
  }

  // Get all testimonials
  async getTestimonials() {
    return this.fetch('/testimonials');
  }

  // Get all services
  async getServices() {
    return this.fetch('/services');
  }

  // Get price list
  async getPrices() {
    return this.fetch('/prices');
  }

  // Get settings
  async getSettings() {
    return this.fetch('/settings');
  }
}

// Create singleton instance
const api = new HSCopyAPI();

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.HSCopyAPI = api;
}
```

### 7.2 Update galeri.html untuk Load dari API

Tambahkan di `galeri.html` sebelum `</body>`:

```html
<script src="js/api-client.js"></script>
<script>
/**
 * Load Gallery dari Database
 */
document.addEventListener('DOMContentLoaded', async function() {
  const galleryGrid = document.querySelector('.gallery-grid');
  
  if (!galleryGrid) return;

  try {
    // Show loading
    galleryGrid.innerHTML = '<div class="loading">Memuat galeri...</div>';

    // Fetch from API
    const gallery = await window.HSCopyAPI.getGallery();

    // Clear loading
    galleryGrid.innerHTML = '';

    // Render gallery items
    gallery.forEach(item => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      galleryItem.innerHTML = `
        <a href="https://wa.me/6285659055374?text=Halo%20HS%20Copy%20Center%2C%20saya%20tertarik%20dengan%20${encodeURIComponent(item.title)}"
           target="_blank"
           rel="noopener">
          <img src="${item.image_url}" 
               alt="${item.title}"
               loading="lazy">
        </a>
      `;
      galleryGrid.appendChild(galleryItem);
    });

  } catch (error) {
    console.error('Error loading gallery:', error);
    galleryGrid.innerHTML = '<div class="error">Gagal memuat galeri. Silakan refresh halaman.</div>';
  }
});
</script>
```

### 7.3 Update index.html untuk Load Testimonials

Tambahkan di `index.html` sebelum `</body>`:

```html
<script src="js/api-client.js"></script>
<script>
/**
 * Load Testimonials dari Database
 */
document.addEventListener('DOMContentLoaded', async function() {
  const testimonialGrid = document.querySelector('.testimonial-grid');
  
  if (!testimonialGrid) return;

  try {
    const testimonials = await window.HSCopyAPI.getTestimonials();

    // Clear placeholder
    testimonialGrid.innerHTML = '';

    // Render testimonials
    testimonials.forEach(item => {
      const card = document.createElement('div');
      card.className = 'testimonial-card';
      
      const stars = '⭐'.repeat(item.rating);
      const initials = item.customer_name.split(' ').map(n => n[0]).join('').toUpperCase();
      
      card.innerHTML = `
        <div class="testimonial-stars">${stars}</div>
        <p class="testimonial-text">"${item.content}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${initials}</div>
          <div class="testimonial-info">
            <h4>${item.customer_name}</h4>
            <span>${item.customer_role || 'Pelanggan'}</span>
          </div>
        </div>
      `;
      
      testimonialGrid.appendChild(card);
    });

  } catch (error) {
    console.error('Error loading testimonials:', error);
  }
});
</script>
```

### 7.4 Deploy Frontend Updates

```bash
# Backup current frontend
cd /var/www/hscopycenter
sudo cp -r . ../hscopycenter-backup-$(date +%Y%m%d)

# Upload updated files
# (gunakan SCP atau FTP untuk upload js/api-client.js dan updated HTML files)

# Restart nginx
sudo systemctl restart nginx

# Clear Cloudflare cache
# Login ke Cloudflare Dashboard > Caching > Purge Everything
```

---

## 8. TESTING & MONITORING

### 8.1 Test API Endpoints

```bash
# Test health endpoint
curl https://hscopycenter-backend.your-subdomain.workers.dev/api/health

# Test gallery endpoint
curl https://hscopycenter-backend.your-subdomain.workers.dev/api/gallery

# Test testimonials
curl https://hscopycenter-backend.your-subdomain.workers.dev/api/testimonials

# Test services
curl https://hscopycenter-backend.your-subdomain.workers.dev/api/services

# Test prices
curl https://hscopycenter-backend.your-subdomain.workers.dev/api/prices

# Test settings
curl https://hscopycenter-backend.your-subdomain.workers.dev/api/settings
```

### 8.2 Monitor Cloudflare Workers

1. Login ke Cloudflare Dashboard
2. Workers & Pages > hscopycenter-backend
3. Lihat Metrics:
   - Requests per second
   - Error rate
   - CPU time
   - Response time

### 8.3 Setup Analytics

Tambahkan Google Analytics 4:

```html
<!-- Add to all HTML pages before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## ✅ CHECKLIST IMPLEMENTASI

### Phase 1: Backend Setup (Hari 1-2)
- [ ] Install Wrangler CLI
- [ ] Login Cloudflare account
- [ ] Create D1 database
- [ ] Apply schema migration
- [ ] Seed initial data
- [ ] Create R2 bucket
- [ ] Configure CORS
- [ ] Deploy backend code
- [ ] Test all API endpoints

### Phase 2: Admin Panel (Hari 3-4)
- [ ] Setup React admin panel
- [ ] Connect to backend API
- [ ] Test CRUD operations
- [ ] Deploy to Cloudflare Pages
- [ ] Setup authentication (optional)

### Phase 3: Frontend Integration (Hari 5-6)
- [ ] Create API client library
- [ ] Update galeri.html to load from API
- [ ] Update index.html for testimonials
- [ ] Update layanan.html for prices
- [ ] Test all pages
- [ ] Deploy to production

### Phase 4: Monitoring & Optimization (Hari 7)
- [ ] Setup monitoring alerts
- [ ] Configure caching strategy
- [ ] Implement rate limiting
- [ ] Performance testing
- [ ] Security audit

---

## 🚨 TROUBLESHOOTING

### Problem: Wrangler login gagal
**Solution**:
```bash
# Gunakan API token instead
export CLOUDFLARE_API_TOKEN=your-token
wrangler whoami
```

### Problem: CORS error di frontend
**Solution**: Pastikan CORS headers sudah benar di backend:
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',  // Atau specific domain
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
```

### Problem: D1 database tidak bisa diakses
**Solution**: Pastikan binding sudah benar di wrangler.toml:
```toml
[[d1_databases]]
binding = "DB"
database_name = "hscopycenter-db"
database_id = "your-actual-database-id"
```

### Problem: R2 bucket access denied
**Solution**: Cek R2 binding dan pastikan bucket sudah dibuat:
```bash
wrangler r2 bucket list
```

---

## 📞 SUPPORT

Jika mengalami kesulitan, hubungi:
- EdgeSpark Discord: https://discord.gg/edgespark
- Cloudflare Community: https://community.cloudflare.com
- Dokumentasi: https://developers.cloudflare.com

---

## 🎯 NEXT STEPS

Setelah implementasi dasar selesai:

1. **Week 2**: Implement order management system
2. **Week 3**: Add payment gateway integration
3. **Week 4**: Build customer portal
4. **Month 2**: Mobile app development
5. **Month 3**: Advanced analytics & reporting

---

**Good luck dengan implementasi! 🚀**

