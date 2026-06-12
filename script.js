document.documentElement.classList.add('js');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ─── THEME ─── */
const THEME_KEY = 'theme';
const themeToggle = document.getElementById('theme-toggle');

const applyTheme = (theme) => {
  const isLight = theme === 'light';
  if (isLight) document.documentElement.setAttribute('data-theme', 'light');
  else document.documentElement.removeAttribute('data-theme');
  try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignore */ }
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  }
};

themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(next);
});

/* ─── SKILLS DATA ─── */
const SKILLS = [
  { name: 'React', icon: 'fab fa-react', level: 'Proficient', levelClass: 'level--proficient' },
  { name: 'Next.js', icon: 'fas fa-n', level: 'Proficient', levelClass: 'level--proficient' },
  { name: 'JavaScript', icon: 'fab fa-js', level: 'Proficient', levelClass: 'level--proficient' },
  { name: 'TypeScript', icon: 'fas fa-code', level: 'Proficient', levelClass: 'level--proficient' },
  { name: 'Tailwind', icon: 'fas fa-wind', level: 'Proficient', levelClass: 'level--proficient' },
  { name: 'Node.js', icon: 'fab fa-node-js', level: 'Proficient', levelClass: 'level--proficient' },
  { name: 'Express', icon: 'fas fa-server', level: 'Proficient', levelClass: 'level--proficient' },
  { name: 'Supabase', icon: 'fas fa-database', level: 'Proficient', levelClass: 'level--proficient' },
  { name: 'PostgreSQL', icon: 'fas fa-database', level: 'Proficient', levelClass: 'level--proficient' },
  { name: 'MongoDB', icon: 'fas fa-leaf', level: 'Proficient', levelClass: 'level--proficient' },
  { name: 'MySQL', icon: 'fas fa-database', level: 'Proficient', levelClass: 'level--proficient' },
  { name: 'Docker', icon: 'fab fa-docker', level: 'Proficient', levelClass: 'level--proficient' },
];

const CASE_STUDIES = {
  medpal: {
    title: 'MedPal — Digital Health Platform',
    problem: 'Healthcare clinics needed a unified system to manage patients, doctors, and appointments without fragmented tools.',
    solution: 'Built a full-stack health management platform with role-based dashboards for admins, doctors, and patients.',
    features: ['Role-based authentication', 'Appointment scheduling', 'Patient records management', 'Reusable React component library', 'Responsive dashboards'],
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    architecture: 'Monolithic REST API with React SPA frontend, MongoDB for flexible health records, JWT-based auth with role middleware.',
    role: 'Full Stack Developer — UI design, frontend architecture, API integration, and database modeling.',
    github: 'https://github.com/dijanahasanii/MedPal',
    demo: true,
  },
  wandr: {
    title: 'Wandr — Travel Experience Platform',
    problem: 'Travelers lacked a centralized platform to share experiences with location tagging and social engagement.',
    solution: 'Microservices-based platform with Docker Compose, allowing users to post travel stories with photos and notifications.',
    features: ['User accounts & profiles', 'Photo uploads with captions', 'Location selection', 'Real-time notifications', 'Containerized microservices'],
    tech: ['React', 'Node.js', 'MongoDB', 'Docker', 'Microservices'],
    architecture: 'Multiple Node.js services behind Docker Compose, shared MongoDB, React frontend communicating via API gateway pattern.',
    role: 'Full Stack Developer — service design, frontend, Docker configuration, and API development.',
    github: 'https://github.com/dijanahasanii/TravelBlog',
    demo: false,
  },
  safety: {
    title: 'Personal Safety App',
    problem: 'People need immediate access to emergency tools and location sharing when personal safety is at risk.',
    solution: 'Cross-platform mobile app with SOS alerts, real-time location sharing, and emergency contact workflows.',
    features: ['SOS one-tap alert', 'Real-time GPS sharing', 'Emergency contacts', 'Cross-platform (iOS/Android)', 'Offline-capable core features'],
    tech: ['React Native', 'Expo', 'JavaScript'],
    architecture: 'React Native with Expo for rapid deployment, native device APIs for location and notifications.',
    role: 'Mobile Developer — UI/UX, feature implementation, and device integration.',
    github: 'https://github.com/dijanahasanii/PersonalSafetyApp',
    demo: true,
    safety: true,
  },
};

