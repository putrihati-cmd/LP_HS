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

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building Vite app..."
npm run build

# Restart the application with PM2 (Serve static files)
echo "🔄 Restarting application..."
pm2 delete hscopycenter || true
pm2 start "npx serve -s dist -l 3001" --name "hscopycenter"

# Reload Nginx
echo "🔄 Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo "✅ Deployment complete!"
echo "🌐 Site: https://hscopycenter.site"
