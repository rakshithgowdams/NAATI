import fs from 'fs';
import { spawn } from 'child_process';

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(
    chromePath,
    [
      '--headless=new',
      '--remote-debugging-port=9222',
      '--window-size=1650,900',
      'http://127.0.0.1:3000',
    ],
    { stdio: 'ignore' }
  );

  console.log('Spawned Chrome process on 9222, waiting for CDP...');
  let pages = null;
  for (let i = 0; i < 25; i++) {
    await new Promise((r) => setTimeout(r, 350));
    try {
      const res = await fetch('http://127.0.0.1:9222/json/list');
      pages = await res.json();
      if (pages && pages.length > 0) break;
    } catch {}
  }

  if (!pages) {
    chrome.kill();
    throw new Error('Failed to connect to Chrome CDP');
  }

  const page = pages.find((p) => p.type === 'page' && p.url.includes('3000')) || pages[0];
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

  async function takeScreenshot(filename) {
    const res = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(filename, Buffer.from(res.data, 'base64'));
    console.log(`Saved screenshot: ${filename} (${fs.statSync(filename).size} bytes)`);
  }

  // Allow Next.js page to fully hydrate
  console.log('Waiting 2.5s for page hydration...');
  await new Promise((r) => setTimeout(r, 2500));

  // 1. Initial Desktop Closed Navbar (1650x900)
  console.log('1. Capturing Desktop Closed Navbar (1650x900)...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1650,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await new Promise((r) => setTimeout(r, 600));
  await takeScreenshot('final_desktop_navbar_closed.png');

  // 2. Open Full Screen Menu on Desktop (1650x900)
  console.log('2. Opening full-screen menu on Desktop (1650x900)...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const btn = document.querySelector('button[aria-label="Open navigation menu"]');
        btn?.click();
      })()
    `,
  });

  await new Promise((r) => setTimeout(r, 1200));
  await takeScreenshot('final_desktop_menu_expanded.png');

  // Telemetry check for Desktop 1650x900
  const openDesktopCheck = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const links = Array.from(document.querySelectorAll('#fullscreen-navigation ul li'));
        const lastLink = links[links.length - 1];
        const rect = lastLink ? lastLink.getBoundingClientRect() : null;
        return {
          totalLinks: links.length,
          lastLinkBottom: rect ? Math.round(rect.bottom) : null,
          windowHeight: window.innerHeight,
          fitsWithoutScroll: rect ? rect.bottom <= window.innerHeight : false
        };
      })()
    `,
    returnByValue: true,
  });
  console.log('Desktop 1650x900 Fit Check:', JSON.stringify(openDesktopCheck.result.value, null, 2));

  // 3. Short Desktop Viewport (1440x700)
  console.log('3. Testing Short Desktop Viewport (1440x700)...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 700,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await new Promise((r) => setTimeout(r, 600));
  await takeScreenshot('desktop_short_700h_menu.png');

  const short700Check = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const links = Array.from(document.querySelectorAll('#fullscreen-navigation ul li'));
        const lastLink = links[links.length - 1];
        const rect = lastLink ? lastLink.getBoundingClientRect() : null;
        return {
          totalLinks: links.length,
          lastLinkBottom: rect ? Math.round(rect.bottom) : null,
          windowHeight: window.innerHeight,
          fitsWithoutScroll: rect ? rect.bottom <= window.innerHeight : false
        };
      })()
    `,
    returnByValue: true,
  });
  console.log('Short Desktop (700h) Fit Check:', JSON.stringify(short700Check.result.value, null, 2));

  // 4. Test Escape key close
  console.log('4. Pressing Escape to close menu...');
  await send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Escape',
    code: 'Escape',
    windowsVirtualKeyCode: 27,
  });
  await send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'Escape',
    code: 'Escape',
    windowsVirtualKeyCode: 27,
  });
  await new Promise((r) => setTimeout(r, 600));

  // 5. Tablet Viewports (1024x1366 and 768x1024)
  console.log('5. Testing Tablet 1024x1366 and 768x1024...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1024,
    height: 1366,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await new Promise((r) => setTimeout(r, 400));
  await takeScreenshot('tablet_1024_navbar_closed.png');

  await send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await new Promise((r) => setTimeout(r, 400));
  await takeScreenshot('tablet_768_navbar_closed.png');

  // 6. Mobile 390x844 Closed Navbar
  console.log('6. Capturing Mobile 390x844 Closed Navbar...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 500));
  await takeScreenshot('final_mobile_navbar_closed.png');

  // 7. Mobile 390x844 Open Menu
  console.log('7. Opening Mobile 390x844 Menu...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const btn = document.querySelector('button[aria-label="Open navigation menu"]');
        btn?.click();
      })()
    `,
  });
  await new Promise((r) => setTimeout(r, 1200));
  await takeScreenshot('final_mobile_menu_expanded.png');

  // 8. Mobile 360x800 and 430x932
  console.log('8. Capturing Mobile 360x800 and 430x932...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 360,
    height: 800,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 500));
  await takeScreenshot('mobile_360_menu_expanded.png');

  await send('Emulation.setDeviceMetricsOverride', {
    width: 430,
    height: 932,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 500));
  await takeScreenshot('mobile_430_menu_expanded.png');

  console.log('--- Completed All Visual Verification Tasks! ---');
  ws.close();
  chrome.kill();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
