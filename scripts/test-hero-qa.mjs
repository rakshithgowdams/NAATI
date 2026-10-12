import fs from 'fs';
import path from 'path';
import os from 'os';
import { spawn } from 'child_process';

async function run() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-hero-qa-'));
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(
    chromePath,
    [
      '--headless=new',
      '--remote-debugging-port=9224',
      '--disable-extensions',
      '--disable-component-extensions-with-background-pages',
      '--user-data-dir=' + tempDir,
      '--window-size=1650,900',
      'http://127.0.0.1:3000',
    ],
    { stdio: 'ignore' }
  );

  console.log('Spawned Chrome process on 9224 for Hero QA, waiting for CDP...');
  let pages = null;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 300));
    try {
      const res = await fetch('http://127.0.0.1:9224/json/list');
      pages = await res.json();
      if (pages && pages.length > 0) {
        const pageTab = pages.find((p) => p.type === 'page' && !p.url.startsWith('chrome'));
        if (pageTab) break;
      }
    } catch {}
  }

  const page = pages.find((p) => p.type === 'page' && !p.url.startsWith('chrome'));
  if (!page) {
    chrome.kill();
    fs.rmSync(tempDir, { recursive: true, force: true });
    throw new Error('Failed to find a valid web page target in Chrome');
  }

  console.log('Connected to target page:', page.title, page.url);

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

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      const { resolve, reject } = pending.get(data.id);
      pending.delete(data.id);
      if (data.error) reject(data.error);
      else resolve(data.result);
    }
  };

  await new Promise((r) => (ws.onopen = r));
  console.log('Connected to CDP WebSocket');

  await send('Page.enable');

  async function takeScreenshot(filename) {
    const res = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(filename, Buffer.from(res.data, 'base64'));
    console.log(`Saved screenshot: ${filename} (${fs.statSync(filename).size} bytes)`);
  }

  // Allow animations to finish and images to decode
  console.log('Waiting 3s for initial page load and GSAP animation sequence...');
  await new Promise((r) => setTimeout(r, 3000));

  // Check text content on page
  const textCheck = await send('Runtime.evaluate', {
    expression: 'document.body.innerText',
    returnByValue: true,
  });
  console.log('--- Page text content snippet ---:\n', textCheck.result.value?.slice(0, 300));

  // 1. 1920x1080 (3xl Desktop)
  console.log('Capturing Desktop 1920x1080...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await new Promise((r) => setTimeout(r, 700));
  await takeScreenshot('hero_desktop_1920.png');

  // 2. 1440x900 (Standard Desktop)
  console.log('Capturing Desktop 1440x900...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await new Promise((r) => setTimeout(r, 600));
  await takeScreenshot('hero_desktop_1440.png');

  // 3. Tablet Landscape 1024x768
  console.log('Capturing Tablet Landscape 1024x768...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1024,
    height: 768,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await new Promise((r) => setTimeout(r, 600));
  await takeScreenshot('hero_tablet_1024.png');

  // 4. Tablet Portrait 768x1024
  console.log('Capturing Tablet Portrait 768x1024...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await new Promise((r) => setTimeout(r, 600));
  await takeScreenshot('hero_tablet_768.png');

  // 5. Mobile 430x932 (iPhone 14/15/16 Pro Max)
  console.log('Capturing Mobile 430x932...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 430,
    height: 932,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 600));
  await takeScreenshot('hero_mobile_430.png');

  // 6. Mobile 390x844 (iPhone 13/14)
  console.log('Capturing Mobile 390x844...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 600));
  await takeScreenshot('hero_mobile_390.png');

  // 7. Mobile 360x800 (Compact Android)
  console.log('Capturing Mobile 360x800...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 360,
    height: 800,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 600));
  await takeScreenshot('hero_mobile_360.png');

  console.log('--- QA Test Complete ---');
  ws.close();
  chrome.kill();
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch {}
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
