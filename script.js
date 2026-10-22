document.documentElement.classList.add('js');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const PORTFOLIO_SCROLL_KEY = 'portfolio-project-return-scroll';
const isPortfolioPage = /\/index\.html$|\/$/.test(window.location.pathname);

if (isPortfolioPage) {
  try {
    const savedScroll = sessionStorage.getItem(PORTFOLIO_SCROLL_KEY);
    if (savedScroll !== null) {
      const restoreScroll = () => {
        window.scrollTo(0, Number(savedScroll));
        sessionStorage.removeItem(PORTFOLIO_SCROLL_KEY);
      };
      window.addEventListener('load', () => requestAnimationFrame(restoreScroll), { once: true });
      window.addEventListener('pageshow', () => requestAnimationFrame(restoreScroll), { once: true });
    }
  } catch (e) { /* ignore storage restrictions */ }
}

document.querySelectorAll('a[href*="projects/"]').forEach((link) => {
  link.addEventListener('click', () => {
    try { sessionStorage.setItem(PORTFOLIO_SCROLL_KEY, String(window.scrollY)); } catch (e) { /* ignore storage restrictions */ }
  });
});

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

try {
  const savedTheme = localStorage.getItem(THEME_KEY);
  applyTheme(savedTheme || 'dark');
} catch (e) {
  applyTheme('dark');
}

themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(next);
});

/* ─── PROJECT LINKS ─── */
const PROJECT_LINKS = {
  aiReview: {
    github: 'https://github.com/dijanahasanii/AI-Powered-Code-Review-Assistant',
    demo: 'https://ai-powered-code-review-assistant-fzbx.onrender.com/',
    gallery: [
      { src: 'code-review-repos.png', alt: 'Connected repositories dashboard' },
      { src: 'code-review-run-detail.png', alt: 'Automated review run with findings and quality score' },
    ],
  },
};

