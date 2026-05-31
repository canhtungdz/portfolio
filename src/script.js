/* ==========================================
   Portfolio — Dynamic Interactions & Canvas Systems
   Antigravity Google Style
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render all texts, projects, and skills dynamically from data.js
  renderPortfolio();

  // 2. Initialize Navigation and Interactions
  initNavigation();
  initScrollAnimations();
  initSmoothScroll();
  initVideoModal();
  initColabPets();
  
  // 3. Initialize Interactive WebGL Background
  new ParticleGrid("particle-bg");
  
  // 4. Initialize Interactive Canvas Simulations
  initCtaParticles();
});

/* ------------------------------------------
   Dynamic Portfolio Content Renderer
   Populates index.html from data.js
   ------------------------------------------ */
function renderPortfolio() {
  const data = window.portfolioData;
  if (!data) return;

  // Render Page Title and Header logo name
  document.title = `${data.profile.name} — Developer & Creator`;
  const logoElements = document.querySelectorAll('.nav__logo');
  logoElements.forEach(el => {
    el.innerHTML = `<span class="nav__logo-icon">✦</span> ${data.profile.name}`;
  });

  // Hero Section texts
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) heroTitle.textContent = data.profile.tagline;

  const heroEyebrow = document.querySelector('.hero__eyebrow');
  if (heroEyebrow) {
    heroEyebrow.innerHTML = `<span class="hero__eyebrow-icon">✦</span> ${data.profile.name}`;
  }

  // Statement Section text
  const statementText = document.querySelector('.statement__text');
  if (statementText) {
    statementText.innerHTML = `${data.profile.statement} <span class="statement__cursor"></span>`;
  }

  // Render Highlight Features
  renderFeatures(data.features);

  // Render Projects Grid
  renderProjects(data.projects);

  // Render Skills tags list
  renderSkills(data.skills);

  // Render CTA Section
  const emailBtn = document.getElementById('ctaEmail');
  if (emailBtn) {
    emailBtn.textContent = data.profile.email;
    emailBtn.href = `mailto:${data.profile.email}`;
  }
  const ghBtn = document.getElementById('ctaGithub');
  if (ghBtn) {
    ghBtn.href = data.profile.github;
  }

  // Render Footer text details
  const footerTagline = document.querySelector('.footer__tagline p');
  if (footerTagline) footerTagline.textContent = data.profile.footerTagline;

  const footerGiant = document.querySelector('.footer__giant span');
  if (footerGiant) footerGiant.textContent = data.profile.name;

  const footerCopy = document.querySelector('.footer__copy');
  if (footerCopy) {
    footerCopy.textContent = `© ${new Date().getFullYear()} ${data.profile.name}`;
  }

  // Link GitHub, LinkedIn, and Twitter links inside footer
  const ftGithub = document.getElementById('footerGithub');
  if (ftGithub) ftGithub.href = data.profile.github;

  const ftBtmGithub = document.getElementById('footerBtmGithub');
  if (ftBtmGithub) ftBtmGithub.href = data.profile.github;

  const ftBtmLinkedin = document.getElementById('footerBtmLinkedin');
  if (ftBtmLinkedin) ftBtmLinkedin.href = data.profile.linkedin;

  const ftBtmTwitter = document.getElementById('footerBtmTwitter');
  if (ftBtmTwitter) ftBtmTwitter.href = data.profile.twitter;
}

