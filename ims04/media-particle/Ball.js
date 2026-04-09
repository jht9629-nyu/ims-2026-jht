class Ball {
  constructor(x_, y_, name_) {
    this.x = x_ || random(width);
    this.y = y_ || random(aheight);
    this.radius = res;
    this.speedX = 4;
    this.speedY = 2;
    this.color = '#DD0000';
  }
  random_loc() {
    this.x = random(width);
    this.y = random(aheight);
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
  move_noise() {
    // https://p5js.org/reference/p5/noise/
    // Calculate the coordinates.
    this.x = width * noise(0.005 * frameCount);
    this.y = aheight * noise(0.005 * frameCount + 10000);
  }
  draw() {
    // fill(this.color);
    let c = img_color_xy(this.x, this.y);
    fill(c);
    circle(this.x, this.y + ayoffset, this.radius);
  }
}