const CASE_STUDIES = {
  medpal: {
    title: 'MedPal — Digital Health Platform',
    overview: 'A full-stack digital health management platform engineered with role-based access control (Admin, Doctor, Patient) and automated background workflows.',
    problem: 'Healthcare clinics require a unified system to manage patient admissions, doctor schedules, and clinical records without fragmented tools.',
    solution: 'Engineered a React frontend with a Node.js/Express REST API and MongoDB. Implemented authenticated role-based workflows for admins, doctors, and patients, complete with scheduled cron jobs for appointment reminders.',
    role: 'Full Stack Engineer — architecture design, REST API implementation, JWT & role middleware, MongoDB relational schema modeling, and patient record management.',
    features: [
      'Role-based access control (Admin, Doctor, Patient)',
      'Doctor appointment scheduling & working hours management',
      'Patient electronic health records & medical document uploads',
      'Automated reminder cron jobs for upcoming appointments',
      'Department and clinic services administration',
    ],
    challenges: [
      'Modeling relational healthcare entities (users, appointments, documents, visit reports) within MongoDB',
      'Enforcing strict role authorization boundaries across shared clinic endpoints',
    ],
    results: 'Delivered an end-to-end full-stack health platform with authenticated role separation, document handling, and scheduled reminder workers.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB (Mongoose)', 'JWT Authentication', 'Node-Cron'],
    architecture: 'Layered REST API (Express + Mongoose) connected to MongoDB Atlas, JWT authentication with role authorization middleware, and scheduled cron workers for notifications.',
    github: 'https://github.com/dijanahasanii/MedPal',
    demo: true,
  },
  wandr: {
    title: 'Wandr — Microservices Travel Platform',
    overview: 'A distributed travel blogging platform architected into decoupled microservices deployed with Docker Compose.',
    problem: 'Modern platforms need to scale feature domains independently rather than coupling user management, content, location, and notifications into a single monolith.',
    solution: 'Designed a microservices architecture separating User, Content, Location, and Notification services into containerized Node.js services with Docker Compose, connected to MongoDB and consumed by a React client.',
    role: 'Software Engineer — microservices decomposition, Docker Compose orchestration, service REST APIs, and failure mode documentation.',
    features: [
      'Decoupled microservices architecture (User, Content, Location, Notification)',
      'Docker Compose orchestration for multi-container local environments',
      'User authentication & profile management',
      'Travel stories publishing with photo uploads & location tagging',
      'Documented failure mode analysis and service hardening',
    ],
    challenges: [
      'Defining clean service boundaries and managing inter-service communication without synchronous bottlenecks',
      'Coordinating container lifecycles, environment configuration, and persistent volumes in Docker Compose',
    ],
    results: 'Successfully built and containerized a multi-service distributed architecture with verified service isolation and failure mitigation plans.',
    tech: ['Docker', 'Docker Compose', 'Node.js', 'Express', 'MongoDB', 'Microservices', 'React'],
    architecture: 'Independent containerized Express services behind Docker Compose; services manage domain data in MongoDB with API communication patterns and documented failure modes.',
    github: 'https://github.com/dijanahasanii/Wandr',
    demo: false,
  },
  safety: {
    title: 'Personal Safety App',
    overview: 'A privacy-first cross-platform mobile application built with React Native, Expo, and TypeScript for offline emergency workflows.',
    problem: 'Users in distress need instant, dependable safety actions (SOS dispatch, location sharing, fake calls) without sending sensitive personal data to third-party cloud servers.',
    solution: 'Built a native mobile app utilizing local device storage (AsyncStorage) and native device hardware APIs for one-tap SMS emergency messaging with GPS coordinates, safety check-in countdown timers, and simulated incoming calls.',
    role: 'Mobile Engineer — application architecture, UI/UX, TypeScript implementation, and native device hardware integrations.',
    features: [
      'One-tap SOS dispatch with real-time GPS coordinates via SMS',
      'Emergency contacts management with native phonebook integration',
      'Live location sharing link generation',
      'Safety check-in countdown timer with notification alerts',
      'Simulated incoming fake call with ringtone audio and haptics',
      'Local activity log and privacy-first on-device data persistence',
    ],
    challenges: [
      'Designing rapid, low-friction emergency UX that functions reliably under high-stress conditions',
      'Ensuring zero cloud dependency by handling all contact, state, and history persistence on-device',
    ],
    results: 'A production-ready mobile application delivering dependable personal safety tools with complete user data privacy.',
    tech: ['React Native', 'Expo', 'TypeScript', 'AsyncStorage', 'Expo Location', 'Expo SMS', 'Expo Contacts'],
    architecture: 'React Native (Expo) architecture using native device modules for Location, SMS, Contacts, Audio, and Haptics, with all personal records stored in local AsyncStorage.',
    github: 'https://github.com/dijanahasanii/Personal-Safety-App',
    demo: false,
  },
  aireview: {
    title: 'AI-Powered Code Review Assistant',
    overview: 'Bachelor thesis project: an automated code review platform that connects to GitHub, inspects repositories with a snapshot static rule engine, and streams structured findings to a real-time dashboard.',
    problem: 'Engineering teams need rapid, consistent automated code feedback in their GitHub pull request workflow without the unpredictable latency and high recurring costs of continuous LLM API calls.',
    solution: 'Engineered a full-stack platform using Node.js/Express, GitHub OAuth, and webhooks. Designed a deterministic repository snapshot analyzer that evaluates tracked files against weighted static rules and security heuristics. The system architecture provides an extensible interface ready to plug in live LLM analysis providers when required.',
    role: 'Full Stack Engineer (Bachelor Thesis) — end-to-end system architecture, GitHub OAuth & webhooks pipeline, static heuristic rules engine, Supabase PostgreSQL modeling, Socket.IO live streaming, Bull/Redis job queue worker, and targeted remediation service.',
    features: [
      'GitHub OAuth 2.0 authentication & repository permissions',
      'Webhook ingestion pipeline for automated push event processing',
      'Git tree snapshot traversal & static heuristic code analysis',
      'Categorized findings with severity weights and quality scoring',
      'Targeted auto-remediation service (AST/regex source patches)',
      'Real-time review progress streaming via Socket.IO',
      'Review history, runs, and issue tracking persisted in Supabase',
    ],
    challenges: [
      'Architecting a deterministic, cost-effective code analysis pipeline that delivers immediate developer utility without requiring live LLM calls on every push',
      'Parsing Git snapshot trees efficiently and mapping findings to exact source lines and file contexts',
      'Coordinating asynchronous webhook handling, queue processing, database persistence, and WebSocket client broadcasts',
    ],
    results: 'Deployed full thesis system on Render with GitHub integration, live review dashboard, automated remediation patches, and modular architecture for future AI model expansion.',
    future: 'Plugging in deep LLM providers for nuanced context analysis, automatic PR comments, and multi-language semantic inspection.',
    tech: ['Node.js', 'Express', 'React', 'Supabase (PostgreSQL)', 'Socket.IO', 'GitHub API & Webhooks', 'Redis / Bull', 'Vite', 'Tailwind CSS', 'Render'],
    architecture: 'GitHub webhooks trigger an ingestion pipeline; Node.js backend processes review jobs, scans Git trees with static heuristic rules, persists runs to Supabase PostgreSQL, and broadcasts live events to the React client via Socket.IO.',
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
  navLinks.forEach((l) => {
    const isMatch = l.dataset.nav === current || (current === 'projects' && l.dataset.nav === 'work');
    l.classList.toggle('active', isMatch);
  });
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

document.querySelectorAll('.project-page__back').forEach((link) => {
  link.addEventListener('click', (e) => {
    const referrer = document.referrer ? new URL(document.referrer) : null;
    const cameFromPortfolio = referrer?.origin === window.location.origin && /\/index\.html$|\/$/.test(referrer.pathname);
    if (cameFromPortfolio && window.history.length > 1) {
      e.preventDefault();
      window.history.back();
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
