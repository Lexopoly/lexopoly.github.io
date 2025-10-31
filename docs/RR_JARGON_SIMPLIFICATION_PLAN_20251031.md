# RevenueRescue Jargon Simplification Plan

**Date**: 2025-10-31
**Status**: Approved - Ready for Implementation
**Trigger**: User feedback that technical language (OAuth 2.0, etc.) creates friction for non-technical lawyer audience

---

## Executive Summary

Technical jargon audit revealed **9 instances of "OAuth"** across product pages, plus multiple false security claims not backed by actual implementation. This plan removes jargon, corrects false claims, and uses conservative lawyer-friendly language.

---

## Security Audit Key Findings

### ✅ WHAT IS ACTUALLY IMPLEMENTED (Can Claim):
- OAuth 2.0 authentication with Clio (proper authorization code flow)
- HTTPS/TLS encrypted connections (data in transit)
- Bcrypt password hashing (12 salt rounds)
- Secure session management (HttpOnly cookies, JWT tokens)
- Email enumeration prevention
- One-time password reset tokens (1-hour expiration)

### ❌ WHAT IS NOT IMPLEMENTED (Cannot Claim):
- Database encryption at rest (OAuth tokens stored in PLAINTEXT)
- "End-to-end encryption" (not implemented)
- SOC 2 compliance (marked "Not Started" in COMPLIANCE_CHECKLIST_V1.1.md)
- Rate limiting (not implemented)
- HTTP→HTTPS redirect / HSTS headers (incomplete)

### 🚨 FALSE CLAIMS FOUND IN CURRENT MARKETING:
1. **Homepage Line 766**: "All data is encrypted in transit and at rest" ← FALSE (no encryption at rest)
2. **Homepage Line 766**: "SOC 2 compliance standards" ← FALSE (not started)
3. **Features Line 598**: "End-to-end encryption for data in transit and at rest" ← FALSE
4. **Features Line 636**: "0.5 hour rounding" ← FALSE (only 0.1 and 0.25 implemented)

**Reference Files**:
- `/home/rain/si0/prisma/schema.prisma` - Shows OAuth tokens in plaintext (lines 52-63)
- `/home/rain/si0/COMPLIANCE_CHECKLIST_V1.1.md` - Documents "Tokens stored in plaintext" and SOC 2 "Not Started"
- `/home/rain/si0/apps/api/src/routes/oauth.ts` - OAuth 2.0 implementation (verified working)
- `/home/rain/si0/apps/api/src/lib/auth.ts` - Bcrypt password hashing (verified working)

---

## Jargon Problems Identified

### Most Common Issue: "OAuth" (9 instances)
Lawyers don't understand OAuth protocol terminology. Replace with "secure authentication/connection/login"

**Locations**:
- Homepage: Lines 670, 710, 740, 762, 766 (5 instances)
- Features: Lines 466, 528, 596 (3 instances)
- Pricing: Line 473 (1 instance)
- Contact: Line 433 (1 instance)

### Other Technical Jargon:
- "Multi-tenant database architecture" (2 instances) → "Your firm's data is completely separate"
- "API keys" (1 instance) → "technical setup"
- "Native integration" (2 instances) → "direct connection"
- "PCI-compliant" (1 instance) → Could add context or simplify

---

## Implementation Plan - 15 Critical Changes

### HOMEPAGE (/home/rain/code/lexopoly-site/revenuerescue/index.html)

**Change 1 - Line 670:**
- **Current**: "OAuth secure authentication means we never see your password"
- **Updated**: "Secure authentication means we never see your password"
- **Why**: Remove OAuth jargon while keeping security message

**Change 2 - Line 710:**
- **Current**: "Native OAuth integration with Clio"
- **Updated**: "Secure direct connection with Clio"
- **Why**: Focus on outcome (direct connection) not protocol (OAuth)

**Change 3 - Line 740:**
- **Current**: "Clio OAuth integration"
- **Updated**: "Secure Clio connection"
- **Why**: Pricing feature list should be simple

**Change 4 - Line 762:**
- **Current**: "RevenueRescue connects to your Clio calendar via secure OAuth"
- **Updated**: "RevenueRescue connects to your Clio calendar using secure authentication"
- **Why**: FAQ should be accessible to non-technical readers

**Change 5 - Line 766 (CRITICAL - False Claims):**
- **Current**: "OAuth 2.0 authentication, which means we never see or store your Clio password. All data is encrypted in transit and at rest."
- **Updated**: "Industry-standard secure authentication, which means we never see or store your Clio password. All data connections are encrypted."
- **Why**:
  - Remove "OAuth 2.0" jargon
  - REMOVE "encrypted at rest" - FALSE CLAIM (tokens in plaintext per security audit)
  - Replace with accurate "data connections are encrypted" (HTTPS/TLS verified)

**Change 6 - Line 766:**
- **Current**: "Multi-tenant database architecture to ensure your firm's data is completely isolated"
- **Updated**: "Your firm's data is completely separate from other firms"
- **Why**: Remove technical architecture terminology, focus on outcome

**Change 7 - Line 766 (CRITICAL - False Claim):**
- **Current**: "Our infrastructure follows SOC 2 compliance standards"
- **Updated**: "Our infrastructure follows industry-standard security practices"
- **Why**: CANNOT claim SOC 2 - audit shows "Not Started" in compliance checklist

---

### FEATURES PAGE (/home/rain/code/lexopoly-site/revenuerescue/features/index.html)

**Change 8 - Line 466:**
- **Current**: "OAuth 2.0 secure authentication - we never see your password"
- **Updated**: "Secure authentication - we never see your password"
- **Why**: Remove OAuth version number jargon

