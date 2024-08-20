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

// Particles.js

// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Particle properties
const particleCount = 2000;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

// Generate random particle positions
for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() * 2 - 1) * 200;
    positions[i * 3 + 1] = (Math.random() * 2 - 1) * 200;
    positions[i * 3 + 2] = (Math.random() * 2 - 1) * 200;
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Particle material
const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.8
});

// Create the particle system
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

camera.position.z = 150;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    particleSystem.rotation.x += 0.0005;
    particleSystem.rotation.y += 0.0005;

    renderer.render(scene, camera);
}

animate();

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, 200);
});

// Swipeable Carousel
let startX;
let currentTransform = 0;

const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);

function moveCarousel(direction) {
    const itemWidth = items[0].getBoundingClientRect().width;
    currentTransform -= direction * itemWidth;

    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(${currentTransform}px)`;
}

// Touch events for swipe detection
track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const difference = startX - endX;

    if (Math.abs(difference) > 50) { // Adjust the sensitivity as needed
        if (difference > 0) {
            moveCarousel(1); // Swipe left
        } else {
            moveCarousel(-1); // Swipe right
        }
    }
});
