class Flock {
  constructor() {
    this.boids = [];
  }

  run() {
    for (let i = 0; i < this.boids.length; i++) {
      this.boids[i].run(this.boids);
  
    }
  }

  addBoid(b) {
    this.boids.push(b);
  }
}


class Boid {
    /**
 * Represents a Boid.
 * @constructor
 * @param {Object} options - The options for creating a Boid.
 * @param {number} options.x - The x-coordinate of the Boid's initial position.
 * @param {number} options.y - The y-coordinate of the Boid's initial position.
 * @param {number} [options.size=3.0] - The size of the Boid.
 * @param {string} [options.color] - The color of the Boid.
 * @param {number} [options.maxSpeed=3] - The maximum speed of the Boid.
 * @param {number} [options.maxForce=0.05] - The maximum steering force applied to the Boid.
 */
  constructor({
    x,
    y,
    size = 50,
    maxSpeed = 3,
    maxForce = 0.05,
    color = "gray",
  }) {
    this.acceleration = createVector(1, 1);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.position = createVector(x, y);
    this.size = size;
    this.maxSpeed = maxSpeed + 10;
    this.maxForce = maxForce;
    this.color = color;
  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  flock(boids) {
    const sep = this.separate(boids);
    const ali = this.align(boids);
    const coh = this.cohesion(boids);
    sep.mult(1.5);
    ali.mult(1.0);
    coh.mult(3.0);
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  seek(target) {
    const desired = p5.Vector.sub(target, this.position);
    desired.normalize();
    desired.mult(this.maxSpeed);
    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  render() {
   
    push()
    image(gooseSprite, this.position.x, this.position.y, 75, 50);
    pop()
  }

  borders() {
    const borderWidthScaler = 1
    const hitLeft = this.position.x < 0;
    const hitRight = this.position.x > borderWidthScaler*width;
    const hitTop = this.position.y < 0;
    const hitBottom = this.position.y > borderWidthScaler*height;

    if (hitLeft) {
      // this.position.x = - this.size;
      this.velocity.x *= -1
    }
    if (hitRight) {
      // this.position.x = -this.size;
      this.velocity.x *= -1
    }
    if (hitTop) {
      // this.position.y = height + this.size;
      this.velocity.y *= -1
    }
    if (hitBottom) {
      // this.position.y = -this.size;
      this.velocity.y *= -1
    }
  }

  separate(boids) {
    let desiredSeperation = 25.0;
    let steer = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < desiredSeperation) {
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d);
        steer.add(diff);
        count++;
      }
    }
    if (count > 0) {
      steer.div(count);
    }
    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
    }
    return steer;
  }

  align(boids) {
    const NEIGHBOR_DIST = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < NEIGHBOR_DIST) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  cohesion(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighbordist) {
        sum.add(boids[i].position);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum);
    } else {
      return createVector(0, 0);
    }
  }
}
