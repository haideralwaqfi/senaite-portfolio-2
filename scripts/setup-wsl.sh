#!/usr/bin/env bash
# Reinstall native modules for Linux (WSL). Required when node_modules was created on Windows.
set -euo pipefail
cd "$(dirname "$0")/.."
echo "Removing node_modules and .next..."
rm -rf node_modules .next
echo "Installing dependencies for Linux..."
npm install
echo "Done. Run: npm run dev"
