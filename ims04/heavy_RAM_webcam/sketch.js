// https://editor.p5js.org/jht9629-nyu/sketches/OBYuc5crK
// heavy RAM webcam v2
/*
- mobile friendly meta name="viewport"
- use image CONTAIN to correct video aspect ratio
- scale to full screen
- video_ready call back need to get correct video size
*/
// https://editor.p5js.org/jht9629-nyu/sketches/wKnsTemeO
// https://editor.p5js.org/rafiiia/sketches/hOGUXUHzU

let avideo;
let alayer;
let ndraw = 900; // number of pixels to draw big
let draw_len = 10; // size of pixel shape

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight); //set the canvas to match the image size
  avideo = createCapture(VIDEO, video_ready);
  // video width not ready yet
  console.log('setup avideo.width', avideo.width, avideo.height);
  background(0);
}

function video_ready() {
  console.log('video_ready avideo.width', avideo.width, avideo.height);
  alayer = createGraphics(avideo.width, avideo.height);
  alayer.noStroke();
}

function draw() {
  // console.log('avideo.width', avideo.width, avideo.height);
  if (!alayer) return;
  let aimage = avideo.get();
  for (let i = 0; i < ndraw; i++) {
    draw_one(aimage);
  }
  // Draw the image and scale it to fit within the canvas.
  image(alayer, 0, 0, width, height, 0, 0, alayer.width, alayer.height, CONTAIN);
}

// https://p5js.org/reference/p5/image/
// image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight], [fit], [xAlign], [yAlign])

function draw_one(img) {
  let x = random(0, avideo.width);
  let y = random(0, avideo.height);

  let pixelColor = img.get(x, y); //get a single pixel

  alayer.fill(pixelColor);
  alayer.circle(x, y, draw_len);
}
