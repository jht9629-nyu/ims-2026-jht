// https://x.com/madparker/status/1317229846511144961
// p5.js port of Matt Parker's sketch_10_16

// use s key to have red text cursor move into view

let s = 0,
  o = 0,
  p = 0,
  f = 0;
const c = 480;

function setup() {
  pixelDensity(1);
  createCanvas(c, c);
  noStroke();
}

function draw() {
  f++;
  s++;

  loadPixels();
  for (let x = 0; x < c; x++) {
    for (let y = 0; y < c; y++) {
      const v = round(noise((x + f) * 0.01, y / 99.0)) * 255;
      const i = (y * c + x) * 4;
      pixels[i] = v;
      pixels[i + 1] = v;
      pixels[i + 2] = v;
      pixels[i + 3] = 255;
    }
  }

  if (keyIsDown(65)) o = (o - 2 + c) % c; // a → left
  if (keyIsDown(68)) o = (o + 2) % c; // d → right
  if (keyIsDown(87)) p = (p - 2 + c) % c; // w → up
  if (keyIsDown(83)) p = (p + 2) % c; // s → down

  if (pixels[(p * c + o) * 4] > 0) s = 0;

  updatePixels();

  fill(255, 0, 0);
  text(s, o, p);
}
