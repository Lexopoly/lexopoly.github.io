# Lexopoly Website - Professional Software for Legal & Business Professionals

Professional marketing website for Lexopoly products (LocalTranscribe, QuoteCreator) with full analytics tracking for social media launch.

**Live Site**: https://lexopoly.com
**Status**: ✅ Production-ready, analytics configured
**Last Updated**: 2025-10-11

---

## 📊 Analytics Infrastructure

### GA4 + UTM Tracking (Implemented 2025-10-11)

**What's Tracking**:
- ✅ UTM parameter capture (source, medium, campaign, content, term)
- ✅ Multi-touch attribution (first-touch + last-touch)
- ✅ Page views with attribution context
- ✅ Conversion events (signup, contact, demo)
- ✅ Funnel progression tracking
- ✅ GDPR cookie consent

**Attribution System**:
```javascript
// First-touch: Stored in localStorage (persists across sessions)
// Last-touch: Stored in sessionStorage (current session only)
{
  firstTouch: { source, medium, campaign, timestamp, landing_page },
  lastTouch: { source, medium, campaign, timestamp, landing_page },
  current: { utm_source, utm_medium, utm_campaign, ... }
}
```

**Files**:
- `/js/analytics.js` - Core analytics engine with UTM tracking
- All 17 HTML pages have GA4 gtag.js script installed

**Next Steps**:
1. Create GA4 property at https://analytics.google.com
2. Replace `G-XXXXXXXXXX` in all HTML pages with real measurement ID
3. Set up conversion goals in GA4
4. Use UTM-tagged links for all social posts (see UTM Links section)

---

## 🌐 Website Structure

**17 Pages Total**:

### Core Pages
1. `/index.html` - Homepage
2. `/localtranscribe/index.html` - LocalTranscribe product page
3. `/quotecreator/index.html` - QuoteCreator product page
4. `/pricing/index.html` - Pricing page

### Conversion Pages
5. `/contact/index.html` - Contact form (Formspree: xkndgzqr)
6. `/demo/index.html` - Demo request (Formspree: xdorjbyv)
7. `/signup/index.html` - Signup form (Formspree: xdorjbyv)

### Industry Landing Pages
8. `/lawyers/index.html` - Legal professionals
9. `/journalists/index.html` - Journalism
10. `/court-reporters/index.html` - Court reporting
11. `/government/index.html` - Government agencies
12. `/education/index.html` - Educational institutions
13. `/production/index.html` - Video/podcast production

### Legal & Support
14. `/about/index.html` - About Lexopoly
15. `/support/index.html` - Support & FAQ
16. `/privacy/index.html` - Privacy policy
17. `/terms/index.html` - Terms of service

---

## 🔗 UTM-Tagged Social Links

Use these UTM-tagged links for all social media posts to track attribution:

### X (Twitter) - @lexopoly
```
Homepage: https://lexopoly.com/?utm_source=twitter&utm_medium=social&utm_campaign=launch
LocalTranscribe: https://lexopoly.com/localtranscribe/?utm_source=twitter&utm_medium=social&utm_campaign=product_lt
Lawyers: https://lexopoly.com/lawyers/?utm_source=twitter&utm_medium=social&utm_campaign=vertical_lawyers
```

### Reddit - u/Lexopoly
```
Homepage: https://lexopoly.com/?utm_source=reddit&utm_medium=social&utm_campaign=product_tour
Journalists: https://lexopoly.com/journalists/?utm_source=reddit&utm_medium=social&utm_campaign=vertical_journalists
Demo: https://lexopoly.com/demo/?utm_source=reddit&utm_medium=social&utm_campaign=demo_tour
```

### LinkedIn - Lexopoly LLC
```
Homepage: https://lexopoly.com/?utm_source=linkedin&utm_medium=social&utm_campaign=b2b_launch
QuoteCreator: https://lexopoly.com/quotecreator/?utm_source=linkedin&utm_medium=social&utm_campaign=product_qc
Pricing: https://lexopoly.com/pricing/?utm_source=linkedin&utm_medium=social&utm_campaign=enterprise
```

**Campaign Naming Convention**:
- `utm_source`: Platform (twitter, reddit, linkedin)
- `utm_medium`: Traffic type (social, email, cpc)
- `utm_campaign`: Specific initiative (launch, product_tour, vertical_lawyers)

---

## 📈 GA4 Dashboard Setup

**No custom dashboard needed** - GA4 provides everything out of the box:

### Essential GA4 Reports to Monitor:
1. **Acquisition → Traffic acquisition** - See which social channels drive traffic
2. **Acquisition → User acquisition** - First-touch attribution by source
3. **Engagement → Conversions** - Track signup, contact, demo conversions
4. **Engagement → Pages and screens** - Top performing pages
5. **Engagement → Events** - Custom event tracking

