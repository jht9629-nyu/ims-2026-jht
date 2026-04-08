// https://openprocessing.org/sketch/2911242
// https://openprocessing.org/sketch/1685260
// Particule, img, attraction, repulsion... by Richnou
// From https://editor.p5js.org/BarneyCodes/sketches/k0ImyGuo9
// with a autonomous ball living in sketch
// https://www.youtube.com/@BarneyCodes
// https://editor.p5js.org/BarneyCodes/sketches/
// https://m.youtube.com/watch?v=qm5cDNbtGig
// Fixing The Coding Train’s Code (Water Ripple Shader)

let particles = [];

let res = 18;

let img;

let ball;

function preload() {
  let url = 'https://jht1493-gmail.github.io/jht-site/aa/media/colorized-jht_height=320&width=240.jpg';
  //   let url = 'richnou.png';
  img = loadImage(url);
  // let url = "https://jht1493-gmail.github.io/jht-site/jht-facebo-md/media/2018-10-03/Timeline-Photos-DICE-pixel-facial.jpg";
  // img = loadImage("https://jht1493.net/johnhenrythompson/home/IMG_5174.jpg");
  // img = loadImage("https://img.att.ovh/2024.jpg");
}

function setup() {
  console.log('w h', img.width, img.height);
  createCanvas(windowWidth, windowHeight);
  placeParticles();
  noStroke();
  ball = new Ball();
}

function draw() {
  background(255);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }

  ball.move();
  ball.draw();
  // image(img, 0, 0, width, height);
}

function placeParticles() {
  for (let i = 0; i < width; i += res) {
    for (let j = 0; j < height; j += res) {
      let x = (i / width) * img.width;
      let y = (j / height) * img.height;
      let c = img.get(x, y);

      // if(c[3] != 0) {
      if (c[0] + c[1] + c[2] != 255 * 3) {
        particles.push(new Particle(i, j, c));
      }
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
    ellipse(this.x, this.y, res, res);
  }
}

class Ball {
  constructor(x_, y_, name_) {
    this.x = x_ || random(width);
    this.y = y_ || random(height);
    this.radius = 10;
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

    if (this.y > height) this.speedY = -this.speedY;
    if (this.y < 0) this.speedY = -this.speedY;
  }

  draw() {
    fill(this.color);
    circle(this.x, this.y, this.radius);
  }
}
