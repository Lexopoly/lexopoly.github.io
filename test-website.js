const { chromium, firefox, webkit } = require('playwright');
const fs = require('fs');
const path = require('path');

// Test configuration
const config = {
  baseUrl: 'https://www.lexopoly.com',
  outputDir: './screenshots',
  browsers: ['chromium'], // Start with Chrome, can add firefox, webkit later
  viewports: [
    { name: 'desktop', width: 1920, height: 1080 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 667 }
  ],
  pages: [
    { name: 'homepage', url: '/' },
    { name: 'lawyers', url: '/lawyers/' },
    { name: 'journalists', url: '/journalists/' },
    { name: 'pricing', url: '/pricing/' },
    { name: 'demo', url: '/demo/' },
    { name: 'signup', url: '/signup/' },
    { name: 'about', url: '/about/' }
  ]
};

async function createOutputDir() {
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }
}

async function captureScreenshots() {
  await createOutputDir();

  console.log('🎭 Starting Playwright website testing...\n');

  for (const browserName of config.browsers) {
    console.log(`📋 Testing with ${browserName}...`);

    const browser = await chromium.launch({ headless: true });

    for (const viewport of config.viewports) {
      console.log(`  📱 ${viewport.name} (${viewport.width}x${viewport.height})`);

      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        userAgent: viewport.name === 'mobile'
          ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15'
          : undefined
      });

      const page = await context.newPage();

      for (const pageConfig of config.pages) {
        console.log(`    📸 Capturing ${pageConfig.name}...`);

        try {
          // Navigate to page
          await page.goto(`${config.baseUrl}${pageConfig.url}`, {
            waitUntil: 'networkidle',
            timeout: 30000
          });

          // Wait for any animations to complete
          await page.waitForTimeout(2000);

          // Take full page screenshot
          const filename = `${pageConfig.name}-${viewport.name}-${browserName}.png`;
          const filepath = path.join(config.outputDir, filename);

          await page.screenshot({
            path: filepath,
            fullPage: true
          });

          console.log(`    ✅ Saved: ${filename}`);

        } catch (error) {
          console.log(`    ❌ Failed ${pageConfig.name}: ${error.message}`);
        }
      }

      await context.close();
    }

    await browser.close();
  }
}

async function testUserFlows() {
  console.log('\n🔍 Testing user flows...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  // Test 1: Homepage to Demo flow
  console.log('📋 Testing: Homepage → Demo flow');
  try {
    await page.goto(`${config.baseUrl}/`);
    await page.waitForLoadState('networkidle');

    // Click primary CTA
    await page.click('a[href="/demo/"]:first-of-type');
    await page.waitForLoadState('networkidle');

    const url = page.url();
    if (url.includes('/demo/')) {
      console.log('  ✅ Demo CTA navigation works');
    } else {
      console.log(`  ❌ Demo CTA failed - landed on: ${url}`);
    }

    // Take screenshot of demo page
    await page.screenshot({
      path: path.join(config.outputDir, 'flow-demo-page.png'),
      fullPage: true
    });

  } catch (error) {
    console.log(`  ❌ Demo flow error: ${error.message}`);
  }

  // Test 2: Demo to Signup flow
  console.log('📋 Testing: Demo → Signup flow');
  try {
    // Click signup button on demo page
    await page.click('a[href="/signup/"]');
    await page.waitForLoadState('networkidle');

    const url = page.url();
    if (url.includes('/signup/')) {
      console.log('  ✅ Signup navigation works');
    } else {
      console.log(`  ❌ Signup navigation failed - landed on: ${url}`);
    }

    // Take screenshot of signup page
    await page.screenshot({
      path: path.join(config.outputDir, 'flow-signup-page.png'),
      fullPage: true
    });

  } catch (error) {
    console.log(`  ❌ Signup flow error: ${error.message}`);
  }

  // Test 3: Navigation menu
  console.log('📋 Testing: Navigation menu');
  try {
    await page.goto(`${config.baseUrl}/`);
    await page.waitForLoadState('networkidle');

    // Test vertical navigation links
    const verticals = ['lawyers', 'journalists', 'pricing'];

    for (const vertical of verticals) {
      await page.click(`a[href="/${vertical}/"]`);
      await page.waitForLoadState('networkidle');

      const url = page.url();
      if (url.includes(`/${vertical}/`)) {
        console.log(`  ✅ ${vertical} navigation works`);
      } else {
        console.log(`  ❌ ${vertical} navigation failed`);
      }

      // Go back to homepage
      await page.goto(`${config.baseUrl}/`);
      await page.waitForLoadState('networkidle');
    }

  } catch (error) {
    console.log(`  ❌ Navigation test error: ${error.message}`);
  }

  await context.close();
  await browser.close();
}

async function checkPerformance() {
  console.log('\n⚡ Performance testing...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const pageConfig of config.pages) {
    console.log(`📊 Testing ${pageConfig.name} performance...`);

    try {
      const startTime = Date.now();

      await page.goto(`${config.baseUrl}${pageConfig.url}`, {
        waitUntil: 'networkidle'
      });

      const loadTime = Date.now() - startTime;

      // Check for console errors
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      console.log(`  ⏱️  Load time: ${loadTime}ms`);

      if (loadTime > 3000) {
        console.log(`  ⚠️  Slow load time (>${loadTime}ms)`);
      } else {
        console.log(`  ✅ Good load time`);
      }

      if (errors.length > 0) {
        console.log(`  ❌ Console errors: ${errors.length}`);
        errors.forEach(error => console.log(`    - ${error}`));
      }

    } catch (error) {
      console.log(`  ❌ Performance test failed: ${error.message}`);
    }
  }

  await context.close();
  await browser.close();
}

async function generateReport() {
  console.log('\n📋 Generating test report...\n');

  const screenshotFiles = fs.readdirSync(config.outputDir)
    .filter(file => file.endsWith('.png'))
    .sort();

  const report = `# LocalTranscribe Website Test Report
Generated: ${new Date().toISOString()}

## Screenshots Captured
${screenshotFiles.map(file => `- ${file}`).join('\n')}

## Test Summary
- Total pages tested: ${config.pages.length}
- Viewports tested: ${config.viewports.length}
- Screenshots captured: ${screenshotFiles.length}

## Recommendations
1. Review mobile layout screenshots for responsiveness
2. Check demo page placeholder content
3. Verify pricing consistency across pages
4. Test form submissions manually

## Next Steps
1. Review all screenshots in ${config.outputDir}/
2. Test actual form submissions
3. Verify all CTAs lead to correct destinations
4. Check for emoji rendering consistency
`;

  fs.writeFileSync(path.join(config.outputDir, 'test-report.md'), report);
  console.log('📝 Test report saved to screenshots/test-report.md');
}

// Main execution
async function runTests() {
  try {
    await captureScreenshots();
    await testUserFlows();
    await checkPerformance();
    await generateReport();

    console.log('\n🎉 All tests completed successfully!');
    console.log(`📁 Results saved to: ${config.outputDir}/`);

  } catch (error) {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runTests();
}

module.exports = { runTests, config };