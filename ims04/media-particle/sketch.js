// https://editor.p5js.org/jht9629-nyu/sketches/CDlUfTNmy
// ims04-media-particle

/*
- plan
[] adjust with sliders:
  let ballRepulsion = constrain(map(ballDistance, 0, 100, 10, 0), 0, 10);
  let homeAttraction = map(homeDistance, 0, 100, 0, 10);
[] url params for options
[] res proporational to screen size
[x] mobile friendly meta viewport
*/

let res = 16; // size of fat pixel circle
let aimage;
let aheight; // canvas height adjust for image aspect ratio
let ayoffset;
let avideo;
// let alayer;
let particles = [];
let ball;
let show_video = false;
let show_pause = 2; // Wait show_pause seconds before switching to video
let ball_move_noise = 0;
let ashape;

function preload() {
  let url = 'https://jht1493-gmail.github.io/jht-site/aa/media/colorized-jht_height=320&width=240.jpg';
  aimage = loadImage(url);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  adjust_height_aspect_ratio();

  // ashape = CircleShape;
  // ashape = HexShape;
  ashape = DiamonShape;
  ashape.placeParticles();

  noStroke();
  ball = new Ball();

  avideo = createCapture(VIDEO, video_ready);
}

// Adjust height to keep image aspect ration
function adjust_height_aspect_ratio() {
  let r = aimage.height / aimage.width;
  aheight = width * r;
  ayoffset = (height - aheight) / 2;
}

function video_ready() {
  console.log('video_ready avideo.width', avideo.width, avideo.height);
  // alayer = createGraphics(avideo.width, avideo.height);
  // alayer.noStroke();
  // Wait show_pause seconds before switching to video
  setTimeout(prepare_video, show_pause * 1000);
}

function prepare_video() {
  aimage = avideo.get();

  adjust_height_aspect_ratio();

  ashape.placeParticles();

  ball.random_loc();

  show_video = true;
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
// setTimeout(func, delay-milliseconds)

function draw() {
  background(0);

  // Draw the image and scale it to fit within the canvas.
  // image(avideo, 0, 0, width, height, 0, 0, avideo.width, avideo.height, CONTAIN);

  if (show_video) {
    aimage = avideo.get();
    refreshParticles();
  }
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  if (ball_move_noise) ball.move_noise();
  else ball.move();
  ball.draw();
  // image(aimage, 0, 0, width, height);
}

function refreshParticles() {
  for (part of particles) {
    part.selectColor();
  }
}

// Get image color corresponding to x,y on canvas
function img_color_xy(cx, cy) {
  // map from canvas to image coordinates - fill
  let x = (cx / width) * aimage.width;
  let y = (cy / aheight) * aimage.height;
  let c = aimage.get(x, y);
  return c;
}

// https://editor.p5js.org/jht9629-nyu/sketches/584bCKj5G
// ims04-image-particle
// https://openprocessing.org/sketch/2911242
// https://openprocessing.org/sketch/1685260
// Particule, img, attraction, repulsion... by Richnou
// From https://editor.p5js.org/BarneyCodes/sketches/k0ImyGuo9
// with a autonomous ball living in sketch
// https://www.youtube.com/@BarneyCodes
// https://editor.p5js.org/BarneyCodes/sketches/

// https://editor.p5js.org/jht9629-nyu/sketches/TtVWUuKVC
// ims04-video-particle
