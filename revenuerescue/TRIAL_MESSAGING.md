# RevenueRescue Trial Messaging Guide

**Single Source of Truth for all trial-related messaging**
**Created**: November 1, 2025
**FCO Decision**: FCO-DEC-002 (4-layer trial mitigation strategy)

---

## Trial Structure Overview

### Trial Terms (FCO-DEC-002 Approved)
- **Duration**: 7 days
- **Calendar Window**: Last 30 days only (OAuth restriction Layer 1)
- **Data Access**: Summary metrics only + 3 anonymized sample opportunities (Layer 2)
- **Credit Card**: Required to start trial (prevents abuse, standard SaaS practice)
- **Billing**: Starts automatically after 7 days unless canceled (no charge during trial period)
- **IP Rate Limiting**: Max 3 trials per IP per 24 hours (Layer 3, reuse FamilyCalc code)
- **Ongoing Value Messaging**: Present throughout experience (Layer 4)

### Trial Goals
1. **User Goal**: Validate revenue leakage and understand potential ROI
2. **Business Goal**: Convert trial users to paid subscribers by demonstrating value while preventing abuse

---

## Email Templates for CC-RR Implementation

### Email 1: Trial Start (Day 0)
**Subject**: Your RevenueRescue trial has started - See your revenue potential

Hi [First Name],

Welcome to your 7-day RevenueRescue trial!

**What's happening now:**
- We're analyzing your last 30 days of Clio calendar activity
- You'll see summary metrics showing total revenue potential
- 3 anonymized sample opportunities to understand how suggestions work
- Complete access to the dashboard and approval workflow

**About your card:**
- Your credit card is on file but **won't be charged for 7 days**
- Cancel anytime within 7 days = never charged
- After 7 days, billing automatically starts at $149/month unless you cancel

**What to expect:**
- Most firms discover $15K-$40K in annual revenue leakage during the trial
- The trial shows you what you've *been losing* (30-day snapshot)
- Paid subscription stops the leakage forever (unlimited ongoing capture)

**Next steps:**
1. Check your dashboard: [Dashboard Link]
2. Review your summary metrics
3. Explore the 3 sample billing suggestions
4. See the "Why Continue After Trial?" section to understand ongoing value

Your trial ends in 7 days on [Expiration Date].

Questions? Reply to this email or visit our [support page].

—RevenueRescue Team

---

### Email 2: Trial Day 5 Reminder
**Subject**: 2 days left in your trial - Your card will be charged in 2 days

Hi [First Name],

You have **2 days remaining** in your RevenueRescue trial.

**Important billing reminder:** Your credit card will be charged $149 in 2 days unless you cancel. If you want to cancel, do it before [Expiration Date] to avoid any charges.

**What you've learned so far:**
Based on your last 30 days of calendar data, our analysis shows:
- Estimated annual revenue leakage: **[Calculated Amount]**
- Potential RevenueRescue capture (90%): **[Captured Amount]**
- Net annual benefit (after $1,800 cost): **[Net Benefit]**
- ROI: **[ROI Multiplier]×**

**The difference between trial and subscription:**

**Trial (what you have now):**
- 30-day calendar window only
- Summary metrics
- 3 anonymized samples
- Ends in 2 days

**Paid Subscription ($149/month):**
- Unlimited calendar history
- Complete detailed analytics
- Unlimited billing suggestions with client names
- Real-time ongoing monitoring forever
- Continuous revenue capture

**Why continue after trial?**
The trial validated your revenue leakage. The subscription ensures you stop losing it going forward. Think of it as:
- Trial value: "Here's what you've been losing"
- Subscription value: "Stop losing it forever"

**Ready to continue?**
[Upgrade to Paid Subscription Button]

Or keep exploring for 2 more days. Your trial access continues until [Expiration Date].

Questions? Reply to this email.

—RevenueRescue Team

---

### Email 3: Trial Day 7 Expiration
**Subject**: Your trial has ended - Your card will be charged today

Hi [First Name],

Your 7-day RevenueRescue trial has ended today.

**Important:** Your credit card will be charged $149 today to continue your subscription. If you want to cancel, do it now to avoid the charge.

**What you discovered:**
- Annual revenue leakage: **[Calculated Amount]**
- RevenueRescue capture potential: **[Captured Amount]**
- Estimated net benefit: **[Net Benefit]/year**

**To continue capturing this revenue:**
Upgrade to a paid subscription ($149/month) for:
- Unlimited access to full calendar history (not just 30 days)
- Real-time ongoing monitoring of all future activities
- Complete detailed analytics with client names
- Unlimited billing suggestions
- Continuous revenue capture forever

[Upgrade Now Button - $149/month]

**Not ready yet?**
That's okay. Your trial account will remain inactive. You can reactivate anytime by upgrading to a paid subscription. All your configuration and settings will be saved.

**Questions about pricing or features?**
- [View Pricing Details]
- [Compare Trial vs Paid]
- [Contact Support]

Thank you for trying RevenueRescue.

