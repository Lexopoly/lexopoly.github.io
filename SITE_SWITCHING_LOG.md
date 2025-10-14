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

## 🟢 SWITCH #2: SITE ON - 2025-10-14 09:27 EST

**Action**: SITE_ON (Under Construction → Full Site)
**Timestamp**: 2025-10-14T13:27:00Z
**Operator**: CC-WEB (Claude Code, user: rain)
**Git State Before Switch**:
- Commit: `68c2132` (chore: Switch to construction mode for legal review)
- Branch: `main`
- Status: Clean (1 untracked file: INTEGRATION_PLAYBOOK.md)

**Reason** (required, short): Restore full site after ComplianceLogger legal review complete
**Additional Info** (optional): ComplianceLogger legal framework implementation complete (Entry #15 in LEXOPOLY_SUPER_BUS.jsonl). Site was in construction mode for legal review period. Restoring full site with LocalTranscribe + QuoteCreator products. ComplianceLogger integration available but not yet added to public navigation pending beta launch completion (Stripe webhook implementation).

**Restore Source**:
- Backup File: `index.full-backup.html` (53KB)
- Git Tag Reference: `site-full-backup-20251014-013626`

**State Transition**:
- Previous: `index.html` = Under construction (minimal page, 2 contact methods)
- New: `index.html` = Full site (2 products: LocalTranscribe + QuoteCreator, 6 industry verticals, pricing, unified navigation)

**Files Modified**:
- `index.html` (restored from index.full-backup.html)
- `SITE_SWITCHING_LOG.md` (this log entry added)

**Verification Checklist**:
- [ ] Full homepage displays correctly
- [ ] Navigation dropdowns work (Products, Solutions, About)
- [ ] Product cards visible (LocalTranscribe, QuoteCreator)
- [ ] Mobile menu functional
- [ ] Footer links operational
- [ ] Analytics tracking active

**Context**:
Second site switch. CC-WEB (Webmaster) restoring site after legal review period complete. Full site includes professional navigation system (17/17 pages transformed per NAVIGATION_ROLLOUT_METRICS_20251010.md). ComplianceLogger product pages exist but not yet linked pending Stripe webhook implementation (Super Bus entry: WEBMASTER_REQUEST_STRIPE_WEBHOOK, HIGH priority, 30-45 min estimated).

**Next Steps After Verification**:
1. Test live site functionality
2. Implement ComplianceLogger Stripe webhook (blocking beta launch)
3. Add ComplianceLogger to public navigation after webhook complete
4. Update webmaster bus ops with completion status

**Rollback Command** (if needed):
```bash
cp index.construction.html index.html
git add index.html SITE_SWITCHING_LOG.md
git commit -m "fix: Rollback to construction mode (entry #2 rollback)"
git push
```

**Git Commit**: `f8e3d9a` (feat: Switch to full site - Entry #2)

---

<!-- APPEND NEW ENTRIES BELOW - DO NOT EDIT ABOVE -->

## 🔴 SWITCH #3: SITE OFF - 2025-10-14 18:45 EST

**Action**: SITE_OFF (Full Site → Under Construction)
**Timestamp**: 2025-10-14T22:45:00Z
**Operator**: CC-WEB (Claude Code, user: rain)
**Git State Before Switch**:
- Commit: `904831a` (docs: Document multi-product messaging fixes)
- Branch: `main`
- Status: Clean working tree (1 untracked: INTEGRATION_PLAYBOOK.md)

**Reason** (required, short): Construction mode for blog integration refinement
**Additional Info** (optional): Multi-product messaging fixes complete (demo page transformed, Volume Pricing → Flexible Pricing). User requested site OFF to allow additional blog integration work without affecting live production traffic. Issues fixed: (1) /demo/ page was LocalTranscribe-only → now 3-product hub, (2) Homepage "Volume Pricing" feature card was LT-specific → now multi-product "Flexible Pricing".

**Backup Created**:
- Git Tag: `pre-construction-v3-multi-product-fixes`
- Backup File: `index.full-backup.html` (created from current index.html)
- Tag Message: "Backup: Multi-product messaging fixes before construction mode switch #3"

**State Transition**:
- Previous: `index.html` = Full site (3 products, multi-product demo hub, flexible pricing messaging)
- New: `index.html` = Under construction (minimal page, 2 contact methods)

**Files Modified**:
- `index.html` (replaced with construction template)
- `index.full-backup.html` (created from previous index.html)
- `SITE_SWITCHING_LOG.md` (this log entry added)

**Verification Checklist**:
- [x] Construction page displays correctly ✅ PASS (2025-10-14 22:46Z)
- [x] Spinner animation works ✅ PASS
- [x] support@lexopoly.com link functional ✅ PASS
- [x] @lexopoly X link functional ✅ PASS
- [x] Mobile responsive ✅ PASS
- [x] Favicon loads ✅ PASS

**Visual Test Result**: ✅ **PASSED** - All verification items confirmed working (2025-10-14 22:46Z)

**Context**:
Third site switch. Following high-end dev shop quality fixes to demo page and homepage messaging. Site contains recent improvements: /demo/ converted to professional 3-product hub (LocalTranscribe/QuoteCreator/ComplianceLogger), homepage Volume Pricing changed to Flexible Pricing with generic multi-product messaging. Blog integration complete (6 category pages, 2 blog articles live). Construction mode enabled for additional blog work.

**Rollback Command** (if needed):
```bash
git show pre-construction-v3-multi-product-fixes:index.html > index.html
git add index.html
git commit -m "fix: Rollback from construction mode (entry #3)"
git push
```

**Git Commit**: `d685876` (feat: Switch to construction mode - Entry #3)

---
