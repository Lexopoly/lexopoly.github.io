# Lexopoly Product Integration Playbook
**Version**: 1.0
**Date**: October 13, 2025
**Purpose**: Standardized process for integrating products 4-30 into lexopoly.com

---

## 🎯 Overview

This playbook provides a repeatable, systematic approach for integrating new Lexopoly products into the main website. Based on lessons learned from **LocalTranscribe**, **QuoteCreator**, and **ComplianceLogger** integrations.

### Integration Time Estimate
- **Using this playbook**: 2-3 hours per product
- **Without playbook**: 6-8 hours per product
- **Efficiency gain**: 60-70% faster

---

## 📋 Pre-Integration Checklist

Before starting integration, gather the following information:

### Product Information Required
- [ ] Product name (internal + marketing name)
- [ ] Product tagline (8-12 words max)
- [ ] Product description (2-3 sentences)
- [ ] Key features list (5-7 bullet points)
- [ ] Pricing model (one-time, subscription, freemium)
- [ ] Target audience (primary + secondary)
- [ ] Unique value proposition (what makes it different)
- [ ] Product icon/emoji (fallback until custom icon created)
- [ ] Product URL (subdomain or path)
- [ ] App URL (if applicable - hosted app link)

### Marketing Materials Required
- [ ] Product overview document (like MARKETING_OVERVIEW.md)
- [ ] Feature descriptions
- [ ] Use cases / customer stories
- [ ] FAQ items (3-5 minimum)
- [ ] Legal disclaimers (if applicable)
- [ ] Privacy/security positioning
- [ ] Competitive differentiation points

---

## 🏗️ Integration Architecture

### Directory Structure Pattern
```
/lexopoly-site/
├── [product-slug]/
│   ├── index.html              # Main product landing page
│   ├── features/
│   │   └── index.html          # Detailed features page
│   ├── pricing/
│   │   └── index.html          # Pricing + FAQ
│   ├── contact/
│   │   └── index.html          # Product-specific support
│   ├── privacy/
│   │   └── index.html          # Privacy policy (if product-specific)
│   └── terms/
│       └── index.html          # Terms of service (if product-specific)
```

### File Naming Conventions
- **Product slug**: lowercase, hyphenated (e.g., `compliancelogger`, `local-transcribe`)
- **All pages**: `index.html` in subdirectories
- **No direct HTML files**: Always use directory + index.html pattern

---

## 🎨 Page Templates

### 1. Product Homepage Template

**File**: `/[product-slug]/index.html`

**Required Sections**:
1. **Hero Section**
   - H1: Product name + value proposition
   - Tagline: One-sentence benefit
   - Subtitle: 2-3 sentence description
   - CTA buttons: Primary (Start Trial / Buy) + Secondary (Learn More)

2. **Dual/Triple Value Prop Section** (if applicable)
   - Example: ComplianceLogger's "Proactive vs Reactive" modes
   - Use cards or columns to highlight different use cases

3. **Features Grid**
   - 6-8 key features with icons
   - Icon + Title + 2-sentence description
   - Hover effects for engagement

4. **Use Cases / Industries Served**
   - Who is this for?
   - 3-4 specific customer profiles
   - Link to vertical pages if applicable

5. **Pricing Preview**
   - Headline pricing (e.g., "$149/year" or "$79 one-time")
   - Key feature bullets (5-7 items)
   - Trial info if applicable
   - CTA: Link to pricing page

6. **Social Proof** (if available)
   - Customer testimonials
   - Trust badges
   - Usage stats

7. **FAQ Section**
   - 3-5 most common questions
   - Link to full pricing/FAQ page

8. **Final CTA Section**
   - Reinforce value proposition
   - Multiple CTA options
   - Risk-free messaging (trial, money-back, etc.)

### 2. Features Page Template

**File**: `/[product-slug]/features/index.html`

**Content Structure**:
- Hero with feature-focused headline
- Detailed feature breakdown (6-10 features)
- Screenshots/mockups (if available)
- Technical specifications
- Integration capabilities
- Comparison table (vs competitors or alternatives)
- Use case walkthroughs