function renderFeatures(features) {
  const container = document.querySelector('.features .container');
  if (!container || !features) return;

  container.innerHTML = '';
  features.forEach((feat, index) => {
    const isReverse = index % 2 !== 0 ? 'feature--reverse' : '';
    let visualHtml = '';

    if (feat.mockup === 'neural') {
      visualHtml = `
        <div class="feature__mockup feature__mockup--neural">
          <svg class="nn-svg" viewBox="0 0 400 240">
            <defs>
              <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#3279f9" />
                <stop offset="100%" stop-color="#818cf8" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            <!-- Connection Weights (Edges) -->
            <path class="nn-edge" id="edge-i0-h0" d="M 60,50 L 200,35" />
            <path class="nn-edge" id="edge-i0-h1" d="M 60,50 L 200,90" />
            <path class="nn-edge" id="edge-i0-h2" d="M 60,50 L 200,150" />
            <path class="nn-edge" id="edge-i0-h3" d="M 60,50 L 200,205" />
            
            <path class="nn-edge" id="edge-i1-h0" d="M 60,120 L 200,35" />
            <path class="nn-edge" id="edge-i1-h1" d="M 60,120 L 200,90" />
            <path class="nn-edge" id="edge-i1-h2" d="M 60,120 L 200,150" />
            <path class="nn-edge" id="edge-i1-h3" d="M 60,120 L 200,205" />
            
            <path class="nn-edge" id="edge-i2-h0" d="M 60,190 L 200,35" />
            <path class="nn-edge" id="edge-i2-h1" d="M 60,190 L 200,90" />
            <path class="nn-edge" id="edge-i2-h2" d="M 60,190 L 200,150" />
            <path class="nn-edge" id="edge-i2-h3" d="M 60,190 L 200,205" />
            
            <path class="nn-edge" id="edge-h0-o0" d="M 200,35 L 340,80" />
            <path class="nn-edge" id="edge-h0-o1" d="M 200,35 L 340,160" />
            <path class="nn-edge" id="edge-h1-o0" d="M 200,90 L 340,80" />
            <path class="nn-edge" id="edge-h1-o1" d="M 200,90 L 340,160" />
            <path class="nn-edge" id="edge-h2-o0" d="M 200,150 L 340,80" />
            <path class="nn-edge" id="edge-h2-o1" d="M 200,150 L 340,160" />
            <path class="nn-edge" id="edge-h3-o0" d="M 200,205 L 340,80" />
            <path class="nn-edge" id="edge-h3-o1" d="M 200,205 L 340,160" />
            
            <!-- Nodes -->
            <g class="nn-node nn-node--input" id="node-i0" data-index="0">
              <circle cx="60" cy="50" r="16" />
              <text x="60" y="55">x₁</text>
            </g>
            <g class="nn-node nn-node--input" id="node-i1" data-index="1">
              <circle cx="60" cy="120" r="16" />
              <text x="60" y="125">x₂</text>
            </g>
            <g class="nn-node nn-node--input" id="node-i2" data-index="2">
              <circle cx="60" cy="190" r="16" />
              <text x="60" y="195">x₃</text>
            </g>
            
            <g class="nn-node nn-node--hidden" id="node-h0">
              <circle cx="200" cy="35" r="16" />
              <text x="200" y="40">h₁</text>
            </g>
            <g class="nn-node nn-node--hidden" id="node-h1">
              <circle cx="200" cy="90" r="16" />
              <text x="200" y="95">h₂</text>
            </g>
            <g class="nn-node nn-node--hidden" id="node-h2">
              <circle cx="200" cy="150" r="16" />
              <text x="200" y="155">h₃</text>
            </g>
            <g class="nn-node nn-node--hidden" id="node-h3">
              <circle cx="200" cy="205" r="16" />
              <text x="200" y="210">h₄</text>
            </g>
            
            <g class="nn-node nn-node--output" id="node-o0">
              <circle cx="340" cy="80" r="16" />
              <text x="340" y="85">y₁</text>
            </g>
            <g class="nn-node nn-node--output" id="node-o1">
              <circle cx="340" cy="160" r="16" />
              <text x="340" y="165">y₂</text>
            </g>
          </svg>
        </div>
      `;
    } else if (feat.mockup === 'code') {
      let highlighted = feat.code;
      // Keywords
      const keywords = ['import', 'class', 'def', 'return', 'as', 'self', 'super'];
      keywords.forEach(kw => {
        const regex = new RegExp(`\\b(${kw})\\b`, 'g');
        highlighted = highlighted.replace(regex, '<span class="code-keyword">$1</span>');
      });
      // Functions
      highlighted = highlighted.replace(/\b(\w+)(?=\()/g, '<span class="code-fn">$1</span>');

      visualHtml = `
        <div class="feature__mockup feature__mockup--code">
          <div class="mockup__bar">
            <span class="mockup__dot"></span>
            <span class="mockup__dot"></span>
            <span class="mockup__dot"></span>
          </div>
          <div class="mockup__body">
            <code style="white-space: pre; text-align: left; display: block; overflow-x: auto;">${highlighted}</code>
          </div>
        </div>
      `;
    } else {
      visualHtml = `
        <div class="feature__mockup feature__mockup--ui">
          <div class="ui-preview">
            ${feat.uiCards.map(card => `
              <div class="ui-preview__card">
                <div class="ui-preview__avatar ${card.avatarClass ? `ui-preview__avatar--${card.avatarClass}` : ''}"></div>
                <div class="ui-preview__lines">
                  <div class="ui-preview__line ui-preview__line--${card.lines[0]}"></div>
                  <div class="ui-preview__line ui-preview__line--${card.lines[1]}"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    const html = `
      <div class="feature ${isReverse}" data-animate="fade-up">
        <div class="feature__text">
          <h2 class="feature__title">${feat.title.replace(/\n/g, '<br>')}</h2>
          <p class="feature__desc">${feat.desc}</p>
        </div>
        <div class="feature__visual">
          ${visualHtml}
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
  });
  initNeuralNetworkSim();
}

function renderProjects(projects) {
  const container = document.querySelector('.projects__grid');
  if (!container || !projects) return;

  container.innerHTML = '';
  projects.forEach((proj, idx) => {
    let visualHtml = '';
    const type = proj.visualType;

    if (proj.image) {
      visualHtml = `
        <img src="${proj.image}" class="project-card__img" alt="${proj.title}" loading="lazy" />
      `;
    } else if (type === 1) {
      visualHtml = `
        <div class="visual-circles">
          <div class="visual-circle visual-circle--1"></div>
          <div class="visual-circle visual-circle--2"></div>
          <div class="visual-circle visual-circle--3"></div>
        </div>
      `;
    } else if (type === 2) {
      visualHtml = `
        <div class="visual-grid">
          <div class="visual-grid__item"></div>
          <div class="visual-grid__item"></div>
          <div class="visual-grid__item"></div>
          <div class="visual-grid__item"></div>
        </div>
      `;
    } else if (type === 3) {
      visualHtml = `
        <div class="visual-wave">
          <svg viewBox="0 0 400 200" preserveAspectRatio="none">
            <path class="wave-path" d="M0,100 C100,50 200,150 300,100 C350,75 380,90 400,100 L400,200 L0,200 Z" />
          </svg>
        </div>
      `;
    } else {
      visualHtml = `
        <div class="visual-dots">
          <span></span><span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      `;
    }

    const html = `
      <article class="project-card" data-animate="fade-up" data-delay="${idx * 100}">
        <div class="project-card__image">
          <div class="project-card__visual project-card__visual--${type}">
            ${visualHtml}
          </div>
          <div class="project-card__actions">
            <button class="project-card__btn project-card__btn--demo" data-youtube="${proj.youtubeId || ''}" aria-label="Xem video demo của ${proj.title}">
              <svg class="btn-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Demo
            </button>
            <a href="${proj.sourceUrl || '#'}" target="_blank" rel="noopener noreferrer" class="project-card__btn project-card__btn--source" aria-label="Xem mã nguồn của ${proj.title}">
              <svg class="btn-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
              </svg>
              Source
            </a>
          </div>
        </div>
        <div class="project-card__body">
          <span class="project-card__tag">${proj.tag}</span>
          <h3 class="project-card__title">${proj.title}</h3>
          <p class="project-card__desc">${proj.desc}</p>
        </div>
      </article>
    `;
    container.insertAdjacentHTML('beforeend', html);
  });
}

function renderSkills(skills) {
  if (!skills) return;

  // Machine Learning list
  const feList = document.querySelector('.skills__card:nth-child(1) .skills__list');
  if (feList) {
    feList.innerHTML = skills.machineLearning.map(tag => `<span class="skill-tag">${tag}</span>`).join('');
  }

  // Computer Vision list
  const beList = document.querySelector('.skills__card:nth-child(2) .skills__list');
  if (beList) {
    beList.innerHTML = skills.computerVision.map(tag => `<span class="skill-tag">${tag}</span>`).join('');
  }
}

/* ------------------------------------------
   YouTube Video Demo Modal Controller
   ------------------------------------------ */
function initVideoModal() {
  const modal = document.getElementById('videoModal');
  const backdrop = modal ? modal.querySelector('.video-modal__backdrop') : null;
  const closeBtn = document.getElementById('modalClose');
  const iframe = document.getElementById('modalIframe');

  if (!modal || !closeBtn || !iframe) return;

  // Delegate click event to document body to handle dynamically loaded Demo buttons
  document.body.addEventListener('click', (e) => {
    const demoBtn = e.target.closest('.project-card__btn--demo');
    if (!demoBtn) return;

    e.preventDefault();
    e.stopPropagation();

    const youtubeId = demoBtn.getAttribute('data-youtube');
    if (!youtubeId) return;

    // Load iframe video with autoplay and rel parameter
    iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
  });

  // Close modal function
  const closeModal = () => {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    
    // Reset iframe to stop the video completely
    iframe.src = '';
    
    // Restore body scrolling
    document.body.style.overflow = '';
  };

  // Close triggers
  closeBtn.addEventListener('click', closeModal);
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}

/* ------------------------------------------
   Navigation Menu Loops
   ------------------------------------------ */
function initNavigation() {
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section, footer');

  if (!nav) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }

    // Dynamic menu highlighting
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('nav__link--active');
      const dataSection = link.getAttribute('data-section');
      if (dataSection && currentSectionId === dataSection) {
        link.classList.add('nav__link--active');
      }
    });
  }, { passive: true });

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('nav__toggle--active');
      mobileMenu.classList.toggle('mobile-menu--active');
      document.body.style.overflow = mobileMenu.classList.contains('mobile-menu--active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('nav__toggle--active');
        mobileMenu.classList.remove('mobile-menu--active');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ------------------------------------------
   Scroll Animations
   ------------------------------------------ */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute('data-delay') || '0');
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* ------------------------------------------
   Smooth Link Scroll
   ------------------------------------------ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = 52;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ------------------------------------------
   Canvas Performance Viewport Helper
   ------------------------------------------ */
function observeCanvasVisibility(canvas, onVisible, onHidden) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        onVisible();
      } else {
        onHidden();
      }
    });
  }, { threshold: 0.01 });

  observer.observe(canvas);
}

/* ==========================================================
   WebGL 3D INTERACTIVE PARTICLE GRID (THREE.JS PHYSICS)
   ========================================================== */
class ParticleGrid {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Standardized mouse coordinates for raycasting
    this.mouse = new THREE.Vector2(-9999, -9999);
    this.targetMouse = new THREE.Vector2(-9999, -9999);

    this.init();
    this.createParticles();
    this.setupEvents();
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 1000);
    this.camera.position.z = 32;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    this.raycaster = new THREE.Raycaster();
    
    // Virtual raycast projection plane
    const planeGeo = new THREE.PlaneGeometry(150, 150);
    const planeMat = new THREE.MeshBasicMaterial({ visible: false });
    this.raycastPlane = new THREE.Mesh(planeGeo, planeMat);
    this.scene.add(this.raycastPlane);
  }

  createParticles() {
    const numParticles = 4000;

    const positions = new Float32Array(numParticles * 3);
    const initialPositions = new Float32Array(numParticles * 3);
    const velocities = new Float32Array(numParticles * 3);

    const radius = 13;

    for (let i = 0; i < numParticles; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / numParticles);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('initialPos', new THREE.BufferAttribute(initialPositions, 3));
    this.geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    // Circular fade canvas texture
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const texture = new THREE.CanvasTexture(canvas);

    this.material = new THREE.PointsMaterial({
      color: 0x3279f9, // Google Antigravity Blue Accent
      size: 0.28,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particleSystem = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.particleSystem);
  }

  setupEvents() {
    window.addEventListener('mousemove', (e) => {
      this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      
      this.renderer.setSize(this.width, this.height);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Slow rotation of the particle system to enhance 3D perception
    if (this.particleSystem) {
      this.particleSystem.rotation.y += 0.0015;
      this.particleSystem.rotation.x += 0.0005;
    }

    // Dampen mouse coordinate changes for fluid elasticity
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.08;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.08;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.raycastPlane);
    
    let localTouch = null;
    if (intersects.length > 0 && this.particleSystem) {
      localTouch = intersects[0].point.clone();
      this.particleSystem.worldToLocal(localTouch);
    }

    const positions = this.geometry.attributes.position.array;
    const initialPos = this.geometry.attributes.initialPos.array;
    const velocities = this.geometry.attributes.velocity.array;

    const numParticles = positions.length / 3;

    // Damped elastic physics parameters
    const springFactor = 0.035; 
    const damping = 0.92;       
    const repelRadius = 6.0;    
    const repelForce = 0.35;    

    const time = Date.now();

    // Breathing period: slowly expands and contracts
    const breath = 1.0 + 0.15 * Math.sin(time * 0.0005);

    for (let i = 0; i < numParticles; i++) {
      const idx = i * 3;

      // Base direction vector of the particle
      const ix = initialPos[idx];
      const iy = initialPos[idx + 1];
      const iz = initialPos[idx + 2];

      const length = Math.sqrt(ix*ix + iy*iy + iz*iz);
      const nx = ix / length;
      const ny = iy / length;
      const nz = iz / length;

      // Organic distortion: sinusoidal waves running across the sphere surface
      const distortion = 1.0 + 0.12 * Math.sin(nx * 3 + time * 0.001) * Math.cos(ny * 3 + time * 0.0015) * Math.sin(nz * 2 + time * 0.0008);

      // Target position under breathing & distortion
      const targetRadius = length * breath * distortion;
      const tx = nx * targetRadius;
      const ty = ny * targetRadius;
      const tz = nz * targetRadius;

      // Spring force towards the breathing target
      let dx = positions[idx] - tx;
      let dy = positions[idx + 1] - ty;
      let dz = positions[idx + 2] - tz;

      let ax = -dx * springFactor;
      let ay = -dy * springFactor;
      let az = -dz * springFactor;

      if (localTouch) {
        const mx = positions[idx] - localTouch.x;
        const my = positions[idx + 1] - localTouch.y;
        const mz = positions[idx + 2] - localTouch.z;
        const distSq = mx * mx + my * my + mz * mz;
        const dist = Math.sqrt(distSq);

        if (dist < repelRadius && dist > 0.01) {
          const force = (repelRadius - dist) / repelRadius;
          const repellingPower = force * repelForce;
          
          ax += (mx / dist) * repellingPower;
          ay += (my / dist) * repellingPower;
          az += (mz / dist) * repellingPower;
        }
      }

      velocities[idx] = (velocities[idx] + ax) * damping;
      velocities[idx + 1] = (velocities[idx + 1] + ay) * damping;
      velocities[idx + 2] = (velocities[idx + 2] + az) * damping;

      positions[idx] += velocities[idx];
      positions[idx + 1] += velocities[idx + 1];
      positions[idx + 2] += velocities[idx + 2];
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
  }
}


/* ------------------------------------------
   CTA section floating stardust constellation
   ------------------------------------------ */
function initCtaParticles() {
  const canvas = document.getElementById('ctaParticles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let isRunning = false;

  let particles = [];
  const particleCount = 45;
  const connectionDistance = 90;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.y < -10) {
        this.y = canvas.height + 10;
        this.x = Math.random() * canvas.width;
      }
      if (this.x < -10) this.x = canvas.width + 10;
      if (this.x > canvas.width + 10) this.x = -10;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(129, 140, 248, ${this.opacity})`;
      ctx.fill();
    }
  }

  function setupParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    drawConnections();

    if (isRunning) {
      animationFrameId = requestAnimationFrame(loop);
    }
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    setupParticles();
  });

  resizeCanvas();
  setupParticles();

  observeCanvasVisibility(canvas,
    () => {
      if (!isRunning) {
        isRunning = true;
        loop();
      }
    },
    () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    }
  );
}

