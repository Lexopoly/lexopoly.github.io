# SEO Article Creation Playbook
**Version**: 1.0
**Date**: 2025-10-24
**Purpose**: Systematic workflow for creating high-quality SEO blog articles with photos

---

## 🎯 Overview

This playbook provides a repeatable, battle-tested process for creating professional SEO articles from initial concept through deployment. Based on ComplianceLogger and QuoteCreator article workflows.

### Timeline Estimates
- **Photo Sourcing**: 30-45 minutes (6-8 photos)
- **Article Writing**: 90-120 minutes (2,500-3,000 words)
- **HTML Conversion**: 45-60 minutes
- **Deployment**: 15 minutes
- **Total**: 3-3.5 hours per article

### Efficiency Gains
- **Using this playbook**: 3-3.5 hours
- **Without systematic process**: 6-8 hours
- **Efficiency gain**: 50-60% faster

---

## 📋 Pre-Writing Checklist

Before starting article creation, define:

### Article Strategy
- [ ] Article type: Pillar (multi-vertical) vs Cluster (single vertical)
- [ ] Target keyword identified
- [ ] Target word count: 2,500-3,000 (pillar) or 1,500-2,000 (cluster)
- [ ] Target audience defined (broad vs specific)
- [ ] Conversion goal: Newsletter signup, product trial, contact form
- [ ] Related articles identified (for internal linking)

### SEO Research
- [ ] Primary keyword: Search volume + competition checked
- [ ] Secondary keywords: 3-5 related terms identified
- [ ] Competitor analysis: Top 3 articles reviewed
- [ ] Search intent understood: Informational, commercial, transactional
- [ ] Featured snippet opportunity identified
- [ ] FAQ questions researched (People Also Ask)

### Photo Planning
- [ ] Number of photos needed: 6-8 for pillar, 3-5 for cluster
- [ ] Photo types identified: Hero, section headers, inline details
- [ ] Photo keywords prepared for Unsplash/Pexels search
- [ ] Mood/style defined: Professional, casual, technical, etc.

---

## 🎬 Phase 1: Photo Sourcing (30-45 min)

### Step 1.1: Photo Research & Selection
**Procedure** (from PHOTO_SOURCING_WORKFLOW.md):

