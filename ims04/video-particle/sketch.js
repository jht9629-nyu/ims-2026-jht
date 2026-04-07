// https://editor.p5js.org/jht9629-nyu/sketches/TtVWUuKVC
// ims04-video-particle
// https://editor.p5js.org/jht9629-nyu/sketches/584bCKj5G
// ims04-image-particle
// https://openprocessing.org/sketch/2911242
// https://openprocessing.org/sketch/1685260
// Particule, img, attraction, repulsion... by Richnou
// From https://editor.p5js.org/BarneyCodes/sketches/k0ImyGuo9
// with a autonomous ball living in sketch
// https://www.youtube.com/@BarneyCodes
// https://editor.p5js.org/BarneyCodes/sketches/

let particles = [];
let res = 12;
let img;
let ball;
let aheight; // canvas height adjust for image aspect ratio
let ayoffset;

function preload() {
  let url = 'https://jht1493-gmail.github.io/jht-site/aa/media/colorized-jht_height=320&width=240.jpg';
  //   let url = 'richnou.png';
  img = loadImage(url);
  // let url = "https://jht1493-gmail.github.io/jht-site/jht-facebo-md/media/2018-10-03/Timeline-Photos-DICE-pixel-facial.jpg";
  // img = loadImage("https://jht1493.net/johnhenrythompson/home/IMG_5174.jpg");
  // img = loadImage("https://img.att.ovh/2024.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Adjust height to keep image aspect ration
  let r = img.height / img.width;
  aheight = width * r;
  ayoffset = (height - aheight) / 2;

  placeParticles();
  noStroke();
  ball = new Ball();
}

function draw() {
  background(0);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  ball.move();
  ball.draw();
  // image(img, 0, 0, width, height);
}

// init particles arrary
function placeParticles() {
  for (let x = 0; x < width; x += res) {
    for (let y = 0; y < aheight; y += res) {
      // Pickup color from image
      let c = img_color_xy(x, y);
      // Non-white pixel gets added -- disabled
      // if (c[0] + c[1] + c[2] != 255 * 3) {
      particles.push(new Particle(x, y, c));
      // }
    }
  }
}

class Particle {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.homeX = x;
    this.homeY = y;
  }
  update() {
    // mouse
    let ballDistance = dist(this.x, this.y, ball.x, ball.y);
    let ballAngle = atan2(this.y - ball.y, this.x - ball.x);
    // home
    let homeDistance = dist(this.x, this.y, this.homeX, this.homeY);
    let homeAngle = atan2(this.homeY - this.y, this.homeX - this.x);
    // forces
    let ballRepulsion = constrain(map(ballDistance, 0, 100, 10, 0), 0, 10);
    let homeAttraction = map(homeDistance, 0, 100, 0, 10);
    let vx = cos(ballAngle) * ballRepulsion;
    vx += cos(homeAngle) * homeAttraction;
    let vy = sin(ballAngle) * ballRepulsion;
    vy += sin(homeAngle) * homeAttraction;
    this.x += vx;
    this.y += vy;
  }
  draw() {
    // fill(0, 40);
    // stroke(0, 40);
    // ellipse(this.homeX, this.homeY, 5, 5);
    // line(this.x, this.y, this.homeX, this.homeY);
    // noStroke();
    fill(this.c);
    ellipse(this.x, this.y + ayoffset, res, res);
  }
}

class Ball {
  constructor(x_, y_, name_) {
    this.x = x_ || random(width);
    this.y = y_ || random(aheight);
    this.radius = res;
    this.speedX = 4;
    this.speedY = 2;
    this.color = '#DD0000';
  }
  move() {
    //
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > width) this.speedX = -this.speedX;
    if (this.x < 0) this.speedX = -this.speedX;
    if (this.y > aheight) this.speedY = -this.speedY;
    if (this.y < 0) this.speedY = -this.speedY;
  }
  draw() {
    // fill(this.color);
    let c = img_color_xy(this.x, this.y);
    fill(c);
    circle(this.x, this.y + ayoffset, this.radius);
  }
}

// Get image color corresponding to x,y on canvas
function img_color_xy(cx, cy) {
  // map from canvas to image coordinates - fill
  let x = (cx / width) * img.width;
  let y = (cy / aheight) * img.height;
  let c = img.get(x, y);
  return c;
}
