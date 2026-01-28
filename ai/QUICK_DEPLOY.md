# 🚀 Panduan Cepat: AI Content Generator (GRATIS)

## ✅ Yang Sudah Siap

File `gemini-client.ts` sudah dibuat dengan fungsi:
- Generate deskripsi layanan
- Generate artikel blog
- Generate post social media
- Improve konten
- Generate variasi

## 📋 Langkah Selanjutnya

### 1. Dapatkan API Key (GRATIS)
1. Buka: https://aistudio.google.com
2. Login dengan akun Google
3. Klik "Get API Key" → "Create API Key"
4. Copy API key yang muncul

### 2. Deploy Backend
```bash
cd c:\laragon\www\LP\backend

# Copy client ke backend
mkdir -p src/ai
cp ../ai/gemini-client.ts src/ai/

# Set API key (paste saat diminta)
wrangler secret put GOOGLE_AI_API_KEY

# Deploy
npm run deploy
```

### 3. Deploy Frontend
```bash
cd c:\laragon\www\LP

# Copy component
cp ai/AIContentGenerator.tsx src/components/

# Build & deploy
npm run build
ssh tholib_server@192.168.1.27 "cd /var/www/hscopycenter && git pull && npm run build"
```

## 💰 Biaya

| Item | Biaya |
|------|-------|
| Google AI API | **GRATIS** |
| Free Tier | 1 juta token/bulan |
| Estimasi usage | ~500 generasi/bulan |

---

**Status:** Menunggu user dapatkan API key dari Google AI Studio
