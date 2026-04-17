//
let TriangleShape = {
  placeParticles() {
    particles = [];
    let R = cellSize;           // circumradius
    let s = R * sqrt(3);        // side length = horizontal spacing

    // Rows alternate up/down. y steps alternate between R (up→down) and R/2 (down→up).
    // x-offset cycles: 0, s/2, s/2, 0, 0, s/2, s/2, 0, ...  (i%4 in {1,2} → s/2)
    let rowIndex = 0;
    let y = 0;
    while (y < aheight + R) {
      let isUp = rowIndex % 2 === 0;
      let xOff = (rowIndex % 4 === 1 || rowIndex % 4 === 2) ? s / 2 : 0;
      for (let x = xOff; x < width + s; x += s) {
        let c = img_color_xy(x, y);
        particles.push(new Particle(x, y, c, isUp ? 1 : -1));
      }
      y += isUp ? R : R / 2;
      rowIndex++;
    }
  },
  draw(x, y, size, dir = 1) {
    push();
    translate(x, y + ayoffset);
    beginShape();
    if (dir >= 0) {
      vertex(0, -size);                        // apex
      vertex(size * 0.866, size * 0.5);        // bottom-right
      vertex(-size * 0.866, size * 0.5);       // bottom-left
    } else {
      vertex(0, size);                         // apex
      vertex(size * 0.866, -size * 0.5);       // top-right
      vertex(-size * 0.866, -size * 0.5);      // top-left
    }
    endShape(CLOSE);
    pop();
  },
};
