//
let TriangleShape = {
  placeParticles() {
    particles = [];
    let R = cellSize;            // circumradius
    let H = R * 1.5;             // band height = 3R/2
    let halfB = R * sqrt(3) / 2; // half base = R * 0.866

    // In band n (y: nH to (n+1)H), x steps by halfB.
    // (band + k) % 2 == 0 → up-pointing, centroid at nH + 2H/3 (= nH + R)
    // (band + k) % 2 == 1 → down-pointing, centroid at nH + H/3 (= nH + R/2)
    let band = 0;
    for (let bandY = 0; bandY < aheight; bandY += H, band++) {
      let k = 0;
      for (let x = 0; x < width + halfB; x += halfB, k++) {
        let isUp = (band + k) % 2 === 0;
        let cy = bandY + (isUp ? H * 2 / 3 : H / 3);
        let c = img_color_xy(x, cy);
        particles.push(new Particle(x, cy, c, isUp ? 1 : -1));
      }
    }
  },
  draw(x, y, size, dir = 1) {
    push();
    translate(x, y + ayoffset);
    beginShape();
    if (dir >= 0) {
      vertex(0, -size);
      vertex(size * 0.866, size * 0.5);
      vertex(-size * 0.866, size * 0.5);
    } else {
      vertex(0, size);
      vertex(size * 0.866, -size * 0.5);
      vertex(-size * 0.866, -size * 0.5);
    }
    endShape(CLOSE);
    pop();
  },
};
