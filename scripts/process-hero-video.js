const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const downloadsDir = 'C:/Users/shash/Downloads';
const targetDir = path.resolve(__dirname, '../public/assets/videos/home');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const inputCandidates = [
  'naati-hero-no-gemini-watermark.mp4',
  'C:/Users/shash/Downloads/naati-hero-no-gemini-watermark.mp4',
];

let inputPath = inputCandidates.find(p => fs.existsSync(p));
if (!inputPath) {
  const downloadCandidate = fs.existsSync(downloadsDir) && fs.readdirSync(downloadsDir).find(f => f.includes('no-gemini-watermark') && f.endsWith('.mp4'));
  if (downloadCandidate) {
    inputPath = path.join(downloadsDir, downloadCandidate);
  }
}

if (!inputPath) {
  console.error('Could not find naati-hero-no-gemini-watermark.mp4');
  process.exit(1);
}
const outputVideo = path.join(targetDir, 'naati-hero-scrub.mp4');
const outputPoster = path.join(targetDir, 'hero-poster.jpg');

console.log('Input:', inputPath);
console.log('Optimizing video to:', outputVideo);

// 1. FFmpeg video optimization for ultra-smooth scroll scrubbing
const ffmpegArgs = [
  '-y',
  '-i', inputPath,
  '-map', '0:v:0',
  '-c:v', 'libx264',
  '-preset', 'medium',
  '-crf', '18',
  '-pix_fmt', 'yuv420p',
  '-r', '24',
  '-bf', '0',               // Zero B-frames ensures instant bidirectional seeking
  '-g', '4',                // Keyframe every 4 frames (6 keyframes/sec)
  '-keyint_min', '4',
  '-sc_threshold', '0',
  '-movflags', '+faststart', // moov atom at beginning of MP4
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
