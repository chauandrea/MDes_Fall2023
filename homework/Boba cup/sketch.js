var targetSize = 50;
var balls = [999];
var mouseSpeed;
var batSize = 30;
var ballSize = 30;
var ballTimer = 0;
var ballCounter = 150;
var score = 0;
var finished = false;
var ParticleSystems = [];

function setup() {
  createCanvas(800, 800);
}

function updateParticleSystems() {
  for (var p in ParticleSystems) {
    ParticleSystems[p].update(p);
  }
}
function draw() {
  updateScreenshake();
  background(140, 180, 250, 180);

  // Draw score in the center
  push();
  textAlign(CENTER, CENTER);
  textSize(40);
  fill(255);
  stroke(0);
  text(score, width / 2, height / 2);
  pop();

  // Draw balls
  for (var b in balls) {
    try {
      balls[b].display();
      balls[b].update();
    } catch {}
  }

  // Draw fixed boba cup in the center
  drawBobaCup(width / 2, height / 2, false);

  // Draw custom cursor (boba cup)
  drawBobaCup(mouseX, mouseY, true);

  // Draw "Click anywhere to play again Best:" message
  if (finished) {
    push();
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Click anywhere to\nplay again\nBest: " + getItem('bestScoreSmack'), width / 2, height / 2 + 100);
    pop();
  }

  // Update and draw particle systems
  updateParticleSystems();

  // Update ball timer
  ballTimer--;
  if (ballTimer < 0) {
    ballCounter--;
    ballTimer = ballCounter;
    balls.push(new ball());
  }

  // Hide default cursor
  noCursor();
}

function drawBobaCup(x, y, isCursor) {
  push();
  // Set color based on whether it's the cursor boba cup or not
  if (isCursor) {
    fill(197, 193, 237, 150); // Translucent purple
  } else {
    fill(245, 245, 220, 150); // Beige color with more transparency
  }
  strokeWeight(1); // Adjusted stroke thickness
  stroke(0, 150); // Adjusted stroke transparency

  // Cup (without the base)
  beginShape();
  vertex(x - 20, y);
  vertex(x + 20, y);
  vertex(x + 15, y + 30);
  vertex(x - 15, y + 30);
  endShape(CLOSE);

  // Boba pearls (more dispersed and increased quantity)
  for (var i = 0; i < 6; i++) {
    var bx = x - 13 + i * 5;
    var by = y + 10 + i * 3;

    // Keep boba pearls inside the cup
    bx = constrain(bx, x - 20, x + 10);
    by = constrain(by, y, y + 30);

    // Shake boba pearls when the screen shakes
    bx += random(-Screenshake, Screenshake);
    by += random(-Screenshake, Screenshake);

    ellipse(bx, by, 8, 8);
  }

  // Straw (taller)
  rect(x - 2, y - 30, 4, 60); // Increased the height of the straw

  // Lid
  arc(x, y, 40, 30, PI, 0, CHORD);

  pop();
}


function calculateMouseSpeed() {
  return createVector(mouseX - pmouseX, mouseY - pmouseY).mag();
}

var Screenshake = 0;

function updateScreenshake() {
  Screenshake *= 0.9;
  translate(random(-Screenshake, Screenshake), random(-Screenshake, Screenshake));
}

function mousePressed() {
    if (finished) {
      // Reset game state
      score = 0;
      balls = [new ball()];
      ParticleSystems = [];
      finished = false;
      ballTimer = 150;
      ballCounter = 150;
    }
  }
  
function finishGame() {
  ballTimer = 10000000;
  balls = [];
  if (score > getItem('bestScoreSmack')) storeItem('bestScoreSmack', score);
  finished = true;
}



class ParticleSystem {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.particles = [];
		this.lt = 0;
		this.addParticles();
	}

	addParticles() {}

	update(index) {
		this.lt++;
		this.run(index);
		for (var i in this.particles) {
			this.particles[i].lt++;
			this.particles[i].display();

			this.particles[i].update(i);
		}

	}

	run() {}

	deleteMe(index) {
		ParticleSystems.splice(index, 1);
	}
}
class OutwardCircle extends ParticleSystem {
	constructor(x, y) {
		super(x, y);
	}

