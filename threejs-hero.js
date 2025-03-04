// Scene, Camera, and Renderer Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("threejs-container").appendChild(renderer.domElement);

// Particle System
const particleCount = 150; // Increased particle count for better visibility
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 30; // Spread particles randomly
}

particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));

// **Enhancing Particle Material for Better Visibility**
const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.25,  // **Increased Size for Better Visibility**
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
});

const pointCloud = new THREE.Points(particles, particleMaterial);
scene.add(pointCloud);

// Camera Position
camera.position.z = 7;

// Animate Particles
function animateParticles() {
    requestAnimationFrame(animateParticles);

    // Rotate Particles Slightly for Floating Effect
    pointCloud.rotation.y += 0.0008;
    pointCloud.rotation.x += 0.0005;

    renderer.render(scene, camera);
}

// Handle Resizing
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Mouse Interaction (Particles React to Hover)
document.addEventListener("mousemove", (event) => {
    let x = (event.clientX / window.innerWidth) * 2 - 1;
    let y = -(event.clientY / window.innerHeight) * 2 + 1;
    pointCloud.rotation.x = y * 0.1;
    pointCloud.rotation.y = x * 0.1;
});

// Start Animation
animateParticles();
