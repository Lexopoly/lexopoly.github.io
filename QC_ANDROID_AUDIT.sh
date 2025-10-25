#!/bin/bash
# QuoteCreator Android Reference Audit
# Searches for outdated Android app terminology across QuoteCreator web presence

echo "========================================="
echo "QuoteCreator Web Presence Android Audit"
echo "========================================="
echo ""
echo "Searching for Android-specific references that need updating for web app..."
echo ""

SEARCH_TERMS=(
  "android"
  "google play"
  "app store"
  "mobile app"
  "uninstall"
  "sqlite"
  "smartphone"
  "download.*app"
  "install.*app"
)

SEARCH_DIRS=(
  "quotecreator/"
  "blog/quotecreator/"
  "blog/contractor-estimate-software-one-time-purchase/"
  "blog/professional-estimates-60-seconds/"
)

for term in "${SEARCH_TERMS[@]}"; do
  echo "=== Searching for: '$term' ==="
  for dir in "${SEARCH_DIRS[@]}"; do
    if [ -d "$dir" ]; then
      grep -rni "$term" "$dir" --include="*.html" 2>/dev/null | grep -v backup | grep -v ".backup"
    fi
  done
  echo ""
done

echo "========================================="
echo "Audit Complete"
echo "========================================="
