# Site Switching Log (Immutable Ledger)

**Purpose**: Permanent append-only record of all site ON/OFF switches
**Protocol**: NEVER edit existing entries - only append new entries
**Format**: Each entry is a complete record with timestamp, reason, verification

---

## 🔴 SWITCH #1: SITE OFF - 2025-10-12 17:45 UTC

**Action**: SITE_OFF (Full Site → Under Construction)
**Timestamp**: 2025-10-14T01:36:26Z
**Operator**: Claude Code (user: rain)
**Git State Before Switch**:
- Commit: `b8f4a75` (feat: Add immutable ledger requirement)
- Branch: `main`
- Status: Clean working tree

**Reason** (required, short): Visual testing of construction page
**Additional Info** (optional): User requested site OFF to view construction mode appearance on live site. First use of site switching protocol after immutable ledger implementation.

**Backup Created**:
- Git Tag: `site-full-backup-20251014-013626`
- Backup File: `index.full-backup.html` (will be created, ~53KB)
- Tag Message: "Full site backup before construction mode - 2025-10-14T01:36:26Z"

**State Transition**:
- Previous: `index.html` = Full site (products, navigation, 6 verticals, blog)
- New: `index.html` = Under construction (minimal page, 2 contact methods)

**Files Modified**:
- `index.html` (replaced with construction template)
- `index.full-backup.html` (created from previous index.html)
- `SITE_SWITCHING_LOG.md` (this log entry added)

**Verification Checklist**:
- [x] Construction page displays correctly ✅ PASS (2025-10-14)
- [x] Spinner animation works ✅ PASS
- [x] support@lexopoly.com link functional ✅ PASS
- [x] @lexopoly X link functional ✅ PASS
- [x] Mobile responsive ✅ PASS
- [x] Favicon loads ✅ PASS

**Visual Test Result**: ✅ **PASSED** - All verification items confirmed working (2025-10-14)

**Context**:
First use of site switching protocol after creation. User making product changes and wants clean slate while iterating on positioning/messaging. Construction mode provides minimal contact-only page while work is in progress.

**Rollback Command** (if needed):
```bash
git show site-full-backup-20251014-013626:index.html > index.html
git add index.html
git commit -m "fix: Rollback from construction mode (entry #1)"
git push
```

**Git Commit**: `7de3e50` (feat: Switch to under-construction mode - Entry #1)

---

<!-- APPEND NEW ENTRIES BELOW - DO NOT EDIT ABOVE -->