/* ------------------------------------------
   Colab Pets Walking Simulation Engine
   ------------------------------------------ */
class ColabPet {
  constructor(petInfo, containerWidth) {
    this.name = petInfo.name;
    this.gifPath = petInfo.path;
    this.type = petInfo.type; // 'kittens', 'corgis', 'crabs', 'firefox'
    this.defaultFace = petInfo.defaultFace || 'left';
    
    // Create elements
    this.element = document.createElement('img');
    this.element.src = this.gifPath;
    this.element.alt = this.name;
    this.element.className = 'colab-pet';
    
    // Size based on pet type
    this.width = this.type === 'crabs' || this.type === 'firefox' ? 36 : 32;
    this.element.style.width = `${this.width}px`;
    
    this.containerWidth = containerWidth;
    
    // Set constant slower speeds
    if (this.type === 'crabs') {
      this.speed = 0.22;
    } else if (this.type === 'kittens') {
      this.speed = 0.26;
    } else if (this.type === 'corgis') {
      this.speed = 0.32;
    } else {
      this.speed = 0.30;
    }
    
    // Initial spawn: distribute randomly across screen first load, but subsequent loops spawn off-screen
    this.resetPosition(true);
  }
  
  resetPosition(initial = false) {
    this.direction = Math.random() > 0.5 ? 1 : -1;
    if (initial) {
      this.x = Math.random() * (this.containerWidth - this.width);
    } else {
      if (this.direction === 1) {
        this.x = -this.width - 20;
      } else {
        this.x = this.containerWidth + 20;
      }
    }
    this.updateElementPosition();
  }
  
