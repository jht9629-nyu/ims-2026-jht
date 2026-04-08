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
let layer;

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
  layer = createGraphics(avideo.width, avideo.height);
  layer.noStroke();
}

function draw() {
  // console.log('avideo.width', avideo.width, avideo.height);
  if (!layer) return;
  let aimage = avideo.get();
  for (let i = 0; i < 900; i++) {
    draw_one(aimage);
  }
  // Draw the image and scale it to fit within the canvas.
  image(layer, 0, 0, width, height, 0, 0, layer.width, layer.height, CONTAIN);
}

// https://p5js.org/reference/p5/image/

function draw_one(aimage) {
  let x = random(0, avideo.width);
  let y = random(0, avideo.height);

  let pixelColor = aimage.get(x, y); //get a single pixel

  layer.fill(pixelColor);
  layer.circle(x, y, 10);
}
