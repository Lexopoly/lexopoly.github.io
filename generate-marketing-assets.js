const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs').promises;

// Marketing screenshot automation for Clio submission + general marketing
async function generateMarketingAssets() {
  console.log('🚀 Starting automated marketing asset generation...');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2, // High DPI for crisp screenshots
  });

  const page = await context.newPage();

  // Create output directories
  await fs.mkdir('clio-submission/screenshots', { recursive: true });
  await fs.mkdir('marketing-assets/screenshots', { recursive: true });

  const scenarios = [
    {
      name: 'homepage-hero',
      description: 'Homepage hero section showing main value proposition',
      url: 'http://localhost:8080',
      actions: async (page) => {
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000); // Let animations complete
      },
      crop: { x: 0, y: 0, width: 1920, height: 800 } // Hero section only
    },

    {
      name: 'homepage-features',
      description: 'Feature comparison showing competitive advantages',
      url: 'http://localhost:8080',
      actions: async (page) => {
        await page.waitForLoadState('networkidle');
        await page.evaluate(() => {
          document.querySelector('.features')?.scrollIntoView();
        });
        await page.waitForTimeout(1000);
      }
    },

    {
      name: 'lawyers-landing',
      description: 'Lawyers landing page showing legal-specific messaging',
      url: 'http://localhost:8080/lawyers/',
      actions: async (page) => {
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
      }
    },

    {
      name: 'clio-integration-demo',
      description: 'Clio integration demonstration (simulated)',
      url: 'http://localhost:8080/demo/',
      actions: async (page) => {
        await page.waitForLoadState('networkidle');

        // Simulate OAuth flow demonstration
        if (await page.locator('.oauth-demo').isVisible()) {
          await page.locator('.oauth-demo button').click();
          await page.waitForTimeout(1000);
        }

        // Simulate matter selection
        if (await page.locator('.matter-selector').isVisible()) {
          await page.locator('.matter-selector select').selectOption('Test Matter #1');
          await page.waitForTimeout(500);
        }
      }
    },

    {
      name: 'mobile-responsive',
      description: 'Mobile-responsive design demonstration',
      url: 'http://localhost:8080',
      viewport: { width: 375, height: 812 },
      actions: async (page) => {
        await page.waitForLoadState('networkidle');

        // Test mobile navigation
        if (await page.locator('.mobile-menu-toggle').isVisible()) {
          await page.locator('.mobile-menu-toggle').click();
          await page.waitForTimeout(500);
        }

        await page.waitForTimeout(1000);
      }
    },

    {
      name: 'professional-interface',
      description: 'Professional interface showing enterprise-grade design',
      url: 'http://localhost:8080',
      actions: async (page) => {
        await page.waitForLoadState('networkidle');

        // Highlight professional elements
        await page.addStyleTag({
          content: `
            .professional-highlight {
              box-shadow: 0 0 0 3px #2563eb !important;
              border-radius: 8px !important;
            }
          `
        });

        await page.evaluate(() => {
          // Highlight key professional elements
          document.querySelector('.navigation')?.classList.add('professional-highlight');
        });

        await page.waitForTimeout(1000);
      }
    }
  ];

  console.log(`📸 Generating ${scenarios.length} marketing screenshots...`);

  for (const scenario of scenarios) {
    try {
      console.log(`  → Capturing: ${scenario.name}`);

      // Set viewport if specified
      if (scenario.viewport) {
        await page.setViewportSize(scenario.viewport);
      } else {
        await page.setViewportSize({ width: 1920, height: 1080 });
      }

      // Navigate to URL
      await page.goto(scenario.url);

      // Execute scenario-specific actions
      await scenario.actions(page);

      // Capture screenshot
      const screenshotOptions = {
        path: `clio-submission/screenshots/${scenario.name}.png`,
        fullPage: !scenario.crop
      };

      if (scenario.crop) {
        screenshotOptions.clip = scenario.crop;
        screenshotOptions.fullPage = false;
      }

      await page.screenshot(screenshotOptions);

      // Also save to marketing assets
      const marketingOptions = { ...screenshotOptions };
      marketingOptions.path = `marketing-assets/screenshots/${scenario.name}.png`;
      await page.screenshot(marketingOptions);

      console.log(`    ✅ Saved: ${scenario.name}.png`);

    } catch (error) {
      console.error(`    ❌ Error capturing ${scenario.name}:`, error.message);
    }
  }

  // Generate screenshot index
  await generateScreenshotIndex(scenarios);

  await browser.close();
  console.log('✅ Marketing asset generation complete!');
}

async function generateScreenshotIndex(scenarios) {
  const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LocalTranscribe Marketing Assets</title>
    <style>
        body { font-family: system-ui, sans-serif; margin: 40px; background: #f8fafc; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 40px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 30px; }
        .asset { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .asset img { width: 100%; border-radius: 8px; border: 1px solid #e2e8f0; }
        .asset h3 { margin: 15px 0 10px 0; color: #1e40af; }
        .asset p { color: #64748b; margin: 0; }
        .stats { background: #1e40af; color: white; padding: 20px; border-radius: 12px; margin-bottom: 40px; }
        .stats h2 { margin: 0 0 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>LocalTranscribe Marketing Assets</h1>
            <p>Professional screenshots for Clio submission and marketing materials</p>
        </div>

        <div class="stats">
            <h2>📊 Generation Complete</h2>
            <p><strong>${scenarios.length}</strong> professional screenshots generated automatically</p>
            <p><strong>Quality:</strong> 1920x1080, High DPI, Professional framing</p>
            <p><strong>Usage:</strong> Clio marketplace submission + ongoing marketing</p>
        </div>

        <div class="grid">
            ${scenarios.map(scenario => `
                <div class="asset">
                    <img src="screenshots/${scenario.name}.png" alt="${scenario.description}">
                    <h3>${scenario.name.replace(/-/g, ' ').toUpperCase()}</h3>
                    <p>${scenario.description}</p>
                </div>
            `).join('')}
        </div>

        <div style="margin-top: 40px; padding: 20px; background: #f1f5f9; border-radius: 8px; text-align: center;">
            <p><strong>🤖 Generated automatically</strong> using Playwright browser automation</p>
            <p>Consistent quality, professional framing, ready for Clio marketplace submission</p>
        </div>
    </div>
</body>
</html>`;

  await fs.writeFile('clio-submission/screenshot-gallery.html', indexHtml);
  await fs.writeFile('marketing-assets/screenshot-gallery.html', indexHtml);
  console.log('📋 Screenshot gallery created');
}

// Run if called directly
if (require.main === module) {
  generateMarketingAssets().catch(console.error);
}

module.exports = { generateMarketingAssets };