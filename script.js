// constants
const NUM_BOIDS = 100;

// Setup canvas
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const flock = [];

const updateBoids = () => {
  for (let boid of flock) {
    boid.steer(flock);
    boid.draw();
    boid.update();
  }
};

const createBoids = () => {
  for (let i = 0; i < NUM_BOIDS; i++) {
    flock.push(new Boid());
  }
};

const animateBoids = () => {
  requestAnimationFrame(animateBoids);

  context.fillStyle = "rgba(30, 30, 30, 0.5)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  updateBoids();
};

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

createBoids();
animateBoids();
