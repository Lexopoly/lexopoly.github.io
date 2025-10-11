# GitHub Pages Deployment

This directory contains the static website for Lexopoly · RevenueRescue, ready for GitHub Pages deployment.

## Files

- `index.html` - Landing page with product overview
- `CNAME` - Custom domain configuration (www.lexopoly.com)
- `README.md` - This file

## Deployment Steps

### Option 1: Deploy from `_site` directory

1. Push this directory to your repository
2. Go to Settings → Pages in your GitHub repository
3. Under "Source", select "Deploy from a branch"
4. Choose your branch (e.g., `main` or `master`)
5. Set folder to `/_site`
6. Click Save

### Option 2: Deploy as separate GitHub Pages branch

```bash
# Create orphan gh-pages branch
git checkout --orphan gh-pages

# Remove all files from tracking
git rm -rf .

# Copy site files
cp -r _site/* .
cp _site/CNAME .

# Commit and push
git add .
git commit -m "Deploy GitHub Pages site"
git push origin gh-pages

# Return to main branch
git checkout main
```

Then in GitHub:
1. Go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: gh-pages
4. Folder: / (root)
5. Save

### Option 3: GitHub Actions Deployment

Create `.github/workflows/deploy-pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
    paths:
      - '_site/**'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '_site'
      - uses: actions/deploy-pages@v4
```

## Custom Domain Setup

The CNAME file is configured for `www.lexopoly.com`. To activate:

1. In your domain registrar, add a CNAME record:
   - Name: `www`
   - Value: `[your-github-username].github.io`

2. Optionally, add A records for apex domain:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

3. In GitHub Pages settings, once DNS propagates:
   - Custom domain will show as verified
   - Enable "Enforce HTTPS"

## Verification

After deployment, your site will be available at:
- `https://[your-github-username].github.io/lexopoly/` (default)
- `https://www.lexopoly.com` (once DNS is configured)

## Local Preview

To preview the site locally:

```bash
cd _site
python3 -m http.server 8000
# Visit http://localhost:8000
```

Or with Node.js:
```bash
npx serve _site
```

## Source Files

This site was generated from marketing copy in:
- `/README.md` - Main product description and features
- `/docs/WEBSITE-PAGES/revenue-rescue.md` - Detailed product information
- `/docs/PRESS-KIT/product-boilerplate.md` - Marketing language and key points

---

Generated on: 2025-08-20