  updateElementPosition() {
    // Face the correct direction dynamically based on natural GIF defaultFace alignment
    const flipMultiplier = this.defaultFace === 'left' ? -1 : 1;
    const scaleX = this.direction * flipMultiplier;
    this.element.style.transform = `translateX(${this.x}px) scaleX(${scaleX})`;
  }
  
  tick() {
    // Walk continuously at a constant speed in the current direction (no idle states)
    this.x += this.speed * this.direction;
    
    // Detect when completely off-screen, and trigger a loop reset
    if (this.direction === 1 && this.x > this.containerWidth + 20) {
      this.resetPosition(false);
    } else if (this.direction === -1 && this.x < -this.width - 20) {
      this.resetPosition(false);
    } else {
      this.updateElementPosition();
    }
  }
  
  resize(newWidth) {
    this.containerWidth = newWidth;
    this.updateElementPosition();
  }
  
  destroy() {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

function initColabPets() {
  const container = document.getElementById('colabPetsContainer');
  const ctrlToggle = document.getElementById('colabCtrlToggle');
  const ctrlMenu = document.getElementById('colabCtrlMenu');
  
  if (!container || !ctrlToggle || !ctrlMenu) return;
  
  // Toggle control panel
  ctrlToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    ctrlToggle.classList.toggle('is-active');
    ctrlMenu.classList.toggle('is-open');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!ctrlMenu.contains(e.target) && !ctrlToggle.contains(e.target)) {
      ctrlToggle.classList.remove('is-active');
      ctrlMenu.classList.remove('is-open');
    }
  });

  const petData = [
    { name: 'Oreo', path: 'assets/oreo.gif', type: 'kittens', defaultFace: 'right' },
    { name: 'Red Velvet', path: 'assets/redvelvet.gif', type: 'kittens', defaultFace: 'left' },
    { name: 'Chocolate Chip', path: 'assets/chocolatechip.gif', type: 'kittens', defaultFace: 'left' },
    { name: 'Midnight', path: 'assets/MIDNIGHT.gif', type: 'corgis', defaultFace: 'left' },
    { name: 'Stripes', path: 'assets/STRIPES.gif', type: 'corgis', defaultFace: 'left' },
    { name: 'Crab', path: 'assets/crab.gif', type: 'crabs', defaultFace: 'left' },
    { name: 'Firefox', path: 'assets/FIREFOX.gif', type: 'firefox', defaultFace: 'left' }
  ];
  
  let activePets = [];
  const state = {
    kittens: true,
    corgis: true,
    crabs: true,
    firefox: true
  };
  
  function getContainerWidth() {
    return container.offsetWidth;
  }
  
  function spawnPets() {
    // Destroy all current active pets
    activePets.forEach(p => p.destroy());
    activePets = [];
    
    // Spawn active categories
    const width = getContainerWidth();
    petData.forEach(p => {
      if (state[p.type]) {
        const pet = new ColabPet(p, width);
        container.appendChild(pet.element);
        activePets.push(pet);
      }
    });
  }
  
  // Checkbox bindings
  const toggles = {
    kittens: document.getElementById('toggleKitties'),
    corgis: document.getElementById('toggleCorgis'),
    crabs: document.getElementById('toggleCrabs'),
    firefox: document.getElementById('toggleFirefox')
  };
  
  Object.keys(toggles).forEach(type => {
    const el = toggles[type];
    if (el) {
      el.addEventListener('change', (e) => {
        state[type] = e.target.checked;
        spawnPets();
      });
    }
  });
  
  // Initial spawn
  spawnPets();
  
  // Animation Loop
  let animationFrameId;
  function animate() {
    activePets.forEach(pet => pet.tick());
    animationFrameId = requestAnimationFrame(animate);
  }
  animate();
  
  // Resize handler
  window.addEventListener('resize', () => {
    const width = getContainerWidth();
    activePets.forEach(pet => pet.resize(width));
  });
}

