#!/bin/bash
# Pathmaker Auto-Publish Script

echo "🚀 Starting Auto-Publish process for Pathmaker..."

# 1. Build the project
npm run build

# 2. Add changes
git add .

# 3. Commit
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "Auto-publish: Pathmaker Intelligence Update [$TIMESTAMP]"

# 4. Push
echo "📦 Pushing to GitHub..."
git push origin main

# 5. Ping Search Engines
echo "🔍 Notifying search engines..."
node scripts/ping-google.js

echo "✅ Pathmaker Publish complete!"
