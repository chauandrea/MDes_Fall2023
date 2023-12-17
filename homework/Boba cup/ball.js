class ball {
    constructor() {
      var posvec = p5.Vector.random2D().mult(500);
      this.x = posvec.x + 400;
      this.y = posvec.y + 400;
      var speedvec = p5.Vector.random2D().mult(random(4, 8));
      this.xv = speedvec.x;
      this.yv = speedvec.y;
    }
  
    display() {
      push();
      fill(193, 237, 216);
      stroke(0);
      strokeWeight(1);
      ellipse(this.x, this.y, ballSize, ballSize);
      pop();
    }
  
    update() {
      var nx = this.x + this.xv;
      var ny = this.y + this.yv;
  
      if (nx > width || nx < 0) {
        this.xv *= -1;
        targetSize += 0.3;
        score++;
      }
      if (ny > height || ny < 0) {
        this.yv *= -1;
        targetSize += 0.3;
        score++;
      }
  
      if (dist(this.x, this.y, width / 2, height / 2) < (ballSize * 0.5) + targetSize / 2) {
        finishGame();
      }
  
      var nd = batSize + ballSize * 0.5
      if (dist(this.x, this.y, mouseX, mouseY) < nd) {
        var d = -1 * (nd - dist(this.x, this.y, mouseX, mouseY));
        var ang = createVector(mouseX - this.x, mouseY - this.y).normalize();
        this.x += ang.x * d;
        this.y += ang.y * d;
        this.xv += ang.x * ((calculateMouseSpeed() * 0.2) + 0.3) * -1;
        this.yv += ang.y * ((calculateMouseSpeed() * 0.2) + 0.3) * -1;
        Screenshake += calculateMouseSpeed() * 0.3;
        ParticleSystems.push(new Explosion(this.x, this.y));
      }
  
      this.x += this.xv;
      this.y += this.yv;
      this.xv *= 0.999;
      this.yv *= 0.999;
      this.x = constrain(this.x, 1, width - 1);
      this.y = constrain(this.y, 1, height - 1);
    }
  }
  