1. **Search Unsplash** (https://unsplash.com)
   - Use prepared keywords
   - Filter by Landscape orientation (hero images)
   - Look for: High resolution, clear subject, professional composition

2. **Quality Checklist Before Download**:
   - [ ] Photo clearly shows relevant subject
   - [ ] Professional quality (good lighting, composition, focus)
   - [ ] No visible branding/logos that date the photo
   - [ ] Landscape for hero, portrait/square acceptable for inline
   - [ ] Resolution at least 1200x800px
   - [ ] Unsplash License badge visible on page
   - [ ] Photographer name clearly shown

3. **Download Photos**:
   - Click "Download free" (Original size)
   - Download to: `/home/rain/Downloads/` (temporary)
   - Note photographer name from Unsplash page
   - Keep browser tabs open for URL documentation

### Step 1.2: Photo Organization

**File Naming Convention**:
```
[product]-[type]-[subject]-[photographer].jpg

Examples:
qc-hero-professional-bruce-mars.jpg
qc-contractor-hardhat-joe-holland.jpg
cl-inspector-clipboard-jane-doe.jpg
lt-courtroom-recording-john-smith.jpg
```

**Product Codes**:
- `qc` = QuoteCreator
- `cl` = ComplianceLogger
- `lt` = LocalTranscribe
- `lex` = General Lexopoly

**Type Codes**:
- `hero` = Hero/header image
- `[vertical]` = Industry-specific (contractor, consultant, designer, etc.)
- `detail` = Close-up/detail shots
- `cta` = Call-to-action section images

### Step 1.3: Photo Storage

**Directory Structure**:
```bash
/home/rain/code/lexopoly-site/blog/images/
├── quotecreator/
│   ├── qc-hero-professional-bruce-mars.jpg
│   └── qc-contractor-hardhat-joe-holland.jpg
├── compliancelogger/
│   ├── cl-inspector-clipboard-jane-doe.jpg
│   └── cl-waste-bins-construction-site.jpg
└── localtranscribe/
    └── lt-courtroom-recording-john-smith.jpg
```

**Move & Rename Command Pattern**:
```bash
# Create product directory if needed
mkdir -p /home/rain/code/lexopoly-site/blog/images/quotecreator/

# Move and rename from Downloads
mv "/home/rain/Downloads/original-filename.jpg" \
   "/home/rain/code/lexopoly-site/blog/images/quotecreator/qc-hero-professional-bruce-mars.jpg"
```

### Step 1.4: Photo Credit Documentation

**Add to**: `/home/rain/code/lexopoly-site/blog/PHOTO_CREDITS.md`

**Template**:
```markdown
## qc-hero-professional-bruce-mars.jpg
- **Source**: Unsplash
- **Photographer**: Bruce Mars (@brucemars)
- **License**: Unsplash License (CC0-equivalent)
- **Downloaded**: 2025-10-24
- **Used In**: QuoteCreator Professional Estimate Templates article (hero image)
- **Source URL**: https://unsplash.com/photos/[photo-id]
- **Notes**: Original resolution, no modifications
```

**Documentation Checklist**:
- [ ] All photos documented in PHOTO_CREDITS.md
- [ ] Photographer names accurate
- [ ] Source URLs included
- [ ] Article usage noted
- [ ] Download date recorded

---

## ✍️ Phase 2: Article Writing (90-120 min)

### Step 2.1: Article Structure Planning

**Pillar Article Structure** (Multi-Vertical):
1. **Hero Section** (300 words)
   - Hook: Pain point or surprising statistic
   - Problem definition
   - Solution preview
   - Value proposition

2. **Vertical Sections** (600 words each × 3-4 verticals)
   - Industry-specific challenges
   - Specific use cases
   - Tools/templates for that vertical
   - Real-world examples

3. **FAQ Section** (300 words)
   - 5-6 common questions across verticals
   - Direct, actionable answers
   - Schema.org FAQ structured data

4. **Conclusion + CTA** (200 words)
   - Summary of key points
   - Clear next steps
   - Strong CTA: Free trial, download, contact

**Cluster Article Structure** (Single Vertical):
1. **Hero Section** (200 words)
2. **Problem Deep-Dive** (400 words)
3. **Solution Framework** (600 words)
4. **Step-by-Step Guide** (800 words)
5. **FAQ Section** (200 words)
6. **Conclusion + CTA** (200 words)

### Step 2.2: SEO Optimization During Writing

**On-Page SEO Checklist**:
- [ ] Target keyword in: Title, H1, first paragraph, URL
- [ ] Secondary keywords: Naturally distributed throughout
- [ ] Header hierarchy: H1 (1x), H2 (3-6x), H3 (6-12x)
- [ ] Internal links: 2-3 to related Lexopoly articles
- [ ] External link: 1 authoritative source (industry publication, research)
- [ ] Alt text planned: Descriptive + keyword-rich
- [ ] Meta description drafted: 150-160 characters
- [ ] URL slug: Short, keyword-rich, readable

**Writing Style Guidelines**:
- **Tone**: Professional but approachable
- **Person**: Second person ("you") for engagement
- **Sentence length**: Mix short (10-15 words) and medium (15-25 words)
- **Paragraph length**: 2-4 sentences max
- **Lists**: Use bullet points and numbered lists liberally
- **Bold/italics**: Highlight key concepts sparingly
- **Product mentions**: Natural integration, not forced (1-2x per 500 words)

### Step 2.3: Photo Placement Planning

**Photo Integration Strategy**:

| Section | Photo Type | Alt Text Focus | Loading |
|---------|-----------|----------------|---------|
| Hero | Full-width hero | Target keyword + context | eager |
| Section 1 | Header image | Vertical + action | lazy |
| Section 1 | Inline detail | Specific task/tool | lazy |
| Section 2 | Header image | Different vertical + context | lazy |
| Section 3 | Header image | Third vertical + setting | lazy |
| Section 3 | Inline detail | Close-up of process | lazy |
| FAQ/CTA | Contextual | Trust/conclusion theme | lazy |

**Alt Text Formula**:
```
[Vertical] + [Action/Task] + [Context] + [Tool if visible]

Examples:
"Contractor reviewing blueprint measurements with pencil and ruler at construction site"
"Business consultant presenting project estimates to clients in modern conference room"
"Graphic designer working on creative project at organized workspace with laptop"
```

---

## 🛠️ Phase 3: HTML Conversion (45-60 min)

### Step 3.1: Directory Structure Creation

**Command**:
```bash
cd /home/rain/code/lexopoly-site
mkdir -p blog/[product]/[article-slug]/
```

**Example**:
```bash
mkdir -p blog/quotecreator/professional-estimate-templates/
```

### Step 3.2: HTML Template Selection

**Base Template**: Use existing article as starting point

**Reference Articles**:
- **ComplianceLogger**: `/blog/epa-violation-notice-response-construction/index.html`
- **QuoteCreator**: TBD (this will be first QuoteCreator article)

**Template Sections**:
1. `<head>`: Meta tags, Schema.org, Analytics
2. `<header>`: Navigation (consistent across site)
3. `<main>`: Article container
   - Hero image
   - Article header (title, meta, badge)
   - Content sections
   - FAQ section
   - CTA section
   - Related articles
4. `<footer>`: Disclaimer, attribution, links

### Step 3.3: CSS Variable Usage

**Product Color Variables**:
```css
:root {
    --lexopoly-primary: #1a365d;
    --accent: #2c5aa0;
    --compliancelogger: #2b6cb0;  /* Blue */
    --localtranscribe: #b45309;   /* Orange */
    --quotecreator: #2f7d32;      /* Green */
}
```

**Product Badge Pattern**:
```html
<span class="product-badge" style="background: var(--quotecreator);">
    QuoteCreator
</span>
```

### Step 3.4: Schema.org Structured Data

**Required Schemas**:

1. **Article Schema** (ALL articles):
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title Here",
  "description": "Meta description here",
  "author": {
    "@type": "Organization",
    "name": "Lexopoly"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Lexopoly",
    "logo": {
      "@type": "ImageObject",
      "url": "https://lexopoly.com/logo.png"
    }
  },
  "datePublished": "2025-10-24",
  "dateModified": "2025-10-24",
  "image": "https://lexopoly.com/blog/images/[product]/hero-image.jpg"
}
```

2. **HowTo Schema** (Guide articles):
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to [Task]",
  "description": "Step-by-step guide to...",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Step 1: [Action]",
      "text": "Detailed instruction here"
    }
  ]
}
```

