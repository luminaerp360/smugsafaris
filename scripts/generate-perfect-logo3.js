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

// Find the bottom boundary of the green swoosh for each column x
const swooshBottom = new Int32Array(width).fill(-1);
for (let x = 270; x < 900; x++) {
  for (let y = 398; y >= 250; y--) {
    const idx = (y * width + x) * 4;
    const r = pixels[idx], g = pixels[idx+1], b = pixels[idx+2];
    if (g > 60 || r > 60) {
      swooshBottom[x] = y;
      break;
    }
  }
}

const outPixels = Buffer.alloc(width * height * 4);

const sunCx = 505;
const sunCy = 296;
const sunR = 247;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const r = pixels[idx], g = pixels[idx+1], b = pixels[idx+2];
    const maxC = Math.max(r, g, b);

    if (y >= 400) {
      // TEXT REGION
      if (maxC < 30) {
        outPixels[idx] = 0;
        outPixels[idx+1] = 0;
        outPixels[idx+2] = 0;
        outPixels[idx+3] = 0;
      } else {
        let alpha = 255;
        if (maxC < 45) {
          alpha = Math.max(0, Math.min(255, Math.round(((maxC - 5) / 40) * 255)));
        }
        outPixels[idx] = r;
        outPixels[idx+1] = g;
        outPixels[idx+2] = b;
        outPixels[idx+3] = alpha;
      }
    } else {
      // EMBLEM REGION (y < 400)
      if (maxC >= 30) {
        // Any pixel with color: sun, tree leaves, mountain, crane, plane, swoosh
        let alpha = 255;
        if (maxC < 45) {
          alpha = Math.max(0, Math.min(255, Math.round(((maxC - 5) / 40) * 255)));
        }
        outPixels[idx] = r;
        outPixels[idx+1] = g;
        outPixels[idx+2] = b;
        outPixels[idx+3] = alpha;
      } else {
        // Black pixel:
        // 1) Inside circular sun disk AND above swoosh bottom (elephant, giraffe, birds, acacia, ground)
        const distSq = (x - sunCx) * (x - sunCx) + (y - sunCy) * (y - sunCy);
        const inSun = (distSq <= sunR * sunR);
        const aboveSwoosh = (swooshBottom[x] !== -1 ? y <= swooshBottom[x] : y <= 385);
        // 2) Tree canopy overhang on left: between x: 235 and 275, y: 160 and 205
        const inTreeCanopy = (x >= 235 && x <= 275 && y >= 160 && y <= 205);

        if ((inSun && aboveSwoosh) || inTreeCanopy) {
          // Silhouette: Solid black!
          outPixels[idx] = r;
          outPixels[idx+1] = g;
          outPixels[idx+2] = b;
          outPixels[idx+3] = 255;
        } else {
          // Background: Transparent!
          outPixels[idx] = 0;
          outPixels[idx+1] = 0;
          outPixels[idx+2] = 0;
          outPixels[idx+3] = 0;
        }
      }
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

const pad = 10;
const x0 = Math.max(0, minX - pad);
const y0 = Math.max(0, minY - pad);
const w = Math.min(width - x0, (maxX - minX + 1) + pad * 2);
const h = Math.min(height - y0, (maxY - minY + 1) + pad * 2);

const cropped = cropRect(outPixels, width, height, x0, y0, w, h);
fs.writeFileSync('public/logo-transparent.png', encodePNG(cropped, w, h));
fs.writeFileSync('src/assets/logo-transparent.png', encodePNG(cropped, w, h));

// Also generate pure emblem (y < 400)
let embMinX = width, embMaxX = 0, embMinY = height, embMaxY = 0;
for (let y = 0; y < 398; y++) {
  for (let x = 0; x < width; x++) {
    const a = outPixels[(y * width + x) * 4 + 3];
    if (a > 10) {
      if (x < embMinX) embMinX = x;
      if (x > embMaxX) embMaxX = x;
      if (y < embMinY) embMinY = y;
      if (y > embMaxY) embMaxY = y;
    }
  }
}
const embX0 = Math.max(0, embMinX - pad);
const embY0 = Math.max(0, embMinY - pad);
const embW = Math.min(width - embX0, (embMaxX - embMinX + 1) + pad * 2);
const embH = Math.min(height - embY0, (embMaxY - embMinY + 1) + pad * 2);
const croppedEmb = cropRect(outPixels, width, height, embX0, embY0, embW, embH);
fs.writeFileSync('public/logo-emblem-transparent.png', encodePNG(croppedEmb, embW, embH));
fs.writeFileSync('src/assets/logo-emblem-transparent.png', encodePNG(croppedEmb, embW, embH));

// Also generate pure typography (y >= 400)
let txtMinX = width, txtMaxX = 0, txtMinY = height, txtMaxY = 0;
for (let y = 400; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const a = outPixels[(y * width + x) * 4 + 3];
    if (a > 10) {
      if (x < txtMinX) txtMinX = x;
      if (x > txtMaxX) txtMaxX = x;
      if (y < txtMinY) txtMinY = y;
      if (y > txtMaxY) txtMaxY = y;
    }
  }
}
const txtX0 = Math.max(0, txtMinX - pad);
const txtY0 = Math.max(0, txtMinY - pad);
const txtW = Math.min(width - txtX0, (txtMaxX - txtMinX + 1) + pad * 2);
const txtH = Math.min(height - txtY0, (txtMaxY - txtMinY + 1) + pad * 2);
const croppedTxt = cropRect(outPixels, width, height, txtX0, txtY0, txtW, txtH);
fs.writeFileSync('public/logo-text-transparent.png', encodePNG(croppedTxt, txtW, txtH));
fs.writeFileSync('src/assets/logo-text-transparent.png', encodePNG(croppedTxt, txtW, txtH));

console.log(`Generated logo-transparent.png (${w}x${h})`);
console.log(`Generated logo-emblem-transparent.png (${embW}x${embH})`);
console.log(`Generated logo-text-transparent.png (${txtW}x${txtH})`);
