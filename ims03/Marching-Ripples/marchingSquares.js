/* I refactored Daniel Shiffman's code to create this class, incorporating a buffer,
fading the lines by drawing a rect with alpha and adding color using  isolines
(suggested by chatGPT).
*/

class MarchingSquares {
	constructor(rez, useOSN) {
		this.rez = rez;
		this.useOSN = useOSN;
		this.cols = 1 + floor(width / this.rez);
		this.rows = 1 + floor(height / this.rez);
		this.pg = createGraphics(this.rez * this.cols, this.rez * this.rows);
		this.pg.noSmooth()
		this.field = new Float32Array(this.cols * this.rows);
		this.increment = 0.1;
		this.zoff = 0;
		this.noise = new OpenSimplexNoise(Date.now());
		this.alpha = 255;
	}

	drawLine(x1, y1, x2, y2) {
		this.pg.line(x1, y1, x2, y2);
	}

	// Animate lines by adding a background color with alpha that changes over time
	addBackgroundWithAlpha(c, alpha) {
		//console.log(c)
		this.pg.push();
		this.pg.noStroke();
		// c.setAlpha = alpha;
		// this.pg.fill(c)
		this.pg.fill(c[0], c[1], c[2], alpha);

		this.pg.rect(0, 0, this.pg.width, this.pg.height);
		this.pg.pop();
	}

	addLines(isovalues, colors, addFade, alpha) {
		let c = colors[0]

		if (addFade) {
			this.addBackgroundWithAlpha(c, alpha)
		}

		// Compute scalar field
		let xoff = 0;
		for (let i = 0; i < this.cols; i++) {
			let yoff = 0;
			for (let j = 0; j < this.rows; j++) {
				const idx = i + j * this.cols;
				this.field[idx] = this.useOSN ?
					float(this.noise.noise3D(xoff, yoff, this.zoff)) :
					noise(xoff, yoff);
				yoff += this.increment;
			}
			xoff += this.increment;
		}
		this.zoff += 0.02;

		// Draw each isovalue layer
		for (let level = 0; level < isovalues.length; level++) {
			const iso = isovalues[level];
			const col = colors[level % colors.length + 1];
			// const col = colors[level % colors.length];

			this.pg.stroke(col);
			this.pg.strokeWeight(random(0.5, 1.0));

			for (let i = 0; i < this.cols - 1; i++) {
				for (let j = 0; j < this.rows - 1; j++) {
					const x = i * this.rez;
					const y = j * this.rez;

					const a = this.field[i + j * this.cols];
					const b = this.field[(i + 1) + j * this.cols];
					const c = this.field[(i + 1) + (j + 1) * this.cols];
					const d = this.field[i + (j + 1) * this.cols];

					const state = this.getState(
						a >= iso ? 1 : 0,
						b >= iso ? 1 : 0,
						c >= iso ? 1 : 0,
						d >= iso ? 1 : 0
					);

					const a_val = a;
					const b_val = b;
					const c_val = c;
					const d_val = d;

					const ax = lerp(x, x + this.rez, (iso - a_val) / (b_val - a_val));
					const ay = y;

					const bx = x + this.rez;
					const by = lerp(y, y + this.rez, (iso - b_val) / (c_val - b_val));

					const cx = lerp(x, x + this.rez, (iso - d_val) / (c_val - d_val));
					const cy = y + this.rez;

					const dx = x;
					const dy = lerp(y, y + this.rez, (iso - a_val) / (d_val - a_val));

					switch (state) {
						case 1:
							this.drawLine(cx, cy, dx, dy);
							break;
						case 2:
							this.drawLine(bx, by, cx, cy);
							break;
						case 3:
							this.drawLine(bx, by, dx, dy);
							break;
						case 4:
							this.drawLine(ax, ay, bx, by);
							break;
						case 5:
							this.drawLine(ax, ay, dx, dy);
							this.drawLine(bx, by, cx, cy);
							break;
						case 6:
							this.drawLine(ax, ay, cx, cy);
							break;
						case 7:
							this.drawLine(ax, ay, dx, dy);
							break;
						case 8:
							this.drawLine(ax, ay, dx, dy);
							break;
						case 9:
							this.drawLine(ax, ay, cx, cy);
							break;
						case 10:
							this.drawLine(ax, ay, bx, by);
							this.drawLine(cx, cy, dx, dy);
							break;
						case 11:
							this.drawLine(ax, ay, bx, by);
							break;
						case 12:
							this.drawLine(bx, by, dx, dy);
							break;
						case 13:
							this.drawLine(bx, by, cx, cy);
							break;
						case 14:
							this.drawLine(cx, cy, dx, dy);
							break;
					}
				}
			}
		}
	}

	getState(a, b, c, d) {
		return a * 8 + b * 4 + c * 2 + d * 1;
	}
	// Clean up buffers so they don't slow performance
	dispose() {
		if (this.pg && this.pg.remove) {
			this.pg.remove();
			this.pg = null;
		}
	}

	show() {
		image(this.pg, 0, 0)
	}

}