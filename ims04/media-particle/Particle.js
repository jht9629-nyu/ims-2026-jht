class Particle {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.homeX = x;
    this.homeY = y;
  }
  selectColor() {
    this.c = img_color_xy(this.x, this.y);
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
    fill(this.c);
    ashape.draw(this.x, this.y, cellSize);
    // ellipse(this.x, this.y + ayoffset, res, res);
  }
}
