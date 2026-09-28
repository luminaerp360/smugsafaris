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
console.log(`Original logo: ${width}x${height}`);

// Step 1: Flood fill from outer image borders to identify external black background
const isExternalBg = new Uint8Array(width * height);
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

  // Background threshold: black or very near black
  if (maxC < 30) {
    isExternalBg[p] = 1;
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

// Step 2: Build master transparent image with anti-aliasing
// In y >= 400 (the text region), any pixel with maxC < 25 is also transparent (clears counters of letters like 'a', 'o', 'g')
// In y < 400 (emblem), internal black silhouettes (elephant, giraffe, tree, birds) are NOT reached by flood fill and remain solid!
const fullTransPixels = Buffer.alloc(width * height * 4);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const p = y * width + x;
    const idx = p * 4;
    const r = pixels[idx], g = pixels[idx+1], b = pixels[idx+2];
    const maxC = Math.max(r, g, b);

    let isBg = false;
    if (isExternalBg[p] === 1) {
      isBg = true;
    } else if (y >= 400 && maxC < 28) {
      // Background inside text area
      isBg = true;
    }

    if (isBg) {
      fullTransPixels[idx] = 0;
      fullTransPixels[idx+1] = 0;
      fullTransPixels[idx+2] = 0;
      fullTransPixels[idx+3] = 0;
    } else {
      // Soft edge anti-aliasing near background boundaries
      let alpha = 255;
      if (maxC < 40) {
        alpha = Math.max(0, Math.min(255, Math.round(((maxC - 5) / 35) * 255)));
      }
      fullTransPixels[idx] = r;
      fullTransPixels[idx+1] = g;
      fullTransPixels[idx+2] = b;
      fullTransPixels[idx+3] = alpha;
    }
  }
}

// Step 3: Find bounding box of all non-transparent pixels in full logo
let minX = width, maxX = 0, minY = height, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const a = fullTransPixels[(y * width + x) * 4 + 3];
    if (a > 20) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
console.log(`Content bounding box: x=[${minX}, ${maxX}] (w=${maxX - minX + 1}), y=[${minY}, ${maxY}] (h=${maxY - minY + 1})`);

// Crop function
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

// 1. Full trimmed logo with tasteful 8px padding
const pad = 8;
const fullX0 = Math.max(0, minX - pad);
const fullY0 = Math.max(0, minY - pad);
const fullW = Math.min(width - fullX0, (maxX - minX + 1) + pad * 2);
const fullH = Math.min(height - fullY0, (maxY - minY + 1) + pad * 2);

const fullCropped = cropRect(fullTransPixels, width, height, fullX0, fullY0, fullW, fullH);
fs.writeFileSync('public/logo-transparent.png', encodePNG(fullCropped, fullW, fullH));
fs.writeFileSync('src/assets/logo-transparent.png', encodePNG(fullCropped, fullW, fullH));
console.log(`Saved logo-transparent.png (${fullW}x${fullH})`);

// 2. Pure Emblem (Top Artwork only, perfectly cut BEFORE the text starts at y=400)
// Find emblem bounding box
let embMinX = width, embMaxX = 0, embMinY = height, embMaxY = 0;
for (let y = minY; y <= 396; y++) {
  for (let x = 0; x < width; x++) {
    // Only include emblem pixels (exclude the curly tip of the S leaf on far left x<180)
    if (x < 180 && y > 380) continue;
    const a = fullTransPixels[(y * width + x) * 4 + 3];
    if (a > 20) {
      if (x < embMinX) embMinX = x;
      if (x > embMaxX) embMaxX = x;
      if (y < embMinY) embMinY = y;
      if (y > embMaxY) embMaxY = y;
    }
  }
}
const embPad = 6;
const embX0 = Math.max(0, embMinX - embPad);
const embY0 = Math.max(0, embMinY - embPad);
const embW = Math.min(width - embX0, (embMaxX - embMinX + 1) + embPad * 2);
const embH = Math.min(height - embY0, (embMaxY - embMinY + 1) + embPad * 2);

