//
let TriangleShape = {
  placeParticles() {
    particles = [];
    let r = cellSize * 2;
    let colSpacing = r;
    let rowSpacing = r * sqrt(3) / 2;
    let row = 0;
    for (let y = r; y < aheight; y += rowSpacing, row++) {
      let xStart = row % 2 === 0 ? r / 2 : r;
      for (let x = xStart; x < width; x += colSpacing) {
        let c = img_color_xy(x, y);
        particles.push(new Particle(x, y, c));
      }
    }
  },
  draw(x, y, size) {
    push();
    translate(x, y + ayoffset);
    beginShape();
    vertex(0, -size);           // top
    vertex(size, size * 0.866); // bottom right
    vertex(-size, size * 0.866); // bottom left
    endShape(CLOSE);
    pop();
  },
};