/* ==========================================
   INTERACTIVE NEURAL NETWORK TOY SIMULATION
   ========================================== */
function initNeuralNetworkSim() {
  const inputNodes = document.querySelectorAll('.nn-node--input');
  if (inputNodes.length === 0) return;

  const activeInputs = [false, false, false];

  inputNodes.forEach((node) => {
    node.addEventListener('click', () => {
      const idx = parseInt(node.getAttribute('data-index'));
      activeInputs[idx] = !activeInputs[idx];
      
      if (activeInputs[idx]) {
        node.classList.add('is-active');
      } else {
        node.classList.remove('is-active');
      }

      propagateNeuralSignals(activeInputs);
    });
  });
}

function propagateNeuralSignals(activeInputs) {
  const hiddenNodes = [
    { id: 'node-h0', weights: [0.8, 0.2, 0.4] },
    { id: 'node-h1', weights: [0.1, 0.9, 0.3] },
    { id: 'node-h2', weights: [0.5, 0.5, 0.7] },
    { id: 'node-h3', weights: [0.7, 0.1, 0.8] }
  ];

  const outputNodes = [
    { id: 'node-o0', weights: [0.9, 0.2, 0.7, 0.3] },
    { id: 'node-o1', weights: [0.1, 0.8, 0.3, 0.9] }
  ];

  // 1. Immediately update input-hidden paths (edges)
  hiddenNodes.forEach((h, hIdx) => {
    activeInputs.forEach((act, iIdx) => {
      const edge = document.getElementById(`edge-i${iIdx}-h${hIdx}`);
      if (edge) {
        if (act) {
          edge.classList.add('is-active', 'is-pulse');
        } else {
          edge.classList.remove('is-active', 'is-pulse');
        }
      }
    });
  });

  // 2. Delay 250ms: Hidden layer nodes light up based on weighted activation!
  setTimeout(() => {
    hiddenNodes.forEach((h, hIdx) => {
      const nodeEl = document.getElementById(h.id);
      if (!nodeEl) return;

      let activation = 0;
      activeInputs.forEach((act, iIdx) => {
        if (act) activation += h.weights[iIdx];
      });

      activation = Math.min(activation, 1.0);

      const circle = nodeEl.querySelector('circle');
      if (circle) {
        if (activation > 0.05) {
          nodeEl.classList.add('is-active');
          circle.style.fillOpacity = 0.3 + activation * 0.7;
          circle.style.strokeOpacity = 0.5 + activation * 0.5;
        } else {
          nodeEl.classList.remove('is-active');
          circle.style.fillOpacity = '';
          circle.style.strokeOpacity = '';
        }
      }
    });

    // 3. Simultaneously: Update hidden-output paths (edges)
    outputNodes.forEach((o, oIdx) => {
      hiddenNodes.forEach((h, hIdx) => {
        const edge = document.getElementById(`edge-h${hIdx}-o${oIdx}`);
        if (!edge) return;

        let hActivation = 0;
        activeInputs.forEach((act, iIdx) => {
          if (act) hActivation += h.weights[iIdx];
        });

        if (hActivation > 0.05) {
          edge.classList.add('is-active', 'is-pulse');
        } else {
          edge.classList.remove('is-active', 'is-pulse');
        }
      });
    });

    // 4. Delay 500ms: Output nodes light up!
    setTimeout(() => {
      outputNodes.forEach((o, oIdx) => {
        const nodeEl = document.getElementById(o.id);
        if (!nodeEl) return;

        let activation = 0;
        hiddenNodes.forEach((h, hIdx) => {
          let hActivation = 0;
          activeInputs.forEach((act, iIdx) => {
            if (act) hActivation += h.weights[iIdx];
          });
          hActivation = Math.min(hActivation, 1.0);
          activation += hActivation * o.weights[hIdx];
        });

        activation = Math.min(activation, 1.0);

        const circle = nodeEl.querySelector('circle');
        if (circle) {
          if (activation > 0.05) {
            nodeEl.classList.add('is-active');
            circle.style.fillOpacity = 0.3 + activation * 0.7;
            circle.style.strokeOpacity = 0.5 + activation * 0.5;
          } else {
            nodeEl.classList.remove('is-active');
            circle.style.fillOpacity = '';
            circle.style.strokeOpacity = '';
          }
        }
      });
    }, 250);
  }, 250);
}