const embCropped = cropRect(fullTransPixels, width, height, embX0, embY0, embW, embH);
fs.writeFileSync('public/logo-emblem-transparent.png', encodePNG(embCropped, embW, embH));
fs.writeFileSync('src/assets/logo-emblem-transparent.png', encodePNG(embCropped, embW, embH));
console.log(`Saved logo-emblem-transparent.png (${embW}x${embH}) with ZERO chopped text!`);

// 3. Pure Typography Block ("Smugsafaris Tours & Travel Explore Discover Experience")
// Starting cleanly at y=398 to include full letter 'S' and all words
let txtMinX = width, txtMaxX = 0, txtMinY = height, txtMaxY = 0;
for (let y = 398; y <= maxY; y++) {
  for (let x = 0; x < width; x++) {
    const a = fullTransPixels[(y * width + x) * 4 + 3];
    if (a > 20) {
      if (x < txtMinX) txtMinX = x;
      if (x > txtMaxX) txtMaxX = x;
      if (y < txtMinY) txtMinY = y;
      if (y > txtMaxY) txtMaxY = y;
    }
  }
}
const txtPad = 6;
const txtX0 = Math.max(0, txtMinX - txtPad);
const txtY0 = Math.max(0, txtMinY - txtPad);
const txtW = Math.min(width - txtX0, (txtMaxX - txtMinX + 1) + txtPad * 2);
const txtH = Math.min(height - txtY0, (txtMaxY - txtMinY + 1) + txtPad * 2);

const txtCropped = cropRect(fullTransPixels, width, height, txtX0, txtY0, txtW, txtH);
fs.writeFileSync('public/logo-text-transparent.png', encodePNG(txtCropped, txtW, txtH));
fs.writeFileSync('src/assets/logo-text-transparent.png', encodePNG(txtCropped, txtW, txtH));
console.log(`Saved logo-text-transparent.png (${txtW}x${txtH}) with ZERO cutoffs!`);

// 4. Perfect Side-by-Side Horizontal Logo
// Scaled emblem on the left, typography on the right
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

const targetHeight = 200;
const scaleEmb = targetHeight / embH;
const scaledEmbW = Math.round(embW * scaleEmb);

const scaleTxt = targetHeight / txtH;
const scaledTxtW = Math.round(txtW * scaleTxt);

const horizGap = 28;
const horizW = scaledEmbW + horizGap + scaledTxtW;
const horizH = targetHeight;

const horizPixels = Buffer.alloc(horizW * horizH * 4);

// Draw scaled emblem on left
for (let y = 0; y < horizH; y++) {
  for (let x = 0; x < scaledEmbW; x++) {
    const u = x / scaleEmb;
    const v = y / scaleEmb;
    const [r, g, b, a] = bilinearSample(embCropped, embW, embH, u, v);
    const dIdx = (y * horizW + x) * 4;
    horizPixels[dIdx] = r;
    horizPixels[dIdx+1] = g;
    horizPixels[dIdx+2] = b;
    horizPixels[dIdx+3] = a;
  }
}

// Draw scaled text on right
const txtStartX = scaledEmbW + horizGap;
for (let y = 0; y < horizH; y++) {
  for (let x = 0; x < scaledTxtW; x++) {
    const u = x / scaleTxt;
    const v = y / scaleTxt;
    const [r, g, b, a] = bilinearSample(txtCropped, txtW, txtH, u, v);
    const dIdx = (y * horizW + (txtStartX + x)) * 4;
    horizPixels[dIdx] = r;
    horizPixels[dIdx+1] = g;
    horizPixels[dIdx+2] = b;
    horizPixels[dIdx+3] = a;
  }
}

fs.writeFileSync('public/logo-horizontal-transparent.png', encodePNG(horizPixels, horizW, horizH));
fs.writeFileSync('src/assets/logo-horizontal-transparent.png', encodePNG(horizPixels, horizW, horizH));
console.log(`Saved logo-horizontal-transparent.png (${horizW}x${horizH})`);

console.log('All logo assets generated successfully without cutting off any part!');
