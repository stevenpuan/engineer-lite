#!/bin/bash
cd "$(dirname "$0")"
echo "=== Engineer Lite: Push to GitHub ==="

# Check if remote exists
if ! git remote get-url origin 2>/dev/null; then
  echo "Adding remote origin..."
  git remote add origin https://github.com/stevenpuan/engineer-lite.git
fi

echo "Pushing to main..."
git push -u origin main

echo ""
echo "Done! Press Enter to close."
read
