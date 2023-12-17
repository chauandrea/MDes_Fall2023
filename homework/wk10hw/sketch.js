let paintStreaks = [];

function setup() {
  createCanvas(800, 600);
  generatePaintStreaks();
}

function draw() {
  background(255);

  // Display paint streaks
  for (let i = 0; i < paintStreaks.length; i++) {
    for (let j = 0; j < paintStreaks.length; j++) {
      if (i !== j) {
        paintStreaks[i].intersect(paintStreaks[j]);
      }
    }
    paintStreaks[i].display();
  }
}

function generatePaintStreaks() {
  // Generate random paint streaks
  for (let i = 0; i < 30; i++) {
    let x = random(width);
    let y = random(height);
    let angle = random(TWO_PI);
    let length = random(20, 50);

    paintStreaks.push(new PaintStreak(x, y, angle, length));
  }
}

// Click to regenerate paint streaks
function mouseClicked() {
  paintStreaks = [];
  generatePaintStreaks();
}

class PaintStreak {
  constructor(x, y, angle, length) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.length = length;
    this.color = color(random(255), random(255), random(255), 150);
  }

  display() {
    strokeWeight(4);
    stroke(this.color);
    line(this.x, this.y, this.x + cos(this.angle) * this.length, this.y + sin(this.angle) * this.length);
  }

  intersect(otherStreak) {
    let d = dist(this.x, this.y, otherStreak.x, otherStreak.y);
    if (d < this.length / 2 + otherStreak.length / 2) {
      this.color = lerpColor(this.color, otherStreak.color, 0.1);
      otherStreak.color = this.color;
    }
  }
}
