//
let DiamonShape = {
  // init particles arrary for circles
  placeParticles() {
    particles = [];
    let r = res;
    let colSpacing = r * 2;
    let rowSpacing = r;
    let row = 0;
    for (let y = r; y < aheight; y += rowSpacing, row++) {
      let xStart = row % 2 === 0 ? r : r * 2;
      for (let x = xStart; x < width; x += colSpacing) {
        let c = img_color_xy(x, y);
        particles.push(new Particle(x, y, c));
      }
    }
  },
  draw(x, y, size) {
    push();
    translate(x, y);
    beginShape();
    vertex(0, -size); // top
    vertex(size, 0); // right
    vertex(0, size); // bottom
    vertex(-size, 0); // left
    endShape(CLOSE);
    pop();
  },
};
