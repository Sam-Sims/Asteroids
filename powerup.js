function Powerup() {
    this.pos = createVector(random(width), random(height));
    this.r = random(30,30);

  this.vel = p5.Vector.random2D();
  this.total = floor(random(5, 15));
  this.offset = [];
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
  }

  this.render = function() {
    push();
    stroke(255);
    translate(this.pos.x, this.pos.y);
    ellipse(0,0, this.r * 0.5);
    pop();
  };

  this.update = function() {
    this.pos.add(this.vel);
  };

  this.edges = function() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    } else if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  };

}
