import fs from 'fs';
import zlib from 'zlib';

function decodePNG(filePath) {
  const buf = fs.readFileSync(filePath);
  let pos = 8;
  const chunks = [];
  let width, height;
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IHDR') {
      width = buf.readUInt32BE(pos + 8);
      height = buf.readUInt32BE(pos + 12);
    } else if (type === 'IDAT') {
      chunks.push(buf.slice(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }
  const data = zlib.inflateSync(Buffer.concat(chunks));
  const stride = 1 + width * 4;
  const pixels = Buffer.alloc(width * height * 4);
  let prevRow = Buffer.alloc(width * 4);
  for (let y = 0; y < height; y++) {
    const filterType = data[y * stride];
    const rowOffset = y * stride + 1;
    const curRow = Buffer.alloc(width * 4);
    for (let x = 0; x < width; x++) {
      for (let c = 0; c < 4; c++) {
        const raw = data[rowOffset + x * 4 + c];
        const a = x > 0 ? curRow[(x - 1) * 4 + c] : 0;
        const b = prevRow[x * 4 + c];
        const cVal = x > 0 ? prevRow[(x - 1) * 4 + c] : 0;
        let val;
        if (filterType === 0) val = raw;
        else if (filterType === 1) val = (raw + a) & 0xff;
        else if (filterType === 2) val = (raw + b) & 0xff;
        else if (filterType === 3) val = (raw + Math.floor((a + b) / 2)) & 0xff;
        else if (filterType === 4) {
          const p = a + b - cVal;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - cVal);
          let pr;
          if (pa <= pb && pa <= pc) pr = a;
          else if (pb <= pc) pr = b;
          else pr = cVal;
          val = (raw + pr) & 0xff;
        }
        curRow[x * 4 + c] = val;
      }
    }
    curRow.copy(pixels, y * width * 4);
    prevRow = curRow;
  }
  return { pixels, width, height };
}

function encodePNG(pixels, width, height) {
  const rowSize = 1 + width * 4;
  const raw = Buffer.alloc(height * rowSize);
  for (let y = 0; y < height; y++) {
    raw[y * rowSize] = 0;
    pixels.copy(raw, y * rowSize + 1, y * width * 4, (y + 1) * width * 4);
  }
  const compressed = zlib.deflateSync(raw, { level: 9 });

  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    crcTable[n] = c;
  }
  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = data.length;
    const chunk = Buffer.alloc(12 + len);
    chunk.writeUInt32BE(len, 0);
    chunk.write(type, 4, 4, 'ascii');
    data.copy(chunk, 8);
    const crcVal = crc32(chunk.slice(4, 8 + len));
    chunk.writeUInt32BE(crcVal, 8 + len);
    return chunk;
  }

  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  return Buffer.concat([
    sig,
    makeChunk('IHDR', ihdrData),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

const { pixels, width, height } = decodePNG('public/logo.png');

// Barrier to prevent flood fill from leaking into the black ground/elephant/tree
const isBarrier = new Uint8Array(width * height);

// On the left: between the sun's left edge and the green swoosh tip (x: 240 to 300, y: 350 to 380)
for (let y = 350; y <= 385; y++) {
  for (let x = 240; x <= 300; x++) {
    isBarrier[y * width + x] = 1;
  }
}

// Flood fill from all 4 image borders
const isBg = new Uint8Array(width * height);
const visited = new Uint8Array(width * height);
const queue = [];

for (let x = 0; x < width; x++) {
  queue.push(x);
  visited[x] = 1;
  const bottom = (height - 1) * width + x;
  queue.push(bottom);
  visited[bottom] = 1;
}
for (let y = 1; y < height - 1; y++) {
  const left = y * width;
  queue.push(left);
  visited[left] = 1;
  const right = y * width + (width - 1);
  queue.push(right);
  visited[right] = 1;
}

let head = 0;
while (head < queue.length) {
  const p = queue[head++];
  const idx = p * 4;
  const r = pixels[idx], g = pixels[idx+1], b = pixels[idx+2];
  const maxC = Math.max(r, g, b);

  if (isBarrier[p]) continue;

  if (maxC < 30) {
    isBg[p] = 1;
    const x = p % width;
    const y = Math.floor(p / width);
    const neighbors = [
      x > 0 ? p - 1 : -1,
      x < width - 1 ? p + 1 : -1,
      y > 0 ? p - width : -1,
      y < height - 1 ? p + width : -1
    ];
    for (const n of neighbors) {
      if (n >= 0 && !visited[n]) {
        visited[n] = 1;
        queue.push(n);
      }
    }
  }
}

const outPixels = Buffer.alloc(width * height * 4);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const p = y * width + x;
    const idx = p * 4;
    const r = pixels[idx], g = pixels[idx+1], b = pixels[idx+2];
    const maxC = Math.max(r, g, b);

    let transparent = false;
    if (isBg[p] === 1) {
      transparent = true;
    } else if (y >= 400 && maxC < 25) {
      // Clear letter loop counters
      transparent = true;
    }

    if (transparent) {
      outPixels[idx] = 0;
      outPixels[idx+1] = 0;
      outPixels[idx+2] = 0;
      outPixels[idx+3] = 0;
    } else {
      let alpha = 255;
      if (maxC < 40 && y >= 400) {
        alpha = Math.max(0, Math.min(255, Math.round(((maxC - 5) / 35) * 255)));
      }
      outPixels[idx] = r;
      outPixels[idx+1] = g;
      outPixels[idx+2] = b;
      outPixels[idx+3] = alpha;
    }
  }
}

function cropRect(srcPix, srcW, srcH, x0, y0, w, h) {
  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const sx = x0 + x;
      const sy = y0 + y;
      if (sx >= 0 && sx < srcW && sy >= 0 && sy < srcH) {
        const sIdx = (sy * srcW + sx) * 4;
        const dIdx = (y * w + x) * 4;
        out[dIdx] = srcPix[sIdx];
        out[dIdx+1] = srcPix[sIdx+1];
        out[dIdx+2] = srcPix[sIdx+2];
        out[dIdx+3] = srcPix[sIdx+3];
      }
    }
  }
  return out;
}

// Find non-transparent bounds
let minX = width, maxX = 0, minY = height, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const a = outPixels[(y * width + x) * 4 + 3];
    if (a > 10) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const pad = 8;
const x0 = Math.max(0, minX - pad);
const y0 = Math.max(0, minY - pad);
const w = Math.min(width - x0, (maxX - minX + 1) + pad * 2);
const h = Math.min(height - y0, (maxY - minY + 1) + pad * 2);

const cropped = cropRect(outPixels, width, height, x0, y0, w, h);
fs.writeFileSync('public/logo-transparent.png', encodePNG(cropped, w, h));
fs.writeFileSync('src/assets/logo-transparent.png', encodePNG(cropped, w, h));
console.log(`Saved logo-transparent.png (${w}x${h})`);
