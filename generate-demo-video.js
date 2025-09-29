const { chromium } = require('playwright');
const fs = require('fs').promises;

// Automated demo video generation for Clio API Partners submission
async function generateDemoVideo() {
  console.log('🎬 Starting automated demo video generation...');

  const browser = await chromium.launch({
    headless: false, // Show browser for screen recording
    args: ['--enable-web-security=false', '--allow-running-insecure-content']
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: 'clio-submission/video-segments/',
      size: { width: 1920, height: 1080 }
    }
  });

  // Create output directories
  await fs.mkdir('clio-submission/video-segments', { recursive: true });

  console.log('🎥 Recording demo segments...');

  // Demo script segments from our comprehensive script
  const demoSegments = [
    {
      name: 'company-introduction',
      duration: 45,
      description: 'Company introduction and privacy-first positioning',
      script: async (page) => {
        console.log('  → Recording: Company Introduction');

        await page.goto('http://localhost:8080');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Highlight company branding and positioning
        await page.addStyleTag({
          content: `
            .highlight {
              animation: glow 2s ease-in-out infinite alternate;
              box-shadow: 0 0 20px #2563eb !important;
            }
            @keyframes glow {
              from { box-shadow: 0 0 20px #2563eb; }
              to { box-shadow: 0 0 30px #60a5fa; }
            }
          `
        });

        // Highlight key elements during introduction
        await page.evaluate(() => {
          document.querySelector('.hero h1')?.classList.add('highlight');
        });
        await page.waitForTimeout(3000);

        // Show privacy-first messaging
        await page.evaluate(() => {
          document.querySelector('.privacy-first')?.scrollIntoView();
        });
        await page.waitForTimeout(3000);

        // Show professional testimonials/credentials
        await page.evaluate(() => {
          document.querySelector('.testimonials')?.scrollIntoView();
        });
        await page.waitForTimeout(2000);
      }
    },

    {
      name: 'customer-profile',
      duration: 45,
      description: 'Legal customer profile and use cases',
      script: async (page) => {
        console.log('  → Recording: Customer Profile');

        await page.goto('http://localhost:8080/lawyers/');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Show legal professional focus
        await page.evaluate(() => {
          document.querySelector('.legal-professionals')?.scrollIntoView();
        });
        await page.waitForTimeout(4000);

        // Highlight attorney-client privilege protection
        await page.addStyleTag({
          content: `
            .privilege-highlight {
              background: rgba(37, 99, 235, 0.1) !important;
              border: 2px solid #2563eb !important;
              border-radius: 8px !important;
              padding: 10px !important;
            }
          `
        });

        await page.evaluate(() => {
          document.querySelector('.privilege-protection')?.classList.add('privilege-highlight');
        });
        await page.waitForTimeout(3000);

        // Show different customer types
        await page.evaluate(() => {
          document.querySelector('.customer-types')?.scrollIntoView();
        });
        await page.waitForTimeout(3000);
      }
    },

    {
      name: 'problem-solution',
      duration: 60,
      description: 'Problem statement and LocalTranscribe solution',
      script: async (page) => {
        console.log('  → Recording: Problem & Solution');

        await page.goto('http://localhost:8080');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Show comparison with competitors
        await page.evaluate(() => {
          document.querySelector('.competitor-comparison')?.scrollIntoView();
        });
        await page.waitForTimeout(5000);

        // Highlight local processing advantage
        await page.addStyleTag({
          content: `
            .local-processing {
              background: linear-gradient(90deg, #10b981, #059669) !important;
              color: white !important;
              padding: 15px !important;
              border-radius: 8px !important;
              font-weight: bold !important;
            }
            .cloud-processing {
              background: linear-gradient(90deg, #ef4444, #dc2626) !important;
              color: white !important;
              padding: 15px !important;
              border-radius: 8px !important;
              font-weight: bold !important;
            }
          `
        });

        await page.evaluate(() => {
          const local = document.querySelector('.local-advantage');
          const cloud = document.querySelector('.cloud-risk');

          local?.classList.add('local-processing');
          cloud?.classList.add('cloud-processing');
        });

        await page.waitForTimeout(4000);

        // Show speed metrics (28x faster)
        await page.evaluate(() => {
          document.querySelector('.speed-metrics')?.scrollIntoView();
        });
        await page.waitForTimeout(3000);
      }
    },

    {
      name: 'clio-integration-demo',
      duration: 120,
      description: 'Complete Clio integration demonstration',
      script: async (page) => {
        console.log('  → Recording: Clio Integration Demo');

        // This would be the most complex segment - simulating the actual integration
        await page.goto('http://localhost:8080/demo/');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Simulate OAuth flow
        console.log('    Demonstrating OAuth flow...');
        const oauthButton = await page.locator('.oauth-connect-button');
        if (await oauthButton.isVisible()) {
          await oauthButton.click();
          await page.waitForTimeout(2000);

          // Simulate successful connection
          await page.addStyleTag({
            content: `
              .oauth-success {
                background: #10b981 !important;
                color: white !important;
                padding: 20px !important;
                border-radius: 8px !important;
                text-align: center !important;
                font-weight: bold !important;
              }
            `
          });

          await page.evaluate(() => {
            document.querySelector('.oauth-status')?.classList.add('oauth-success');
          });
          await page.waitForTimeout(3000);
        }

        // Simulate matter selection
        console.log('    Demonstrating matter selection...');
        const matterSelector = await page.locator('.matter-selector select');
        if (await matterSelector.isVisible()) {
          await matterSelector.selectOption('Test Matter - Client Consultation');
          await page.waitForTimeout(2000);

          // Show matter details
          await page.evaluate(() => {
            document.querySelector('.matter-details')?.scrollIntoView();
          });
          await page.waitForTimeout(3000);
        }

        // Simulate transcript upload and processing
        console.log('    Demonstrating transcript upload...');
        const uploadArea = await page.locator('.transcript-upload');
        if (await uploadArea.isVisible()) {
          // Simulate file upload (without actual file)
          await page.evaluate(() => {
            const uploadArea = document.querySelector('.transcript-upload');
            uploadArea.innerHTML = `
              <div class="processing-demo">
                <div class="processing-spinner"></div>
                <p>Processing audio locally... (28x faster than real-time)</p>
                <div class="progress-bar">
                  <div class="progress" style="width: 0%; background: #2563eb; height: 8px; border-radius: 4px; transition: width 0.5s;"></div>
                </div>
              </div>
            `;
          });

          // Animate progress bar
          for (let progress = 0; progress <= 100; progress += 20) {
            await page.evaluate((p) => {
              document.querySelector('.progress').style.width = p + '%';
            }, progress);
            await page.waitForTimeout(500);
          }

          // Show completed transcript
          await page.evaluate(() => {
            document.querySelector('.processing-demo').innerHTML = `
              <div class="transcript-complete">
                <h3>✅ Transcript Complete</h3>
                <div class="transcript-preview" style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
                  <p><strong>Client:</strong> I need help with my contract dispute...</p>
                  <p><strong>Attorney:</strong> Let me review the details of your agreement...</p>
                  <p><em>[Transcript continues with attorney-client consultation]</em></p>
                </div>
              </div>
            `;
          });
          await page.waitForTimeout(4000);
        }

        // Show Clio activity creation
        console.log('    Demonstrating Clio activity creation...');
        await page.evaluate(() => {
          document.querySelector('.clio-integration-result')?.scrollIntoView();

          document.querySelector('.clio-activity-demo')?.classList.add('oauth-success');
        });
        await page.waitForTimeout(4000);
      }
    },

    {
      name: 'call-to-action',
      duration: 30,
      description: 'Contact information and next steps',
      script: async (page) => {
        console.log('  → Recording: Call to Action');

        await page.goto('http://localhost:8080/contact/');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Highlight contact information
        await page.addStyleTag({
          content: `
            .contact-highlight {
              background: linear-gradient(135deg, #1e40af, #3b82f6) !important;
              color: white !important;
              padding: 30px !important;
              border-radius: 12px !important;
              text-align: center !important;
              font-size: 1.2em !important;
            }
          `
        });

        await page.evaluate(() => {
          document.querySelector('.contact-info')?.classList.add('contact-highlight');
        });
        await page.waitForTimeout(4000);

        // Show next steps
        await page.evaluate(() => {
          document.querySelector('.next-steps')?.scrollIntoView();
        });
        await page.waitForTimeout(3000);
      }
    }
  ];

  // Record each segment
  for (const segment of demoSegments) {
    const page = await context.newPage();

    try {
      await segment.script(page);
      console.log(`    ✅ Completed: ${segment.name} (${segment.duration}s)`);
    } catch (error) {
      console.error(`    ❌ Error recording ${segment.name}:`, error.message);
    }

    await page.close();
  }

  // Generate video assembly instructions
  await generateVideoAssemblyInstructions(demoSegments);

  await browser.close();
  console.log('✅ Demo video segments recorded!');
  console.log('📝 Next: Use video editing software to combine segments');
}

