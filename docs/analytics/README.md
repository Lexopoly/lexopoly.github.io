# 📊 Weekly Google Analytics + Search Console Reporting System

**System Owner**: CC-WEB (Claude Code - Web Analytics)
**Established**: November 2025
**Cadence**: Weekly (Every Monday for previous Mon-Sun period)
**Purpose**: Track Lexopoly website performance, SEO visibility, identify trends, inform business decisions
**Automation**: MCP-powered (automated data collection)

---

## 🎯 System Overview

This directory contains weekly Google Analytics 4 and Search Console reports for lexopoly.com, providing systematic tracking of:
- **Traffic volume and trends** (GA4)
- **Search visibility and rankings** (GSC)
- **Content performance** (GA4 + GSC)
- **Product-specific engagement** (GA4)
- **Conversion metrics** (GA4)
- **SEO performance** (GSC)
- **Week-over-week comparisons** (both)
- **Data-driven action items**

**Automated Data Collection**:
✅ Google Analytics 4 MCP - Automated traffic & behavior metrics
✅ Google Search Console MCP - Automated SEO & ranking metrics
📊 No manual data copying required - Claude queries APIs directly

**Integration Points**:
- Weekly summary posted to `/SUPER_BUS_OPS.md`
- Operational metrics added to `/WEBMASTER_BUS_OPS.md`
- Full detailed reports stored here in `/docs/analytics/`

**Setup Required**: [MCP Setup Guide](/docs/analytics/MCP_SETUP_GUIDE.md) (one-time, ~30-45 min)

---

## 📁 File Structure

```
/docs/analytics/
├── README.md                          # This file - system documentation
├── MCP_SETUP_GUIDE.md                 # One-time MCP setup instructions (GA4 + GSC)
├── GA_WEEKLY_REPORT_TEMPLATE.md       # Reusable template for new reports
├── GA_WEEKLY_REPORT_2025_W44.md       # Week 44, 2025 report
├── GA_WEEKLY_REPORT_2025_W45.md       # Week 45, 2025 report
└── [future weekly reports...]
```

**Naming Convention**: `GA_WEEKLY_REPORT_YYYY_WW.md`
- `YYYY` = 4-digit year (e.g., 2025)
- `WW` = 2-digit ISO week number (01-53)

---

## 🚀 Quick Start

**First Time (One-Time Setup)**:
1. Follow [MCP Setup Guide](/docs/analytics/MCP_SETUP_GUIDE.md) (~30-45 min)
2. Configure OAuth for GA4 and GSC
3. Test both MCPs with sample queries
4. ✅ Ready for automated weekly reports!

**Weekly Reporting (After MCP Setup)**:
1. Open Claude Code on Monday morning
2. Ask: "Generate my weekly GA + GSC report for Week [WW] using the template"
3. Claude automatically queries both APIs, fills template, generates insights
4. Review report, post summary to SUPER_BUS_OPS and WEBMASTER_BUS_OPS
5. Commit to repository

**Time**: ~60 minutes manual → ~10 minutes automated

---

## 🤖 For Claude Code Agents: MCP Workflow

**When user asks to "generate weekly report" or "create GA report", follow this workflow:**

### Step 1: Determine Week Range
```
Calculate ISO week number for target week
Week 44 2025 = Oct 27 - Nov 2, 2025 (Mon-Sun)
```

### Step 2: Query GA4 via MCP

**Traffic Volume**:
```
From Google Analytics, get sessions, users, and pageviews for [start date] to [end date].
Also get new users vs returning users breakdown.
Compare all metrics to the previous week ([prev start] to [prev end]).
```

**Top Pages**:
```
Show me the top 10 pages by sessions for [start date] to [end date].
Include the session count for each page and week-over-week change.
```

**Traffic Sources**:
```
Break down sessions by source/medium for [start date] to [end date].
Show counts and percentages for: organic search, direct, referral, social, email, other.
Compare to previous week.
```

**User Behavior**:
```
For [start date] to [end date], get:
- Average session duration
- Pages per session
- Bounce rate
Compare all to previous week.
```

**Product Breakdown**:
```
For [start date] to [end date], show sessions for these URL path prefixes:
/localtranscribe/, /quotecreator/, /compliancelogger/, /revenuerescue/, /familycalc/, /blog/

Include percentage of total traffic for each and week-over-week change.
```

### Step 3: Query GSC via MCP

