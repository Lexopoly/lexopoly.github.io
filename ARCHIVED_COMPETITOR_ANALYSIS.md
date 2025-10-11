# Archived: ROI Calculator & Competitor Analysis

**Date Archived**: October 10, 2025
**Reason**: Tabled for future discussion and analysis
**Status**: Removed from pricing page, preserved here for reference

---

## ROI Calculator Implementation

### Overview
Interactive calculator allowing users to compare LocalTranscribe pricing vs competitors (Rev.com, Otter.ai, Descript).

### Features
- Slider input: 1-100 hours/month
- Real-time cost calculation
- Savings display (monthly & annual)
- Break-even analysis
- Analytics tracking

### Competitor Pricing Data
- **Rev.com**: $1.50/minute ($90/hour)
- **Otter.ai Business**: $40/month (limited to 6,000 min/user = 100 hours)
- **Descript**: $24/month (≤10 hours), $50/month (Creator plan for >10 hours)
- **LocalTranscribe**: $79/month (unlimited)

### Break-Even Point
- **5.3 hours/month** vs Rev.com ($79 ÷ $90/hour = 0.88 hours)
- At 10 hours/month: $821/month savings vs Rev.com ($9,852 annual)

### Analytics Events
- `roi_calculator.slider_change` - User adjusts hours slider
- `engagement.roi_calculator_start` - User begins interaction

---

## FAQ Item: Competitor Comparison

**Question**: "Why is LocalTranscribe more expensive than per-minute services?"

**Answer**: "LocalTranscribe offers unlimited transcription with local processing privacy and professional editing tools. At just 5.3 hours of Rev.com usage per month, Professional tier pays for itself while providing unlimited usage and zero cloud exposure."

**Rationale**: Direct comparison showing value proposition vs Rev.com pricing model.

---

## Implementation Details

### CSS (683-901)
```css
/* ROI Calculator Styles */
.roi-calculator { ... }
.calculator-container { ... }
.calculator-input { ... }
.slider-container { ... }
#hours-per-month { ... }
.slider-value { ... }
.calculator-results { ... }
.comparison-grid { ... }
.cost-card { ... }
.cost-card.competitor .cost-amount { ... }
.savings-summary { ... }
.savings-card { ... }
.break-even { ... }
```

### HTML Section (1421-1495)
- Interactive slider (1-100 hours)
- 4 cost comparison cards
- Monthly/annual savings display
- Break-even messaging

### JavaScript Logic (1580-1646)
```javascript
function calculateCosts() {
    const hours = parseInt(hoursSlider.value);
    const revMonthly = hours * 90;
    const otterMonthly = 40;
    const descriptMonthly = hours > 10 ? 50 : 24;
    const localTranscribeMonthly = 79;
    const monthlySave = Math.max(0, revMonthly - localTranscribeMonthly);
    const annualSave = monthlySave * 12;
    // ... update UI
}
```

---

## Rationale for Removal

**User Request**: "take down roi and any competitor direct analyses for now. table them for future discussion"

**Considerations**:
- ROI calculator names specific competitors (Rev.com, Otter.ai, Descript)
- Includes direct pricing comparisons ($1.50/min, $40, $24-50)
- FAQ item references Rev.com by name
- May be revisited after competitive positioning discussion

**Retained on Site**:
- "Why Choose LocalTranscribe?" section (generic value props, no competitor names)
- General pricing model description (unlimited vs per-minute)
- Value proposition messaging

---

## Future Considerations

**If Reinstating**:
1. Update competitor pricing (verify current rates)
2. Consider generic messaging ("per-minute services" vs specific brands)
3. Add legal disclaimer about competitor pricing accuracy
4. A/B test impact on conversion

**Alternative Approaches**:
- Generic calculator (hours → cost, no competitor names)
- Feature comparison (capabilities, not pricing)
- ROI based on time savings vs cost savings
- Customer testimonials showing value

---

## Files Modified
- `pricing/index.html` - Removed ROI calculator section, FAQ item, CSS, JavaScript
- `ARCHIVED_COMPETITOR_ANALYSIS.md` - Created this archive document

**Preserved In**: Git history (commit before removal: 16c222d)
