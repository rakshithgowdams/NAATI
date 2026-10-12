const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = path.join(
  process.env.USERPROFILE || 'C:\\Users\\shash',
  '.gemini',
  'antigravity-ide',
  'brain',
  '652babd6-8a21-4fd7-b7ed-1321a3965f70',
  'scratch'
);
if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

class ChromeSession {
  constructor(port = 9222) {
    this.port = port;
    this.proc = null;
    this.ws = null;
    this.msgId = 1;
    this.callbacks = new Map();
    this.userDataDir = path.join(os.tmpdir(), `chrome-audit-session-${Date.now()}`);
  }

  async start() {
    this.proc = spawn(chromePath, [
      '--headless=new',
      `--remote-debugging-port=${this.port}`,
      `--user-data-dir=${this.userDataDir}`,
      '--remote-allow-origins=*',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--window-size=1440,900',
      'about:blank'
    ]);

    // Wait for version
    for (let i = 0; i < 25; i++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const data = await this.httpGet(`http://127.0.0.1:${this.port}/json/version`);
        const json = JSON.parse(data);
        if (json.webSocketDebuggerUrl) {
          await this.connectWs(json.webSocketDebuggerUrl);
          return;
        }
      } catch {}
    }
    throw new Error('Chrome did not start on port ' + this.port);
  }

  httpGet(url) {
    return new Promise((resolve, reject) => {
      http.get(url, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve(body));
      }).on('error', reject);
    });
  }

  async connectWs(url) {
    // Node.js 22/24 global WebSocket
    this.ws = new WebSocket(url);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) reject(new Error(msg.error.message));
          else resolve(msg.result);
        }
      } catch (e) {
        console.error('WS parse error:', e);
      }
    };
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.msgId++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async createPageSession() {
    // Attach to page target
    const target = await this.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await this.send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
    return sessionId;
  }

  async close() {
    if (this.ws) {
      try { this.ws.close(); } catch {}
    }
    if (this.proc) {
      try { this.proc.kill(); } catch {}
    }
    try {
      if (this.userDataDir && fs.existsSync(this.userDataDir)) {
        fs.rmSync(this.userDataDir, { recursive: true, force: true });
      }
    } catch {}
  }
}

