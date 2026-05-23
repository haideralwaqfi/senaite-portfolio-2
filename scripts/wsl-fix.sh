#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

if [ -f "$HOME/.nvm/nvm.sh" ]; then
  # shellcheck source=/dev/null
  . "$HOME/.nvm/nvm.sh"
  nvm use 20 2>/dev/null || nvm use 22 2>/dev/null || true
fi

echo "Node: $(node -v)"
echo "Installing Linux native optional dependencies..."
npm install @tailwindcss/oxide-linux-x64-gnu@4.3.0 lightningcss-linux-x64-gnu@1.32.0 @next/swc-linux-x64-gnu@16.2.6 --no-save
node scripts/postinstall-native.mjs
echo "Testing native modules..."
node -e "require('lightningcss'); require('@tailwindcss/oxide'); console.log('Native modules OK')"
echo "Run: npm run dev"
