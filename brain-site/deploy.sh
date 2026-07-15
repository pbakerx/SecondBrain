#!/bin/bash
# Deploy your Second Brain to Vercel (password-protected).
# Run from this folder:  bash deploy.sh
set -e
cd "$(dirname "$0")"

# Load local secrets (password); not committed
[ -f .deploy.env ] && set -a && . ./.deploy.env && set +a
BRAIN_USER="${BRAIN_USER:-philip}"
BRAIN_PASSWORD="${BRAIN_PASSWORD:-changeme}"

# 1. Pull the latest markdown from your Second Brain into ./content
echo "→ Refreshing content from your brain..."
BRAIN=".."
mkdir -p content/Projects content/Areas content/Resources
cp "$BRAIN/SECOND-BRAIN.md" "$BRAIN/daily-log.md" content/ 2>/dev/null || true
cp "$BRAIN/Projects/"*.md content/Projects/ 2>/dev/null || true
cp "$BRAIN/Areas/"*.md    content/Areas/    2>/dev/null || true
cp "$BRAIN/Resources/"*.md content/Resources/ 2>/dev/null || true

# 2. Build the static site
echo "→ Building pages..."
npm install --silent
node build.js

# 3. Deploy to Vercel (token read from your AechTech .env)
TOKEN=$(grep '^VERCEL_TOKEN=' "$BRAIN/aechtech-voice-agents/.env" | cut -d= -f2-)
echo "→ Deploying to Vercel..."
npx vercel deploy --prod --yes \
  -e BRAIN_USER="$BRAIN_USER" \
  -e BRAIN_PASSWORD="$BRAIN_PASSWORD" \
  --token "$TOKEN"

echo ""
echo "✅ Done. Log in with the user/password from .deploy.env"
echo "   Change the password by editing BRAIN_PASSWORD above and re-running."
