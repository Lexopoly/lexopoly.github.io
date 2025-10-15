# Photo Sourcing Workflow

**Purpose**: Step-by-step guide for sourcing CC0 photos for blog articles
**Timeline**: ~30-45 minutes for 6-8 photos
**Quality Standard**: 1200x800px minimum, relevant to EPA compliance/construction

---

## Photos Needed (Priority Order)

### High Priority - Enhance Existing Articles

**Article 1: EPA Audit Notice (30 Days)**
1. **Hero Image**: Construction site with visible waste bins/dumpsters
   - Keywords: `construction waste bins`, `construction site dumpster`, `construction debris bins`
   - Mood: Professional, organized, compliance-focused

2. **Inline Image**: EPA inspector or compliance check
   - Keywords: `safety inspector construction`, `compliance inspection`, `construction site inspection`
   - Mood: Official, professional, clipboard/checklist visible

3. **Inline Image**: Waste manifest or documentation
   - Keywords: `paperwork construction`, `business documents`, `compliance forms`
   - Mood: Organized, professional desk/clipboard setup

**Article 2: Reconstruct Waste Disposal Records**
1. **Hero Image**: Construction debris/waste piles
   - Keywords: `construction debris`, `demolition waste`, `construction cleanup`
   - Mood: Realistic construction site (not glamorized)

2. **Inline Image**: Waste hauler truck loading waste
   - Keywords: `waste truck construction`, `dump truck construction`, `hauler truck`
   - Mood: Action shot, waste being loaded

3. **Inline Image**: Organized filing/documentation
   - Keywords: `organized files`, `filing cabinet`, `document organization`
   - Mood: Professional, neat, compliance-ready

### Medium Priority - New Articles

**Article 3: EPA Fines Calculator**
1. **Hero Image**: Construction site with potential violations
   - Keywords: `construction site waste`, `construction cleanup needed`

2. **Inline Image**: Calculator or financial concept
   - Keywords: `calculator business`, `financial planning`

**Article 4: Waste Manifest Template**
1. **Hero Image**: Blank forms or templates
   - Keywords: `blank forms`, `business forms`, `documentation template`

2. **Inline Image**: Filled manifest example
   - Keywords: `completed paperwork`, `signed documents`

---

## Sourcing Procedure (Step-by-Step)

### Step 1: Search Unsplash
1. Go to: https://unsplash.com
2. Search using keywords above
3. Filter by orientation (Landscape preferred for hero images)
4. Look for: High resolution, clear subject, professional composition

### Step 2: Verify License
1. Click photo to open detail page
2. Scroll to bottom - verify "Unsplash License" badge
3. Check "Free to use" confirmation
4. Note photographer name and username

### Step 3: Download Photo
1. Click "Download free" button (Original size)
2. Rename file descriptively: `construction-waste-bins-hero.jpg`
3. Save to: `/home/rain/code/lexopoly-site/blog/images/`

### Step 4: Document in PHOTO_CREDITS.md
```markdown
## construction-waste-bins-hero.jpg
- **Source**: Unsplash
- **Photographer**: [Name from Unsplash page] (@username)
- **License**: Unsplash License (CC0-equivalent)
- **Downloaded**: 2025-10-15
- **Used In**: EPA Audit Notice article (hero image)
- **Source URL**: [Copy from browser address bar]
- **Notes**: Original resolution, no modifications
```

### Step 5: Optimize for Web (Optional)
If photo is >500KB:
```bash
cd /home/rain/code/lexopoly-site/blog/images/
# Resize to 1200px width (maintains aspect ratio)
convert construction-waste-bins-hero.jpg -resize 1200x construction-waste-bins-hero.jpg
```

---

## Photo Quality Checklist

Before downloading, verify:
- [ ] Photo clearly shows relevant subject (waste bins, construction site, etc.)
- [ ] Professional quality (good lighting, composition, focus)
- [ ] No visible branding/logos that date the photo
- [ ] Landscape orientation for hero images
- [ ] Resolution at least 1200x800px
- [ ] Unsplash License badge visible on page
- [ ] Photographer name clearly shown

---

## Batch Download Template

For efficiency, download all 6-8 photos in one session:

**EPA Audit Article**:
1. Construction site waste bins (hero)
2. Inspector/compliance check
3. Paperwork/manifest docs

**Reconstruct Waste Article**:
4. Construction debris piles (hero)
5. Waste hauler truck
6. Organized filing system

**EPA Fines Article** (if time):
7. Construction site overview
8. Calculator/financial concept

---

## Integration Ready Checklist

After downloading and documenting photos:
- [ ] All 6-8 photos saved to `/blog/images/`
- [ ] All photos documented in `PHOTO_CREDITS.md`
- [ ] File names are descriptive (no generic IMG_1234.jpg)
- [ ] Photos optimized to <300KB each (if needed)
- [ ] Ready to integrate into HTML articles

---

## Estimated Timeline

- Searching & selecting: 15-20 minutes (6-8 photos)
- Downloading & renaming: 5-10 minutes
- Documentation in PHOTO_CREDITS.md: 10-15 minutes
- Optional optimization: 5-10 minutes

**Total**: 35-55 minutes for complete photo sourcing

---

## Alternative: Pexels

If Unsplash doesn't have ideal photos, try Pexels:
1. Go to: https://www.pexels.com
2. Search same keywords
3. Same process: verify "Free to use" license
4. Download and document identically

---

**Next Step**: Once photos are downloaded and documented, CC-WEB will integrate them into article HTML with proper alt text, lazy loading, and attribution footers.