### 3. Pricing Page Template

**File**: `/[product-slug]/pricing/index.html`

**Required Elements**:
- Pricing tiers (if multiple)
- Feature comparison table
- Trial information
- Payment methods accepted
- Billing cycle details
- Cancellation policy
- **Comprehensive FAQ section** (8-12 questions)
  - Pricing questions
  - Product-specific questions
  - Legal/compliance questions
  - Support questions

### 4. Contact/Support Page Template

**File**: `/[product-slug]/contact/index.html`

**Sections**:
- Email support (always include)
- Phone support (optional - check with user first!)
- Support hours
- Response time expectations
- Link to FAQ/knowledge base
- Product feedback submission
- About company section (brief)

### 5. Legal Pages (Privacy + Terms)

**Files**:
- `/[product-slug]/privacy/index.html`
- `/[product-slug]/terms/index.html`

**Decision Matrix**:
- **Product-specific legal pages**: If product has unique data handling, compliance requirements, or business model
  - Example: ComplianceLogger (EPA audit disclaimers)
- **Link to global legal pages**: If product follows standard Lexopoly data practices
  - Example: QuoteCreator (uses global `/privacy/` and `/terms/`)

---

## 🔗 Main Site Integration Points

### 1. Homepage Product Card

**Location**: `/index.html` - Portfolio section (`#products`)

**Template**:
```html
<div class="product-card">
    <span class="product-icon">[EMOJI]</span>
    <h3>[Product Name]</h3>
    <p class="product-tagline">[Tagline - 8-12 words]</p>
    <p>[Description - 2-3 sentences about who it's for and what it does]</p>
    <ul class="product-features">
        <li>[Key feature 1]</li>
        <li>[Key feature 2]</li>
        <li>[Key feature 3]</li>
        <li>[Key feature 4]</li>
        <li>[Pricing - e.g., "$149/year subscription"]</li>
    </ul>
    <a href="/[product-slug]/" class="product-link">Learn More →</a>
</div>
```

**Placement**: Add after existing product cards in order of business priority

### 2. Navigation Dropdown

**Location**: All 17+ site pages - Products dropdown menu (homepage lines 1301-1308)

**Current 3-Product Template** (Updated October 2025):
```html
<div class="dropdown-menu">
    <div class="dropdown-header">Our Products</div>
    <a href="/localtranscribe/">LocalTranscribe</a>
    <a href="/quotecreator/">QuoteCreator</a>
    <a href="/compliancelogger/">ComplianceLogger</a>
    <a href="/[product-slug]/">[Product Name]</a>  <!-- ADD PRODUCT #4 HERE -->
    <div class="dropdown-divider"></div>
    <a href="/#products" style="font-weight: 600;">View All Products →</a>
</div>
```

**Sort order**: Add products in launch order or business priority

**⚠️ CRITICAL: Systematic Rollout Required**

When adding Product #4, you **MUST update ALL existing pages**, not just the homepage:

**Pages requiring navigation dropdown updates** (17+ pages as of Oct 2025):
- Homepage: `/index.html`
- Product pages: `/localtranscribe/`, `/quotecreator/`, `/compliancelogger/`
- Vertical pages: `/lawyers/`, `/journalists/`, `/dictation/`, `/court-reporters/`, `/government/`, `/education/`
- Utility pages: `/pricing/`, `/demo/`, `/about/`, `/support/`, `/contact/`, `/privacy/`, `/terms/`, `/signup/`

**Recommended workflow**:
1. Use grep to find all pages with outdated navigation: `grep -r "ComplianceLogger" --include="index.html" | grep -v "Product #4"`
2. Create atomic git commit per page (or per logical group: product pages, vertical pages, utility pages)
3. Verify all pages before pushing to production
4. Pattern established during ComplianceLogger rollout (Oct 2025): 7 pages fixed in 6 separate commits

**Common mistake**: Updating only homepage and forgetting vertical/utility pages, creating inconsistent navigation experience.

### 3. About Page Integration

