document.documentElement.classList.add('js');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

/* ─── PROJECT LINKS ─── */
const PROJECT_LINKS = {
  aiReview: {
    github: 'https://github.com/dijanahasanii/AI-Powered-Code-Review-Assistant',
    demo: 'https://ai-powered-code-review-assistant-production.up.railway.app/',
    gallery: [
      { src: 'code-review-repos.png', alt: 'Connected repositories dashboard' },
      { src: 'code-review-run-detail.png', alt: 'Automated review run with findings and quality score' },
    ],
  },
};

const CASE_STUDIES = {
  medpal: {
    title: 'MedPal — Digital Health Platform',
    overview: 'A full-stack digital health platform for clinics, doctors, and patients with role-based dashboards.',
    problem: 'Healthcare clinics needed a unified system to manage patients, doctors, and appointments without fragmented tools.',
    solution: 'Built a React SPA with a Node.js/Express REST API and MongoDB, delivering role-based dashboards for admins, doctors, and patients.',
    role: 'Full Stack Developer — UI design, frontend architecture, API integration, authentication flows, and database modeling.',
    features: [
      'Role-based authentication (admin, doctor, patient)',
      'Appointment scheduling',
      'Patient records management',
      'Reusable React component library',
      'Responsive dashboards',
    ],
    challenges: [
      'Modeling role-based access across shared health workflows',
      'Keeping dashboards consistent while serving different user roles',
    ],
    results: 'Delivered a working full-stack health management application with authenticated role-based access and a demoable UI.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    architecture: 'Monolithic REST API with React SPA frontend, MongoDB for flexible health records, JWT-based auth with role middleware.',
    github: 'https://github.com/dijanahasanii/MedPal',
    demo: true,
  },
  wandr: {
    title: 'Wandr — Travel Experience Platform',
    overview: 'A microservices-based travel blogging platform for sharing experiences with photos, locations, and notifications.',
    problem: 'Travelers lacked a centralized platform to share experiences with location tagging and social engagement.',
    solution: 'Designed a Docker Compose microservices architecture with Node.js services, MongoDB, and a React frontend for travel posts and notifications.',
    role: 'Full Stack Developer — service design, frontend, Docker configuration, and API development.',
    features: [
      'User accounts & profiles',
      'Photo uploads with captions',
      'Location selection',
      'Real-time notifications',
      'Containerized microservices',
    ],
    challenges: [
      'Splitting functionality across services without over-complicating local development',
      'Coordinating Docker Compose services and shared data access',
    ],
    results: 'A working travel platform prototype that demonstrates microservices architecture, containerization, and full-stack delivery.',
    tech: ['React', 'Node.js', 'MongoDB', 'Docker', 'Microservices'],
    architecture: 'Multiple Node.js services behind Docker Compose, shared MongoDB, React frontend communicating via API patterns.',
    github: 'https://github.com/dijanahasanii/TravelBlog',
    demo: false,
  },
  safety: {
    title: 'Personal Safety App',
    overview: 'A personal safety app built with Expo and React Native for on-device emergency and safety tools.',
    problem: 'People need quick, reliable safety tools on their phone — without sending sensitive data to the cloud.',
    solution: 'Built a cross-platform Expo app with SOS alerts, emergency contacts, location sharing, check-ins, fake calls, and activity history stored on the device.',
    role: 'Mobile Developer — UI/UX, feature implementation, and device integration.',
    features: [
      'SOS alerts',
      'Emergency contacts',
      'Location sharing',
      'Safety check-ins',
      'Fake calls',
      'Activity history',
      'On-device data storage',
    ],
    challenges: [
      'Designing calm, clear emergency UX under stress scenarios',
      'Keeping sensitive safety data local to the device',
    ],
    results: 'A polished mobile product experience focused on privacy-first safety workflows.',
    tech: ['React Native', 'Expo', 'TypeScript', 'JavaScript'],
    architecture: 'Expo app with file-based routing and native device APIs for location and notifications.',
    github: 'https://github.com/dijanahasanii/Personal-Safety-App',
    demo: false,
  },
  aireview: {
    title: 'AI-Powered Code Review Assistant',
    overview: 'Bachelor thesis project: GitHub-integrated code analysis with a real-time dashboard for structured review feedback.',
    problem: 'Teams need consistent automated code quality feedback in their GitHub workflow — without expensive continuous AI API usage.',
    solution: 'Built a full-stack platform that connects repositories, runs static/heuristic analysis on push events, and streams structured findings to a React dashboard. The architecture is designed so real AI model/API integration can be added later.',
    role: 'Full Stack Developer — Bachelor thesis covering frontend, backend, OAuth, webhooks, persistence, and production deployment.',
    features: [
      'GitHub OAuth authentication',
      'Repository connection & webhooks',
      'Automated static/heuristic analysis',
      'Structured findings with severity',
      'Real-time dashboard (Socket.IO)',
      'Review history & run detail views',
    ],
    challenges: [
      'Balancing AI ambition with practical API cost constraints',
      'Building an analysis pipeline that stays useful without continuous LLM calls',
      'Wiring OAuth, webhooks, queues, and live UI updates into one coherent system',
    ],
    results: 'Deployed thesis product on Railway with GitHub integration, review dashboards, and a path for future AI model integration.',
    future: 'Deeper LLM integration for richer review suggestions, PR comments, and multi-language analysis.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'Supabase', 'Socket.IO', 'GitHub API', 'Redis', 'Railway'],
    architecture: 'GitHub webhooks trigger analysis; Node.js backend queues jobs in Redis, persists results to Supabase, and broadcasts live updates via Socket.IO.',
    github: PROJECT_LINKS.aiReview.github,
    demo: true,
    demoUrl: PROJECT_LINKS.aiReview.demo,
    images: PROJECT_LINKS.aiReview.gallery,
  },
};

