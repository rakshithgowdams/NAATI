import fs from 'fs';
import path from 'path';
import os from 'os';
import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-verify-pro-'));

async function verifyNaatiPro() {
  console.log('Verifying /products/naati-pro in desktop viewport (1440x900)...');

  const chrome = spawn(
    chromePath,
    [
      '--headless=new',
      '--remote-debugging-port=9229',
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
      const res = await fetch('http://localhost:9229/json/list');
      pages = await res.json();
      if (pages && pages.length > 0) break;
    } catch {}
  }

  if (!pages || pages.length === 0) {
    chrome.kill();
    fs.rmSync(tempDir, { recursive: true, force: true });
    throw new Error('Could not connect to Chrome on port 9229');
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

  const errors = [];
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.method === 'Runtime.consoleAPICalled') {
      const { type, args } = data.params;
      if (type === 'error') {
        const text = args.map((a) => a.value || a.description || JSON.stringify(a)).join(' ');
        errors.push({ type: 'console.error', text });
      }
    }

    if (data.method === 'Runtime.exceptionThrown') {
      const exp = data.params.exceptionDetails;
      errors.push({
        type: 'uncaught-exception',
        text: exp.text + ': ' + (exp.exception ? (exp.exception.description || exp.exception.value) : ''),
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

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  console.log('Navigating to http://localhost:3000/products/naati-pro...');
  await send('Page.navigate', { url: 'http://localhost:3000/products/naati-pro' });

  // Wait for load and hydration
  await new Promise((r) => setTimeout(r, 2500));

  // Scroll to #growth-journey
  console.log('Scrolling to growth-journey section...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('growth-journey');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`,
  });
  await new Promise((r) => setTimeout(r, 1000));

  // Scroll through each step
  console.log('Scrolling through steps...');
  for (let i = 0; i < 3; i++) {
    await send('Runtime.evaluate', {
      expression: `(() => {
        const step = document.getElementById('journey-step-${i}');
        if (step) step.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`,
    });
    await new Promise((r) => setTimeout(r, 800));
  }

  // Scroll to bottom
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });`,
  });
  await new Promise((r) => setTimeout(r, 1000));

  chrome.kill();
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch {}

  console.log('\n--- VERIFICATION RESULT ---');
  console.log(`Total Errors Captured: ${errors.length}`);
  if (errors.length === 0) {
    console.log('SUCCESS! Zero errors on /products/naati-pro.');
  } else {
    errors.forEach((e, idx) => {
      console.log(`[Error ${idx + 1}] ${e.type}: ${e.text}`);
    });
    process.exit(1);
  }
}

verifyNaatiPro().catch((err) => {
  console.error('Test run failed:', err);
  process.exit(1);
});