**Location**: `/about/index.html` - Product cards section (lines 670-688)

**Action**: Add product card following existing pattern

### 4. Meta Description Updates

**Files to update**:
- `/index.html` - Add product to meta description
- `/about/index.html` - Update product list

**Current 3-Product Pattern** (Updated October 2025):
```
"LocalTranscribe, QuoteCreator, ComplianceLogger, and [New Product]"
```

**Example meta description** (for Product #4):
```html
<meta name="description" content="Modern software solutions for legal and business professionals. LocalTranscribe for transcription, QuoteCreator for estimates, ComplianceLogger for EPA compliance, and [Product #4 Name] for [purpose]. Tools that make your work easier.">
```

**Note**: Keep meta descriptions under 160 characters for optimal SEO. If all 4 product names + descriptions exceed this, consider two approaches:
1. Use category names: "Transcription, estimation, compliance, and [category] software"
2. Create product-specific meta descriptions per vertical page instead of listing all products

---

## 🎯 Design Consistency Standards

### Color Palette (from existing products)
```css
--primary-orange: #FF6B35;  /* ComplianceLogger accent */
--deep-blue: #003F88;       /* ComplianceLogger headings */
--lexopoly-primary: #1a365d; /* Brand primary */
--accent: #2c5aa0;          /* Brand accent */
```

### Typography
- **Headings**: System font stack (San Francisco, Segoe UI, Roboto)
- **H1**: 3rem (48px) on desktop, 2rem (32px) on mobile
- **Body**: 1.1rem (17.6px), line-height 1.6

### Component Patterns
- **Cards**: `border-radius: 12-16px`, `box-shadow: 0 4px 20px rgba(0,0,0,0.08)`
- **Buttons**: `border-radius: 6-8px`, `padding: 0.75-1rem 1.5-2rem`
- **Spacing**: Use consistent `2rem` (32px) or `3rem` (48px) vertical spacing
- **Hover effects**: `transform: translateY(-2px to -5px)`, `transition: all 0.3s`

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 968px
- **Desktop**: > 968px

---

## 📝 Content Writing Guidelines

### Voice & Tone
- **Professional but approachable**: Not corporate jargon
- **Direct and clear**: No fluff or marketing speak
- **Problem-focused**: Lead with pain points, then solutions
- **Honest about limitations**: Build trust through transparency

### Headline Formula
`[Action Verb] + [Benefit] + [For Whom]`

Examples:
- "Track Waste Disposal for EPA Compliance" (ComplianceLogger)
- "Transcribe Audio 28x Faster with Local Privacy" (LocalTranscribe)
- "Create Professional Estimates in 60 Seconds" (QuoteCreator)

### Feature Description Formula
`[What it does] + [Why it matters] + [Who benefits]`

Example: "Upload photos of manifests and disposal sites. Maintain visual proof for EPA audits. Required documentation always at your fingertips."

### Call-to-Action Hierarchy
1. **Primary CTA**: Action-oriented (Start Free Trial, Buy Now, Get Started)
2. **Secondary CTA**: Exploration (Learn More, Watch Demo, See Features)
3. **Tertiary CTA**: Support (Contact Us, View Pricing, Read FAQ)

---

## ✅ Integration Checklist (Per Product)

### Phase 1: Content Preparation
- [ ] Gather all required product information
- [ ] Write product homepage copy
- [ ] Create feature descriptions
- [ ] Develop FAQ (minimum 8 questions)
- [ ] Draft pricing/trial messaging
- [ ] Identify unique selling points
- [ ] Select product icon/emoji

### Phase 2: Page Development
- [ ] Create `/[product-slug]/` directory
- [ ] Build homepage (`/[product-slug]/index.html`)
- [ ] Build features page (`/[product-slug]/features/index.html`)
- [ ] Build pricing page (`/[product-slug]/pricing/index.html`)
- [ ] Build contact page (`/[product-slug]/contact/index.html`)
- [ ] Build privacy page (if product-specific)
- [ ] Build terms page (if product-specific)

### Phase 3: Main Site Integration
- [ ] Add product card to homepage portfolio section
- [ ] Add product to navigation dropdown **on ALL 17+ pages** (see Navigation Dropdown section)
  - Use grep to find all pages: `grep -r "ComplianceLogger" --include="index.html"`
  - Homepage, product pages, vertical pages, utility pages
  - Create atomic commits per page or logical group
- [ ] Update about page with new product
- [ ] Update homepage meta description (and about page)
- [ ] Verify all internal links work

### Phase 4: Testing & QA
- [ ] Test all pages on desktop (Chrome, Firefox, Safari)
- [ ] Test all pages on mobile (iOS Safari, Chrome Mobile)
- [ ] Verify responsive design at all breakpoints
- [ ] Check all navigation links
- [ ] Verify CTA buttons work
- [ ] Test form submissions (if applicable)
- [ ] Validate HTML
- [ ] Check page load speed

### Phase 5: Deployment
- [ ] Git add all new files
- [ ] Commit with descriptive message
- [ ] Push to GitHub
- [ ] Wait for GitHub Pages rebuild (2-5 minutes)
- [ ] Verify live site
- [ ] Test all pages live
- [ ] Update internal documentation

---

## 🚀 Quick Start: Product Integration in 10 Steps

1. **Create product directory**: `mkdir -p /[product-slug]/{features,pricing,contact,privacy,terms}`
2. **Copy template**: Use ComplianceLogger as reference template
3. **Find/replace product name**: Update all instances of product-specific text
4. **Customize hero section**: Update headline, tagline, description
5. **Update features section**: Replace with product-specific features
6. **Update pricing section**: Replace with product pricing model
7. **Customize FAQ**: Replace with product-specific questions
8. **Add to homepage**: Insert product card in portfolio section
9. **Add to navigation**: Insert link in Products dropdown
10. **Test and deploy**: QA all pages, then git commit/push

---

## 📊 Success Metrics

### Per-Product Launch Goals
- **Week 1**: 100+ unique visitors to product homepage
- **Week 4**: 500+ unique visitors, 20+ trial signups or purchases
- **Month 3**: 1,000+ visitors, 100+ conversions

### Conversion Funnel Tracking
1. Homepage → Product page visit
2. Product page → Features page visit
3. Features page → Pricing page visit
4. Pricing page → Trial/purchase CTA click
5. CTA click → Completed signup/purchase

---

## 🔧 Troubleshooting Common Issues

### Issue: Product page returns 404 after deployment
**Solution**: Wait 2-5 minutes for GitHub Pages rebuild. Check git push succeeded.

### Issue: Navigation dropdown not showing new product
**Solution**: Clear browser cache. Verify HTML syntax in dropdown menu.

### Issue: Mobile menu not working
**Solution**: Ensure JavaScript for mobile menu toggle is included on all pages.

### Issue: Inconsistent styling across pages
**Solution**: Copy CSS from working product page. Verify all CSS variables are defined.

### Issue: Long page load times
**Solution**: Optimize images, minimize inline JavaScript, use font preloading.

---

## 📚 Reference Implementation

### Gold Standard: ComplianceLogger Integration

**Why it's the best example**:
- Complete 6-page website built in one session
- Dual-mode messaging (proactive vs reactive)
- Comprehensive FAQ (8+ questions with detailed answers)
- Product-specific legal pages with custom disclaimers
- Clean homepage integration
- Mobile-responsive throughout

**File locations**:
- `/compliancelogger/index.html` - Homepage reference
- `/compliancelogger/pricing/index.html` - Pricing/FAQ reference
- `/compliancelogger/terms/index.html` - Legal page reference

**Commit reference**: `f0f464d` and `51973d8`

---

## 🎓 Best Practices Learned

### What Works Well
1. **User request review**: Always confirm phone number policy (email-only vs phone support)
2. **Construction mode**: Build in isolation before flipping live
3. **Git commits**: Separate commit for product pages, separate for homepage integration
4. **Mobile-first**: Test mobile nav immediately after building pages
5. **Parallel tool calls**: Use multiple bash/read commands simultaneously for efficiency
6. **Systematic navigation rollout**: When adding Product #4+, update ALL 17+ pages in atomic commits (Oct 2025 pattern: 7 pages in 6 commits)

### What to Avoid
1. **Don't skip the FAQ**: Users will ask these questions—answer them upfront
2. **Don't assume phone support**: Always ask user preference (ComplianceLogger = email-only)
3. **Don't forget legal disclaimers**: Some products need custom legal language
4. **Don't mix pricing models**: Be clear about one-time vs subscription
5. **Don't deploy without testing**: Always verify mobile responsive design
6. **Don't update only the homepage navigation**: MUST update ALL 17+ pages when adding Product #4+ (common mistake discovered Oct 2025)

---

## 🔮 Future Enhancements

### Planned Playbook Updates
- [ ] Add A/B testing guidelines for product pages
- [ ] Create SEO optimization checklist
- [ ] Develop analytics event tracking standards
- [ ] Build screenshot/mockup guidelines
- [ ] Create video demo integration guide

### Template Automation Opportunities
- [ ] Product page generator script
- [ ] Automated homepage integration tool
- [ ] Nav dropdown updater
- [ ] Sitemap auto-generator
- [ ] Cross-product link checker

---

## 📜 ComplianceLogger Legal Pages Pattern (Next.js Apps)

**Added**: October 15, 2025
**Context**: ComplianceLogger beta launch required customer-facing legal documents

### When Apps Need Legal Pages (vs Marketing Sites)

**Decision Matrix**:
- **Marketing site legal pages** (`/compliancelogger/privacy/`) - Static HTML for SEO, pre-signup
- **App legal pages** (`app/privacy/page.tsx`) - Server-rendered for in-app access, post-signup

**ComplianceLogger Implementation** (Next.js 15 + React 19):

### Architecture Pattern
```typescript
// app/terms/page.tsx (server component)
import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | ComplianceLogger',
  description: 'Terms of Service for ComplianceLogger',
}

export default function TermsPage() {
  const filePath = path.join(process.cwd(), 'TERMS_OF_SERVICE.md')
  const markdown = fs.readFileSync(filePath, 'utf8')

  return (
    <div className="min-h-screen bg-white">
      {/* Header with logo + back link */}
      <header className="bg-white border-b">
        <Link href="/">← Back to Home</Link>
      </header>

      {/* Markdown rendered content */}
      <main>
        <ReactMarkdown className="prose prose-slate max-w-none">
          {markdown}
        </ReactMarkdown>
      </main>

      {/* Footer with legal nav links */}
      <footer>
        <Link href="/terms">Terms</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/disclaimers">Disclaimers</Link>
      </footer>
    </div>
  )
}
```

### Key Implementation Details

**1. Dependencies Required**
```json
{
  "dependencies": {
    "react-markdown": "^10.1.0"
  }
}
```

**2. Markdown Source Files** (project root)
- `TERMS_OF_SERVICE.md` (3,800+ words)
- `PRIVACY_POLICY.md` (3,200+ words)
- `SITE_DISCLAIMERS.md` (2,100+ words - EPA-specific for ComplianceLogger)

**3. Route Structure**
```
/app/
├── terms/page.tsx        # Server component
├── privacy/page.tsx      # Server component
└── disclaimers/page.tsx  # Server component (product-specific)
```

**4. Build Considerations**
- **Path Collision Warning**: Remove duplicate routes in `(public)` or `(auth)` route groups
- **Peer Dependencies**: `@react-email/render` required if using Resend package
- **SEO Optimization**: Use `Metadata` export for proper meta tags

**5. Footer Integration**
Update ALL app pages with legal links:
- Homepage footer (`app/page.tsx`)
- Signup page footer (`app/(auth)/signup/page.tsx`)
- Login page footer (`app/(auth)/login/page.tsx`)

### Styling Pattern (Tailwind CSS)
- **Primary color**: `orange-500` (ComplianceLogger brand)
- **Typography**: `prose prose-slate max-w-none` (react-markdown)
- **Layout**: Max-width container (1200px), responsive padding
- **Mobile**: Full-width with `px-4 sm:px-6 lg:px-8`

### Legal Compliance Features
**From signup page** (`app/(auth)/signup/page.tsx`):
- 5 required legal checkboxes (Step-Saver precedent)
- Links open in new tab (`target="_blank"`)
- Validation prevents signup without all acknowledgments
- Red border box with warning emoji for emphasis

### Lessons Learned
1. **Server components preferred** - Enables fs.readFileSync for markdown files
2. **Markdown over JSX** - Legal docs easier to maintain in .md format
3. **Route group cleanup** - Check for duplicate paths before build
4. **Footer consistency** - Update ALL pages, not just auth pages
5. **Beta launch blocker** - Legal pages required before payment acceptance

---

## 🗑️ App Removal & Decommissioning Playbook

**Added**: October 15, 2025
**Purpose**: Systematic process for removing products from lexopoly.com

### When to Remove a Product

**Valid Reasons**:
1. Product sunset/end-of-life announcement
2. Merger with another Lexopoly product
3. Pivot/rebranding to new product
4. Temporary removal for major rebuild
5. Legal/compliance issues requiring immediate takedown

**Invalid Reasons**:
1. Low traffic (keep for SEO + portfolio breadth)
2. Development pause (keep as "Coming Soon" or maintenance mode)
3. Seasonal product (keep with "Currently Unavailable" notice)

---

### Phase 1: Pre-Removal Preparation

**1. Customer Communication** (if active users exist)
- [ ] Email all active users 30-60 days before removal
- [ ] Post announcement on product homepage
- [ ] Update status in user dashboard (if applicable)
- [ ] Provide migration path to alternative Lexopoly product (if applicable)
- [ ] Offer refunds/credits per terms of service

**2. Data Preservation**
- [ ] Export all customer data (GDPR/CCPA compliance)
- [ ] Archive all product analytics (GA4, funnel data)
- [ ] Save all marketing content (product copy, FAQs, pricing)
- [ ] Backup all customer testimonials/reviews
- [ ] Screenshot all product pages for portfolio archive

**3. Legal/Compliance**
- [ ] Notify payment processor (Stripe, etc.) of service discontinuation
- [ ] Cancel any recurring billing (subscriptions must stop)
- [ ] Update terms of service with discontinuation notice
- [ ] Archive privacy policy version active at discontinuation
- [ ] Consult legal counsel if contractual obligations exist

**4. SEO Preservation**
- [ ] Identify high-traffic pages (Google Analytics)
- [ ] Document inbound links (Google Search Console)
- [ ] Plan 301 redirects for valuable SEO pages
- [ ] Update sitemap.xml

---

### Phase 2: Website Removal

**1. Create Backup Tag**
```bash
git tag -a "pre-removal-[product-slug]-$(date +%Y%m%d)" \
  -m "Backup before removing [Product Name]"
git push --tags
```

**2. Homepage Removal**

**File**: `/index.html`

**Steps**:
- [ ] Remove product card from portfolio section (lines ~1371-1420)
- [ ] Update meta description (remove product name)
- [ ] Remove from Products dropdown nav (lines ~1301-1308)
- [ ] Update "Our Products" count if referenced

**Before**:
```html
<div class="product-card">
    <span class="product-icon">🎙️</span>
    <h3>LocalTranscribe</h3>
    <!-- ... product content ... -->
</div>
<div class="product-card">
    <span class="product-icon">📋</span>
    <h3>QuoteCreator</h3>
    <!-- ... product content ... -->
</div>
<div class="product-card">
    <span class="product-icon">📊</span>
    <h3>ProductToRemove</h3>  <!-- REMOVE THIS ENTIRE CARD -->
    <!-- ... product content ... -->
</div>
```

**After**:
```html
<div class="product-card">
    <span class="product-icon">🎙️</span>
    <h3>LocalTranscribe</h3>
    <!-- ... product content ... -->
</div>
<div class="product-card">
    <span class="product-icon">📋</span>
    <h3>QuoteCreator</h3>
    <!-- ... product content ... -->
</div>
<!-- ProductToRemove removed - see commit [hash] for restoration -->
```

**3. Navigation Removal**

**File**: `/index.html` - Products dropdown

**Before**:
```html
<div class="dropdown-menu">
    <div class="dropdown-header">Our Products</div>
    <a href="/localtranscribe/">LocalTranscribe</a>
    <a href="/quotecreator/">QuoteCreator</a>
    <a href="/compliancelogger/">ComplianceLogger</a>
    <a href="/producttremove/">ProductToRemove</a>  <!-- REMOVE -->
    <div class="dropdown-divider"></div>
    <a href="/#products" style="font-weight: 600;">View All Products →</a>
</div>
```

**After**:
```html
<div class="dropdown-menu">
    <div class="dropdown-header">Our Products</div>
    <a href="/localtranscribe/">LocalTranscribe</a>
    <a href="/quotecreator/">QuoteCreator</a>
    <a href="/compliancelogger/">ComplianceLogger</a>
    <!-- ProductToRemove removed -->
    <div class="dropdown-divider"></div>
    <a href="/#products" style="font-weight: 600;">View All Products →</a>
</div>
```

**4. About Page Removal**

**File**: `/about/index.html`

**Steps**:
- [ ] Remove product card from product portfolio section
- [ ] Update "Our Products" count in intro text

**5. Product Directory Handling**

**Decision Matrix**:

**Option A: Complete Removal** (most common)
```bash
# Archive locally first
tar -czf "[product-slug]-archive-$(date +%Y%m%d).tar.gz" /[product-slug]/

# Move to archive directory (if exists)
mkdir -p .archive
mv [product-slug]/ .archive/

# Commit removal
git rm -r [product-slug]/
git commit -m "remove: [Product Name] product pages - end of life"
```

**Option B: Redirect to Replacement Product**
```bash
# Replace entire directory with single redirect page
rm -rf [product-slug]/*

# Create index.html with 301 redirect
cat > [product-slug]/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=/[replacement-product]/">
    <link rel="canonical" href="/[replacement-product]/" />
    <title>Redirecting to [Replacement Product]</title>
</head>
<body>
    <p>This product has been replaced by <a href="/[replacement-product]/">[Replacement Product]</a>.</p>
    <p>Redirecting automatically...</p>
</body>
</html>
EOF
```

**Option C: "Coming Soon" Placeholder** (for rebuilds)
```bash
# Replace content with maintenance notice
# Keep directory structure for SEO
# Update homepage to show "Coming Soon" badge
```

---

### Phase 3: SEO Migration

**1. Set Up 301 Redirects** (GitHub Pages limitation workaround)

GitHub Pages doesn't support `.htaccess` or server-side redirects. Use meta refresh:

```html
<!-- /[product-slug]/index.html -->
<meta http-equiv="refresh" content="0; url=https://lexopoly.com/">
<link rel="canonical" href="https://lexopoly.com/" />
```

**2. Update Sitemap**
- [ ] Remove product URLs from `sitemap.xml`
- [ ] Notify Google Search Console of sitemap update

**3. Disavow Inbound Links** (if product had spam links)
- [ ] Use Google Search Console disavow tool

---

### Phase 4: Analytics & Monitoring

**1. Track Removal Impact**
```bash
# Monitor 404 errors
# Google Analytics: Behavior → Site Content → All Pages
# Filter: Page Title contains "[Product Name]"
```

**2. Update Analytics Tracking**
- [ ] Remove product-specific event tracking
- [ ] Archive GA4 property views (if product-specific)
- [ ] Update conversion funnel definitions

**3. Monitor Search Rankings**
- [ ] Check Google Search Console for 404 errors
- [ ] Track if homepage ranking drops after removal
- [ ] Monitor brand search volume

---

### Phase 5: Commit & Deploy

**1. Commit Strategy**

**Separate commits recommended**:
```bash
# Commit 1: Homepage + nav changes
git add index.html about/index.html
git commit -m "remove: [Product Name] from homepage and navigation"

# Commit 2: Product directory removal
git rm -r [product-slug]/
git commit -m "remove: [Product Name] product pages - see archive tag for restoration"

# Commit 3: Documentation updates
git add WEBMASTER_BUS_OPS.md
git commit -m "docs: Document [Product Name] removal in Bus Ops"
```

**2. Push with Archive Tag**
```bash
# Push changes
git push

# Ensure archive tag exists
git tag -l | grep "pre-removal-[product-slug]"
git push --tags
```

**3. Verify Deployment**
- [ ] Wait 2-5 minutes for GitHub Pages rebuild
- [ ] Test homepage (product card removed)
- [ ] Test navigation dropdown (product link removed)
- [ ] Test direct URL `/[product-slug]/` (404 or redirect)
- [ ] Verify no broken links on homepage

---

### Phase 6: Post-Removal Monitoring

**Week 1 Checklist**:
- [ ] Monitor 404 errors in Google Search Console
- [ ] Check for broken inbound links
- [ ] Verify redirect traffic (if using Option B)
- [ ] Respond to customer inquiries about removal

**Month 1 Checklist**:
- [ ] Compare homepage traffic (before vs after)
- [ ] Check if other products saw traffic increase
- [ ] Review customer feedback/complaints
- [ ] Update investor/partner materials (if applicable)

---

### Restoration Process (Undo Removal)

**If you need to restore a removed product**:

```bash
# 1. Find the pre-removal backup tag
git tag -l | grep "pre-removal"

# 2. Create restoration branch
git checkout -b restore-[product-slug]
git checkout [backup-tag] -- [product-slug]/

# 3. Restore homepage integration
git checkout [backup-tag] -- index.html about/index.html

# 4. Commit restoration
git add .
git commit -m "restore: [Product Name] - reverting removal from [date]"

# 5. Merge to main
git checkout main
git merge restore-[product-slug]
git push
```

---

### Emergency Takedown Process

**For urgent legal/compliance removals**:

1. **Immediate Action** (< 15 minutes)
```bash
# Delete product directory
git rm -rf [product-slug]/
git commit -m "URGENT: Remove [Product Name] - legal/compliance requirement"
git push
```

2. **Homepage Cleanup** (< 30 minutes)
- Remove product card from homepage
- Remove from navigation
- Push changes immediately

3. **Post-Takedown** (within 24 hours)
- Document reason for removal (legal record)
- Notify stakeholders
- Follow Phase 3-6 steps as applicable

---

### Removal Checklist Summary

**Pre-Removal**:
- [ ] Customer notification (30-60 days)
- [ ] Data export and preservation
- [ ] Legal compliance review
- [ ] SEO impact assessment
- [ ] Create backup tag

**Removal**:
- [ ] Remove from homepage portfolio
- [ ] Remove from navigation dropdown
- [ ] Remove from about page
- [ ] Handle product directory (delete, redirect, or placeholder)
- [ ] Update meta descriptions
- [ ] Set up redirects (if applicable)

**Post-Removal**:
- [ ] Monitor 404 errors
- [ ] Track analytics impact
- [ ] Update documentation
- [ ] Archive product materials
- [ ] Respond to customer inquiries

---

## 📞 Contact & Feedback

This playbook is a living document. If you find gaps, inefficiencies, or opportunities for improvement during product integration, document them in `INTEGRATION_PLAYBOOK_FEEDBACK.md` for the next revision.

**Last Updated**: October 16, 2025
**Latest Additions**:
- Updated navigation dropdown to 3-product pattern (LocalTranscribe, QuoteCreator, ComplianceLogger)
- Added systematic navigation rollout requirements (ALL 17+ pages must be updated)
- Documented ComplianceLogger rollout pattern (Oct 2025: 7 pages in 6 commits)
- ComplianceLogger legal pages pattern (Next.js apps) - Oct 15
- App removal & decommissioning playbook - Oct 15
**Next Review**: After Product #4 integration
**Maintained By**: Claude Code + User
