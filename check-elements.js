const { chromium } = require('@playwright/test');

async function run() {
  const browser = await chromium.launch({ headless: true });
  
  const viewports = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop_std', width: 1280, height: 800 },
    { name: 'desktop_large', width: 1920, height: 1080 }
  ];
  
  for (const vp of viewports) {
    console.log(`\n=== Checking Layout at ${vp.name} (${vp.width}px) ===`);
    const context = await browser.newContext({ viewport: vp });
    const page = await context.newPage();
    
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000); // let animations run
    
    const layout = await page.evaluate(() => {
      const issues = [];
      
      // 1. Check for horizontal overflow
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      if (docWidth > winWidth) {
        issues.push(`Horizontal overflow detected: scrollWidth (${docWidth}px) is greater than viewport width (${winWidth}px)`);
        
        // Find elements that exceed the viewport width
        const allElements = document.querySelectorAll('*');
        for (const el of allElements) {
          const rect = el.getBoundingClientRect();
          if (rect.right > winWidth && rect.width < winWidth * 2) {
            // Get class/id selector path
            const selector = el.tagName + (el.id ? '#' + el.id : '') + (el.className ? '.' + [...el.classList].join('.') : '');
            issues.push(`  -> Element exceeds viewport: ${selector} (right: ${rect.right}px, width: ${rect.width}px)`);
          }
        }
      }
      
      // 2. Check for overlapping elements in Hero section
      const hero = document.querySelector('.hero-section-root-v2');
      if (hero) {
        const heroRect = hero.getBoundingClientRect();
        // Check if hero height is small or squished
        if (heroRect.height < 200) {
          issues.push(`Hero section height is unexpectedly small: ${heroRect.height}px`);
        }
      }
      
      return {
        scrollWidth: docWidth,
        viewportWidth: winWidth,
        issues: issues.slice(0, 15) // limit to top 15 issues
      };
    });
    
    console.log(`Scroll Width: ${layout.scrollWidth}px, Viewport Width: ${layout.viewportWidth}px`);
    if (layout.issues.length > 0) {
      console.log('Issues found:');
      layout.issues.forEach(issue => console.log(issue));
    } else {
      console.log('No layout issues detected.');
    }
    
    await context.close();
  }
  
  await browser.close();
}

run().catch(console.error);
