// constants
const MIN_STARTING_VELOCITY = -0.5;
const MAX_STARTING_VELOCITY = 0.5;
const MAX_VELOCITY = 1;
const ACCELERATION_CHANGE = 1000;
const RADUIS = 3;
const VIEW_RADIUS = 12 * RADUIS;
const MAX_FORCE = 0.05;
// const MAX_ACCELERATION = 0.1;

class Boid {
  constructor() {
    this.position = {
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.height),
    };

    this.velocity = {
      x:
        Math.random() * (MAX_STARTING_VELOCITY - MIN_STARTING_VELOCITY) +
        MIN_STARTING_VELOCITY,
      y:
        Math.random() * (MAX_STARTING_VELOCITY - MIN_STARTING_VELOCITY) +
        MIN_STARTING_VELOCITY,
    };

    this.acceleration = {
      x: this.velocity.x / ACCELERATION_CHANGE,
      y: this.velocity.y / ACCELERATION_CHANGE,
    };

    this.color = `hsl(200, 100%, 50%)`;
  }

  draw() {
    context.beginPath();
    context.arc(
      this.position.x,
      this.position.y,
      RADUIS,
      0,
      2 * Math.PI,
      false
    );

    context.fillStyle = this.color;
    context.fill();
  }

  getAlignment(boids) {
    let steering = {
      x: 0,
      y: 0,
    };
    let total = 0;
    for (let boid of boids) {
      if (boid == this) {
        continue;
      }
      if (
        Math.abs(this.position.x - boid.position.x) <= VIEW_RADIUS &&
        Math.abs(this.position.y - boid.position.y) <= VIEW_RADIUS
      ) {
        steering.x += boid.velocity.x;
        steering.y += boid.velocity.y;
        total++;
      }
    }

    if (total) {
      steering.x /= total;
      steering.y /= total;

      steering.x -= this.velocity.x;
      steering.y -= this.velocity.y;
      steering.x /= 100;
      steering.y /= 100;

      if (steering.x > MAX_FORCE) {
        steering.x = MAX_FORCE;
      } else if (Math.abs(steering.x) > MAX_FORCE) {
        steering.x = -MAX_FORCE;
      }
      if (steering.y > MAX_FORCE) {
        steering.y = MAX_FORCE;
      } else if (Math.abs(steering.y) > MAX_FORCE) {
        steering.y = -MAX_FORCE;
      }
    }

    return steering;
  }

  setAlignment(boids) {
    let alignment = this.getAlignment(boids);
    this.acceleration.x += alignment.x;
    this.acceleration.y += alignment.y;

    // if (this.acceleration.x >= MAX_ACCELERATION) {
    //   this.acceleration.x = MAX_ACCELERATION;
    // } else if (Math.abs(this.acceleration.x) >= MAX_ACCELERATION) {
    //   this.acceleration.x = -MAX_ACCELERATION;
    // }
    // if (this.acceleration.y >= MAX_ACCELERATION) {
    //   this.acceleration.y = MAX_ACCELERATION;
    // } else if (Math.abs(this.acceleration.y) >= MAX_ACCELERATION) {
    //   this.acceleration.y = -MAX_ACCELERATION;
    // }
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    if (this.velocity.x >= MAX_VELOCITY) {
      this.velocity.x = MAX_VELOCITY;
    } else if (Math.abs(this.velocity.x) >= MAX_VELOCITY) {
      this.velocity.x = -MAX_VELOCITY;
    }
    if (this.velocity.y >= MAX_VELOCITY) {
      this.velocity.y = MAX_VELOCITY;
    } else if (Math.abs(this.velocity.y) >= MAX_VELOCITY) {
      this.velocity.y = -MAX_VELOCITY;
    }

    // Handle edges
    if (this.position.x + RADUIS > window.innerWidth) {
      this.position.x = 1 + RADUIS;
    } else if (this.position.x - RADUIS <= 0) {
      this.position.x = window.innerWidth - RADUIS - 1;
    }
    if (this.position.y + RADUIS > window.innerHeight) {
      this.position.y = 1 + RADUIS;
    } else if (this.position.y - RADUIS <= 0) {
      this.position.y = window.innerHeight - RADUIS - 1;
    }
  }
}