async function generateVideoAssemblyInstructions(segments) {
  const instructions = `
# 🎬 Clio API Partners Demo Video Assembly Instructions

## Generated Segments

${segments.map((segment, index) => `
### ${index + 1}. ${segment.name} (${segment.duration}s)
**Description**: ${segment.description}
**File**: video-segments/${segment.name}.webm
**Duration**: ${segment.duration} seconds
`).join('')}

## Assembly with ffmpeg

\`\`\`bash
# Combine all segments into final demo video
ffmpeg -i company-introduction.webm -i customer-profile.webm -i problem-solution.webm -i clio-integration-demo.webm -i call-to-action.webm -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a][3:v][3:a][4:v][4:a]concat=n=5:v=1:a=1[outv][outa]" -map "[outv]" -map "[outa]" localtranscribe-clio-demo.mp4
\`\`\`

## Professional Video Specifications
- **Resolution**: 1920x1080 (Full HD)
- **Frame Rate**: 30fps
- **Total Duration**: ~5-7 minutes
- **Audio**: Add professional voiceover using script in CLIO_API_PARTNERS_DEMO_SCRIPT.md
- **Branding**: Consistent LocalTranscribe/Lexopoly branding throughout

## Next Steps
1. Add professional voiceover narration
2. Add subtle background music (optional)
3. Add title cards between segments
4. Export as high-quality MP4 for Clio submission

## Usage
- **Primary**: Clio API Partners submission requirement
- **Secondary**: Marketing asset for website and sales
- **Tertiary**: Customer onboarding and training
`;

  await fs.writeFile('clio-submission/VIDEO_ASSEMBLY_INSTRUCTIONS.md', instructions);
  console.log('📋 Video assembly instructions created');
}

// Run if called directly
if (require.main === module) {
  generateDemoVideo().catch(console.error);
}

module.exports = { generateDemoVideo };