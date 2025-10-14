# Lexopoly Site Switching Protocol

**Version**: 1.0
**Created**: 2025-10-12
**Purpose**: Enable fast, reversible switching between full site and under-construction mode

## 🎯 Overview

This protocol allows instant switching between:
- **Full Site** (`index.html`) - Complete website with all pages and products
- **Under Construction** (`index.construction.html`) - Minimal holding page with contact info

## 📋 Prerequisites

Before switching, ensure:
1. All changes are committed to git
2. Working directory is clean (`git status` shows no uncommitted changes)
3. You have a recent backup tag (created automatically by this protocol)

## 📖 Immutable Ledger Requirement

**CRITICAL**: Every site switch MUST be logged in `SITE_SWITCHING_LOG.md`

**Required Information**:
- Timestamp (ISO 8601 format)
- Action (SITE_OFF or SITE_ON)
- Operator (who made the change)
- **Reason** (required, short) - One-line why
- **Additional Info** (optional) - Longer context if needed
- Git commit hash (before switch)
- Git tag created (backup reference)
- Previous state → New state
- Files modified
- Verification checklist

**Protocol**:
- ✅ APPEND new entries only
- ❌ NEVER edit existing entries
- ✅ Each entry is permanent record
- ✅ Includes rollback command for that specific switch

See `SITE_SWITCHING_LOG.md` for complete ledger history.

## 🔄 Switching Procedures

### **SWITCH TO UNDER-CONSTRUCTION MODE**

```bash
# 0. CREATE LOG ENTRY in SITE_SWITCHING_LOG.md
# - Add new section with timestamp, reason, operator, git state
# - Leave Git Commit field blank (fill after commit)
# - Follow immutable ledger format (see existing entries)

# 1. Verify clean working tree
git status

# 2. Create backup tag (automatic timestamp)
DATE=$(date +%Y%m%d-%H%M%S)
git tag -a "site-full-backup-$DATE" -m "Full site backup before construction mode - $DATE"

# 3. Backup current index.html
cp index.html index.full-backup.html

# 4. Switch to construction mode
cp index.construction.html index.html

# 5. Commit the switch (includes log entry)
git add index.html index.full-backup.html SITE_SWITCHING_LOG.md
git commit -m "feat: Switch to under-construction mode

Minimal holding page active while product changes in progress.
Full site backed up as index.full-backup.html

See SITE_SWITCHING_LOG.md for complete switch record.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# 6. Update log entry with commit hash
# - Edit SITE_SWITCHING_LOG.md
# - Fill in "Git Commit" field with hash from previous commit
# - Commit the log update

# 7. Push to GitHub Pages
git push
git push --tags

# Done! Site is now in construction mode
echo "✅ Site switched to UNDER-CONSTRUCTION mode"
echo "Full site backed up: index.full-backup.html"
echo "Backup tag: site-full-backup-$DATE"
echo "⚠️  Remember to update Git Commit field in SITE_SWITCHING_LOG.md"
```

### **SWITCH TO FULL SITE MODE**

```bash
# 0. CREATE LOG ENTRY in SITE_SWITCHING_LOG.md
# - Add new section with timestamp, reason, operator, git state
# - Leave Git Commit field blank (fill after commit)
# - Follow immutable ledger format (see existing entries)

# 1. Verify clean working tree
git status

# 2. Restore full site
cp index.full-backup.html index.html

# 3. Commit the switch (includes log entry)
git add index.html SITE_SWITCHING_LOG.md
git commit -m "feat: Restore full site from construction mode

Full site restored from backup.

See SITE_SWITCHING_LOG.md for complete switch record.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# 4. Update log entry with commit hash
# - Edit SITE_SWITCHING_LOG.md
# - Fill in "Git Commit" field with hash from previous commit
# - Commit the log update

# 5. Push to GitHub Pages
git push

# Done! Full site is live
echo "✅ Site switched to FULL SITE mode"
echo "⚠️  Remember to update Git Commit field in SITE_SWITCHING_LOG.md"
```

## 🚨 Emergency Rollback

If something goes wrong, restore from git tag:

```bash
# List recent backup tags
git tag -l "site-full-backup-*" | tail -5

# Restore index.html from specific tag
TAG="site-full-backup-20251012"  # Replace with your tag
git show $TAG:index.html > index.html

# Commit and push
git add index.html
git commit -m "fix: Emergency rollback to $TAG"
git push
```

## 📊 Current State Files

| File | Purpose | Usage |
|------|---------|-------|
| `index.html` | **Active homepage** | What visitors see on lexopoly.com |
| `index.construction.html` | Under-construction template | Minimal holding page |
| `index.full-backup.html` | Full site backup | Restore point when exiting construction mode |

## 🔐 Git Tags for Safety

**Tag Naming Convention**: `site-full-backup-YYYYMMDD-HHMMSS`

**View all backup tags**:
```bash
git tag -l "site-full-backup-*"
```

**View specific tag details**:
```bash
git show site-full-backup-20251012
```

**List tags with dates**:
```bash
git tag -l "site-full-backup-*" --format="%(refname:short) - %(creatordate:short)"
```

## ✅ Verification Checklist

### After Switching to Construction Mode
- [ ] Visit https://lexopoly.com - should show minimal page
- [ ] Verify spinner animation works
- [ ] Verify support@lexopoly.com link works
- [ ] Verify @lexopoly X link works
- [ ] Check mobile responsiveness
- [ ] Confirm `index.full-backup.html` exists in repo

### After Switching to Full Site Mode
- [ ] Visit https://lexopoly.com - should show full homepage
- [ ] Test all navigation dropdowns
- [ ] Verify product pages work
- [ ] Test mobile menu
- [ ] Check footer links

## 🎨 Under-Construction Page Features

**Design Philosophy**: Minimal, modern, on-brand
- Purple gradient background (#667eea → #764ba2)
- Animated loading spinner
- Clean typography (system fonts)
- 2 contact methods only: Email + X
- Fully responsive (mobile-friendly)
- No analytics, no tracking, no cruft

**What's Included**:
- ✅ Company name (Lexopoly)
- ✅ Tagline ("Something new is coming")
- ✅ Support email link
- ✅ X/Twitter account link
- ✅ Loading spinner animation
- ✅ Favicon (uses existing /favicon.svg)

**What's Excluded**:
- ❌ Product details
- ❌ Pricing information
- ❌ Navigation menu
- ❌ Footer with 20+ links
- ❌ Analytics tracking
- ❌ Marketing copy

## 📝 Notes

**GitHub Pages Deployment**:
- Changes typically deploy within 1-3 minutes after push
- Clear browser cache if you don't see changes immediately
- Use `Ctrl+Shift+R` (hard reload) to bypass cache

**Safety Features**:
- Git tags provide instant rollback capability
- Backup file stays in repo for safety
- All switches are reversible
- No data loss - full site always preserved

**When to Use Construction Mode**:
- Major product changes in progress
- Re-evaluating positioning/messaging
- Infrastructure work (backend changes)
- Legal/compliance reviews
- Pre-launch preparation

**When to Stay in Full Site Mode**:
- Minor copy tweaks (can do live)
- Adding blog posts (non-disruptive)
- SEO optimizations
- Visual polish (CSS/design)

---

**Last Updated**: 2025-10-12
**Protocol Version**: 1.0
**Status**: ✅ Ready for use
