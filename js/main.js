// 3D Scene with Three.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cursor
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    const links = document.querySelectorAll('a, button, .service-card, .menu-toggle');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.border = '1px solid rgba(108, 99, 255, 0.8)';
        });

        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.border = '1px solid rgba(255, 255, 255, 0.5)';
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // 3D canvas setup
    const canvas = document.getElementById('hero-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scales = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    for (let i = 0; i < particlesCount; i++) {
        scales[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    
    // Material for particles
    const particlesMaterial = new THREE.ShaderMaterial({
        vertexShader: `
            attribute float scale;
            
            varying vec3 vColor;
            
            void main() {
                vec3 color = vec3(0.5 + position.x / 10.0, 0.5 + position.y / 10.0, 1.0);
                vColor = color;
                
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = scale * 2.0 * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            
            void main() {
                float strength = distance(gl_PointCoord, vec2(0.5));
                strength = 1.0 - strength;
                strength = pow(strength, 3.0);
                
                vec3 finalColor = mix(vec3(0.0), vColor, strength);
                gl_FragColor = vec4(finalColor, strength);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) / 100;
        mouseY = (event.clientY - windowHalfY) / 100;
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        
        // Update particles
        particles.rotation.x = elapsedTime * 0.05;
        particles.rotation.y = elapsedTime * 0.03;
        
        // Update camera based on mouse movement
        targetX = mouseX * 0.3;
        targetY = mouseY * 0.3;
        
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (-targetY - camera.position.y) * 0.05;
        
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };
    
    animate();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form animations
    const formElements = document.querySelectorAll('.form-group input, .form-group textarea');
    formElements.forEach(element => {
        element.setAttribute('placeholder', ' ');
        
        element.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});
