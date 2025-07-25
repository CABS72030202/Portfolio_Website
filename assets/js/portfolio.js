// Portfolio Dynamic Elements JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all dynamic elements
    initSkillsTabs();
    initProjectFilters();
    initProjectModal();
    initInvolvementTabs();
    initProgressBars();
});

// Skills Tabs Functionality
function initSkillsTabs() {
    const tabBtns = document.querySelectorAll('.skills-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.skill-tab');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked button and corresponding tab
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
}

// Project Filters Functionality
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all filter buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide project cards based on filter
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Show/hide accordion items based on filter
            accordionItems.forEach(item => {
                const categories = item.getAttribute('data-category');
                if (categories) {
                    const categoryList = categories.split(' ');
                    
                    if (filter === 'all' || categoryList.includes(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// Project Modal Functionality
function initProjectModal() {
    // Create modal HTML structure
    const modalHTML = `
        <div id="projectModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <div class="modal-header">
                    <h2 id="modalTitle"></h2>
                    <div class="modal-links">
                        <a href="#" id="modalGithub" target="_blank" class="modal-btn">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                        <a href="#" id="modalDemo" target="_blank" class="modal-btn">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="modal-image">
                        <img id="modalImage" src="" alt="Project Screenshot">
                    </div>
                    <div class="modal-details">
                        <p id="modalDescription"></p>
                        <div class="modal-tech" id="modalTech"></div>
                        <div class="modal-features" id="modalFeatures"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close');
    
    // Close modal when clicking X
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}

// Open Project Modal Function (called from HTML)
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const projects = {
        'envmonitor': {
            title: 'Smart Environmental Monitor',
            description: 'ESP32-based IoT system for real-time environmental monitoring with wireless sensor network and cloud integration. Monitors temperature, humidity, air quality, and noise levels.',
            image: './assets/img/logo.png',
            github: 'https://github.com/yourusername/envmonitor',
            demo: 'https://envmonitor-dashboard.com',
            tech: ['ESP32', 'C++', 'WiFi', 'MQTT', 'Cloud Integration'],
            features: [
                'Real-time sensor data collection',
                'Wireless mesh network topology',
                'Cloud-based data storage and analytics',
                'Mobile app for remote monitoring',
                'Alert system for threshold violations'
            ]
        },
        'robotcontrol': {
            title: 'Autonomous Robot Control',
            description: 'STM32-based autonomous navigation system with obstacle avoidance, path planning, and PID control algorithms. Features ultrasonic sensors and motor control.',
            image: './assets/img/logo.png',
            github: 'https://github.com/yourusername/robotcontrol',
            demo: 'https://robotcontrol-demo.com',
            tech: ['STM32', 'C', 'Ultrasonic Sensors', 'Motor Control'],
            features: [
                'Autonomous navigation and path planning',
                'Obstacle detection and avoidance',
                'PID control for precise movement',
                'Real-time sensor fusion',
                'Remote control via Bluetooth'
            ]
        },
        'dataacquisition': {
            title: 'Multi-Channel Data Acquisition',
            description: 'Custom PCB design for high-precision analog signal acquisition with 16-bit ADC, differential inputs, and USB interface. Suitable for industrial applications.',
            image: './assets/img/logo.png',
            github: 'https://github.com/yourusername/dataacquisition',
            demo: 'https://dataacquisition-specs.com',
            tech: ['KiCad', 'Analog Design', '16-bit ADC', 'USB Interface'],
            features: [
                '8-channel simultaneous sampling',
                'Differential input configuration',
                'High-resolution 16-bit ADC',
                'USB 2.0 interface for data transfer',
                'Industrial-grade EMC compliance'
            ]
        },
        'smarthome': {
            title: 'Smart Home Controller',
            description: 'Raspberry Pi-based home automation system with mobile app control, voice commands, and energy monitoring. Integrates with various smart devices.',
            image: './assets/img/logo.png',
            github: 'https://github.com/yourusername/smarthome',
            demo: 'https://smarthome-app.com',
            tech: ['Raspberry Pi', 'Python', 'IoT', 'Mobile App'],
            features: [
                'Voice control integration',
                'Mobile app for remote control',
                'Energy consumption monitoring',
                'Security system integration',
                'Weather-based automation'
            ]
        },
        'powermanagement': {
            title: 'Power Management Unit',
            description: 'Efficient switching power supply design with multiple output voltages, protection circuits, and thermal management. Designed for embedded systems.',
            image: './assets/img/logo.png',
            github: 'https://github.com/yourusername/powermanagement',
            demo: 'https://powermanagement-specs.com',
            tech: ['Analog Design', 'Power Electronics', 'LTspice', 'Thermal Design'],
            features: [
                'Multiple output voltages (3.3V, 5V, 12V)',
                'Over-current and over-voltage protection',
                'Thermal management and monitoring',
                'High efficiency (>90%)',
                'Compact form factor design'
            ]
        },
        'biomedical': {
            title: 'Biomedical Signal Processor',
            description: 'Real-time ECG signal processing system with digital filtering, arrhythmia detection, and wireless transmission. Designed for medical applications.',
            image: './assets/img/logo.png',
            github: 'https://github.com/yourusername/biomedical',
            demo: 'https://biomedical-demo.com',
            tech: ['DSP', 'MATLAB', 'Digital Filters', 'Medical Devices'],
            features: [
                'Real-time ECG signal processing',
                'Arrhythmia detection algorithms',
                'Digital filtering for noise reduction',
                'Wireless data transmission',
                'Medical-grade safety compliance'
            ]
        }
    };
    
    const project = projects[projectId];
    if (project) {
        // Populate modal with project data
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;
        document.getElementById('modalImage').src = project.image;
        document.getElementById('modalImage').alt = project.title;
        document.getElementById('modalGithub').href = project.github;
        document.getElementById('modalDemo').href = project.demo;
        
        // Hide demo button if no demo available
        if (project.demo === '#') {
            document.getElementById('modalDemo').style.display = 'none';
        } else {
            document.getElementById('modalDemo').style.display = 'inline-block';
        }
        
        // Populate tech stack
        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = '<h4>Technologies Used:</h4>';
        project.tech.forEach(tech => {
            techContainer.innerHTML += `<span class="tech-tag">${tech}</span>`;
        });
        
        // Populate features
        const featuresContainer = document.getElementById('modalFeatures');
        featuresContainer.innerHTML = '<h4>Key Features:</h4><ul>';
        project.features.forEach(feature => {
            featuresContainer.innerHTML += `<li>${feature}</li>`;
        });
        featuresContainer.innerHTML += '</ul>';
        
        // Show modal
        modal.style.display = 'block';
    }
}

// Involvement Tabs Functionality
function initInvolvementTabs() {
    const tabBtns = document.querySelectorAll('.involvement-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.involvement-tab');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked button and corresponding tab
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
}

// Progress Bars Animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const width = progress.style.width;
                progress.style.width = '0%';
                setTimeout(() => {
                    progress.style.width = width;
                }, 100);
            }
        });
    }, {
        threshold: 0.5
    });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll-based animations
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});
