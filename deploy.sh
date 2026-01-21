#!/bin/bash
# HS Copy Center - Deployment Script
# Run this on your server

set -e

echo "🚀 Deploying HS Copy Center..."

# Variables
APP_DIR="/var/www/hscopycenter"
REPO_URL="git@github.com:YOUR_USERNAME/LP.git"
BRANCH="backup-static-site"

# Navigate to app directory
cd $APP_DIR

# Pull latest changes
echo "📥 Pulling latest changes..."
git fetch origin
git reset --hard origin/$BRANCH

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# Build the application
echo "🔨 Building Next.js app..."
npm run build

# Restart the application with PM2
echo "🔄 Restarting application..."
pm2 restart hscopycenter || pm2 start npm --name "hscopycenter" -- start -- -p 3001

# Reload Nginx
echo "🔄 Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo "✅ Deployment complete!"
echo "🌐 Site: https://hscopycenter.site"
