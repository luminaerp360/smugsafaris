import fs from 'fs';
import path from 'path';
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

const srcFile = 'public/logo.png';
const { pixels, width, height } = decodePNG(srcFile);
console.log(`Original: ${width}x${height}`);

// Ensure directories
['public', 'src/assets'].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Calculate outer background mask (connected black pixels from borders)
const bgMask = new Float32Array(width * height);
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

  if (maxC < 32) {
    bgMask[p] = 1.0;
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

// 1. Transparent Full Logo
const transPixels = Buffer.alloc(width * height * 4);
for (let i = 0; i < width * height; i++) {
  const idx = i * 4;
  if (bgMask[i] === 1.0) {
    transPixels[idx] = 0;
    transPixels[idx+1] = 0;
    transPixels[idx+2] = 0;
    transPixels[idx+3] = 0;
  } else {
    transPixels[idx] = pixels[idx];
    transPixels[idx+1] = pixels[idx+1];
    transPixels[idx+2] = pixels[idx+2];
    transPixels[idx+3] = 255;
  }
}

const transPNG = encodePNG(transPixels, width, height);
fs.writeFileSync('public/logo-transparent.png', transPNG);
fs.writeFileSync('src/assets/logo-transparent.png', transPNG);

// 2. Crop Emblem (circle & airplane)
const embX0 = 60, embY0 = 45;
const embW = 910, embH = 385;

function crop(srcPix, srcW, srcH, x0, y0, w, h, isTrans = false) {
  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const srcX = x0 + x;
      const srcY = y0 + y;
      if (srcX >= 0 && srcX < srcW && srcY >= 0 && srcY < srcH) {
        const srcP = srcY * srcW + srcX;
        const srcIdx = srcP * 4;
        const dstIdx = (y * w + x) * 4;
        if (isTrans && bgMask[srcP] === 1.0) {
          out[dstIdx] = 0;
          out[dstIdx+1] = 0;
          out[dstIdx+2] = 0;
          out[dstIdx+3] = 0;
        } else {
          out[dstIdx] = srcPix[srcIdx];
          out[dstIdx+1] = srcPix[srcIdx+1];
          out[dstIdx+2] = srcPix[srcIdx+2];
          out[dstIdx+3] = srcPix[srcIdx+3] ?? 255;
        }
      }
    }
  }
  return out;
}

const embSolid = crop(pixels, width, height, embX0, embY0, embW, embH, false);
const embTrans = crop(pixels, width, height, embX0, embY0, embW, embH, true);
fs.writeFileSync('public/logo-emblem.png', encodePNG(embSolid, embW, embH));
fs.writeFileSync('src/assets/logo-emblem.png', encodePNG(embSolid, embW, embH));
fs.writeFileSync('public/logo-emblem-transparent.png', encodePNG(embTrans, embW, embH));
fs.writeFileSync('src/assets/logo-emblem-transparent.png', encodePNG(embTrans, embW, embH));

// 3. Crop Text Block
const txtX0 = 40, txtY0 = 415;
const txtW = 944, txtH = 220;
const txtSolid = crop(pixels, width, height, txtX0, txtY0, txtW, txtH, false);
const txtTrans = crop(pixels, width, height, txtX0, txtY0, txtW, txtH, true);
fs.writeFileSync('public/logo-text.png', encodePNG(txtSolid, txtW, txtH));
fs.writeFileSync('src/assets/logo-text.png', encodePNG(txtSolid, txtW, txtH));
fs.writeFileSync('public/logo-text-transparent.png', encodePNG(txtTrans, txtW, txtH));
fs.writeFileSync('src/assets/logo-text-transparent.png', encodePNG(txtTrans, txtW, txtH));

// 4. Create Horizontal Side-by-Side Logo (Height = 220)
// Resize emblem to fit height 220, place on left; place text block on right
const targetH = 220;
const scaleEmb = targetH / embH; // 220 / 385 ≈ 0.5714
const scaledEmbW = Math.round(embW * scaleEmb); // 910 * 0.5714 ≈ 520
const gap = 30;
const horizW = scaledEmbW + gap + txtW;
const horizH = targetH;

function bilinearSample(srcPix, srcW, srcH, u, v) {
  const x = Math.max(0, Math.min(srcW - 1, u));
  const y = Math.max(0, Math.min(srcH - 1, v));
  const x0 = Math.floor(x), x1 = Math.min(srcW - 1, x0 + 1);
  const y0 = Math.floor(y), y1 = Math.min(srcH - 1, y0 + 1);
  const fx = x - x0, fy = y - y0;

  const idx00 = (y0 * srcW + x0) * 4;
  const idx10 = (y0 * srcW + x1) * 4;
  const idx01 = (y1 * srcW + x0) * 4;
  const idx11 = (y1 * srcW + x1) * 4;

  const rgba = [0, 0, 0, 0];
  for (let c = 0; c < 4; c++) {
    const c00 = srcPix[idx00 + c];
    const c10 = srcPix[idx10 + c];
    const c01 = srcPix[idx01 + c];
    const c11 = srcPix[idx11 + c];
    const top = c00 * (1 - fx) + c10 * fx;
    const bot = c01 * (1 - fx) + c11 * fx;
    rgba[c] = Math.round(top * (1 - fy) + bot * fy);
  }
  return rgba;
}

function makeHorizontal(embData, txtData, isTrans) {
  const out = Buffer.alloc(horizW * horizH * 4);
  if (!isTrans) {
    // Fill with black
    for (let i = 0; i < horizW * horizH; i++) {
      out[i * 4] = 0;
      out[i * 4 + 1] = 0;
      out[i * 4 + 2] = 0;
      out[i * 4 + 3] = 255;
    }
  }

  // Draw Scaled Emblem
  for (let y = 0; y < horizH; y++) {
    for (let x = 0; x < scaledEmbW; x++) {
      const srcU = x / scaleEmb;
      const srcV = y / scaleEmb;
      const [r, g, b, a] = bilinearSample(embData, embW, embH, srcU, srcV);
      const dstIdx = (y * horizW + x) * 4;
      if (a > 0) {
        out[dstIdx] = r;
        out[dstIdx+1] = g;
        out[dstIdx+2] = b;
        out[dstIdx+3] = a;
      }
    }
  }

  // Draw Text Block
  const textStartX = scaledEmbW + gap;
  for (let y = 0; y < txtH; y++) {
    for (let x = 0; x < txtW; x++) {
      const srcIdx = (y * txtW + x) * 4;
      const r = txtData[srcIdx];
      const g = txtData[srcIdx+1];
      const b = txtData[srcIdx+2];
      const a = txtData[srcIdx+3];
      const dstIdx = (y * horizW + (textStartX + x)) * 4;
      if (a > 0) {
        out[dstIdx] = r;
        out[dstIdx+1] = g;
        out[dstIdx+2] = b;
        out[dstIdx+3] = a;
      }
    }
  }
  return out;
}

const horizSolid = makeHorizontal(embSolid, txtSolid, false);
const horizTrans = makeHorizontal(embTrans, txtTrans, true);

fs.writeFileSync('public/logo-horizontal.png', encodePNG(horizSolid, horizW, horizH));
fs.writeFileSync('src/assets/logo-horizontal.png', encodePNG(horizSolid, horizW, horizH));
fs.writeFileSync('public/logo-horizontal-transparent.png', encodePNG(horizTrans, horizW, horizH));
fs.writeFileSync('src/assets/logo-horizontal-transparent.png', encodePNG(horizTrans, horizW, horizH));

console.log(`Generated Horizontal logo: ${horizW}x${horizH}`);
console.log('Finished creating all logo assets.');
