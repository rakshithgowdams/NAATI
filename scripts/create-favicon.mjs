import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

function createDibEntry(rawRgba, width, height) {
  const headerSize = 40;
  const xorSize = width * height * 4;
  const rowBytes = Math.ceil(width / 32) * 4;
  const andSize = rowBytes * height;
  const totalSize = headerSize + xorSize + andSize;

  const buf = Buffer.alloc(totalSize);

  // BITMAPINFOHEADER
  buf.writeUInt32LE(40, 0);
  buf.writeInt32LE(width, 4);
  buf.writeInt32LE(height * 2, 8); // doubled height for ICO DIB
  buf.writeUInt16LE(1, 12);
  buf.writeUInt16LE(32, 14); // 32 bpp
  buf.writeUInt32LE(0, 16); // BI_RGB
  buf.writeUInt32LE(xorSize, 20);
  buf.writeInt32LE(0, 24);
  buf.writeInt32LE(0, 28);
  buf.writeUInt32LE(0, 32);
  buf.writeUInt32LE(0, 36);

  // XOR mask (BGRA, bottom-up)
  let offset = headerSize;
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      const r = rawRgba[srcIdx];
      const g = rawRgba[srcIdx + 1];
      const b = rawRgba[srcIdx + 2];
      const a = rawRgba[srcIdx + 3];

      buf[offset] = b;
      buf[offset + 1] = g;
      buf[offset + 2] = r;
      buf[offset + 3] = a;
      offset += 4;
    }
  }

  // AND mask (1 bit per pixel, bottom-up, 1 = transparent, 0 = opaque)
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      const a = rawRgba[srcIdx + 3];
      if (a === 0) {
        const byteIndex = offset + (height - 1 - y) * rowBytes + Math.floor(x / 8);
        const bitIndex = 7 - (x % 8);
        buf[byteIndex] |= (1 << bitIndex);
      }
    }
  }

  return buf;
}

