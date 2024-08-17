// Toggle the side menu visibility
function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.classList.toggle('show');
}

// Close the side menu after a link is clicked
function closeMenu() {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.classList.remove('show');
}

// Add event listeners to all side menu links
document.querySelectorAll('.side-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Carousel functionality
let currentIndex = 0;
const visibleItems = 5; // Number of visible items in the carousel
const items = document.querySelectorAll('.carousel-item');

function moveCarousel(direction) {
    // Calculate the new index based on the direction and ensure it wraps around
    currentIndex = (currentIndex + direction + items.length) % items.length;

    // Loop through each carousel item and update its appearance based on its position
    items.forEach((item, index) => {
        // Calculate the relative position index of each item
        let positionIndex = (index - currentIndex + items.length) % items.length;

        // Update the style of the item based on its position within the visible set
        if (positionIndex < visibleItems) {
            item.style.opacity = 1;
            item.style.transform = `translateX(${(positionIndex - Math.floor(visibleItems / 2)) * 25}%) translateY(${Math.abs(positionIndex - Math.floor(visibleItems / 2)) * 15}px) rotate(${(positionIndex - Math.floor(visibleItems / 2)) * 5}deg)`;
            item.style.zIndex = visibleItems - positionIndex;
        } else {
            item.style.opacity = 0; // Hide items that are not within the visible set
        }
    });
}

// Initialize the carousel on page load
moveCarousel(0);

// Attach event listeners to the carousel control buttons
document.querySelector('.control-btn.left').addEventListener('click', () => moveCarousel(-1));
document.querySelector('.control-btn.right').addEventListener('click', () => moveCarousel(1));

// Particles.js

// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Allow transparency

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // Improve resolution on high-DPI screens
document.body.appendChild(renderer.domElement);

// Particle properties
const particleCount = 2000; // Number of particles
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

// Generate random particle positions
for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() * 2 - 1) * 200; // x
    positions[i * 3 + 1] = (Math.random() * 2 - 1) * 200; // y
    positions[i * 3 + 2] = (Math.random() * 2 - 1) * 200; // z
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Particle material
const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5, // Slightly larger particles
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.8 // Set opacity to ensure particles are visible
});

// Create the particle system
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

camera.position.z = 150; // Adjust camera position

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    particleSystem.rotation.x += 0.0005; // Slow rotation for subtle movement
    particleSystem.rotation.y += 0.0005;

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
