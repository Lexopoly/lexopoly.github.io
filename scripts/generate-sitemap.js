#!/usr/bin/env node

/**
 * Automated Sitemap Generator for Lexopoly.com
 *
 * Scans all HTML files in the site directory and generates a valid sitemap.xml
 * with accurate lastmod dates, appropriate changefreq, and priority values.
 *
 * Usage: node scripts/generate-sitemap.js
 * Or via npm: npm run generate-sitemap
 */

const fs = require('fs');
const path = require('path');

const SITE_ROOT = path.join(__dirname, '..');
const SITEMAP_PATH = path.join(SITE_ROOT, 'sitemap.xml');
const BASE_URL = 'https://lexopoly.com';

// Directories and files to exclude from sitemap
const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /marketing-assets/,
  /clio-submission/,
  /production/,
  /dashboard/,
  /visual-gallery\.html/,
  /nav-template-design\.html/,
  /analytics-snippet\.html/,
  /seo-snippet\.html/,
  /screenshot-gallery\.html/,
  /app-screenshot-gallery\.html/,
  /index\.construction/,
  /index\.full-site-backup/,
  /index\.full-backup/,
  /404\.html/
];

/**
 * Recursively find all HTML files in a directory
 */
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    // Skip excluded patterns
    const relativePath = path.relative(SITE_ROOT, filePath);
    if (EXCLUDE_PATTERNS.some(pattern => pattern.test(relativePath))) {
      return;
    }

    if (stat.isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (file === 'index.html' || file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Convert file path to URL
 */
function filePathToUrl(filePath) {
  let url = path.relative(SITE_ROOT, filePath);

  // Convert backslashes to forward slashes (Windows compatibility)
  url = url.replace(/\\/g, '/');

  // Remove index.html from end
  url = url.replace(/index\.html$/, '');

  // Remove .html extension for non-index files
  url = url.replace(/\.html$/, '/');

  // Ensure leading slash
  if (!url.startsWith('/')) {
    url = '/' + url;
  }

  // Ensure trailing slash for directories
  if (!url.endsWith('/')) {
    url += '/';
  }

  return BASE_URL + url;
}

/**
 * Get last modification date in YYYY-MM-DD format
 */
function getLastModDate(filePath) {
  const stat = fs.statSync(filePath);
  const date = stat.mtime;
  return date.toISOString().split('T')[0];
}

/**
 * Determine changefreq based on URL pattern
 */
function getChangeFreq(url) {
  if (url === BASE_URL + '/') return 'weekly'; // Homepage
  if (url.includes('/pricing/')) return 'weekly'; // Pricing
  if (url.includes('/blog/')) return 'monthly'; // Blog articles
  if (url.includes('/localtranscribe/') || url.includes('/quotecreator/') || url.includes('/compliancelogger/')) {
    return 'monthly'; // Product pages
  }
  if (url.includes('/privacy/') || url.includes('/terms/')) return 'yearly'; // Legal pages
  return 'monthly'; // Default
}

/**
 * Determine priority based on URL pattern
 */
function getPriority(url) {
  if (url === BASE_URL + '/') return '1.0'; // Homepage
  if (url.includes('/buy/')) return '0.9'; // Buy page
  if (url.includes('/localtranscribe/') && url === BASE_URL + '/localtranscribe/') return '0.9'; // LT product page
  if (url.includes('/quotecreator/') && url === BASE_URL + '/quotecreator/') return '0.8'; // QC product page
  if (url.includes('/compliancelogger/') && url === BASE_URL + '/compliancelogger/') return '0.9'; // CL product page
  if (url.includes('/pricing/')) return '0.8'; // Pricing
  if (url.includes('/blog/') && !url.match(/\/blog\/(quotecreator|localtranscribe|compliancelogger)\/$/)) {
    return '0.8'; // Blog articles (SEO value)
  }
  if (url.includes('/blog/quotecreator/') || url.includes('/blog/localtranscribe/') || url.includes('/blog/compliancelogger/')) {
    return '0.7'; // Product blog index pages
  }
  if (url.includes('/blog/') && url.match(/\/blog\/(quotecreator|localtranscribe|compliancelogger)\/$/)) {
    return '0.7'; // Product blog indexes
  }
  if (url.includes('/demo/')) return '0.8'; // Demo
  if (url.includes('/lawyers/') || url.includes('/journalists/') || url.includes('/court-reporters/')) {
    return '0.8'; // Industry pages
  }
  if (url.includes('/dictation/') || url.includes('/government/') || url.includes('/education/')) {
    return '0.7'; // Secondary industry pages
  }
  if (url.includes('/support/')) return '0.6'; // Support
  if (url.includes('/about/') || url.includes('/contact/')) return '0.5'; // About/Contact
  if (url.includes('/privacy/') || url.includes('/terms/') || url.includes('/data-deletion/')) {
    return '0.3'; // Legal pages (lowest priority)
  }
  if (url.includes('/setup/')) return '0.6'; // Setup pages
  return '0.5'; // Default
}

/**
 * Generate sitemap XML
 */
function generateSitemap() {
  console.log('🔍 Scanning for HTML files...');
  const htmlFiles = findHtmlFiles(SITE_ROOT);
  console.log(`   Found ${htmlFiles.length} HTML files`);

  console.log('\n📝 Generating sitemap entries...');
  const urls = htmlFiles.map(filePath => {
    const url = filePathToUrl(filePath);
    const lastmod = getLastModDate(filePath);
    const changefreq = getChangeFreq(url);
    const priority = getPriority(url);

    return { url, lastmod, changefreq, priority };
  });

  // Sort by priority (descending), then URL (ascending)
  urls.sort((a, b) => {
    if (b.priority !== a.priority) {
      return parseFloat(b.priority) - parseFloat(a.priority);
    }
    return a.url.localeCompare(b.url);
  });

  console.log('   Generated', urls.length, 'sitemap entries');

  console.log('\n✏️  Writing sitemap.xml...');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastmod, changefreq, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

  fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
  console.log(`   ✅ Sitemap written to ${SITEMAP_PATH}`);

  console.log('\n📊 Summary:');
  console.log(`   Total URLs: ${urls.length}`);
  console.log(`   Homepage: ${urls.filter(u => u.url === BASE_URL + '/').length}`);
  console.log(`   Product pages: ${urls.filter(u => u.url.match(/\/(localtranscribe|quotecreator|compliancelogger)\/$/)).length}`);
  console.log(`   Blog articles: ${urls.filter(u => u.url.includes('/blog/') && !u.url.match(/\/blog\/(quotecreator|localtranscribe|compliancelogger)?\/?$/)).length}`);
  console.log(`   Industry pages: ${urls.filter(u => u.url.match(/\/(lawyers|journalists|court-reporters|dictation|government|education)\/$/)).length}`);
  console.log(`   Utility pages: ${urls.filter(u => u.url.match(/\/(pricing|demo|about|support|contact|privacy|terms)\/$/)).length}`);

  console.log('\n🎉 Sitemap generation complete!\n');
  console.log('Next steps:');
  console.log('1. Review sitemap.xml for accuracy');
  console.log('2. Commit changes: git add sitemap.xml && git commit -m "chore: Update sitemap"');
  console.log('3. Push to GitHub: git push');
  console.log('4. Submit to Google Search Console: https://search.google.com/search-console\n');
}

// Run generator
try {
  generateSitemap();
  process.exit(0);
} catch (error) {
  console.error('❌ Error generating sitemap:', error.message);
  process.exit(1);
}