async function generateFavicons() {
  console.log('Generating brand favicons and app icons...');

  const logoPath = path.resolve('public/assets/brand/naati-organics-logo.png');
  if (!fs.existsSync(logoPath)) {
    throw new Error(`Source logo not found at ${logoPath}`);
  }

  // --- 1. EXTRACT ISOLATED CIRCULAR EMBLEM ---
  const { data, info } = await sharp(logoPath).raw().toBuffer({ resolveWithObject: true });

  const emblemBuf = Buffer.alloc(info.width * info.height * 4);
  const cx = 510.5;
  const cy = 366.5;
  const r = 294;

  let minX = info.width;
  let maxX = 0;
  let minY = info.height;
  let maxY = 0;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 4;
      const alpha = data[idx + 3];
      if (alpha === 0) continue;

      const dx = x - cx;
      const dy = y - cy;
      const distSq = dx * dx + dy * dy;
      const insideCircle = distSq <= (r + 4) * (r + 4);
      const isSoilMound = y <= 692 && x >= 218 && x <= 802 && distSq <= (r + 45) * (r + 45);

      if (insideCircle || isSoilMound) {
        emblemBuf[idx] = data[idx];
        emblemBuf[idx + 1] = data[idx + 1];
        emblemBuf[idx + 2] = data[idx + 2];
        emblemBuf[idx + 3] = alpha;

        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const cropWidth = maxX - minX + 1;
  const cropHeight = maxY - minY + 1;

  const isolatedEmblemPng = await sharp(emblemBuf, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .extract({ left: minX, top: minY, width: cropWidth, height: cropHeight })
    .png()
    .toBuffer();

  // Master square emblem (512x512 with 8% breathing padding)
  const masterInnerSize = 470;
  const innerResized = await sharp(isolatedEmblemPng)
    .resize(masterInnerSize, masterInnerSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const masterEmblem512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: innerResized, gravity: 'center' }])
    .png()
    .toBuffer();

  // --- 2. GENERATE BROWSER TAB SIZES (EMBLEM) ---
  const png16 = await sharp(masterEmblem512).resize(16, 16).png().toBuffer();
  const png32 = await sharp(masterEmblem512).resize(32, 32).png().toBuffer();
  const png48 = await sharp(masterEmblem512).resize(48, 48).png().toBuffer();

  fs.writeFileSync('public/favicon-16x16.png', png16);
  fs.writeFileSync('public/favicon-32x32.png', png32);
  fs.writeFileSync('public/favicon-48x48.png', png48);

  // --- 3. GENERATE STANDARD DIB MULTI-RESOLUTION FAVICON.ICO (16, 32, 48) ---
  const raw16 = await sharp(png16).raw().toBuffer({ resolveWithObject: true });
  const raw32 = await sharp(png32).raw().toBuffer({ resolveWithObject: true });
  const raw48 = await sharp(png48).raw().toBuffer({ resolveWithObject: true });

  const dib16 = createDibEntry(raw16.data, 16, 16);
  const dib32 = createDibEntry(raw32.data, 32, 32);
  const dib48 = createDibEntry(raw48.data, 48, 48);

  const icoEntries = [
    { width: 16, height: 16, data: dib16 },
    { width: 32, height: 32, data: dib32 },
    { width: 48, height: 48, data: dib48 },
  ];

  const headerSize = 6;
  const dirEntrySize = 16;
  let currentOffset = headerSize + dirEntrySize * icoEntries.length;

  for (const e of icoEntries) {
    e.offset = currentOffset;
    currentOffset += e.data.length;
  }

  const icoBuffer = Buffer.alloc(currentOffset);
  icoBuffer.writeUInt16LE(0, 0); // Reserved
  icoBuffer.writeUInt16LE(1, 2); // Type 1 = ICO
  icoBuffer.writeUInt16LE(icoEntries.length, 4); // Count

  for (let i = 0; i < icoEntries.length; i++) {
    const e = icoEntries[i];
    const pos = headerSize + i * dirEntrySize;
    icoBuffer.writeUInt8(e.width, pos);
    icoBuffer.writeUInt8(e.height, pos + 1);
    icoBuffer.writeUInt8(0, pos + 2);
    icoBuffer.writeUInt8(0, pos + 3);
    icoBuffer.writeUInt16LE(1, pos + 4);
    icoBuffer.writeUInt16LE(32, pos + 6);
    icoBuffer.writeUInt32LE(e.data.length, pos + 8);
    icoBuffer.writeUInt32LE(e.offset, pos + 12);
    e.data.copy(icoBuffer, e.offset);
  }

  fs.writeFileSync('public/favicon.ico', icoBuffer);

  // --- 4. GENERATE CLEAN VECTOR SVG FAVICON ---
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <circle cx="32" cy="24" r="18" fill="none" stroke="#203817" stroke-width="2.6" />
  <path d="M 12 36 Q 32 46 52 36 Q 44 49 32 51 Q 20 49 12 36 Z" fill="#4A3421" />
  <path d="M 22 42 Q 27 38 32 43 Q 37 47 42 42" fill="none" stroke="#C87063" stroke-width="2.6" stroke-linecap="round" />
  <path d="M 32 36 L 32 24" stroke="#4B5E32" stroke-width="2.2" stroke-linecap="round" />
  <path d="M 32 8 C 26 15 26 21 32 25 C 38 21 38 15 32 8 Z" fill="#637B43" />
  <path d="M 32 23 C 23 18 17 24 21 28 C 26 31 30 26 32 23 Z" fill="#7B9656" />
  <path d="M 32 23 C 41 18 47 24 43 28 C 38 31 34 26 32 23 Z" fill="#7B9656" />
</svg>`;
  fs.writeFileSync('public/favicon.svg', svgContent, 'utf8');

  // --- 5. GENERATE HIGH-RES ICONS (FULL LOGO ON CREAM BACKGROUND) ---
  const trimmedFullLogo = await sharp(logoPath).trim().toBuffer();

  // Apple touch icon: 180x180 on brand cream (#FAF8F3)
  const full180Inner = await sharp(trimmedFullLogo)
    .resize(150, 150, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const appleTouchIcon180 = await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 250, g: 248, b: 243, alpha: 1 }, // #FAF8F3
    },
  })
    .composite([{ input: full180Inner, gravity: 'center' }])
    .png()
    .toBuffer();

  fs.writeFileSync('public/apple-touch-icon.png', appleTouchIcon180);
  fs.writeFileSync('public/apple-touch-icon-precomposed.png', appleTouchIcon180);

  // Android Chrome 192x192
  const full192Inner = await sharp(trimmedFullLogo)
    .resize(160, 160, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const android192 = await sharp({
    create: {
      width: 192,
      height: 192,
      channels: 4,
      background: { r: 250, g: 248, b: 243, alpha: 1 },
    },
  })
    .composite([{ input: full192Inner, gravity: 'center' }])
    .png()
    .toBuffer();

  fs.writeFileSync('public/android-chrome-192x192.png', android192);

  // Android Chrome 512x512
  const full512Inner = await sharp(trimmedFullLogo)
    .resize(440, 440, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const android512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 250, g: 248, b: 243, alpha: 1 },
    },
  })
    .composite([{ input: full512Inner, gravity: 'center' }])
    .png()
    .toBuffer();

  fs.writeFileSync('public/android-chrome-512x512.png', android512);

  // --- 6. CREATE PWA WEB MANIFEST ---
  const manifest = {
    name: 'Naati Organics',
    short_name: 'Naati Organics',
    description: 'Fix the Soil. Feed the Plant. Premium Agricultural Science & Nutrition Platform.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F1E7',
    theme_color: '#14240E',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };

  fs.writeFileSync('public/site.webmanifest', JSON.stringify(manifest, null, 2), 'utf8');

  console.log('✅ All favicons and icons generated successfully!');
}

generateFavicons().catch((err) => {
  console.error('Failed to generate favicons:', err);
  process.exit(1);
});