**Change 9 - Line 528:**
- **Current**: "OAuth 2.0 authentication - no API keys or passwords to manage"
- **Updated**: "Secure one-click login - no passwords or technical setup required"
- **Why**: Remove "OAuth 2.0" and "API keys" - double jargon fix

**Change 10 - Line 596:**
- **Current**: "OAuth 2.0 authentication (no passwords stored)"
- **Updated**: "Secure authentication (we never store your passwords)"
- **Why**: Remove OAuth jargon, clarify language ("never store" vs "no stored")

**Change 11 - Line 598 (CRITICAL - False Claim):**
- **Current**: "End-to-end encryption for data in transit and at rest"
- **Updated**: "Encrypted connections for all data transmission"
- **Why**: REMOVE "at rest" - FALSE CLAIM per security audit (tokens in plaintext)

**Change 12 - Line 598:**
- **Current**: "Multi-tenant database architecture with complete data isolation"
- **Updated**: "Your firm's data is completely separate from all other firms"
- **Why**: Remove technical jargon, focus on outcome

**Change 13 - Line 636 (CRITICAL - False Claim):**
- **Current**: "Custom billing increment preferences (0.1, 0.25, 0.5 hour rounding)"
- **Updated**: "Custom billing increment preferences (6-minute or 15-minute rounding)"
- **Why**: User confirmed 0.5 hour (30-minute) NOT IMPLEMENTED - only 0.1 (6-min) and 0.25 (15-min)

---

### PRICING PAGE (/home/rain/code/lexopoly-site/revenuerescue/pricing/index.html)

**Change 14 - Line 473:**
- **Current**: "Native Clio OAuth integration"
- **Updated**: "Secure direct Clio connection"
- **Why**: Remove OAuth and "native" jargon

---

### CONTACT PAGE (/home/rain/code/lexopoly-site/revenuerescue/contact/index.html)

**Change 15 - Line 433:**
- **Current**: "connect your Clio account via OAuth (click a button)"
- **Updated**: "connect your Clio account securely (click a button)"
- **Why**: Remove OAuth, keep simple explanation

---

## Voice & Tone Guidelines

### ✅ DO:
- Use lawyer-familiar analogies ("bank-level" - BUT only if encryption at rest is implemented)
- Focus on outcomes ("never see your password") not protocols ("OAuth 2.0")
- Use simple active voice ("encrypted connections" vs "encryption in transit")
- Add brief context when necessary ("SOC 2 (enterprise security certification)" - when certified)

### ❌ DON'T:
- Use technical protocol names (OAuth, API, TLS, JWT) in customer-facing text
- Use developer jargon ("native integration", "multi-tenant architecture")
- Make security claims not backed by actual implementation
- Assume lawyers understand technical acronyms

---

## Accuracy Checklist

After implementing these changes, verify:
- [ ] No "OAuth" appears in customer-facing text
- [ ] No "encrypted at rest" claims (NOT TRUE)
- [ ] No "SOC 2" claims (NOT CERTIFIED)
- [ ] No "end-to-end encryption" claims (NOT IMPLEMENTED)
- [ ] No "0.5 hour billing" claims (NOT IMPLEMENTED)
- [ ] All security claims match actual implementation

---

## Post-Implementation Security Improvements Needed

To make stronger security claims in the future:

### P0 - Before Paid Customers (16 hours):
1. **Encrypt OAuth tokens at rest** (6 hours) - Use AES-256-GCM with `MATTER_ENCRYPTION_KEY`
2. **Add HTTP→HTTPS redirect + HSTS** (2 hours) - Enforce TLS
3. **Implement rate limiting** (4 hours) - Prevent brute force
4. **Add Sentry error monitoring** (4 hours) - Catch production errors

### P1 - Before Enterprise Sales ($12K-30K):
5. **External security audit** ($2K-5K) - Validate claims
6. **SOC 2 Type I certification** (12 hours prep + $10K-25K audit)
7. **Privacy policy legal review** ($500-1K)

Then can legitimately claim:
- "Bank-level encryption" (if encrypt at rest)
- "SOC 2 certified" (if pass audit)
- "Enterprise-grade security" (if implement rate limiting + monitoring)

---

## Implementation Status

**Status**: Plan approved, implementation pending
**Estimated Time**: 40 minutes (15 changes)
**Priority**: HIGH - Contains false claims that must be corrected
**Files Modified**: 4 (homepage, features, pricing, contact)

**Commit Message Template**:
```
fix: Remove technical jargon and correct false security claims

Simplify language for non-technical lawyer audience:
- Remove "OAuth/OAuth 2.0" (9 instances) → "secure authentication/connection"
- Remove "multi-tenant architecture" → "data completely separate"
- Correct FALSE CLAIMS:
  - "Encrypted at rest" → "Encrypted connections" (only transit implemented)
  - "SOC 2 compliance" → "Industry-standard practices" (not certified)
  - "0.5 hour billing" → Only 6-min and 15-min (0.1 and 0.25)

Based on security audit of si0 codebase showing:
- OAuth tokens stored in plaintext (no encryption at rest)
- SOC 2 marked "Not Started" in compliance checklist
- Only 0.1 and 0.25 hour billing increments implemented

All claims now match actual implementation.
```

---

## Related Documentation

- `/home/rain/si0/COMPLIANCE_CHECKLIST_V1.1.md` - Security implementation status
- `/home/rain/si0/AUTH_IMPLEMENTATION_COMPLETE_20251030.md` - Auth documentation
- `/home/rain/si0/AUTH_ENDPOINT_TESTING_COMPLETE_20251031.md` - Testing verification
- `/home/rain/si0/PRISMA_CLIENT_CACHE_FIX_20251031.md` - Database configuration

---

**Created**: 2025-10-31
**Author**: Claude Code (CC-WEB)
**Review Status**: User approved
**Implementation Status**: Pending execution
