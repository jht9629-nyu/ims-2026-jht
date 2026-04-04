/*
“Marching Ripples” by Kathy McGuiness
https://openprocessing.org/sketch/2682081
License CreativeCommons Attribution NonCommercial ShareAlike
https://creativecommons.org/licenses/by-nc-sa/3.0
*/
/* Created for #WCCChallenge "Marching"
 
I have adapted Daniel Shiffman's Marching Squares Coding Challenge OpenSimplex noise example to 
try to simulate water rippling in a pool / lake. Dan does a really good job explaining
this algorithm - if you have any questions, I recommend watching the youtube video!

References:
https://thecodingtrain.com/challenges/c5-marching-squares
https://editor.p5js.org/codingtrain/sketches/18cjVoAX1

*/

let canvas, marchingSq, d;
let rez = 5;
let inc = -1;
let useOSN = true;
let addFade = true;
let frames = 120;

let options = ['pool', 'mauve', 'pink', 'sunny', 'foam'];
let data = {
  pool: {
    colors: [
      [3, 186, 214],
      [227, 250, 255],
      [164, 244, 248],
      [255, 242, 117],
      [255, 140, 66],
    ],
    isoValues: [-0.2, 0.2],
  },
  mauve: {
    colors: [
      [100, 110, 104],
      [180, 142, 174],
      [186, 172, 189],
      [201, 197, 203],
      [215, 217, 215],
    ],
    isoValues: [-0.3, 0, 0.3],
  },
  pink: {
    colors: [
      [34, 22, 43],
      [244, 135, 183],
      [229, 79, 209],
      [114, 78, 145],
      [69, 31, 85],
    ],
    isoValues: [-0.3, -0.1, 0.1, 0.3],
  },
  sunny: {
    colors: [
      [55, 61, 32],
      [243, 227, 124],
      [243, 211, 74],
      [238, 162, 87],
      [243, 167, 56],
    ],
    isoValues: [-0.3, -0.1, 0.1, 0.3],
  },
  foam: {
    colors: [
      [114, 87, 82],
      [135, 142, 136],
      [150, 192, 183],
      [212, 223, 189],
      [254, 246, 201],
    ],
    isoValues: [-0.3, -0.1, 0.1, 0.3],
  },
};

function keyPressed() {
  if (key == 's') {
    const options = {
      units: 'frames',
      delay: 0,
    };
    saveGif('marching.gif', frames, options);
  }
}

function setup() {
  if (canvas) canvas.remove();

  // Dispose previous buffers
  if (marchingSq) {
    marchingSq.field = null;
    marchingSq.dispose();
  }

  if ((windowWidth || windowHeight) > 1000) {
    rez = 10;
  }
  let i = floor(random(options.length));
  d = data[options[i]];
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  marchingSq = new MarchingSquares(rez, useOSN);
}

function draw() {
  let colors = d['colors'];
  let c = d['colors'][0];
  background(c);
  let isovalues = d['isoValues'];
  let alpha = map(sin(inc), -1, 1, 10, 20);
  marchingSq.addLines(isovalues, colors, true, alpha);
  marchingSq.show();
  inc += 360 / frames;
}

function mousePressed() {
  setup();
}

function windowResized() {
  setup();
}

function keyPressed() {
  if (key === 'k' || key === 'K') {
    save('img.jpg');
  }
}