**Search Performance**:
```
From Google Search Console, for [start date] to [end date], get:
- Total impressions
- Total clicks
- Average CTR
- Average position
Compare all metrics to the previous week.
```

**Top Queries**:
```
What are the top 10 search queries driving clicks for [start date] to [end date]?
Include clicks, impressions, CTR, and average position for each.
Show week-over-week change in clicks.
```

**Top Pages by Impressions**:
```
Show the top 10 pages by impressions in Search Console for [start date] to [end date].
Include impressions, clicks, CTR, and average position for each.
```

**Index Coverage**:
```
From Google Search Console, get:
- Total indexed URLs
- Any coverage errors or warnings
- Index status for these recently submitted URLs:
  /blog/real-time-mobile-waste-logging-construction/
  /blog/clio-integration-best-practices/
  /quotecreator/help/
  [list other new URLs from sitemap]
```

### Step 4: Generate Report

1. Copy `/docs/analytics/GA_WEEKLY_REPORT_TEMPLATE.md`
2. Rename to `GA_WEEKLY_REPORT_YYYY_WW.md` (use ISO week number)
3. Fill in all sections with data from MCP queries
4. Calculate week-over-week changes: `((This Week - Last Week) / Last Week) * 100`
5. Write analysis and insights for each section
6. Generate 3-5 actionable recommendations based on data
7. Note any notable events from commit history/SUPER_BUS_OPS

### Step 5: Post Updates

1. Add summary to SUPER_BUS_OPS (see template in this file below)
2. Update WEBMASTER_BUS_OPS analytics section with current week status
3. Commit all changes with descriptive message

### SUPER_BUS_OPS Weekly Summary Template

```markdown
## 📊 GA WEEKLY REPORT - Week [WW] (YYYY-MM-DD to YYYY-MM-DD)

### **ANALYTICS SUMMARY** 📈

**Report ID**: GA-WEEK-YYYY-WW
**Full Report**: `/docs/analytics/GA_WEEKLY_REPORT_YYYY_WW.md`

**Top Metrics**:
- Total Sessions: X,XXX (+/-XX% vs prev week)
- Organic Clicks (GSC): X,XXX (+/-XX% vs prev week)
- Top Page: /page/ (X,XXX sessions)
- Search Position: X.X (+/-X.X vs prev week)

**Key Findings**:
- [Most important insight from data]
- [Second key insight]

**Action Items**:
- [ ] [Specific action based on data]
- [ ] [Another action based on data]

**Status**: ✅ WEEK COMPLETE
**Git Commit**: `hash` (docs: Add GA weekly report WXX)

---
```

### Troubleshooting MCP Queries

If MCPs not responding:
1. Check MCP server status in Claude Code settings
2. Verify OAuth tokens haven't expired (re-auth if needed)
3. Ensure date ranges are within GA4/GSC retention limits (14 months)
4. Try simpler query first to test connection

