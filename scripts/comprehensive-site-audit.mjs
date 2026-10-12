import fs from 'fs';
import path from 'path';
import os from 'os';
import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-site-audit-'));

const VIEWPORTS = [
  { name: 'Mobile SE', width: 320, height: 568 },
  { name: 'Mobile Standard', width: 375, height: 667 },
  { name: 'Mobile Large', width: 414, height: 896 },
  { name: 'Tablet Portrait', width: 768, height: 1024 },
  { name: 'Tablet Landscape', width: 1024, height: 768 },
  { name: 'Desktop HD', width: 1440, height: 900 },
];

const ROUTES = [
  '/',
  '/about',
  '/nutrition-system',
  '/products/naati-plus',
  '/products/naati-pro',
  '/crop-solutions',
  '/soil-academy',
  '/resources',
  '/dealer-network',
  '/contact',
  '/success-stories',
  '/faqs',
  '/not-found-verification-route',
];

async function main() {
  console.log('Starting Complete Website Audit via Chrome CDP...');

  const chrome = spawn(
    chromePath,
    [
      '--headless=new',
      '--remote-debugging-port=9225',
      '--disable-extensions',
      '--disable-component-extensions-with-background-pages',
      '--user-data-dir=' + tempDir,
      '--window-size=1440,900',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  let pages = null;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 250));
    try {
      const res = await fetch('http://127.0.0.1:9225/json/list');
      pages = await res.json();
      if (pages && pages.length > 0) break;
    } catch {}
  }

  if (!pages || pages.length === 0) {
    chrome.kill();
    fs.rmSync(tempDir, { recursive: true, force: true });
    throw new Error('Failed to connect to Chrome on port 9225');
  }

  const page = pages[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let idCounter = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  const consoleLogs = [];
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.method === 'Runtime.consoleAPICalled') {
      consoleLogs.push({
        type: data.params.type,
        args: data.params.args.map((a) => a.value ?? a.description),
      });
    }
    if (data.id && pending.has(data.id)) {
      const { resolve, reject } = pending.get(data.id);
      pending.delete(data.id);
      if (data.error) reject(data.error);
      else resolve(data.result);
    }
  };

  await new Promise((r) => (ws.onopen = r));
  await send('Page.enable');
  await send('Runtime.enable');

  const auditReport = {
    timestamp: new Date().toISOString(),
    routesChecked: [],
    overflowIssues: [],
    seoResults: [],
    linkAudit: [],
  };

  // 1. Audit Each Route
  for (const route of ROUTES) {
    const url = `http://127.0.0.1:3000${route}`;
    console.log(`\nAuditing route: ${route}...`);

    await send('Page.navigate', { url });
    await new Promise((r) => setTimeout(r, 2000));

    // Evaluate basic DOM and SEO metrics
    const pageMetrics = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const h1s = Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim());
          const title = document.title;
          const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
          const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
          const navThemeSections = document.querySelectorAll('[data-nav-theme]').length;
          
          // Image audit
          const images = Array.from(document.querySelectorAll('img'));
          const imagesMissingAlt = images.filter(img => !img.hasAttribute('alt')).length;
          
          // Link audit
          const links = Array.from(document.querySelectorAll('a[href]')).map(a => a.getAttribute('href'));
          const brokenLinks = links.filter(href => href === '#' || href === '' || href.includes('undefined'));

          return {
            title,
            h1Count: h1s.length,
            h1Text: h1s[0] || 'NONE',
            metaDesc: metaDesc || 'MISSING',
            canonical: canonical || 'MISSING',
            navThemeSections,
            totalImages: images.length,
            imagesMissingAlt,
            totalLinks: links.length,
            suspiciousLinks: brokenLinks,
          };
        })()
      `,
      returnByValue: true,
    });

    const routeData = pageMetrics.result.value;
    auditReport.routesChecked.push({ route, ...routeData });
    console.log(`  Title: "${routeData.title}" | H1s: ${routeData.h1Count} | Images: ${routeData.totalImages} | Links: ${routeData.totalLinks}`);

    // Check Responsive Overflow across Viewports
    for (const vp of VIEWPORTS) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 768,
      });
      await new Promise((r) => setTimeout(r, 300));

      const overflowCheck = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const docWidth = document.documentElement.scrollWidth;
            const winWidth = window.innerWidth;
            const hasOverflow = docWidth > winWidth + 1; // 1px threshold for subpixels
            return {
              hasOverflow,
              docWidth,
              winWidth,
              diff: docWidth - winWidth
            };
          })()
        `,
        returnByValue: true,
      });

      const res = overflowCheck.result.value;
      if (res.hasOverflow) {
        console.warn(`  [OVERFLOW DETECTED] ${route} at ${vp.name} (${vp.width}px): docWidth=${res.docWidth}px (diff: +${res.diff}px)`);
        auditReport.overflowIssues.push({
          route,
          viewport: vp.name,
          width: vp.width,
          diff: res.diff,
        });
      }
    }
  }

  console.log('\n--- AUDIT SUMMARY ---');
  console.log(`Total Routes Audited: ${auditReport.routesChecked.length}`);
  console.log(`Overflow Issues Found: ${auditReport.overflowIssues.length}`);
  if (auditReport.overflowIssues.length > 0) {
    console.log('Overflow locations:', JSON.stringify(auditReport.overflowIssues, null, 2));
  } else {
    console.log('ZERO horizontal overflow across all viewports!');
  }

  fs.writeFileSync('audit_results.json', JSON.stringify(auditReport, null, 2));
  console.log('Saved audit_results.json');

  try {
    chrome.kill();
    await new Promise((r) => setTimeout(r, 500));
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch (e) {
    // Non-fatal temp cleanup warning
  }
}

main().catch((err) => {
  console.error('Audit run failed:', err);
  process.exit(1);
});