	addParticles() {
		this.particles.push(new ExpandingCircle(this, this.x, this.y));
	}

	run(i) {
		if (this.lt > 150) {
			this.deleteMe(i);
		}
	}
}



class Explosion extends ParticleSystem {
	constructor(x, y) {
		super(x, y);
	}

	run(i) {
		if (this.lt > 150) {
			this.deleteMe(i);
		}
	}
	addParticles() {
		this.particles.push(new ExpandingCircle(this, this.x, this.y));
		for (var i = 0; i < 10; i++) this.particles.push(new ExplosionParticle(this, this.x + random(-6 - this.lt / 5, 6 + this.lt / 5), this.y + random(-6 - this.lt / 5, 6 + this.lt / 5)));
	}

}

class BigExplosion extends ParticleSystem {
	constructor(x, y) {
		super(x, y);
	}

	run(i) {
		if (this.lt > 150) {
			this.deleteMe(i);
		}
	}
	addParticles() {
		this.particles.push(new ExpandingCircle(this, this.x, this.y));
		for (var i = 0; i < 90; i++) this.particles.push(new ExplosionParticle(this, this.x + random(-15 - this.lt / 5, 15 + this.lt / 5), this.y + random(-15 - this.lt / 5, 15 + this.lt / 5)));
	}

}
class Particle {
	constructor(system, _x, _y) {
		this.parent = system;
		this.x = _x;
		this.y = _y;
		this.lt = 0;
		this.finished = false;
	}

	update(index) {}

	deleteMe(index) {
		this.parent.particles.splice(index, 1);
	}

	display() {}
}


class ExpandingCircle extends Particle {
	constructor(system, _x, _y) {
		super(system, _x, _y);
	}

	update(index) {
		if (this.lt > 60) {
			this.deleteMe(index);
		}
	}

	display() {
		push();
		translate(this.x, this.y);

		noFill();
		strokeWeight(2);
		stroke(255, 255, 255, 255 - this.lt * 16);

		circle(0, 0, min(this.lt * 12, 60));
		pop();
	}
}

class BigImplodingCircle extends Particle {
	constructor(system, _x, _y) {
		super(system, _x, _y);
	}

	update(index) {
		if (this.lt > 60) {
			this.deleteMe(index);
		}
	}

	display() {
		push();
		translate(this.x, this.y);

		noFill();
		strokeWeight(1);
		stroke(255, 255, 255, this.lt * 2);

		circle(0, 0, max(240 - this.lt * 30, 0));
		pop();
	}
}


class ExplosionParticle extends Particle {
	constructor(system, _x, _y) {
		super(system, _x, _y);
		this.size = random(3, 8);
		this.speed = random(2, 5);
		this.life = random(30, 50);
	}

	update(index) {
		var diff = new p5.Vector(this.x - this.parent.x, this.y - this.parent.y);
		diff.setMag(-this.speed);
		this.x -= diff.x;
		this.y -= diff.y;

		if (dist(this.x, this.y, this.parent.x, this.parent.y) > 50 || this.lt > this.life) {
			this.deleteMe(index);
		}
	}

	display() {
		push();
		fill(255, 255, 255);
		translate(this.x, this.y);
		noStroke();
		circle(0, 0, min(this.lt, this.size));
		pop();
	}
}

class SmokeParticle extends Particle {
	constructor(system, _x, _y) {
		super(system, _x, _y);
		this.size = random(2, 30);
		this.life = random(30, 15);
	}

	update(index) {
		if (this.lt > this.life) {
			this.deleteMe(index);
		}
	}

	display() {
		push();
		fill(255, 255, 255);
		translate(this.x, this.y);
		noStroke();
		circle(0, 0, min(this.lt * 10, this.size));
		pop();
	}
}