import fs from 'fs';
import path from 'path';
import os from 'os';
import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-console-audit-'));

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
];

async function main() {
  console.log('Connecting Chrome to capture live console errors across all pages...');

  const chrome = spawn(
    chromePath,
    [
      '--headless=new',
      '--remote-debugging-port=9226',
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
      const res = await fetch('http://127.0.0.1:9226/json/list');
      pages = await res.json();
      if (pages && pages.length > 0) break;
    } catch {}
  }

  if (!pages || pages.length === 0) {
    chrome.kill();
    fs.rmSync(tempDir, { recursive: true, force: true });
    throw new Error('Could not connect to Chrome on port 9226');
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

  const allIssues = [];

  let currentRoute = '';
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // Capture console API calls
    if (data.method === 'Runtime.consoleAPICalled') {
      const { type, args } = data.params;
      const text = args
        .map((a) => (typeof a.value === 'object' ? JSON.stringify(a.value) : a.value || a.description || ''))
        .join(' ');

      if (type === 'error' || type === 'warn') {
        allIssues.push({
          route: currentRoute,
          severity: type,
          message: text,
          source: 'console',
        });
      }
    }

    // Capture Runtime exceptions
    if (data.method === 'Runtime.exceptionThrown') {
      const exp = data.params.exceptionDetails;
      allIssues.push({
        route: currentRoute,
        severity: 'error',
        message: exp.text + (exp.exception ? ': ' + (exp.exception.description || exp.exception.value) : ''),
        source: 'runtime-exception',
      });
    }

    // Capture Network failed responses
    if (data.method === 'Network.responseReceived') {
      const { response } = data.params;
      if (response.status >= 400) {
        allIssues.push({
          route: currentRoute,
          severity: 'error',
          message: `Network ${response.status} ${response.statusText} for URL: ${response.url}`,
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

  for (const route of ROUTES) {
    currentRoute = route;
    console.log(`\nNavigating to ${route}...`);
    await send('Page.navigate', { url: `http://127.0.0.1:3000${route}` });

    // Wait for page hydration & initial timers
    await new Promise((r) => setTimeout(r, 2500));

    // Scroll down and up to trigger ScrollTrigger, lazy loads, etc.
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          window.scrollTo(0, document.body.scrollHeight / 2);
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 800));

    await send('Runtime.evaluate', {
      expression: `
        (() => {
          window.scrollTo(0, document.body.scrollHeight);
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 800));

    await send('Runtime.evaluate', {
      expression: `
        (() => {
          window.scrollTo(0, 0);
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 500));
  }

  chrome.kill();
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch {}

  console.log('\n=============================================');
  console.log('CONSOLE ISSUES SUMMARY:');
  console.log(`Total Issues Found: ${allIssues.length}`);
  console.log('=============================================');

  fs.writeFileSync('console_issues.json', JSON.stringify(allIssues, null, 2));

  if (allIssues.length === 0) {
    console.log('Clean console! Zero errors and zero warnings across all pages.');
  } else {
    allIssues.forEach((issue, idx) => {
      console.log(`\n[${idx + 1}] Route: ${issue.route} | Severity: ${issue.severity.toUpperCase()} | Source: ${issue.source}`);
      console.log(`    Message: ${issue.message}`);
    });
  }
}

main().catch((err) => {
  console.error('Failed to run console check:', err);
  process.exit(1);
});