/* ─── VIDEO / CASE STUDY MODALS ─── */
function openDemo() {
  const iframe = document.getElementById('demo-iframe');
  const modal = document.getElementById('demo-modal');
  if (!iframe || !modal) return;
  iframe.src = 'https://www.youtube.com/embed/StJY3I9yxDE?autoplay=1';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDemo(e) {
  if (e && e.target !== document.getElementById('demo-modal')) return;
  const iframe = document.getElementById('demo-iframe');
  const modal = document.getElementById('demo-modal');
  if (iframe) iframe.src = '';
  modal?.classList.remove('open');
  document.body.style.overflow = '';
}

function openCaseStudy(id) {
  const data = CASE_STUDIES[id];
  if (!data) return;

  let actions = `<a href="${data.github}" target="_blank" rel="noopener" class="btn btn--ghost"><i class="fab fa-github" aria-hidden="true"></i> GitHub</a>`;
  if (data.demo && data.demoUrl) {
    actions += `<a href="${data.demoUrl}" target="_blank" rel="noopener" class="btn btn--primary"><i class="fas fa-external-link-alt" aria-hidden="true"></i> Live Demo</a>`;
  } else if (data.demo) {
    actions += `<button type="button" class="btn btn--primary" onclick="closeCaseStudy();openDemo()"><i class="fas fa-play" aria-hidden="true"></i> Live Demo</button>`;
  }

  const gallery = data.images?.length
    ? `<h4>Screenshots</h4><div class="case__gallery">${data.images.map((img) => `<figure class="case__shot"><img src="${img.src}" alt="${img.alt}" loading="lazy" /></figure>`).join('')}</div>`
    : '';

  const challenges = data.challenges?.length
    ? `<h4>Challenges</h4><ul>${data.challenges.map((c) => `<li>${c}</li>`).join('')}</ul>`
    : '';

  const results = data.results ? `<h4>Results</h4><p>${data.results}</p>` : '';
  const future = data.future ? `<h4>Future improvements</h4><p>${data.future}</p>` : '';
  const overview = data.overview ? `<h4>Overview</h4><p>${data.overview}</p>` : '';

  document.getElementById('case-content').innerHTML = `
    <h2>${data.title}</h2>
    ${overview}
    <h4>Problem</h4><p>${data.problem}</p>
    <h4>Solution</h4><p>${data.solution}</p>
    ${gallery}
    <h4>My Role</h4><p>${data.role}</p>
    <h4>Key Features</h4><ul>${data.features.map((f) => `<li>${f}</li>`).join('')}</ul>
    <h4>Technologies</h4><div class="tags">${data.tech.map((t) => `<span>${t}</span>`).join('')}</div>
    <h4>Architecture</h4><p>${data.architecture}</p>
    ${challenges}
    ${results}
    ${future}
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
  navWrap?.classList.toggle('scrolled', window.scrollY > 40);
  updateNav();
  const progress = document.getElementById('scroll-progress');
  if (progress) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  }
  document.getElementById('fab-top')?.classList.toggle('visible', window.scrollY > 600);
}, { passive: true });

if (navToggle && navList) {
  const navBar = document.getElementById('navbar');
  const navCta = navBar?.querySelector('.nav__cta');
  let menuScrollY = 0;

  const isMobileNav = () => window.matchMedia('(max-width: 768px)').matches;

  const restoreNavList = () => {
    if (!navBar || !navCta || navList.parentElement === navBar) return;
    navBar.insertBefore(navList, navCta);
  };

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
    restoreNavList();
    unlockBodyScroll();
  };

  const openMenu = () => {
    if (!isMobileNav()) return;
    lockBodyScroll();
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
    if (!isMobileNav()) closeMenu();
  });

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) closeMenu();
  });

  closeMenu();
}

document.getElementById('fab-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  });
});

/* ─── SCROLL REVEAL ─── */
const fadeObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.section-fade').forEach((el) => fadeObserver.observe(el));

updateNav();
