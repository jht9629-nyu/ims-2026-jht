//
let HexShape = {
  // init particles arrary for circles
  placeParticles() {
    particles = [];
    let r = res;
    let colSpacing = r * 1.5;
    let rowSpacing = r * sqrt(3);
    let col = 0;
    for (let x = r; x < width; x += colSpacing, col++) {
      let yStart = col % 2 === 0 ? 0 : rowSpacing / 2;
      for (let y = yStart; y < aheight; y += rowSpacing) {
        let c = img_color_xy(x, y);
        particles.push(new Particle(x, y, c));
      }
    }
  },
  draw(x, y, size) {
    push();
    translate(x, y);
    beginShape();
    for (let i = 0; i < 6; i++) {
      let angle = (i * PI) / 3; // 0, 60, 120, 180, 240, 300 deg
      vertex(cos(angle) * size, sin(angle) * size);
    }
    endShape(CLOSE);
    pop();
  },
};