—RevenueRescue Team

---

### Email 4: Post-Trial Day 3 Follow-Up
**Subject**: Quick question about your RevenueRescue trial

Hi [First Name],

I wanted to follow up on your RevenueRescue trial that ended 3 days ago.

**Quick question:** What prevented you from continuing with a paid subscription?

(Reply to this email - I read every response personally)

- [ ] Price concerns ($149/month)
- [ ] Didn't see enough value in the trial
- [ ] Need more time to evaluate
- [ ] Technical issues or bugs
- [ ] Waiting for budget approval
- [ ] Other: _________________

**If price is a concern:**
Remember, RevenueRescue typically recovers $12K-$34K annually for solo practitioners. The $1,800 annual cost usually pays for itself in the first 18-30 days.

**If you need more information:**
- Schedule a demo: [Calendar Link]
- View ROI calculator: [Pricing Page]
- See feature details: [Features Page]

**Ready to continue?**
[Upgrade Now - $149/month]

I'm here to help if you have questions.

[Founder Name]
RevenueRescue Team
[Contact Email]

---

## In-Product Messaging

### Payment Wall (After Trial Expires)
**Location**: Dashboard page when trial user tries to access after day 7

```
Your 7-day trial has ended

Thank you for trying RevenueRescue! Your trial gave you a snapshot of your revenue leakage from the last 30 days.

To continue capturing revenue going forward, upgrade to a paid subscription:

✅ Unlimited access to full calendar history
✅ Real-time monitoring of all future activities
✅ Complete detailed analytics
✅ Unlimited billing suggestions
✅ Continuous revenue capture forever

[Upgrade Now - $149/month]

During your trial, we estimated you could recover [Calculated Amount] annually.
After the $1,800 annual cost, your net benefit would be [Net Benefit].
That's a [ROI]× return on investment.

[View Pricing Details] | [Compare Trial vs Paid] | [Contact Support]
```

---

### Trial Countdown Banner (Days 5-7)
**Location**: Top of dashboard (persistent banner)

**Day 5-6:**
```
⏰ Your trial ends in [X days]

You've discovered [Calculated Amount] in annual revenue leakage.
Ready to stop losing it forever?
[Upgrade Now] or [Learn More]
```

**Day 7 (last day):**
```
⏰ Last day of your trial - Expires tonight at midnight

Your trial validated [Calculated Amount] in revenue leakage.
Continue with unlimited ongoing capture for $149/month.
[Upgrade Now] or [Compare Trial vs Paid]
```

---

### Feature Limitation Tooltips

**When user tries to view more than 3 sample opportunities:**
```
🔒 Additional billing suggestions available in paid subscription

Your trial includes 3 anonymized sample opportunities to understand how
RevenueRescue works.

Paid subscription ($149/month) includes:
• Unlimited billing suggestions
• Full client names and details
• Complete calendar history access
• Real-time ongoing monitoring

[Upgrade Now] | [Learn More]
```

**When user tries to access data beyond 30-day window:**
```
🔒 Full calendar history available in paid subscription

Your trial analyzes the last 30 days only.

Paid subscription ($149/month) provides:
• Unlimited access to full calendar history
• Catch opportunities from months/years ago
• Ongoing monitoring forever

[Upgrade Now] | [Compare Trial vs Paid]
```

**When user tries to view detailed analytics:**
```
🔒 Detailed analytics available in paid subscription

Your trial shows summary metrics only.

Paid subscription ($149/month) includes:
• Complete detailed analytics dashboard
• Revenue tracking over time
• Pattern analysis and insights
• Export capabilities

[Upgrade Now] | [Learn More]
```

---

## OAuth Consent Screen Messaging

### OAuth Consent Screen (Clio Authorization)
**Required by Layer 1: Time window limits**

```
RevenueRescue requests access to:
• Read your Clio calendar (last 30 days only for trial)
• Read matter and contact information
• Create time entries (with your approval only)

Trial Access: Last 30 days of calendar data
Paid Subscription: Unlimited calendar history

Your security:
✓ We never see or store your Clio password
✓ You can revoke access anytime from Clio settings
✓ Data encrypted in transit and at rest

[Authorize RevenueRescue] | [Learn More About Security]
```

---

## FAQs for Trial Users

### Q: What data do I see during the trial?
**A:** Your trial analyzes the last 30 days of Clio calendar activity. You'll see:
- Summary metrics (total estimated revenue leakage)
- High-level analytics
- 3 anonymized sample billing opportunities

Paid subscription ($149/month) provides unlimited access to full calendar history, complete detailed analytics, and unlimited billing suggestions with full client details.

---

### Q: Do I need a credit card to start the trial?
**A:** Yes, credit card required to start your 7-day trial. This is standard practice to prevent abuse while keeping the trial genuinely free. **You won't be charged during the 7-day trial period.** If you cancel within 7 days, your card is never charged. After 7 days, billing automatically starts at $149/month unless you cancel.

---

