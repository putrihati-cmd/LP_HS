# 🤖 AI Content Generator - HS Copy Center

Package lengkap untuk implementasi fitur AI Content Generator menggunakan Anthropic Claude API.

## 📦 Isi Package

```
ai-content-generator-package/
├── README.md                          # File ini
├── AI_DEPLOYMENT_GUIDE.md             # Panduan deployment lengkap
├── AI_CONTENT_GENERATOR.md            # Dokumentasi fitur lengkap
├── ai-content-generator-backend.ts    # Backend TypeScript code
├── AIContentGenerator.tsx             # Frontend React component
└── example-wrangler.toml              # Contoh konfigurasi Cloudflare
```

## 🚀 Quick Start

### 1. Persiapan

**Dapatkan API Key Anthropic:**
- Daftar di https://console.anthropic.com
- Buat API key baru
- Simpan API key dengan aman

### 2. Backend Deployment

```bash
# Masuk ke direktori backend
cd /var/www/hscopycenter-backend

# Buat direktori AI
mkdir -p src/ai

# Copy backend code
cp ai-content-generator-backend.ts src/ai/claude-client.ts

# Set API key
wrangler secret put ANTHROPIC_API_KEY
# Paste API key Anda saat diminta

# Deploy
npm run deploy
```

### 3. Frontend Deployment

```bash
# Masuk ke direktori admin
cd /var/www/hscopycenter-admin

# Copy component
cp AIContentGenerator.tsx src/components/

# Update App.tsx - tambahkan route:
# import AIContentGenerator from './components/AIContentGenerator'
# <Route path="/ai-generator" element={<AIContentGenerator />} />

# Build & Deploy
npm run build
wrangler pages deploy dist
```

### 4. Testing

```bash
# Test service description
curl -X POST https://hscopycenter-backend.workers.dev/api/ai/service-description \
  -H "Content-Type: application/json" \
  -d '{
    "serviceName": "Jilid Hardcover Premium",
    "category": "Jilid",
    "features": ["Cover berkualitas", "Hot stamping"],
    "tone": "professional",
    "targetAudience": "mahasiswa"
  }'
```

## 📚 Dokumentasi Lengkap

Lihat **AI_DEPLOYMENT_GUIDE.md** untuk:
- Panduan deployment step-by-step
- Konfigurasi lengkap
- Testing commands
- Troubleshooting

Lihat **AI_CONTENT_GENERATOR.md** untuk:
- Fitur lengkap
- API endpoints
- Request/response schemas
- Contoh penggunaan

## 💰 Biaya

**Anthropic Claude API Pricing:**
- Input: $3 per million tokens
- Output: $15 per million tokens

**Estimasi per bulan (100 generasi):** $3-5

## 🔒 Security

- ✅ API key disimpan di Cloudflare Secrets
- ✅ Tidak ada API key di frontend
- ✅ Semua request melalui backend
- ✅ CORS configuration
- ✅ Input validation

## 📞 Support

Jika ada masalah:
1. Cek AI_DEPLOYMENT_GUIDE.md bagian Troubleshooting
2. Verifikasi API key sudah di-set dengan benar
3. Cek logs: `wrangler tail`

## 🎯 Fitur yang Tersedia

1. **Service Description Generator** - Deskripsi layanan profesional
2. **Blog Article Generator** - Artikel blog lengkap 500-1500 kata
3. **Social Media Post Generator** - Post untuk WhatsApp/Instagram/Facebook
4. **Content Improvement Tool** - Tingkatkan kualitas konten existing
5. **Variations Generator** - Multiple versi headline/CTA

## 📝 Lisensi

Proprietary - HS Copy Center 2026

---

**Dibuat oleh:** Antigravity AI Assistant
**Tanggal:** 28 Januari 2026
**Versi:** 1.0.0