3. **FAQ Schema** (Articles with Q&A):
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question here?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer here."
      }
    }
  ]
}
```

### Step 3.5: Image Integration Code

**Hero Image Pattern**:
```html
<div class="article-hero-image">
    <img src="/blog/images/quotecreator/qc-hero-professional-bruce-mars.jpg"
         alt="Professional consultant reviewing estimate on laptop in modern office workspace"
         loading="eager"
         width="1200"
         height="800">
</div>
```

**Inline Image Pattern**:
```html
<figure class="article-inline-image">
    <img src="/blog/images/quotecreator/qc-contractor-hardhat-joe-holland.jpg"
         alt="Construction contractor with hardhat reviewing blueprints at job site"
         loading="lazy"
         width="800"
         height="600">
    <figcaption>Professional contractors rely on detailed estimates to win bids</figcaption>
</figure>
```

---

## 🚀 Phase 4: Deployment (15 min)

### Step 4.1: Pre-Deployment QA Checklist

**Technical SEO**:
- [ ] Meta title <60 characters
- [ ] Meta description 150-160 characters
- [ ] Canonical URL correct
- [ ] Open Graph tags complete (title, description, URL, type, image)
- [ ] Twitter Card tags complete
- [ ] Schema.org JSON-LD validates (Google Rich Results Test)
- [ ] All images have descriptive alt text
- [ ] All internal links functional
- [ ] External link opens in new tab (`target="_blank" rel="noopener"`)

**Brand Consistency**:
- [ ] Product color variable used correctly
- [ ] Product badge styling matches site standard
- [ ] Footer includes disclaimer + about section
- [ ] Analytics tracking code present (Google Analytics 4)

**Performance**:
- [ ] Hero image: `loading="eager"`
- [ ] All other images: `loading="lazy"`
- [ ] Image dimensions specified (width, height)
- [ ] No inline styles (use CSS variables)

**Mobile Responsive**:
- [ ] Breakpoint at 968px (site standard)
- [ ] Images scale properly on mobile
- [ ] Text readable without horizontal scroll
- [ ] CTAs accessible on mobile (44px touch target)

### Step 4.2: Git Commit Pattern

**Command Structure**:
```bash
cd /home/rain/code/lexopoly-site

# Stage files
git add blog/[product]/[article-slug]/
git add blog/images/[product]/
git add blog/PHOTO_CREDITS.md

# Commit with descriptive message
git commit -m "Add: [Product] [Article Title]

