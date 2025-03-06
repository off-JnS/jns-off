// Initialize the 3D environment
let camera, scene, renderer, particles;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Target positions for animation
const targetSection = { value: 0 };
const sections = document.querySelectorAll('.section');

init();
animate();

// Document event listeners
document.addEventListener('mousemove', onDocumentMouseMove);
window.addEventListener('resize', onWindowResize);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const sectionIndex = Array.from(sections).indexOf(target);
            targetSection.value = sectionIndex;

            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize 3D scene
function init() {
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 1000;

    // Create scene
    scene = new THREE.Scene();

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const size = 2000;

    for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * size;
        const y = (Math.random() - 0.5) * size;
        const z = (Math.random() - 0.5) * size;
        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    // Create material with custom shader
    const material = new THREE.PointsMaterial({
        size: 5,
        color: 0x9c27b0,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    // Create particles and add to scene
    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
}

// Handle window resize
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Track mouse movement
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.05;
    mouseY = (event.clientY - windowHalfY) * 0.05;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Add subtle rotation to particles
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;

    // Make particles respond to mouse movement
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Create a pulsing effect
    const time = Date.now() * 0.0005;
    particles.rotation.z = time * 0.1;

    // Scale particles based on current section
    const currentScrollY = window.scrollY;
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = currentScrollY / totalHeight;

    // Change particle color based on scroll position
    const positions = particles.geometry.attributes.position;
    const scalar = 1 + Math.sin(time) * 0.1; // Pulsing effect

    for (let i = 0; i < positions.count; i++) {
        const px = positions.getX(i);
        const py = positions.getY(i);
        const pz = positions.getZ(i);

        // Add wave effect
        const wave = Math.sin(px / 50 + time) * Math.sin(py / 50 + time) * Math.sin(pz / 50 + time) * 20;

        positions.setZ(i, pz + wave * scalar);
    }

    positions.needsUpdate = true;

    // Change particle color based on scroll position
    const hue = (scrollProgress * 60 + 270) % 360;
    particles.material.color.setHSL(hue / 360, 0.8, 0.5);

    renderer.render(scene, camera);
}

// Intersection Observer to detect which section is currently in view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            // Update navigation highlight
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });

            // Special effects for different sections
            if (sectionId === 'hero') {
                particles.material.size = 5;
            } else if (sectionId === 'leistung') {
                particles.material.size = 4;
            } else if (sectionId === 'kontakt') {
                particles.material.size = 3;
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});