// Standalone runner
async function runAudit() {
  const session = new ChromeSession();
  await session.start();
  console.log('Connected to Chrome via CDP.');

  // Helper to send target-scoped command
  const send = (method, params = {}) => session.send(method, params);

  // Discover page target
  const targets = await send('Target.getTargets');
  const pageTarget = targets.targetInfos.find(t => t.type === 'page');
  const { sessionId } = await send('Target.attachToTarget', { targetId: pageTarget.targetId, flatten: true });

  const pageSend = (method, params = {}) => {
    return new Promise((resolve, reject) => {
      const id = session.msgId++;
      session.callbacks.set(id, { resolve, reject });
      session.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  };

  await pageSend('Page.enable');
  await pageSend('DOM.enable');
  await pageSend('Runtime.enable');

  // Comprehensive Breakpoint Matrix: Mobile (320px, 375px, 430px), Tablet (768px), Desktop (1440px)
  const viewports = [
    { name: 'mobile_320', width: 320, height: 568, dpr: 2 },
    { name: 'mobile_375', width: 375, height: 812, dpr: 2 },
    { name: 'mobile_430', width: 430, height: 932, dpr: 3 },
    { name: 'tablet_768', width: 768, height: 1024, dpr: 2 },
    { name: 'desktop_1440', width: 1440, height: 900, dpr: 1 },
  ];

  for (const vp of viewports) {
    console.log(`\n========================================\nAuditing Viewport: ${vp.name} (${vp.width}x${vp.height})\n========================================`);

    await pageSend('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.dpr,
      mobile: vp.width < 1024,
    });

    await pageSend('Page.navigate', { url: 'http://localhost:3000' });
    // Wait for load & settle
    await new Promise(r => setTimeout(r, 2500));

    // Check horizontal overflow
    const overflowCheck = await pageSend('Runtime.evaluate', {
      expression: `(() => {
        const docWidth = document.documentElement.offsetWidth;
        const bodyWidth = document.body.offsetWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const elements = Array.from(document.querySelectorAll('*'));
        const overflowing = [];
        for (const el of elements) {
          const rect = el.getBoundingClientRect();
          if (rect.right > docWidth + 2) {
            overflowing.push({
              tag: el.tagName,
              id: el.id,
              className: el.className,
              right: rect.right,
              width: rect.width,
              docWidth
            });
          }
        }
        return { docWidth, scrollWidth, hasOverflow: scrollWidth > docWidth, count: overflowing.length, samples: overflowing.slice(0, 5) };
      })()`,
      returnByValue: true
    });
    console.log(`Overflow Check (${vp.name}):`, JSON.stringify(overflowCheck.result.value, null, 2));

    // Check navbar layout metrics & collisions
    const navMetrics = await pageSend('Runtime.evaluate', {
      expression: `(() => {
        const header = document.querySelector('header');
        if (!header) return null;
        const menuBtn = header.querySelector('button[aria-label*="menu" i]');
        const logo = header.querySelector('img[alt*="Naati" i]') || header.querySelector('a[aria-label*="home" i]');
        const contact = header.querySelector('a[href="/contact"]');
        const menuRect = menuBtn ? menuBtn.getBoundingClientRect() : null;
        const logoRect = logo ? logo.getBoundingClientRect() : null;
        const contactRect = contact ? contact.getBoundingClientRect() : null;
        const logoCollidesMenu = menuRect && logoRect ? logoRect.left < menuRect.right : false;
        const logoCollidesContact = contactRect && logoRect ? logoRect.right > contactRect.left : false;
        return {
          headerWidth: header.offsetWidth,
          menu: menuRect ? { width: menuRect.width, height: menuRect.height, right: menuRect.right } : null,
          logo: logoRect ? { width: logoRect.width, height: logoRect.height, left: logoRect.left, right: logoRect.right } : null,
          contact: contactRect ? { width: contactRect.width, height: contactRect.height, left: contactRect.left } : null,
          hasCollision: logoCollidesMenu || logoCollidesContact
        };
      })()`,
      returnByValue: true
    });
    console.log(`Navbar Metrics (${vp.name}):`, JSON.stringify(navMetrics.result.value, null, 2));

    // Capture Viewport Screenshot
    const snap = await pageSend('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, `${vp.name}_top.png`), Buffer.from(snap.data, 'base64'));
    console.log(`Saved screenshot: ${vp.name}_top.png`);

    // Section inspection for representative viewports (mobile_375, mobile_320, tablet_768)
    const sections = [
      { id: 'soil-crisis', name: 'section_02_soil_crisis' },
      { id: 'why-soil-first', name: 'section_03_why_soil_first' },
      { id: 'naati-philosophy', name: 'section_04_philosophy' },
      { id: 'crop-nutrition-system', name: 'section_05_products' },
      { id: 'crop-solutions', name: 'section_06_crop_solutions' },
      { id: 'knowledge-field-notes', name: 'section_07_knowledge' },
      { id: 'contact-enquiry', name: 'section_08_contact' },
      { id: 'site-footer', name: 'section_footer' },
    ];

    if (vp.name === 'mobile_375' || vp.name === 'mobile_320') {
      for (const sec of sections) {
        await pageSend('Runtime.evaluate', {
          expression: `(() => {
            const el = document.getElementById('${sec.id}');
            if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
          })()`
        });
        await new Promise(r => setTimeout(r, 600));

        const secSnap = await pageSend('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(artifactDir, `${vp.name}_${sec.name}.png`), Buffer.from(secSnap.data, 'base64'));
        console.log(`Saved section screenshot: ${vp.name}_${sec.name}.png`);
      }

      // Test Soil Comparison Slider position
      const sliderState = await pageSend('Runtime.evaluate', {
        expression: `(() => {
          const slider = document.querySelector('[role="slider"]');
          if (!slider) return { found: false };
          return {
            found: true,
            valueNow: slider.getAttribute('aria-valuenow'),
            min: slider.getAttribute('aria-valuemin'),
            max: slider.getAttribute('aria-valuemax'),
          };
        })()`,
        returnByValue: true
      });
      console.log(`Slider State (${vp.name}):`, JSON.stringify(sliderState.result.value, null, 2));

      // Test Crop Solutions Tab Switching
      console.log(`Testing Crop tab switching on ${vp.name}...`);
      await pageSend('Runtime.evaluate', {
        expression: `(() => {
          const cropSection = document.getElementById('crop-solutions');
          if (cropSection) cropSection.scrollIntoView({ block: 'start', behavior: 'instant' });
        })()`
      });
      await new Promise(r => setTimeout(r, 400));
      const cropTabSwitch = await pageSend('Runtime.evaluate', {
        expression: `(() => {
          const tabs = document.querySelectorAll('[id^="crop-tab-mobile-"]');
          if (tabs.length > 1) {
            tabs[1].click(); // Click Fruits
            return { clicked: true, tabCount: tabs.length };
          }
          return { clicked: false, tabCount: tabs.length };
        })()`,
        returnByValue: true
      });
      console.log(`Crop tab switch result (${vp.name}):`, JSON.stringify(cropTabSwitch.result.value, null, 2));
      await new Promise(r => setTimeout(r, 600));

      // Test Fullscreen Menu
      console.log(`Testing Fullscreen Menu on ${vp.name}...`);
      await pageSend('Runtime.evaluate', {
        expression: `(() => {
          window.scrollTo(0, 0);
          const btn = document.querySelector('button[aria-label*="menu" i]');
          if (btn) btn.click();
        })()`
      });
      await new Promise(r => setTimeout(r, 800));

      const menuSnap = await pageSend('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(artifactDir, `${vp.name}_menu_open.png`), Buffer.from(menuSnap.data, 'base64'));
      console.log(`Saved menu screenshot: ${vp.name}_menu_open.png`);

      // Close menu
      await pageSend('Runtime.evaluate', {
        expression: `(() => {
          const closeBtn = document.querySelector('button[aria-label*="close" i]');
          if (closeBtn) closeBtn.click();
        })()`
      });
      await new Promise(r => setTimeout(r, 400));
    }
  }

  await session.close();
  console.log('\nAudit complete! All data and screenshots generated.');
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
