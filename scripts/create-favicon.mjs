import fs from 'fs';
import path from 'path';

// 1. Create public/favicon.svg
const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="8" fill="#14240E"/>
  <path d="M9 24V8h3.2l7.6 10.8V8H23v16h-3.2L12.2 13.2V24H9z" fill="#D6C895"/>
  <circle cx="23" cy="8" r="2" fill="#889063"/>
</svg>`;

fs.writeFileSync('public/favicon.svg', svgFavicon, 'utf8');

// 2. Generate a valid ICO file containing a 32x32 uncompressed BMP
// ICO header: 6 bytes
// Directory entry: 16 bytes
// BMP info header: 40 bytes + color palette + bitmap data
function createSimpleIco() {
  const width = 32;
  const height = 32;
  const bpp = 32;
  const imageSize = 40 + (width * height * 4); // 40 byte header + 32x32x4 RGBA
  const totalSize = 6 + 16 + imageSize;

  const buffer = Buffer.alloc(totalSize);

  // ICONDIR
  buffer.writeUInt16LE(0, 0); // Reserved
  buffer.writeUInt16LE(1, 2); // Type 1 = ICO
  buffer.writeUInt16LE(1, 4); // 1 image

  // ICONDIRENTRY
  buffer.writeUInt8(width, 6);       // Width
  buffer.writeUInt8(height, 7);      // Height
  buffer.writeUInt8(0, 8);           // Color count (0 = >=8bpp)
  buffer.writeUInt8(0, 9);           // Reserved
  buffer.writeUInt16LE(1, 10);       // Color planes
  buffer.writeUInt16LE(bpp, 12);     // Bits per pixel
  buffer.writeUInt32LE(imageSize, 14); // Bytes in resource
  buffer.writeUInt32LE(22, 18);      // Offset of BMP data

  // BITMAPINFOHEADER (40 bytes)
  const bmpOffset = 22;
  buffer.writeUInt32LE(40, bmpOffset);          // Header size
  buffer.writeInt32LE(width, bmpOffset + 4);    // Width
  buffer.writeInt32LE(height * 2, bmpOffset + 8); // Height * 2 (includes AND mask)
  buffer.writeUInt16LE(1, bmpOffset + 12);       // Planes
  buffer.writeUInt16LE(bpp, bmpOffset + 14);     // Bits per pixel
  buffer.writeUInt32LE(0, bmpOffset + 16);       // Compression (0 = BI_RGB)
  buffer.writeUInt32LE(width * height * 4, bmpOffset + 20); // Image size
  buffer.writeInt32LE(0, bmpOffset + 24);       // X pixels per meter
  buffer.writeInt32LE(0, bmpOffset + 28);       // Y pixels per meter
  buffer.writeUInt32LE(0, bmpOffset + 32);       // Colors used
  buffer.writeUInt32LE(0, bmpOffset + 36);       // Important colors

  // Pixel data (BGRA, bottom-up)
  const pixelOffset = bmpOffset + 40;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = pixelOffset + (y * width + x) * 4;
      // Brand color #14240E -> R:20, G:36, B:14
      // Accent #D6C895 in center
      const inCenter = (x >= 8 && x <= 23 && y >= 8 && y <= 23);
      if (inCenter) {
        // Harvest gold: #D6C895 (B: 149, G: 200, R: 214)
        buffer.writeUInt8(149, idx);     // Blue
        buffer.writeUInt8(200, idx + 1); // Green
        buffer.writeUInt8(214, idx + 2); // Red
        buffer.writeUInt8(255, idx + 3); // Alpha
      } else {
        // Deep forest: #14240E (B: 14, G: 36, R: 20)
        buffer.writeUInt8(14, idx);      // Blue
        buffer.writeUInt8(36, idx + 1);  // Green
        buffer.writeUInt8(20, idx + 2);  // Red
        buffer.writeUInt8(255, idx + 3); // Alpha
      }
    }
  }

  return buffer;
}

fs.writeFileSync('public/favicon.ico', createSimpleIco());
console.log('Created public/favicon.svg and public/favicon.ico successfully.');