### Q: What happens after 7 days?
**A:** Your trial access ends after 7 days. To continue:
1. **Upgrade to paid subscription** ($149/month) - Get immediate access to full features
2. **Let trial expire** - Your account becomes inactive, but we save your settings if you want to reactivate later

No automatic charges - you decide if you want to continue.

---

### Q: Why only 30 days of data in the trial?
**A:** The 30-day window gives you enough data to validate revenue leakage and understand ROI, while keeping trial scope focused.

Most firms discover $15K-$40K in annual revenue leakage from just 30 days of analysis. That's enough to make an informed decision.

Paid subscription provides unlimited access to full calendar history plus ongoing monitoring forever.

---

### Q: Can I extend my trial?
**A:** Trials are 7 days (fixed). However, we're happy to:
- Answer questions: [Contact Support]
- Schedule a demo: [Calendar Link]
- Discuss your specific needs: [Contact Sales]

We want you to be confident in your decision. If you need more information, reach out!

---

### Q: What's the difference between trial and paid?

| Feature | 7-Day Trial | Paid Subscription |
|---------|-------------|-------------------|
| **Price** | FREE | $149/month |
| **Duration** | 7 days | Unlimited |
| **Calendar Window** | Last 30 days only | Full unlimited history |
| **Data Access** | Summary metrics only | Complete detailed analytics |
| **Billing Suggestions** | 3 anonymized samples | Unlimited with full details |
| **Purpose** | Validate potential | Stop losing revenue forever |
| **Ongoing Capture** | ❌ None | ✅ Real-time monitoring forever |

---

## Key Messaging Principles (Layer 4: Ongoing Value)

### Core Message
**The trial shows you what you've been losing. The subscription ensures you stop losing it going forward.**

### Ongoing Value Themes
1. **Trial = Snapshot**: Limited 30-day window to validate problem
2. **Paid = Continuous**: Unlimited history + ongoing monitoring forever
3. **Value Compounds**: The longer you use RevenueRescue, the more valuable it becomes
4. **Time Perspective**: Trial looks backward (30 days). Subscription captures forward (forever).

### Avoid These Phrases
- ❌ "Trial limitations" (negative framing)
- ❌ "Upgrade to unlock" (implies trial is inferior)
- ❌ "Full features" (implies trial is incomplete)

### Use These Phrases Instead
- ✅ "Trial validates potential, subscription captures it"
- ✅ "Ongoing value that compounds over time"
- ✅ "Stop losing revenue forever"
- ✅ "Real-time monitoring going forward"

---

## Technical Implementation Notes for CC-RR

### Trial User Flow
1. **Day 0**: User signs up → OAuth (30-day restriction) → Dashboard shows summary + 3 samples
2. **Day 1-4**: Normal usage, dashboard access, can view 3 samples repeatedly
3. **Day 5**: Email reminder sent, countdown banner appears
4. **Day 6**: Countdown banner updates (1 day left)
5. **Day 7**: Final countdown (last day), expiration email sent at midnight
6. **Day 8+**: Payment wall blocks dashboard access, post-trial emails

### Feature Gating Locations
- Billing suggestions list: Show only 3 anonymized samples (hide client names)
- Calendar data: Restrict OAuth to 30-day window only
- Analytics dashboard: Show summary only (hide detailed breakdowns)
- Export features: Disable for trial users
- Approval workflow: Simulate (don't actually post to Clio during trial)

### Data to Track
- Trial start date
- Trial end date (start + 7 days)
- Days remaining (for countdown banners)
- Calculated revenue metrics (for email personalization)
- User actions during trial (for conversion analysis)

### Email Trigger Schedule
- Day 0: Immediate (trial start)
- Day 5: 9:00 AM user local time
- Day 7: 9:00 AM user local time (expiration warning)
- Day 7: 11:59 PM (trial expires, send expiration email)
- Day 10: Post-trial follow-up

---

## Conversion Optimization Notes

### Key Metrics to Track
1. Trial signup rate
2. Trial completion rate (% who use full 7 days)
3. Trial-to-paid conversion rate
4. Days until conversion decision
5. Revenue recovered per trial user (validates value)

### Expected Conversion Rates
- **Target**: 20-30% trial-to-paid conversion
- **Industry benchmark**: 10-25% for SaaS free trials
- **Key driver**: Clear ROI demonstration ($12K-$34K recovery vs $1,800 cost)

---

## Future Iterations (Post-Launch)

### Potential Improvements
1. **Dynamic trial length**: Extend to 14 days for high-value users (based on calculated ROI)
2. **Personalized emails**: Segment by firm size, practice area, calculated ROI
3. **In-trial onboarding**: Progressive disclosure of features across 7 days
4. **Social proof**: Add conversion testimonials to payment wall
5. **Annual pricing option**: Offer $1,590/year (10% off) during trial

---

**Document Owner**: CC-WEB (Webmaster)
**Implementation Owner**: CC-RR (RevenueRescue Engineering)
**Approval**: FCO-DEC-002 (November 1, 2025)
**Last Updated**: November 1, 2025
