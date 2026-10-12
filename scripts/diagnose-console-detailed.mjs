import fs from 'fs';
import path from 'path';
import os from 'os';
import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-detailed-audit-'));

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
  '/dealers', // redirect route
  '/faq',     // redirect route
  '/not-found-verification-route', // 404 route
];

async function main() {
  console.log('Launching live Chrome on port 9228 to audit all console entries...');

  const chrome = spawn(
    chromePath,
    [
      '--headless=new',
      '--remote-debugging-port=9228',
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
      const res = await fetch('http://localhost:9228/json/list');
      pages = await res.json();
      if (pages && pages.length > 0) break;
    } catch {}
  }

  if (!pages || pages.length === 0) {
    chrome.kill();
    fs.rmSync(tempDir, { recursive: true, force: true });
    throw new Error('Could not connect to Chrome on port 9228');
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

  const allLogs = [];
  let currentRoute = '';

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // Capture console API calls
    if (data.method === 'Runtime.consoleAPICalled') {
      const { type, args } = data.params;
      const text = args
        .map((a) => (typeof a.value === 'object' ? JSON.stringify(a.value) : a.value || a.description || ''))
        .join(' ');

      allLogs.push({
        route: currentRoute,
        type: 'console.' + type,
        message: text,
      });
    }

    // Capture Log entries
    if (data.method === 'Log.entryAdded') {
      allLogs.push({
        route: currentRoute,
        type: 'log.' + data.params.entry.level,
        message: data.params.entry.text + (data.params.entry.url ? ` (${data.params.entry.url})` : ''),
      });
    }

    // Capture Runtime exceptions
    if (data.method === 'Runtime.exceptionThrown') {
      const exp = data.params.exceptionDetails;
      const desc = exp.exception ? (exp.exception.description || exp.exception.value) : '';
      allLogs.push({
        route: currentRoute,
        type: 'exception',
        message: exp.text + ': ' + desc,
      });
    }

    // Capture Network failed responses
    if (data.method === 'Network.responseReceived') {
      const { response } = data.params;
      if (response.status >= 400 && !response.url.includes('not-found-verification-route')) {
        allLogs.push({
          route: currentRoute,
          type: 'network-error',
          message: `${response.status} ${response.statusText}: ${response.url}`,
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
  await send('Log.enable');
  await send('Network.enable');

  for (const route of ROUTES) {
    currentRoute = route;
    console.log(`Checking route: ${route}`);
    await send('Page.navigate', { url: `http://localhost:3000${route}` });

    // Wait for load, hydration & animations
    await new Promise((r) => setTimeout(r, 2000));

    // Scroll down to bottom and up
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });`,
    });
    await new Promise((r) => setTimeout(r, 600));

    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: 0, behavior: 'instant' });`,
    });
    await new Promise((r) => setTimeout(r, 400));
  }

  chrome.kill();
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch {}

  console.log('\n--- DETAILED AUDIT RESULTS ---');
  console.log(`Total captured logs/events: ${allLogs.length}`);

  const errors = allLogs.filter((l) =>
    l.type.includes('error') ||
    l.type.includes('exception') ||
    (l.type.includes('warn') && !l.message.includes('Download the React DevTools'))
  );

  console.log(`Errors / Warnings count: ${errors.length}`);
  fs.writeFileSync('detailed_console_audit.json', JSON.stringify({ total: allLogs.length, errors, allLogs }, null, 2));

  if (errors.length > 0) {
    errors.forEach((err, i) => {
      console.log(`[${i + 1}] [${err.route}] [${err.type}] ${err.message}`);
    });
  } else {
    console.log('Zero errors or warnings detected across all pages!');
  }
}

main().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
