//
let CircleShape = {
  // init particles arrary for circles
  placeParticles() {
    particles = [];
    let step = cellSize * 2;
    for (let x = 0; x < width; x += step) {
      for (let y = 0; y < aheight; y += step) {
        let c = img_color_xy(x, y);
        let p = new Particle(x, y, c);
        particles.push(p);
      }
    }
  },
  draw(x, y, r) {
    // ellipse(this.x, this.y + ayoffset, res, res);
    circle(x, y + ayoffset, r * 2);
  },
};
