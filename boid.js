const MIN_STARTING_VELOCITY = -2;
const MAX_STARTING_VELOCITY = 2;
const RADUIS = 5;

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

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

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
