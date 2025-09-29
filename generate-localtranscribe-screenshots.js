const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs').promises;

// LocalTranscribe application screenshot automation for Clio submission
async function generateLocalTranscribeScreenshots() {
  console.log('🚀 Starting LocalTranscribe application screenshot generation...');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2, // High DPI for professional quality
  });

  const page = await context.newPage();

  // Create output directories
  await fs.mkdir('clio-submission/app-screenshots', { recursive: true });

  // LocalTranscribe application interface scenarios
  const appScenarios = [
    {
      name: 'dashboard-overview',
      description: 'LocalTranscribe dashboard showing main interface and navigation',
      url: 'http://localhost:3003',
      actions: async (page) => {
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000); // Allow app to fully load
      }
    },

    {
      name: 'upload-interface',
      description: 'File upload interface showing supported formats and drag-drop',
      url: 'http://localhost:3003',
      actions: async (page) => {
        await page.waitForLoadState('networkidle');

        // Navigate to upload section if it exists
        const uploadButton = page.locator('button:has-text("Upload")').first();
        const uploadLink = page.locator('a:has-text("Upload")').first();

        if (await uploadButton.isVisible()) {
          await uploadButton.click();
          await page.waitForTimeout(1000);
        } else if (await uploadLink.isVisible()) {
          await uploadLink.click();
          await page.waitForTimeout(1000);
        }

        await page.waitForTimeout(2000);
      }
    },

    {
      name: 'transcription-progress',
      description: 'Transcription in progress showing processing status and estimated time',
      url: 'http://localhost:3003',
      actions: async (page) => {
        await page.waitForLoadState('networkidle');

        // Look for transcription/processing section
        const processingLink = page.locator('a:has-text("Transcriptions")').first();
        const processingButton = page.locator('button:has-text("Process")').first();

        if (await processingLink.isVisible()) {
          await processingLink.click();
          await page.waitForTimeout(1000);
        } else if (await processingButton.isVisible()) {
          await processingButton.click();
          await page.waitForTimeout(1000);
        }

        await page.waitForTimeout(2000);
      }
    },

    {
      name: 'transcript-editor',
      description: 'Transcript editing interface with quality review tools',
      url: 'http://localhost:3003',
      actions: async (page) => {
        await page.waitForLoadState('networkidle');

        // Look for editor or results section
        const editorLink = page.locator('a:has-text("Edit"), a:has-text("Editor"), a:has-text("Review")').first();
        const transcriptLink = page.locator('a:has-text("Transcript")').first();

        if (await editorLink.isVisible()) {
          await editorLink.click();
          await page.waitForTimeout(1000);
        } else if (await transcriptLink.isVisible()) {
          await transcriptLink.click();
          await page.waitForTimeout(1000);
        }

        await page.waitForTimeout(2000);
      }
    },

    {
      name: 'export-options',
      description: 'Export interface showing PDF, Word, and text format options',
      url: 'http://localhost:3003',
      actions: async (page) => {
        await page.waitForLoadState('networkidle');

        // Look for export functionality
        const exportButton = page.locator('button:has-text("Export")').first();
        const downloadButton = page.locator('button:has-text("Download")').first();

        if (await exportButton.isVisible()) {
          await exportButton.click();
          await page.waitForTimeout(1000);
        } else if (await downloadButton.isVisible()) {
          await downloadButton.click();
          await page.waitForTimeout(1000);
        }

        await page.waitForTimeout(2000);
      }
    },

    {
      name: 'clio-integration',
      description: 'Clio integration interface showing matter selection and posting',
      url: 'http://localhost:3003',
      actions: async (page) => {
        await page.waitForLoadState('networkidle');

        // Look for Clio integration section
        const clioButton = page.locator('button:has-text("Clio")').first();
        const integrationsLink = page.locator('a:has-text("Integration"), a:has-text("Clio")').first();

        if (await clioButton.isVisible()) {
          await clioButton.click();
          await page.waitForTimeout(1000);
        } else if (await integrationsLink.isVisible()) {
          await integrationsLink.click();
          await page.waitForTimeout(1000);
        }

        await page.waitForTimeout(2000);
      }
    }
  ];

  console.log(`📸 Generating ${appScenarios.length} LocalTranscribe application screenshots...`);

  for (const scenario of appScenarios) {
    try {
      console.log(`  → Capturing: ${scenario.name}`);

      // Navigate to URL
      await page.goto(scenario.url, { waitUntil: 'networkidle' });

      // Execute scenario-specific actions
      await scenario.actions(page);

      // Capture screenshot
      const screenshotPath = `clio-submission/app-screenshots/${scenario.name}.png`;

      await page.screenshot({
        path: screenshotPath,
        fullPage: true,
        animations: 'disabled' // Ensure consistent screenshots
      });

      console.log(`    ✅ Saved: ${scenario.name}.png`);

    } catch (error) {
      console.error(`    ❌ Error capturing ${scenario.name}:`, error.message);

      // Capture fallback screenshot of current state
      try {
        await page.screenshot({
          path: `clio-submission/app-screenshots/${scenario.name}-fallback.png`,
          fullPage: true
        });
        console.log(`    📷 Fallback screenshot saved for ${scenario.name}`);
      } catch (fallbackError) {
        console.error(`    ❌ Fallback also failed for ${scenario.name}`);
      }
    }
  }

  // Generate application screenshot documentation
  await generateAppScreenshotDocs(appScenarios);

  await browser.close();
  console.log('✅ LocalTranscribe application screenshot generation complete!');
}

