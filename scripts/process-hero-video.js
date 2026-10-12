const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const downloadsDir = 'C:/Users/shash/Downloads';
const targetDir = path.resolve(__dirname, '../public/assets/videos/home');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const inputName = fs.readdirSync(downloadsDir).find(f => f.includes('20261009155943') && f.endsWith('.mp4'));
if (!inputName) {
  console.error('Could not find input video in Downloads');
  process.exit(1);
}

const inputPath = path.join(downloadsDir, inputName);
const outputVideo = path.join(targetDir, 'naati-hero-scrub.mp4');
const outputPoster = path.join(targetDir, 'hero-poster.jpg');

console.log('Input:', inputPath);
console.log('Optimizing video to:', outputVideo);

// 1. FFmpeg video optimization
const ffmpegArgs = [
  '-y',
  '-i', inputPath,
  '-map', '0:v:0',
  '-c:v', 'libx264',
  '-preset', 'medium',
  '-crf', '19',
  '-pix_fmt', 'yuv420p',
  '-r', '24',
  '-g', '6',
  '-keyint_min', '6',
  '-sc_threshold', '0',
  '-movflags', '+faststart',
  '-an',
  outputVideo
];

const res1 = spawnSync('ffmpeg', ffmpegArgs, { stdio: 'inherit' });
if (res1.status !== 0) {
  console.error('FFmpeg failed on video optimization');
  process.exit(res1.status);
}

console.log('Generating first-frame poster to:', outputPoster);

// 2. FFmpeg first-frame poster extraction
const posterArgs = [
  '-y',
  '-i', outputVideo,
  '-vframes', '1',
  '-q:v', '2',
  outputPoster
];

const res2 = spawnSync('ffmpeg', posterArgs, { stdio: 'inherit' });
if (res2.status !== 0) {
  console.error('FFmpeg failed on poster extraction');
  process.exit(res2.status);
}

console.log('Successfully generated video and poster!');
console.log('Optimized Video:', fs.statSync(outputVideo).size, 'bytes');
console.log('Poster Image:', fs.statSync(outputPoster).size, 'bytes');