/* ─── RENDER SKILLS ─── */
const skillsGrid = document.getElementById('skills-grid');
if (skillsGrid) {
  skillsGrid.innerHTML = SKILLS.map(
    (s, i) => `
    <article class="skill-card glass reveal-stagger" data-tilt style="transition-delay:${i * 0.04}s">
      <i class="${s.icon}"></i>
      <h4>${s.name}</h4>
      <span class="level ${s.levelClass}">${s.level}</span>
    </article>`
  ).join('');
}

/* ─── VIDEO MODALS ─── */
function openDemo() {
  document.getElementById('demo-iframe').src = 'https://www.youtube.com/embed/StJY3I9yxDE?autoplay=1';
  document.getElementById('demo-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDemo(e) {
  if (e && e.target !== document.getElementById('demo-modal')) return;
  document.getElementById('demo-iframe').src = '';
  document.getElementById('demo-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function openSafetyDemo() {
  document.getElementById('safety-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('safety-video').play();
}

function closeSafetyDemo(e) {
  if (e && e.target !== document.getElementById('safety-modal')) return;
  const video = document.getElementById('safety-video');
  video.pause();
  video.currentTime = 0;
  document.getElementById('safety-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function openCaseStudy(id) {
  const data = CASE_STUDIES[id];
  if (!data) return;

  let actions = `<a href="${data.github}" target="_blank" class="btn btn--ghost"><i class="fab fa-github"></i> GitHub</a>`;
  if (data.demo && data.safety) {
    actions += `<button class="btn btn--primary" onclick="closeCaseStudy();openSafetyDemo()"><i class="fas fa-play"></i> Watch Demo</button>`;
  } else if (data.demo) {
    actions += `<button class="btn btn--primary" onclick="closeCaseStudy();openDemo()"><i class="fas fa-play"></i> Live Demo</button>`;
  }

  document.getElementById('case-content').innerHTML = `
    <h2>${data.title}</h2>
    <h4>Problem</h4><p>${data.problem}</p>
    <h4>Solution</h4><p>${data.solution}</p>
    <h4>Features</h4><ul>${data.features.map((f) => `<li>${f}</li>`).join('')}</ul>
    <h4>Technologies</h4><div class="tags">${data.tech.map((t) => `<span>${t}</span>`).join('')}</div>
    <h4>Architecture</h4><p>${data.architecture}</p>
    <h4>My Role</h4><p>${data.role}</p>
    <div class="case__actions">${actions}</div>`;

  document.getElementById('case-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCaseStudy(e) {
  if (e && e.target !== document.getElementById('case-modal')) return;
  document.getElementById('case-modal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDemo();
    closeSafetyDemo();
    closeCaseStudy();
  }
});

/* ─── NAV ─── */
const navWrap = document.getElementById('nav-wrap');
const navLinks = document.querySelectorAll('.nav__links a[data-nav]');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navList = document.getElementById('nav-links');

function updateNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = 'top';
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 160) current = s.id;
  });
  navLinks.forEach((l) => l.classList.toggle('active', l.dataset.nav === current));
}

window.addEventListener('scroll', () => {
  navWrap.classList.toggle('scrolled', window.scrollY > 40);
  updateNav();
  document.getElementById('scroll-progress').style.width = `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`;
  document.getElementById('fab-top').classList.toggle('visible', window.scrollY > 600);
}, { passive: true });

if (navToggle && navList) {
  const navListParent = navList.parentElement;
  let menuScrollY = 0;

  const isMobileNav = () => window.matchMedia('(max-width: 768px)').matches;

  const lockBodyScroll = () => {
    menuScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${menuScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  };

  const unlockBodyScroll = () => {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, menuScrollY);
  };

  const closeMenu = () => {
    navList.classList.remove('open');
    navToggle.classList.remove('open');
    document.documentElement.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');

    if (navListParent && navList.parentElement === document.body) {
      navListParent.appendChild(navList);
    }

    unlockBodyScroll();
  };

  const openMenu = () => {
    if (isMobileNav()) {
      document.body.appendChild(navList);
      lockBodyScroll();
    }

    navList.classList.add('open');
    navToggle.classList.add('open');
    document.documentElement.classList.add('menu-open');
    document.body.classList.add('menu-open');
    navToggle.setAttribute('aria-expanded', 'true');
  };

  navToggle.addEventListener('click', () => {
    if (navList.classList.contains('open')) closeMenu();
    else openMenu();
  });

  navClose?.addEventListener('click', closeMenu);

  navList.addEventListener('click', (e) => {
    if (e.target === navList) closeMenu();
  });

  navList.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (!isMobileNav() && navList.classList.contains('open')) closeMenu();
  });
}