If data seems wrong:
1. Verify timezone consistency (use Eastern Time)
2. Check if GA4 property ID is correct
3. Confirm GSC property URL matches (https://lexopoly.com)
4. Remember: GA4 has 24-48hr lag, GSC has 1-2 day lag

---

## 📈 Data Requirements

For each weekly report, collect these metrics from **Google Analytics 4** and **Google Search Console**:

### From Google Analytics 4 (GA4)

### Core Traffic Metrics (Week Range: Monday-Sunday)
1. **Sessions** (total + week-over-week % change)
2. **Users** (total + week-over-week % change)
3. **Pageviews** (total)
4. **New vs Returning Users** (count breakdown)

### Top Content Performance
5. **Top 10 Pages by Sessions**
   - Page path
   - Sessions count
   - % change vs previous week

### Traffic Sources
6. **Sessions by Source/Medium**
   - Organic Search (count + percentage)
   - Direct (count + percentage)
   - Referral (count + percentage)
   - Social (count + percentage)
   - Other (count + percentage)

### User Behavior Metrics
7. **Average Session Duration** (time + change vs previous week)
8. **Pages per Session** (average + change vs previous week)
9. **Bounce Rate** (percentage + change vs previous week)

### Product Performance Breakdown
10. **Sessions by Product** (by URL path prefix)
    - `/localtranscribe/` - Sessions, % of total traffic
    - `/quotecreator/` - Sessions, % of total traffic
    - `/compliancelogger/` - Sessions, % of total traffic
    - `/revenuerescue/` - Sessions, % of total traffic
    - `/familycalc/` - Sessions, % of total traffic
    - `/blog/` - Sessions, % of total traffic

### Conversion Tracking (if available)
11. **Events/Conversions**
    - Trial signups
    - Demo requests
    - Download clicks
    - CTA button clicks
    - Form submissions

### Optional Context Data
12. **Geographic Distribution** (top 5 countries)
13. **Device Breakdown** (Desktop/Mobile/Tablet percentages)
14. **Top Landing Pages** (top 10 entry points)

---

### From Google Search Console (GSC)

#### Search Performance Metrics
1. **Total Impressions** (how often site appears in Google search)
2. **Total Clicks** (clicks from organic search)
3. **Average CTR** (click-through rate: clicks/impressions)
4. **Average Position** (mean ranking in search results)
5. **Week-over-Week Changes** for all above metrics

#### Top Search Queries
6. **Top 10 Queries Driving Clicks**
   - Query text
   - Clicks
   - Impressions
   - CTR
   - Average position

#### Top Search Pages
7. **Top 10 Pages by Impressions**
   - Page URL
   - Impressions
   - Clicks
   - CTR
   - Average position

#### Index Coverage
8. **Indexed URLs** (total count)
9. **Coverage Errors** (if any)
10. **New URLs Indexed** (this week vs last week)
11. **Submitted URLs Status** (for newest 10 pages from sitemap)

---

## 🔄 Weekly Workflow

### Schedule: Every Monday Morning

**OPTION A: Automated (MCP Setup Complete) - RECOMMENDED**

**Step 1: Generate Report with Claude** (5-10 minutes)
1. Open Claude Code
2. Ask: "Generate weekly GA + GSC report for Week [WW], YYYY"
3. Claude queries both GA4 and GSC APIs automatically
4. Reviews generated report for accuracy
5. Claude saves completed report to `/docs/analytics/`

**Step 2: Review & Finalize** (5-10 minutes)
1. Read generated report
2. Add any manual observations or context
3. Verify action items are actionable
4. Approve or request revisions

**Total Time**: ~10-20 minutes (83% faster than manual)

---

**OPTION B: Manual (No MCP Setup)**

**Step 1: Data Collection** (15-20 minutes)
1. Log into Google Analytics 4
2. Set date range: Previous Monday through Sunday
3. Export/record all metrics listed above
4. Save comparison data from week before
5. Log into Google Search Console
6. Export search performance metrics
7. Export top queries and pages data

**Step 2: Report Generation** (20-30 minutes)
1. Copy `GA_WEEKLY_REPORT_TEMPLATE.md` to new file
2. Rename: `GA_WEEKLY_REPORT_YYYY_WW.md` (use current ISO week number)
3. Fill in all data sections
4. Calculate week-over-week changes
5. Write executive summary
6. Identify 3-5 key insights
7. Create action items based on data

**Step 3: Analysis & Insights** (15-20 minutes)
1. Analyze trends (what's up, what's down, why?)
2. Correlate with events (blog posts, launches, marketing)
3. Identify friction points or opportunities
4. Draft actionable recommendations

**Step 4: Integration Posts** (10-15 minutes)
1. Create summary entry in `/SUPER_BUS_OPS.md`:
   - Top 3-5 metrics
   - Key finding
   - Link to full report
   - Action items

2. Update `/WEBMASTER_BUS_OPS.md`:
   - Add to operational metrics section
   - Track product-level trends
   - Note infrastructure implications

**Step 5: Git Commit** (5 minutes)
1. Stage new weekly report file
2. Stage SUPER_BUS_OPS.md update
3. Stage WEBMASTER_BUS_OPS.md update
4. Commit with message: `docs: Add GA weekly report W[XX] YYYY`
5. Push to repository

**Total Time Estimate**: 65-90 minutes per week

---

## 📊 Report Structure

Each weekly report follows this structure:

### Section 1: Executive Summary
- Overall performance assessment (✅ POSITIVE / 🟡 MIXED / 🔴 DECLINING)
- Week-over-week change percentage
- Key achievement of the week
- Key concern (if any)

### Section 2: Quantitative Metrics (Top 5)
1. Traffic Volume
2. Top Performing Pages
3. Conversion Metrics
4. Traffic Sources
5. User Behavior

### Section 3: Qualitative Insights (Top 3)
1. User Journey Patterns
2. Content Performance Analysis
3. Conversion Friction Points

### Section 4: Week-over-Week Comparison
- Table format comparing this week vs last week
- All key metrics with change calculations

### Section 5: Product Performance Breakdown
- Individual product analytics
- Top pages per product
- Product-specific conversion rates

### Section 6: Action Items & Recommendations
- High Priority (this week)
- Medium Priority (next 2 weeks)
- Low Priority (this month)

### Section 7: Notable Events
- Marketing activities
- Site changes/deployments
- External factors affecting traffic

### Section 8: Next Week Focus
- Goals for upcoming week
- Trends to monitor

### Section 9: Appendix
- Data source details
- Links to related documents
- Week completion status

---

## 🎯 Success Metrics for This System

The GA reporting system itself should be evaluated on:

1. **Consistency**: Reports published every Monday without fail
2. **Actionability**: Each report generates 3-5 concrete action items
3. **Implementation**: Action items tracked and executed
4. **Trend Detection**: Early identification of positive/negative trends
5. **Business Impact**: Reports inform product and marketing decisions

---

## 🔗 Integration with Other Systems

### SUPER_BUS_OPS.md
Weekly summary entry format:
```markdown
## 📊 GA WEEKLY REPORT - Week [WW] (YYYY-MM-DD to YYYY-MM-DD)

### **ANALYTICS SUMMARY** 📈

**Report ID**: GA-WEEK-YYYY-WW
**Full Report**: `/docs/analytics/GA_WEEKLY_REPORT_YYYY_WW.md`

**Top Metrics**:
- Total Sessions: X,XXX (+XX% vs prev week)
- Top Page: /page/ (X,XXX views)
- Conversion Rate: X.X% (+/-X.X% vs prev week)

**Key Findings**:
- Finding 1
- Finding 2

**Action Items**:
- [ ] Action based on data
- [ ] Action based on data

**Status**: ✅ WEEK COMPLETE
**Git Commit**: `hash` (docs: Add GA weekly report WXX)

---
```

### WEBMASTER_BUS_OPS.md
Add to operational metrics section:
```markdown
### **Weekly Analytics Snapshot** (Week WW YYYY)
- Sessions: X,XXX (+/-XX% vs prev week)
- Top Product: ProductName (XX% of traffic)
- Conversion Trend: ↑ IMPROVING / → STABLE / ↓ DECLINING
- Action Items: X pending from this week's report
```

---

## 📚 Quick Reference

### ISO Week Number Lookup
- Week 44 2025: Oct 27 - Nov 2, 2025
- Week 45 2025: Nov 3 - Nov 9, 2025
- Week 46 2025: Nov 10 - Nov 16, 2025
- [Use: https://www.epochconverter.com/weeks/2025 for full calendar]

### GA4 Navigation Shortcuts
- **Top Pages**: Engagement > Pages and screens
- **Traffic Sources**: Acquisition > Traffic acquisition
- **User Behavior**: Engagement > Overview
- **Conversions**: Engagement > Conversions (if goals configured)
- **Product Breakdown**: Engagement > Pages and screens (filter by page path)

### Common Calculations
- **Week-over-Week Change**: `((This Week - Last Week) / Last Week) * 100`
- **Conversion Rate**: `(Conversions / Sessions) * 100`
- **Product % of Traffic**: `(Product Sessions / Total Sessions) * 100`

---

## 🚨 Important Guidelines

### Immutable Ledger Principle
- **DO NOT edit past week reports** after publication
- If errors found, add correction note at bottom
- Historical accuracy is critical for trend analysis

### Data Privacy
- No personally identifiable information (PII) in reports
- Aggregate metrics only
- Geographic data at country level only

### Objectivity
- Report both positive and negative trends
- Base conclusions on data, not assumptions
- Separate facts from interpretations

### Consistency
- Always use same date range format (Monday-Sunday)
- Use same metric definitions week-to-week
- Maintain template structure for comparability

---

## 📞 Questions or Issues?

This system is designed to be operated by Claude Code agents. If you encounter:
- **Missing Data**: Note in report and explain why data unavailable
- **GA Changes**: Update README and template to reflect new GA4 interface
- **Process Improvements**: Document in `/docs/analytics/SYSTEM_CHANGELOG.md`

---

**Last Updated**: 2025-11-01
**System Version**: 1.0
**Status**: ✅ ACTIVE
