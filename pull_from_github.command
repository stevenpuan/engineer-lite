#!/bin/bash
cd "$(dirname "$0")"
echo "=== Engineer Lite: Pull from GitHub ==="
git pull origin main
echo ""
echo "Done! Press Enter to close."
read
