// https://editor.p5js.org/jht9629-nyu/sketches/l--iDtUbG
// ims-05-video shader
// shader effect with sliding window
// converted to use createShader vs. loadShader
// removed handPose, prep for p5video plugin

let video;
let window_left = 0.1; // 0.1 is 10% from the left edge of the video
let window_right = 0.6;
let window_top = 0.4; // 0.1 is 10% from the top edge of the video
let window_bottom = 0.6;
let shaderGraphic;
let myShader;
let my = {};

// function preload() {
//   // handPose = ml5.handPose({ flipped: true, runtime: 'mediapipe' });
//   myShader = loadShader('shader.vert', 'shader_effect.frag');
//   // myShader = loadShader('shader.vert', 'shader.frag');
// }

function setup() {
  createCanvas(windowWidth, windowHeight);

  myShader = createShader(shader_vert, shader_effect_frag);

  video = createCapture(VIDEO, { flipped: true }, capture_ready_callback);
  // video.size(1920, 1080);
  video.hide();

  setup_fullScreenBtn();
}

function capture_ready_callback() {
  console.log('capture_ready_callback width', video.width, video.height);

  shaderGraphic = createGraphics(video.width, video.height, WEBGL);
  shaderGraphic.clear();
}

function draw() {
  if (!shaderGraphic) return;
  // image(video, 0, 0);

  shaderGraphic.shader(myShader);

  myShader.setUniform('tex0', video);
  myShader.setUniform('window_left', window_left);
  myShader.setUniform('window_right', window_right);
  myShader.setUniform('window_top', window_top);
  myShader.setUniform('window_bottom', window_bottom);

  shaderGraphic.shader(myShader);

  let vwidth = video.width;
  let vheight = video.height;

  shaderGraphic.rect(0, 0, vwidth, vheight);

  // render the shaderGraphic scaling it to fit \
  // while maintaining aspect ratio
  let nwidth = width;
  let nheight = width * (vheight / vwidth);
  image(shaderGraphic, 0, 0, nwidth, nheight, 0, 0, vwidth, vheight);

  my.fpsSpan.html(framesPerSecond());
}

// --
function framesPerSecond() {
  return frameRate().toFixed(2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup_fullScreenBtn() {
  my.fullScreenBtn = createButton('?v=16 Full Screen');
  my.fullScreenBtn.mousePressed(full_screen_action);
  my.fullScreenBtn.style('font-size:42px');
  my.fpsSpan = createSpan('');
  my.fpsSpan.style('font-size:42px');
}

function full_screen_action() {
  my.fullScreenBtn.remove();
  my.fpsSpan.remove();
  fullscreen(1);
  let delay = 3000;
  setTimeout(ui_present_window, delay);
}

function ui_present_window() {
  resizeCanvas(windowWidth, windowHeight);
}

// https://editor.p5js.org/jht9629-nyu/sketches/FMZ9qAfBr
// sliding window v2 cut

// https://editor.p5js.org/jht9629-nyu/sketches/KfpABTqxn
// sliding window v1 responsive

// https://editor.p5js.org/jht9629-nyu/sketches/0OwCIFLm-
// sliding window v0

// https://editor.p5js.org/leey611/sketches/yzRvaE7Da
// sliding window v0

// https://editor.p5js.org/jht9629-nyu/sketches/Y8xEY-4dj
// https://editor.p5js.org/leey611/sketches/Lx5rz9R6T
