#!/bin/bash
# Pathmaker Auto-Publish Script

echo "🚀 Starting Auto-Publish process for Pathmaker..."

# 1. Block publication if changed articles contain prompt leakage or formatting corruption
npm run audit:changed-content

# 2. Build the project
npm run build

# 3. Add changes
git add .

# 4. Commit
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "Auto-publish: Pathmaker Insight Update [$TIMESTAMP]"

# 5. Push
echo "📦 Pushing to GitHub..."
git push origin main

# 6. Sitemap Status
echo "🔍 Checking sitemap status..."
node scripts/ping-google.js

echo ""
echo "✅ Pathmaker Publish complete!"
