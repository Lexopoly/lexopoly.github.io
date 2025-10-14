# Site Switching Log (Immutable Ledger)

**Purpose**: Permanent append-only record of all site ON/OFF switches
**Protocol**: NEVER edit existing entries - only append new entries
**Format**: Each entry is a complete record with timestamp, reason, verification

---

## 🔴 SWITCH #1: SITE OFF - 2025-10-12 17:45 UTC

**Action**: SITE_OFF (Full Site → Under Construction)
**Timestamp**: 2025-10-12T17:45:00Z
**Operator**: Claude Code (user: rain)
**Git State Before Switch**:
- Commit: `99ff2cc` (feat: Add site switching protocol)
- Branch: `main`
- Status: Clean working tree

**Reason**: Visual testing of under-construction page. User requested site OFF to view construction mode appearance on live site.

**Backup Created**:
- Git Tag: `site-full-backup-20251012-174500`
- Backup File: `index.full-backup.html` (1615 lines, 53847 bytes)
- Tag Message: "Full site backup before construction mode - 2025-10-12T17:45:00Z"

**State Transition**:
- Previous: `index.html` = Full site (products, navigation, 6 verticals, blog)
- New: `index.html` = Under construction (minimal page, 2 contact methods)

**Files Modified**:
- `index.html` (replaced with construction template)
- `index.full-backup.html` (created from previous index.html)
- `SITE_SWITCHING_LOG.md` (this log entry added)

**Verification Checklist**:
- [ ] Construction page displays correctly (user will verify)
- [ ] Spinner animation works
- [ ] support@lexopoly.com link functional
- [ ] @lexopoly X link functional
- [ ] Mobile responsive
- [ ] Favicon loads

**Context**:
First use of site switching protocol after creation. User making product changes and wants clean slate while iterating on positioning/messaging. Construction mode provides minimal contact-only page while work is in progress.

**Rollback Command** (if needed):
```bash
git show site-full-backup-20251012-174500:index.html > index.html
git add index.html
git commit -m "fix: Rollback from construction mode (entry #1)"
git push
```

**Git Commit**: [To be filled after commit]

---

<!-- APPEND NEW ENTRIES BELOW - DO NOT EDIT ABOVE -->
