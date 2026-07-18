const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/sulai/.gemini/antigravity-ide/brain/ae07d68e-e2f8-4b60-aa4c-bba609d5f34d';
const SCREENSHOTS_DIR = path.join(ARTIFACT_DIR, 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop_std', width: 1280, height: 800 },
  { name: 'desktop_large', width: 1920, height: 1080 }
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  
  for (const vp of VIEWPORTS) {
    console.log(`Running testing for ${vp.name} (${vp.width}x${vp.height})...`);
    
    // Create new context with specified viewport
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height }
    });
    
    const page = await context.newPage();
    
    const consoleLogs = [];
    page.on('console', msg => {
      const entry = `[${msg.type()}] ${msg.text()}`;
      consoleLogs.push(entry);
    });
    
    page.on('pageerror', err => {
      const entry = `[PAGE_ERROR] ${err.toString()}`;
      consoleLogs.push(entry);
    });
    
    try {
      await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 15000 });
      
      // Wait for 3 seconds for standard transitions, fonts, and animation libraries to finish loading/settling.
      await page.waitForTimeout(3000);
      
      // Capture Full Page Screenshot
      const fullPagePath = path.join(SCREENSHOTS_DIR, `${vp.name}_fullpage.png`);
      await page.screenshot({ path: fullPagePath, fullPage: true });
      console.log(`Saved fullpage screenshot to ${fullPagePath}`);
      
      // Capture Hero Section Specifically
      const hero = page.locator('.hero-section-root-v2');
      if (await hero.count() > 0) {
        const heroPath = path.join(SCREENSHOTS_DIR, `${vp.name}_hero.png`);
        await hero.first().screenshot({ path: heroPath });
        console.log(`Saved hero screenshot to ${heroPath}`);
      } else {
        console.log('Hero section not found on page.');
      }
      
      // Save logs
      const logsPath = path.join(SCREENSHOTS_DIR, `${vp.name}_console.txt`);
      fs.writeFileSync(logsPath, consoleLogs.join('\n'), 'utf8');
      console.log(`Saved console logs to ${logsPath}`);
      
    } catch (err) {
      console.error(`Error processing ${vp.name}:`, err);
    } finally {
      await context.close();
    }
  }
  
  await browser.close();
  console.log('Testing completed successfully.');
}

run().catch(console.error);
