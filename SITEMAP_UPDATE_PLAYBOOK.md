# Sitemap Update Playbook
**Purpose**: Automated sitemap generation and Google Search Console submission
**Frequency**: After publishing new content or making significant page updates
**Estimated Time**: 5 minutes

---

## When to Update Sitemap

Update the sitemap whenever you:
- ✅ Publish a new blog article
- ✅ Add a new product page
- ✅ Create new landing pages
- ✅ Make significant updates to existing pages
- ✅ Delete or rename pages

**Frequency Recommendation**: After each content deployment (typically 1-4 times per month)

---

## Automated Update Process (Recommended)

### Step 1: Run Sitemap Generator
```bash
npm run generate-sitemap
```

**Expected Output**:
```
🔍 Scanning for HTML files...
   Found XX HTML files

📝 Generating sitemap entries...
   Generated XX sitemap entries

✏️  Writing sitemap.xml...
   ✅ Sitemap written to /home/rain/code/lexopoly-site/sitemap.xml

📊 Summary:
   Total URLs: XX
   Homepage: 1
   Product pages: X
   Blog articles: XX
   Industry pages: X
   Utility pages: XX
```

### Step 2: Review Changes
```bash
git diff sitemap.xml
```

**What to check**:
- ✅ New URLs added for recent content
- ✅ lastmod dates are current (today's date for new content)
- ✅ No unexpected removals
- ✅ Priority values look reasonable (0.8 for blog articles, 0.9 for main products)

### Step 3: Commit and Deploy
```bash
git add sitemap.xml
git commit -m "chore: Update sitemap (add [description of new content])"
git push
```

**Example commit messages**:
- `chore: Update sitemap (add free contractor template article)`
- `chore: Update sitemap (add ComplianceLogger product page)`
- `chore: Update sitemap (monthly content update)`

### Step 4: Submit to Google Search Console

**Option A: Automatic Notification (Recommended)**
Google will automatically detect the updated sitemap within 24-48 hours. No manual action needed.

**Option B: Manual Submission (Faster Indexing)**
1. Visit: https://search.google.com/search-console
2. Select property: `lexopoly.com`
3. Navigate to: **Sitemaps** (left sidebar)
4. Click: **View sitemap** next to `sitemap.xml`
5. Google will show the update automatically

**Option C: Force Re-Submission (Only if needed)**
Only use if Google hasn't picked up changes after 48 hours:
1. Go to Sitemaps in Google Search Console
2. Remove existing sitemap
3. Re-add sitemap URL: `https://lexopoly.com/sitemap.xml`

### Step 5: Request Priority Indexing (Optional)

For high-priority new content (e.g., today's article):
1. Visit: https://search.google.com/search-console
2. Use **URL Inspection** tool (top of page)
3. Enter full URL: `https://lexopoly.com/blog/[article-name]/`
4. Click: **Request Indexing**
5. Google will prioritize crawling this URL (typically indexed within 24-48 hours)

**When to use**: Fresh content that you want indexed immediately (blog articles, time-sensitive pages)

---

## Manual Update Process (Not Recommended)

Only use this if the automated script is broken. Prefer fixing the script over manual updates.

### Step 1: Edit sitemap.xml
```bash
nano sitemap.xml  # or your preferred editor
```

### Step 2: Add New URL Entry
Template:
```xml
  <url>
    <loc>https://lexopoly.com/[path]/</loc>
    <lastmod>YYYY-MM-DD</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
```

**Priority Guidelines**:
- `1.0`: Homepage only
- `0.9`: Main product pages (LocalTranscribe, ComplianceLogger), Buy page
- `0.8`: Blog articles, demo, pricing, industry pages (lawyers, journalists)
- `0.7`: Product blog indexes, secondary industry pages
- `0.6`: Support, setup pages
- `0.5`: About, contact
- `0.3-0.4`: Legal pages (privacy, terms), utility pages

**changefreq Guidelines**:
- `weekly`: Homepage, pricing
- `monthly`: Products, blog articles, most content
- `yearly`: Legal pages (privacy, terms)

### Step 3: Validate XML
```bash
# Check for balanced tags
grep -c "<url>" sitemap.xml
grep -c "</url>" sitemap.xml
# Both counts should be identical

# Check closing tag exists
tail -1 sitemap.xml
# Should output: </urlset>
```

### Step 4: Continue with Steps 3-5 from Automated Process

---

## Troubleshooting

### Script Fails to Run
**Error**: `npm run generate-sitemap` command not found
**Solution**: Run directly: `node scripts/generate-sitemap.js`

### Script Generates Too Many URLs
**Error**: Script includes 404.html, test pages, etc.
**Solution**: Update EXCLUDE_PATTERNS in `scripts/generate-sitemap.js`

### Google Search Console Shows Errors
**Error**: "Submitted URL not found (404)"
**Solution**:
1. Verify URL is live: `curl -I https://lexopoly.com/[path]/`
2. Remove dead URLs from sitemap
3. Re-run generator: `npm run generate-sitemap`

**Error**: "Submitted URL seems to be a Soft 404"
**Solution**: Page exists but has thin content or "coming soon" placeholder. Either:
- Add substantial content to the page
- Remove from sitemap until content is ready

### Sitemap Not Updating in Google
**Problem**: Google Search Console shows old sitemap date
**Solution**:
1. Verify GitHub Pages deployed: Check commit at https://github.com/Lexopoly/lexopoly.github.io
2. Verify sitemap.xml is live: `curl https://lexopoly.com/sitemap.xml | head -20`
3. Wait 24-48 hours for Google to re-crawl
4. If still not updated, use Option C (Force Re-Submission) above

---

## Monitoring and Metrics

### Google Search Console Coverage Report

**Where**: https://search.google.com/search-console → Coverage
**What to monitor**:
- ✅ **Valid URLs**: Should match sitemap URL count (currently 48)
- 🟡 **Valid with warnings**: Investigate if count is high (>5)
- ❌ **Excluded URLs**: Should be minimal (<10)
- ❌ **Error URLs**: Should be zero (404s, server errors, etc.)

**Check frequency**: Weekly for first month after major updates, then monthly

### Expected Indexing Timeline
- **Sitemap submission**: Instant
- **Google crawls sitemap**: 1-48 hours
- **Google crawls new URLs**: 1-7 days (varies by site authority)
- **URLs appear in search**: 7-30 days (depends on competition, quality)
- **Priority indexing request**: 1-3 days

### Success Metrics (Track in Google Search Console)
- **Indexed Pages**: 29 (before update) → 48 (after update) = +65% coverage
- **Impressions**: Track monthly (expect +15-30% in 60-90 days)
- **Clicks**: Track monthly (expect +10-20% in 60-90 days)
- **Average Position**: Track per-article (goal: <20 for target keywords)

---

## Automation Enhancements (Future)

### Option 1: Pre-Commit Hook
Automatically regenerate sitemap before each commit:

```bash
# In .git/hooks/pre-commit
#!/bin/bash
npm run generate-sitemap
git add sitemap.xml
```

**Pros**: Never forget to update sitemap
**Cons**: Adds 1-2 seconds to every commit (even non-content commits)

### Option 2: GitHub Actions Workflow
Automatically regenerate and commit sitemap after pushes:

```yaml
# .github/workflows/sitemap.yml
name: Update Sitemap
on:
  push:
    branches: [main]
    paths: ['blog/**', '*.html', '**/index.html']
jobs:
  update-sitemap:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run generate-sitemap
      - run: git add sitemap.xml && git commit -m "chore: Auto-update sitemap" || true
      - run: git push || true
```

**Pros**: Fully automated, no manual intervention
**Cons**: Requires GitHub Actions setup, extra commit per content push

### Option 3: Monthly Cron Job
Schedule sitemap regeneration monthly:

**Pros**: Low overhead, ensures sitemap stays fresh
**Cons**: Not immediate for new content

**Recommendation**: Start with manual process (current playbook), implement automation after 3+ months of consistent content publishing.

---

## Quick Reference Commands

```bash
# Generate sitemap
npm run generate-sitemap

# Preview changes
git diff sitemap.xml

# Commit and deploy
git add sitemap.xml && git commit -m "chore: Update sitemap" && git push

# Verify live sitemap
curl https://lexopoly.com/sitemap.xml | head -30

# Count current URLs
grep -c "<url>" sitemap.xml

# Test local generation
node scripts/generate-sitemap.js
```

---

## Version History

- **2025-10-25**: Initial playbook created. Automated generator implemented (Node.js script).
- **Baseline**: 48 URLs in sitemap (29 before update + 19 discovered by automation)

---

**Next Review**: After 10 content updates or 90 days (whichever comes first)
