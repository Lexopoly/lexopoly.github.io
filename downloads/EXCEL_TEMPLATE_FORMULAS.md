# Excel Template Conversion Instructions

## Convert CSV to Professional Excel Template

**Input**: `contractor-estimate-template.csv`
**Output**: `contractor-estimate-template.xlsx` (with formulas)

### Excel Formulas to Add

#### Labor Subtotal (Cell D13)
```excel
=SUM(D10:D12)
```

#### Materials Subtotal (Cell D21)
```excel
=SUM(D16:D20)
```

#### Equipment Subtotal (Cell D28)
```excel
=SUM(D25:D27)
```

#### Other Costs Subtotal (Cell D35)
```excel
=SUM(D32:D34)
```

#### Project Total Section (Cells D40-D46)
```excel
D40: =D13  // Labor Total
D41: =D21  // Materials Total
D42: =D28  // Equipment Total
D43: =D35  // Other Costs Total
D44: =D40+D41+D42+D43  // Subtotal
D45: =D44*B45  // Tax Amount (B45 contains tax rate like 0.08 for 8%)
D46: =D44+D45  // TOTAL ESTIMATE
```

#### Labor Line Item Calculations (Row 10, 11, 12)
```excel
D10: =B10*C10  // Hours × Rate per Hour
D11: =B11*C11
D12: =B12*C12
```

#### Materials Line Item Calculations (Rows 16-20)
```excel
D16: =B16*C16  // Quantity × Unit Cost
D17: =B17*C17
D18: =B18*C18
D19: =B19*C19
D20: =B20*C20
```

#### Equipment Line Item Calculations (Rows 25-27)
```excel
D25: =B25*C25  // Days/Uses × Daily Rate
D26: =B26*C26
D27: =B27*C27
```

#### Payment Terms Calculations (Cells D50-D51)
```excel
D50: =D46*B50  // Deposit (B50 contains 0.50 for 50%)
D51: =D46-D50  // Balance Due
```

### Formatting Recommendations

**Currency Columns**: D10:D13, D16:D21, D25:D28, D32:D35, D40:D46, D50:D51
- Format: Currency, $#,##0.00

**Percentage Cells**: B45 (Tax Rate), B50 (Deposit %)
- Format: Percentage, 0%

**Header Styling** (Row 1):
- Font: Arial 18pt Bold
- Background: Dark Blue (#1a365d - Lexopoly brand color)
- Text: White

**Section Headers** (LABOR ESTIMATE, MATERIALS ESTIMATE, etc.):
- Font: Arial 12pt Bold
- Background: Light Gray (#f0f0f0)
- Text: Dark Blue (#1a365d)

**Total Rows**:
- Font: Bold
- Background: Light Yellow (#fffacd)
- Border: Thick bottom border

**Column Widths**:
- A: 25
- B: 12
- C: 15
- D: 15
- E-G: 3 (spacing)

### Protection

Protect all formula cells from editing. Allow users to edit only:
- Input cells (B10:C12, B16:C20, B25:C27, D32:D34, B45, B50)
- Company info (B2:C4)
- Client info (B8:C11)
- Project details (B16:C18)

### Final Steps

1. Open CSV in Excel
2. Add all formulas as specified above
3. Format currency and percentage cells
4. Apply styling (colors, fonts, borders)
5. Protect formula cells
6. Save as `.xlsx` format
7. Test: Enter sample data and verify all calculations work
8. Save final version to `/downloads/contractor-estimate-template.xlsx`
