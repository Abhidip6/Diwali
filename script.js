const canvas = document.getElementById('firecrackerCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firecracker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];

    // Create particles for the explosion
    for (let i = 0; i < 300; i++) { // Increased number of particles for more effect
      this.particles.push(new Particle(this.x, this.y));
    }
  }

  update() {
    this.particles.forEach((particle, index) => {
      particle.update();
      particle.draw();

      // Remove particles that are no longer visible
      if (particle.alpha <= 0) {
        this.particles.splice(index, 1);
      }
    });
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 2; // Adjusted particle size for more impact
    this.speedX = (Math.random() - 0.5) * 12; // Increased speed for a more explosive effect
    this.speedY = (Math.random() - 0.5) * 12; // Increased speed for a more explosive effect
    this.alpha = 1;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random colorful particles
    this.gravity = 0.1; // Simulate gravity for more realism
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity; // Apply gravity
    this.alpha -= 0.03; // Faster fade-out for particles
  }

  draw() {
    ctx.fillStyle = this.color; // Set particle color
    ctx.globalAlpha = this.alpha; // Set particle transparency
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1; // Reset alpha for next draw
  }
}

const firecrackers = [];

// Function to create random firecrackers at random positions
function generateFirecracker() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  firecrackers.push(new Firecracker(x, y));
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw all firecrackers
  firecrackers.forEach(firecracker => {
    firecracker.update();
  });

  requestAnimationFrame(animate);
}

// Generate 5 random firecrackers initially and then every 200 milliseconds
for (let i = 0; i < 5; i++) {
  generateFirecracker();
}
setInterval(generateFirecracker, 200); // Continuously generate firecrackers

// Start the animation
animate();
