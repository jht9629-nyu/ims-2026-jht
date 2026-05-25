// https://x.com/madparker/status/1328187155794055169
// p5.js port of Matt Parker's sketch_11_15

const n = 480;
let m = 0;
let oR = 0, oG = 0, oB = 0;
let pR = 0, pG = 0, pB = 0;

function setup() {
  pixelDensity(1);
  createCanvas(n, n);
  colorMode(HSB, n);
  background(0);
}

function draw() {
  loadPixels();

  if (m < 1 || m >= n * n) {
    oR = pR; oG = pG; oB = pB;
    setPixel(n - 1, n - 1, oR, oG, oB);
    const col = color(random(n), n, n);
    pR = Math.round(red(col));
    pG = Math.round(green(col));
    pB = Math.round(blue(col));
    setPixel(9, 9, pR, pG, pB);
  }

  m = 0;
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      m += c(x, y, oR, oG, oB) + c(x, y, pR, pG, pB);
    }
  }

  updatePixels();
}

function setPixel(x, y, r, g, b) {
  if (x < 0 || x >= n || y < 0 || y >= n) return;
  const i = (y * n + x) * 4;
  pixels[i]     = r;
  pixels[i + 1] = g;
  pixels[i + 2] = b;
  pixels[i + 3] = 255;
}

function c(x, y, r, g, b) {
  const i = (y * n + x) * 4;
  if (pixels[i] === r && pixels[i + 1] === g && pixels[i + 2] === b) {
    const nx = x + (Math.floor(random(4)) - 2);
    const ny = y + (Math.floor(random(4)) - 2);
    setPixel(nx, ny, r, g, b);
    return 1;
  }
  return 0;
}