async function generateAppScreenshotDocs(scenarios) {
  const docsHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LocalTranscribe Application Screenshots</title>
    <style>
        body { font-family: system-ui, sans-serif; margin: 40px; background: #f8fafc; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 40px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(500px, 1fr)); gap: 30px; }
        .screenshot { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .screenshot img { width: 100%; border-radius: 8px; border: 1px solid #e2e8f0; }
        .screenshot h3 { margin: 15px 0 10px 0; color: #1e40af; }
        .screenshot p { color: #64748b; margin: 0; }
        .clio-note { background: #1e40af; color: white; padding: 20px; border-radius: 12px; margin-bottom: 40px; }
        .clio-note h2 { margin: 0 0 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>LocalTranscribe Application Screenshots</h1>
            <p>Professional interface captures for Clio marketplace submission</p>
        </div>

        <div class="clio-note">
            <h2>📱 Application Interface Documentation</h2>
            <p><strong>Target:</strong> LocalTranscribe portal application (localhost:3003)</p>
            <p><strong>Quality:</strong> 1920x1080, High DPI, Full-page captures</p>
            <p><strong>Purpose:</strong> Clio API Partners program submission</p>
            <p><strong>Coverage:</strong> Upload → Process → Review → Export → Integrate workflow</p>
        </div>

        <div class="grid">
            ${scenarios.map(scenario => `
                <div class="screenshot">
                    <img src="app-screenshots/${scenario.name}.png" alt="${scenario.description}">
                    <h3>${scenario.name.replace(/-/g, ' ').toUpperCase()}</h3>
                    <p>${scenario.description}</p>
                </div>
            `).join('')}
        </div>

        <div style="margin-top: 40px; padding: 20px; background: #f1f5f9; border-radius: 8px; text-align: center;">
            <p><strong>🎯 Corrected Target:</strong> LocalTranscribe application interface (not marketing website)</p>
            <p>Professional quality screenshots ready for Clio submission and demo video creation</p>
        </div>
    </div>
</body>
</html>`;

  await fs.writeFile('clio-submission/app-screenshot-gallery.html', docsHtml);
  console.log('📋 Application screenshot gallery created');
}

// Run if called directly
if (require.main === module) {
  generateLocalTranscribeScreenshots().catch(console.error);
}

module.exports = { generateLocalTranscribeScreenshots };