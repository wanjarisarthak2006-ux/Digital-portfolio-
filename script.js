/* =============================================
   SARTHAK WANJARI — PORTFOLIO SCRIPT.JS
   ============================================= */

/* === LOADING SCREEN === */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hide');
    document.body.style.overflow = 'auto';
    // Trigger hero reveal
    document.querySelectorAll('#hero .reveal-left, #hero .reveal-right').forEach(el => {
      el.classList.add('visible');
    });
  }, 2200);
});
document.body.style.overflow = 'hidden';

/* === CUSTOM CURSOR === */
const cursorGlow = document.getElementById('cursor-glow');
const cursorDot = document.getElementById('cursor-dot');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  glowX += (mouseX - glowX) * 0.12;
  glowY += (mouseY - glowY) *.12;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top = glowY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Enlarge cursor on interactive elements
document.querySelectorAll('a, button, .cert-card, .project-card, .soft-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorGlow.style.width = '60px';
    cursorGlow.style.height = '60px';
    cursorGlow.style.background = 'radial-gradient(circle, rgba(6,182,212,0.5), transparent 70%)';
  });
  el.addEventListener('mouseleave', () => {
    cursorGlow.style.width = '32px';
    cursorGlow.style.height = '32px';
    cursorGlow.style.background = 'radial-gradient(circle, rgba(124,58,237,0.4), transparent 70%)';
  });
});

/* === SCROLL PROGRESS === */
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  document.getElementById('scroll-progress').style.width = progress + '%';
});

/* === STICKY NAV === */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 80);
});

/* === ACTIVE NAV LINK === */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}
window.addEventListener('scroll', updateActiveNav);

/* === HAMBURGER MENU === */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* === SMOOTH SCROLL === */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* === DARK / LIGHT MODE === */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
let isDark = true;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
});

/* === PARTICLE CANVAS === */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animId;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.speedY = (Math.random() - 0.5) * 0.6;
    this.opacity = Math.random() * 0.6 + 0.1;
    this.color = Math.random() > 0.5 ? '#7c3aed' : '#06b6d4';
    this.twinkle = Math.random() * Math.PI * 2;
    this.twinkleSpeed = Math.random() * 0.03 + 0.01;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.twinkle += this.twinkleSpeed;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    const alpha = this.opacity * (0.6 + 0.4 * Math.sin(this.twinkle));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
    ctx.fill();
  }
}

function initParticles() {
  resizeCanvas();
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 8000);
  for (let i = 0; i < Math.min(count, 120); i++) {
    particles.push(new Particle());
  }
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(124,58,237,${0.15 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  animId = requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
window.addEventListener('resize', () => {
  cancelAnimationFrame(animId);
  initParticles();
  animateParticles();
});

/* === TYPING ANIMATION === */
const roles = [
  'Engineering Student',
  'Frontend Developer',
  'Python Learner',
  'Cybersecurity Enthusiast',
  'Future Software Engineer'
];
let roleIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById('typing-text');

function typeWriter() {
  const current = roles[roleIdx];
  if (!deleting) {
    typingEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeWriter, 2000);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeWriter, deleting ? 60 : 100);
}
setTimeout(typeWriter, 2500);

/* === REVEAL ON SCROLL === */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.style.getPropertyValue('--delay') || '0s';
      setTimeout(() => {
        el.classList.add('visible');
      }, parseFloat(delay) * 1000);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* === COUNTER ANIMATION === */
function animateCounter(el, target) {
  let current = 0;
  const duration = 1500;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.counter');
      counters.forEach(c => {
        const target = parseInt(c.getAttribute('data-target'));
        animateCounter(c, target);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const aboutSection = document.getElementById('about');
if (aboutSection) counterObserver.observe(aboutSection);

/* === SKILL BARS ANIMATION === */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
          bar.style.width = width + '%';
        }, i * 120);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

/* === CERTIFICATE MODAL === */
function openCertModal(pdfPath, title) {
  const modal = document.getElementById('cert-modal');
  const iframe = document.getElementById('cert-iframe');
  const titleEl = document.getElementById('cert-modal-title');
  const dlBtn = document.getElementById('cert-download-btn');

  titleEl.textContent = title;
  iframe.src = pdfPath;
  dlBtn.href = pdfPath;
  dlBtn.setAttribute('download', title.replace(/\s+/g, '_') + '.pdf');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCertModal(e) {
  if (e.target === document.getElementById('cert-modal')) closeCertModalBtn();
}

function closeCertModalBtn() {
  const modal = document.getElementById('cert-modal');
  modal.classList.remove('open');
  setTimeout(() => {
    document.getElementById('cert-iframe').src = '';
  }, 400);
  document.body.style.overflow = 'auto';
}

/* === RESUME MODAL === */
function openResumeModal() {
  const modal = document.getElementById('resume-modal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeResumeModal(e) {
  if (e.target === document.getElementById('resume-modal')) closeResumeBtnClick();
}

function closeResumeBtnClick() {
  document.getElementById('resume-modal').classList.remove('open');
  document.body.style.overflow = 'auto';
}

/* === ESC KEY CLOSES MODALS === */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeCertModalBtn();
    closeResumeBtnClick();
  }
});

/* === CONTACT FORM === */
function handleFormSubmit() {
  const name = document.getElementById('form-name').value.trim();
  const email = document.getElementById('form-email').value.trim();
  const msg = document.getElementById('form-msg').value.trim();
  if (!name || !email || !msg) {
    alert('Please fill in all required fields.');
    return;
  }
  const success = document.getElementById('form-success');
  success.classList.remove('hidden');
  document.getElementById('form-name').value = '';
  document.getElementById('form-email').value = '';
  document.getElementById('form-subject').value = '';
  document.getElementById('form-msg').value = '';
  setTimeout(() => success.classList.add('hidden'), 5000);
}

/* === TILT EFFECT ON PROJECT CARDS === */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* === GLOWING TRAIL ON CERT CARDS === */
document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', x + 'px');
    card.style.setProperty('--mouse-y', y + 'px');
  });
});

/* === SECTION ENTRANCE STAGGER === */
document.querySelectorAll('[style*="--delay"]').forEach(el => {
  // Delays handled by IntersectionObserver above
});

console.log('%c Sarthak Wanjari Portfolio ', 'background: linear-gradient(135deg, #7c3aed, #06b6d4); color: white; font-size: 14px; padding: 6px 12px; border-radius: 4px; font-family: monospace;');
console.log('%c Built with ❤️ | Computer Engineering @ MITAOE ', 'color: #06b6d4; font-family: monospace;');