document.getElementById('fab-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  });
});

/* ─── TYPING ─── */
const phrases = [
  'Full Stack Developer',
  'React Specialist',
  'Next.js Developer',
  'React Native Developer',
  'UI Lover',
];

const typedEl = document.getElementById('typed');
let pi = 0;
let ci = 0;
let deleting = false;

function typeLoop() {
  if (!typedEl) return;
  const current = phrases[pi];
  typedEl.textContent = deleting ? current.substring(0, ci - 1) : current.substring(0, ci + 1);
  ci += deleting ? -1 : 1;

  let delay = deleting ? 45 : 80;
  if (!deleting && ci === current.length) { delay = 2200; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 500; }

  setTimeout(typeLoop, delay);
}

if (typedEl && !prefersReducedMotion) typeLoop();
else if (typedEl) typedEl.textContent = phrases[0];

/* ─── SCROLL REVEAL ─── */
const fadeObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObserver.unobserve(e.target);
      e.target.querySelectorAll('[data-count]').forEach(animateCount);
    }
  }),
  { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.section-fade').forEach((el) => fadeObserver.observe(el));

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  if (Number.isNaN(target)) return;
  if (prefersReducedMotion) {
    el.textContent = target + suffix;
    return;
  }
  const duration = 1200;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(p * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ─── CURSOR ─── */
if (canHover && !prefersReducedMotion) {
  document.body.classList.add('has-cursor');
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let cx = 0; let cy = 0;

  document.addEventListener('mousemove', (e) => { cx = e.clientX; cy = e.clientY; }, { passive: true });
  document.querySelectorAll('a, button, .magnetic, [data-tilt]').forEach((el) => {
    el.addEventListener('mouseenter', () => ring?.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring?.classList.remove('hover'));
  });

  const animCursor = () => {
    if (dot) { dot.style.left = `${cx}px`; dot.style.top = `${cy}px`; }
    if (ring) { ring.style.left = `${cx}px`; ring.style.top = `${cy}px`; }
    requestAnimationFrame(animCursor);
  };
  animCursor();
}

/* ─── SPOTLIGHT ─── */
if (canHover && !prefersReducedMotion) {
  const spot = document.getElementById('spotlight');
  let mx = 0; let my = 0; let sx = 0; let sy = 0;
  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
  const animSpot = () => {
    sx += (mx - sx) * 0.06;
    sy += (my - sy) * 0.06;
    if (spot) { spot.style.left = `${sx}px`; spot.style.top = `${sy}px`; }
    requestAnimationFrame(animSpot);
  };
  animSpot();
}

/* ─── PARTICLES ─── */
if (!prefersReducedMotion) {
  const canvas = document.getElementById('particles');
  const ctx = canvas?.getContext('2d');
  if (canvas && ctx) {
    let pts = [];
    let w = 0; let h = 0;
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    const init = () => {
      const n = Math.min(50, Math.floor(w * h / 25000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() + 0.5, vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
        a: Math.random() * 0.4 + 0.1,
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.a})`;
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(p.x - pts[j].x, p.y - pts[j].y);
          if (d < 90) {
            ctx.strokeStyle = `rgba(139,92,246,${0.05 * (1 - d / 90)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    };
    resize(); init(); draw();
    window.addEventListener('resize', () => { resize(); init(); }, { passive: true });
  }
}

/* ─── MAGNETIC ─── */
if (canHover && !prefersReducedMotion) {
  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.2}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* ─── TILT ─── */
if (canHover && !prefersReducedMotion) {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--tilt-x', `${((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -4}deg`);
      card.style.setProperty('--tilt-y', `${((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 4}deg`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
}

updateNav();
