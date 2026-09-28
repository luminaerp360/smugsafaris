const fs = require('fs');
const path = require('path');

const videosDir = path.join(__dirname, '..', 'public', 'videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

const list = [
  { name: 'safari-hero-bg.mp4', url: 'https://assets.mixkit.co/videos/11239/11239-720.mp4' },
  { name: 'lion-pride.mp4', url: 'https://assets.mixkit.co/videos/6736/6736-720.mp4' },
  { name: 'elephant-herd.mp4', url: 'https://assets.mixkit.co/videos/11088/11088-720.mp4' },
  { name: 'giraffe-savanna.mp4', url: 'https://assets.mixkit.co/videos/16967/16967-720.mp4' },
  { name: 'cheetah-wild.mp4', url: 'https://assets.mixkit.co/videos/11054/11054-720.mp4' },
  { name: 'safari-landscape.mp4', url: 'https://assets.mixkit.co/videos/11146/11146-720.mp4' },
];

async function download(item) {
  const dest = path.join(videosDir, item.name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 100000) {
    console.log(`Already exists: ${item.name} (${fs.statSync(dest).size} bytes)`);
    return;
  }
  console.log(`Downloading ${item.name} from ${item.url}...`);
  const res = await fetch(item.url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buffer);
  console.log(`Saved ${item.name}: ${buffer.length} bytes`);
}

async function run() {
  for (const item of list) {
    try {
      await download(item);
    } catch (e) {
      console.error(`Failed ${item.name}:`, e.message);
    }
  }
}
run();
