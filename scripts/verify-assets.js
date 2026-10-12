const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) results = results.concat(walk(full));
    else if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(full);
  });
  return results;
}

const files = walk('./src');
const missing = [];
const imageSrcRegex = /src=["'](\/[^"']+\.(jpg|jpeg|png|webp|svg|mp4))["']/g;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = imageSrcRegex.exec(content)) !== null) {
    const assetPath = match[1];
    const localPath = path.join('./public', assetPath);
    if (!fs.existsSync(localPath)) {
      missing.push({ file: f, asset: assetPath });
    }
  }
});

console.log('Total files checked:', files.length);
console.log('Missing assets count:', missing.length);
if (missing.length > 0) {
  console.log('Missing assets details:', JSON.stringify(missing, null, 2));
} else {
  console.log('ALL static images, logos, and video assets exist in public/ directory!');
}
