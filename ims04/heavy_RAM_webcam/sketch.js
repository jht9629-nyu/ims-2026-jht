// https://editor.p5js.org/jht9629-nyu/sketches/OBYuc5crK
// heavy RAM webcam v2
/*
- scale to full screen
- video_ready call back need to get correct video size
*/
// https://editor.p5js.org/jht9629-nyu/sketches/wKnsTemeO
// https://editor.p5js.org/rafiiia/sketches/hOGUXUHzU

let avideo;
let pixelColor;
let numSlices;
let sliceWidth;
let slices = [];
let layer;

function preload() {
}

function setup() {
  createCanvas(windowWidth, windowHeight); //set the canvas to match the image size
  avideo = createCapture(VIDEO, video_ready);
  // video width not ready yet
  console.log('setup avideo.width', avideo.width, avideo.height);
}

function video_ready() {
  console.log('video_ready avideo.width', avideo.width, avideo.height);
  layer = createGraphics(avideo.width, avideo.height);
  layer.noStroke();
}


function draw() {
  // console.log('avideo.width', avideo.width, avideo.height);
  if (! layer) return;
  let aimage = avideo.get();
  for (let i = 0; i < 900; i++) {
    draw_one(aimage);
  }
  image(layer,0,0,width, height);
}

function draw_one(aimage) {
  // scale(0.2, [0.2]);
  // image(avideo, 0, 0, (avideo.width)/2, (avideo.height)/2);
  let x = random(0, avideo.width);
  let y = random(0, avideo.height);

  pixelColor = aimage.get(x, y); //get a single pixel

  layer.fill(pixelColor);
  layer.circle(x, y, 10);
  // fill(pixelColor);
  // circle(mouseX, mouseY, 50); //reverse
}
