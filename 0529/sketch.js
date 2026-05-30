// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
// Displays a new UUID on each click or every 2 seconds

let uuid = '';
let age = 0;
let interval = 120; // frames between auto-refresh

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textFont('monospace');
  newUUID();
}

function draw() {
  age++;
  if (age >= interval) newUUID();

  background(0);

  // progress bar at bottom
  let progress = age / interval;
  noStroke();
  fill(40);
  rect(0, height - 4, width, 4);
  fill(80, 200, 120);
  rect(0, height - 4, width * progress, 4);

  // UUID text
  let fs = constrain(width / 20, 14, 36);
  textSize(fs);
  fill(80, 200, 120);
  text(uuid, width / 2, height / 2);

  // label
  textSize(fs * 0.5);
  fill(100);
  text('crypto.randomUUID()  —  click or wait for new', width / 2, height / 2 - fs * 1.4);
}

function newUUID() {
  uuid = crypto.randomUUID();
  age = 0;
}

function mousePressed() {
  newUUID();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