### Custom Explorations to Create:
1. **Conversion Path Analysis** - First-touch → Last-touch → Conversion
2. **Social Campaign Performance** - Compare Twitter vs Reddit vs LinkedIn
3. **Vertical Performance** - Which industry pages convert best
4. **Time-to-Conversion** - How long from first visit to signup

### Key Metrics to Track:
- Sessions by utm_source (Twitter, Reddit, LinkedIn)
- Conversion rate by first-touch source
- Average time-to-conversion
- Top converting landing pages
- Bounce rate by traffic source

---

## 🚀 Social Media Launch Checklist

### Before Launch (Complete ✅)
- [x] UTM tracking implemented
- [x] GA4 script installed on all pages
- [x] GDPR cookie consent working
- [x] All forms tested (contact, demo, signup)
- [x] Content consistency validated (zero typos)
- [x] Mobile responsiveness verified

### To Launch (Next Steps)
1. **Create GA4 Property**
   - Go to https://analytics.google.com
   - Create new property for lexopoly.com
   - Copy measurement ID (format: G-XXXXXXXXX)

2. **Update Measurement ID**
   ```bash
   # Replace G-XXXXXXXXXX with real ID in all 17 HTML files
   find . -name "index.html" -type f -exec sed -i 's/G-XXXXXXXXXX/G-YOUR-REAL-ID/g' {} +
   ```

3. **Set Up GA4 Conversion Goals**
   - Admin → Data display → Conversions
   - Mark these events as conversions:
     - `signup_submit`
     - `contact_form_success`
     - `demo_request`
     - `purchase_click`

4. **Launch Social Campaigns**
   - X: Product announcement thread
   - Reddit: r/legaltech, r/journalism, r/smallbusiness tour
   - LinkedIn: B2B launch post

---

## 🛠️ Development

### Local Preview
```bash
# Simple HTTP server
python3 -m http.server 8000
# Visit http://localhost:8000

# Or with Node.js
npx serve .
```

### Deploy to Production
Website is deployed automatically via GitHub Pages:
```bash
git add .
git commit -m "Your changes"
git push origin main
# Site updates within 1-2 minutes at lexopoly.com
```

### Analytics Testing
```bash
# Test UTM parameter capture
open "http://localhost:8000/?utm_source=test&utm_medium=social&utm_campaign=debug"

# Check browser console for:
# "Analytics Event: { type: 'attribution', action: 'utm_captured', ... }"

# Check localStorage:
# Key: lt-utm-first (first-touch attribution)
# Key: lt-analytics-consent (cookie consent)

# Check sessionStorage:
# Key: lt-utm-current (last-touch attribution)
```

---

## 📁 Key Files

**Analytics**:
- `/js/analytics.js` - UTM tracking, GA4 integration, conversion tracking

**Forms (Formspree)**:
- Contact: https://formspree.io/f/xkndgzqr
- Demo + Signup: https://formspree.io/f/xdorjbyv

**Documentation**:
- `/SUPER_BUS_OPS.md` - Complete website development log
- `/tmp/CONTENT_CONSISTENCY_REPORT.md` - Pre-launch QA report
- `/tmp/FORM_VALIDATION_REPORT.md` - Form testing results

**Email Addresses**:
- General: hello@lexopoly.com
- Sales: sales@lexopoly.com
- Support: support@lexopoly.com

---

## 🎯 Business Goals

### LocalTranscribe
- **Pricing**: $79 one-time (Professional), volume from $59-79/user
- **Free Tier**: 5 minutes monthly
- **Target**: Legal, journalism, court reporting, government, education

### QuoteCreator
- **Pricing**: $12.99 one-time, no subscription
- **Platform**: Android (Google Play - coming soon)
- **Target**: Contractors, consultants, service professionals

### Conversion Funnel
1. Social traffic → Landing page (with UTM tracking)
2. Industry page → Value proposition
3. Demo/Pricing → Decision point
4. Signup/Contact → Conversion (tracked in GA4)

---

## 📞 Support

**Questions?** See `/SUPER_BUS_OPS.md` for complete development history and decision rationale.

**Analytics Issues?** Check browser console for debug logs. All events logged to console when `consentGiven = true`.

**Social Media Accounts**:
- X: [@lexopoly](https://x.com/lexopoly)
- Reddit: [u/Lexopoly](https://reddit.com/u/Lexopoly)
- LinkedIn: Lexopoly LLC

---

**Generated**: 2025-10-11
**Analytics Implementation**: Complete ✅
**Next**: Create GA4 property and launch social campaigns 🚀
