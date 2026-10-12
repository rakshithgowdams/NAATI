import fs from 'fs';
import path from 'path';
import os from 'os';
import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-interactive-audit-'));

async function main() {
  console.log('Starting Interactive User Actions Console Audit...');

  const chrome = spawn(
    chromePath,
    [
      '--headless=new',
      '--remote-debugging-port=9227',
      '--disable-extensions',
      '--user-data-dir=' + tempDir,
      '--window-size=1440,900',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  let pages = null;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 200));
    try {
      const res = await fetch('http://127.0.0.1:9227/json/list');
      pages = await res.json();
      if (pages && pages.length > 0) break;
    } catch {}
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

  const detectedErrors = [];
  let currentAction = 'init';

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.method === 'Runtime.consoleAPICalled') {
      const { type, args } = data.params;
      const text = args
        .map((a) => (typeof a.value === 'object' ? JSON.stringify(a.value) : a.value || a.description || ''))
        .join(' ');

      if (type === 'error' || type === 'warn') {
        detectedErrors.push({
          action: currentAction,
          type,
          message: text,
          source: 'console',
        });
      }
    }

    if (data.method === 'Runtime.exceptionThrown') {
      const exp = data.params.exceptionDetails;
      detectedErrors.push({
        action: currentAction,
        type: 'uncaught-exception',
        message: exp.text + (exp.exception ? ': ' + (exp.exception.description || exp.exception.value) : ''),
        source: 'runtime',
      });
    }

    if (data.method === 'Network.responseReceived') {
      const { response } = data.params;
      if (response.status >= 400) {
        detectedErrors.push({
          action: currentAction,
          type: 'network-error',
          message: `${response.status} ${response.statusText} at ${response.url}`,
          source: 'network',
        });
      }
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
  await send('Network.enable');

  async function evaluate(code) {
    return send('Runtime.evaluate', { expression: code, returnByValue: true });
  }

  // 1. HOME: Menu Open & Close
  currentAction = 'Home: Menu Interaction';
  console.log(`\nTesting ${currentAction}...`);
  await send('Page.navigate', { url: 'http://127.0.0.1:3000/' });
  await new Promise((r) => setTimeout(r, 2000));
  await evaluate(`document.querySelector('button[aria-label*="menu" i]')?.click()`);
  await new Promise((r) => setTimeout(r, 800));
  await evaluate(`document.querySelector('button[aria-label*="close" i]')?.click()`);
  await new Promise((r) => setTimeout(r, 500));

  // 2. HOME: Crop Tab Switching
  currentAction = 'Home: Crop Tab Clicking';
  console.log(`Testing ${currentAction}...`);
  await evaluate(`
    (() => {
      const tabs = document.querySelectorAll('#crop-solutions button, [role="tab"]');
      tabs.forEach(t => t.click());
    })()
  `);
  await new Promise((r) => setTimeout(r, 800));

  // 3. FAQS: Search Input & Accordion Toggles
  currentAction = 'FAQs: Search Input & Toggles';
  console.log(`Testing ${currentAction}...`);
  await send('Page.navigate', { url: 'http://127.0.0.1:3000/faqs' });
  await new Promise((r) => setTimeout(r, 2000));

  // Type in search box
  await evaluate(`
    (() => {
      const input = document.getElementById('faq-search-input');
      if (input) {
        input.value = 'Naati Pro';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    })()
  `);
  await new Promise((r) => setTimeout(r, 800));

  // Click category tabs
  await evaluate(`
    (() => {
      const catBtns = document.querySelectorAll('aside button');
      if (catBtns.length > 0) catBtns[0].click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 500));

  // Click accordions
  await evaluate(`
    (() => {
      const accs = document.querySelectorAll('article button[aria-expanded]');
      accs.forEach(btn => btn.click());
    })()
  `);
  await new Promise((r) => setTimeout(r, 800));

  // 4. CONTACT: Enquiry Type Switching & Validation Trigger
  currentAction = 'Contact: Form Interactions';
  console.log(`Testing ${currentAction}...`);
  await send('Page.navigate', { url: 'http://127.0.0.1:3000/contact' });
  await new Promise((r) => setTimeout(r, 2000));

  // Switch tabs
  await evaluate(`
    (() => {
      const typeBtns = document.querySelectorAll('button[role="radio"], button[data-type]');
      typeBtns.forEach(b => b.click());
    })()
  `);
  await new Promise((r) => setTimeout(r, 500));

  // Trigger submit to test client validation
  await evaluate(`
    (() => {
      const submitBtn = document.querySelector('button[type="submit"]');
      submitBtn?.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 800));

  // 5. DEALER NETWORK: Form tabs and submission test
  currentAction = 'Dealer Network: Form Interactions';
  console.log(`Testing ${currentAction}...`);
  await send('Page.navigate', { url: 'http://127.0.0.1:3000/dealer-network' });
  await new Promise((r) => setTimeout(r, 2000));
  await evaluate(`
    (() => {
      const submitBtn = document.querySelector('button[type="submit"]');
      submitBtn?.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 800));

  // 6. RESOURCES: Category Filter & Search
  currentAction = 'Resources: Filter & Search';
  console.log(`Testing ${currentAction}...`);
  await send('Page.navigate', { url: 'http://127.0.0.1:3000/resources' });
  await new Promise((r) => setTimeout(r, 2000));
  await evaluate(`
    (() => {
      const filterPills = document.querySelectorAll('[role="tab"]');
      filterPills.forEach(p => p.click());
    })()
  `);
  await new Promise((r) => setTimeout(r, 800));

  // 7. SOIL ACADEMY: Lesson selector & Soil Explorer
  currentAction = 'Soil Academy: Interactions';
  console.log(`Testing ${currentAction}...`);
  await send('Page.navigate', { url: 'http://127.0.0.1:3000/soil-academy' });
  await new Promise((r) => setTimeout(r, 2000));
  await evaluate(`
    (() => {
      const interactiveBtns = document.querySelectorAll('#living-soil-explorer button, #lessons button');
      interactiveBtns.forEach(b => b.click());
    })()
  `);
  await new Promise((r) => setTimeout(r, 800));

  // 8. CROP SOLUTIONS: Category tabs & Crop Cards
  currentAction = 'Crop Solutions: Interactions';
  console.log(`Testing ${currentAction}...`);
  await send('Page.navigate', { url: 'http://127.0.0.1:3000/crop-solutions' });
  await new Promise((r) => setTimeout(r, 2000));
  await evaluate(`
    (() => {
      const cropTabs = document.querySelectorAll('button[role="tab"]');
      cropTabs.forEach(t => t.click());
    })()
  `);
  await new Promise((r) => setTimeout(r, 800));

  // 9. CLIENT-SIDE ROUTER TRANSITIONS: Click internal links
  currentAction = 'Client Navigation Test';
  console.log(`Testing ${currentAction}...`);
  await send('Page.navigate', { url: 'http://127.0.0.1:3000/' });
  await new Promise((r) => setTimeout(r, 1500));
  await evaluate(`
    (() => {
      const link = document.querySelector('a[href="/about"]');
      link?.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 1500));

  await evaluate(`
    (() => {
      const link = document.querySelector('a[href="/nutrition-system"]');
      link?.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 1500));

  await evaluate(`
    (() => {
      const link = document.querySelector('a[href="/faqs"]');
      link?.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 1500));

  chrome.kill();
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch {}

  console.log('\n=============================================');
  console.log('INTERACTIVE AUDIT RESULTS:');
  console.log(`Total Errors / Warnings: ${detectedErrors.length}`);
  console.log('=============================================');

  if (detectedErrors.length === 0) {
    console.log('SUCCESS: Zero console errors, exceptions, or 404s during all interactive actions!');
  } else {
    detectedErrors.forEach((err, i) => {
      console.log(`[${i + 1}] Action: ${err.action} | Type: ${err.type}`);
      console.log(`    Message: ${err.message}`);
    });
  }

  fs.writeFileSync('interactive_errors.json', JSON.stringify(detectedErrors, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
