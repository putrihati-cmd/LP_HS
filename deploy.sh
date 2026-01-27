#!/bin/bash
# HS Copy Center - Deployment Script
# Run this on your server

set -e

echo "🚀 Deploying HS Copy Center..."

# Variables
APP_DIR="/var/www/hscopycenter"
REPO_URL="https://github.com/putrihati-cmd/LP_HS.git"
BRANCH="backup-static-site"

# Navigate to app directory
cd $APP_DIR

# Pull latest changes
echo "📥 Pulling latest changes..."
git remote set-url origin $REPO_URL
git fetch origin
git reset --hard origin/$BRANCH

# ==========================================
# FRONTEND DEPLOYMENT
# ==========================================
echo "📦 Installing frontend dependencies..."
npm install

echo "🔨 Building Vite frontend..."
npm run build

# Restart frontend with PM2 (Serve static files)
echo "🔄 Restarting frontend..."
pm2 delete hscopycenter-frontend || true
pm2 start "npx serve -s dist -l 3001" --name "hscopycenter-frontend"

# ==========================================
# BACKEND DEPLOYMENT
# ==========================================
echo "📦 Installing backend dependencies..."
cd $APP_DIR/backend
npm install
echo "🔧 Rebuilding native modules..."
npm rebuild

# Initialize database if not exists
echo "🗄️ Initializing database..."
# Initialize database
echo "🗄️ Initializing database schema..."
# Always run init-db to ensure new tables (like promos) are created
node --import tsx/esm init-db.ts

# Optional: Run seed if you want to reset/update data
# node --import tsx/esm seed.ts
# For now, we will run seed to ensure Promos are added (WARNING: Clears existing data)
if [ ! -f "seeded.lock" ]; then
    echo "🌱 Seeding initial data..."
    node --import tsx/esm seed.ts
    touch seeded.lock
else
    echo "🌱 Seed already run. Skipping to preserve data. Run manually if needed."
fi

# Restart backend with PM2
echo "🔄 Restarting backend server..."
pm2 delete hscopycenter-backend || true
pm2 start "node --import tsx/esm server.ts" --name "hscopycenter-backend"

# Save PM2 process list
pm2 save

# ==========================================
# NGINX RELOAD
# ==========================================
cd $APP_DIR
echo "🔄 Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo "✅ Deployment complete!"
echo "🌐 Frontend: https://hscopycenter.site"
echo "🔧 Backend API: http://localhost:3000"