- [Word count]-word [article type] guide ([verticals covered])
- [Number] Unsplash CC0 photos with full attribution
- Article + HowTo + FAQ Schema.org structured data
- Target keyword: [primary keyword]"

# Push to main
git push origin main
```

**Example Commit Message**:
```
Add: QuoteCreator professional estimate templates pillar article

- 2,800-word multi-vertical guide (contractors, consultants, designers, trades)
- 8 Unsplash CC0 photos with full attribution
- Article + HowTo + FAQ Schema.org structured data
- Target keyword: professional estimate templates
```

### Step 4.3: Deployment Verification

**Post-Deploy Checklist** (Wait 2-5 min for GitHub Pages):
- [ ] Article live at: `https://lexopoly.com/blog/[product]/[article-slug]/`
- [ ] All images load correctly
- [ ] Internal links functional
- [ ] External links open in new tab
- [ ] Mobile responsive (test on phone or dev tools)
- [ ] Schema.org validates: [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Page loads in <3 seconds (Google PageSpeed Insights)

---

## 📊 Phase 5: Post-Deployment (10 min)

### Step 5.1: Documentation Updates

**Update WEBMASTER_BUS_OPS.md**:
```markdown
### **SEO ARTICLE DEPLOYMENT: [Article Title]** ✅
**Product**: [Product Name]
**Article Type**: [Pillar/Cluster]
**Word Count**: [2,800] words
**Photos**: [8] Unsplash CC0 images
**Target Keyword**: [keyword]
**Deployment Time**: [2025-10-24 HH:MM UTC]
**Live URL**: https://lexopoly.com/blog/[path]/

**Session Metrics**:
- Photo sourcing: [30] minutes
- Article writing: [110] minutes
- HTML conversion: [50] minutes
- Deployment: [15] minutes
- Total: [3.4] hours

**Protocol**: SEO Article Creation Playbook v1.0
**Success**: ✅ All quality checks passed
```

**Post to Super Bus** (if applicable):
```jsonl
{"timestamp": "2025-10-24T23:45:00Z", "agent": "CC-WEB", "event": "ARTICLE_PUBLISHED", "product": "QuoteCreator", "article_slug": "professional-estimate-templates", "word_count": 2800, "photos": 8, "target_keyword": "professional estimate templates"}
```

### Step 5.2: Update Blog Index

**If product blog index exists**, add article:

**File**: `/blog/[product]/index.html`

**Add Article Card**:
```html
<article class="blog-card">
    <img src="/blog/images/quotecreator/qc-hero-professional-bruce-mars.jpg"
         alt="[Article Title]"
         loading="lazy">
    <div class="blog-card-content">
        <span class="product-badge">QuoteCreator</span>
        <h2>Professional Estimate Templates for Service Professionals</h2>
        <p>Learn how contractors, consultants, designers, and trade professionals create winning estimates...</p>
        <a href="/blog/quotecreator/professional-estimate-templates/" class="btn-read-more">
            Read More →
        </a>
    </div>
</article>
```

### Step 5.3: Analytics Setup (Future)

**Google Search Console**:
- [ ] Request indexing for new URL
- [ ] Monitor impressions (7-14 days)
- [ ] Track average position for target keyword

**Google Analytics 4**:
- [ ] Monitor page views (first 48 hours)
- [ ] Track time on page
- [ ] Monitor bounce rate
- [ ] Track CTA click-through rate

---

## 🎯 Quality Standards

### Content Quality Benchmarks
- **Word count**: 2,500-3,000 (pillar), 1,500-2,000 (cluster)
- **Readability**: Flesch Reading Ease 60-70 (8th-9th grade level)
- **Keyword density**: 0.5-1.5% for primary keyword
- **Images**: 1 per 300-400 words
- **Internal links**: Minimum 2-3
- **External links**: Minimum 1 authoritative source
- **Headings**: H2 every 300-500 words

### SEO Performance Targets
- **Google Rich Results**: Pass validation (100%)
- **PageSpeed Score**: >90 mobile, >95 desktop
- **Core Web Vitals**:
  - LCP (Largest Contentful Paint): <2.5s
  - FID (First Input Delay): <100ms
  - CLS (Cumulative Layout Shift): <0.1

### Brand Consistency Standards
- **Product colors**: Use CSS variables (no hardcoded hex)
- **Typography**: Site-wide font stack (no custom fonts per article)
- **Product badges**: Consistent size, padding, border-radius
- **CTAs**: Consistent wording ("Start Free Trial" not "Try Now" or "Get Started")

---

## 🔄 Workflow Automation Opportunities

### Current Manual Steps (Can Be Automated)
1. ❌ **Photo renaming**: Batch rename script based on product + type
2. ❌ **PHOTO_CREDITS.md updates**: Script to auto-generate from Unsplash URLs
3. ❌ **Schema.org generation**: Template generator with variable substitution
4. ❌ **Git commit messages**: Template with auto-populated stats (word count, photo count)
5. ❌ **Blog index updates**: Auto-generate from article metadata

### Future Automation (V2.0)
- [ ] Photo optimization pipeline (auto-resize, compress, convert to WebP)
- [ ] SEO checker script (verify meta tags, alt text, keyword density)
- [ ] Internal linking suggester (scan related articles, suggest links)
- [ ] Schema.org validator (local check before deployment)
- [ ] Deployment preview (local server to test before push)

---

## 📚 Reference Materials

### Required Reading Before First Article
1. **PHOTO_SOURCING_WORKFLOW.md**: Complete photo workflow
2. **PUBLISHING_QUEUE.md**: Publishing strategy and velocity
3. **Translation Protocol**: Elite industry exemplars for optimization
4. **INTEGRATION_PLAYBOOK.md**: Product integration patterns

### SEO Resources
- **Google Search Console**: https://search.google.com/search-console
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema.org Documentation**: https://schema.org/Article
- **PageSpeed Insights**: https://pagespeed.web.dev/

### Photo Resources
- **Unsplash**: https://unsplash.com (primary)
- **Pexels**: https://www.pexels.com (fallback)
- **CC0 License Info**: https://creativecommons.org/publicdomain/zero/1.0/

---

## 🚦 Success Metrics

### Per-Article Metrics
- **Time to deploy**: <3.5 hours (from blank page to live)
- **Quality score**: 100% (all checklist items passed)
- **Schema validation**: Pass Google Rich Results Test
- **PageSpeed score**: >90 mobile

### Program-Level Metrics (Monthly)
- **Articles published**: 8-12 per month
- **Average word count**: 2,200-2,800 words
- **SEO traffic growth**: +15-25% MoM (after 3 months)
- **Featured snippets**: 1-2 per 10 articles

---

## 🎓 Lessons Learned

### What Works
✅ **Pillar + cluster strategy**: Broad pillar articles attract top-of-funnel, clusters convert
✅ **Multi-vertical content**: Broader keyword capture, more internal linking opportunities
✅ **Photo sourcing upfront**: Speeds writing (visualize structure with images)
✅ **Schema.org structured data**: Significantly improves SERP visibility
✅ **Consistent deployment schedule**: 2-3 articles/week builds momentum

### What Doesn't Work
❌ **Single-vertical only**: Limits keyword reach, fewer internal link opportunities
❌ **Stock photos AFTER writing**: Disrupts flow, harder to integrate naturally
❌ **Skipping Schema.org**: Leaves SERP real estate on the table
❌ **Irregular publishing**: Algorithm doesn't reward sporadic content
❌ **Keyword stuffing**: Hurts readability, no longer helps SEO

### Optimization Tips
💡 **Write in batches**: 2-3 articles in draft, then convert all to HTML
💡 **Reuse photo types**: Same photographer style = cohesive brand aesthetic
💡 **Template internal links**: Standard set of "Related Articles" per product
💡 **FAQ schema gold**: People Also Ask = featured snippet opportunity
💡 **Mobile-first writing**: Shorter paragraphs, more bullet points

---

## 📞 Playbook Maintenance

### Version History
- **v1.0** (2025-10-24): Initial playbook based on QuoteCreator first article

### Review Schedule
- **Monthly**: Update automation opportunities
- **Quarterly**: Review success metrics, adjust quality standards
- **Annually**: Major version update with new best practices

### Feedback Loop
After each article deployment, note:
- [ ] What took longer than expected?
- [ ] What could be automated?
- [ ] What quality issues emerged?
- [ ] What new tools/resources discovered?

---

**Playbook Philosophy**: Systematic execution > perfection paralysis. This playbook prioritizes repeatability and quality over speed. Follow the process, trust the checklist, and adjust based on metrics—not assumptions.

**Next Steps**: Use this playbook to create 8-12 articles per month across all Lexopoly products. Build SEO authority through consistent, high-quality content deployment.
