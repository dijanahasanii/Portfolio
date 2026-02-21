 /* ─── VIDEO MODAL (MedPal - YouTube) ─── */
function openDemo() {
  const modal = document.getElementById('demo-modal');
  document.getElementById('demo-iframe').src = 'https://www.youtube.com/embed/StJY3I9yxDE?autoplay=1';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDemo(e) {
  if (e && e.target !== document.getElementById('demo-modal')) return;
  const modal = document.getElementById('demo-modal');
  document.getElementById('demo-iframe').src = '';
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── VIDEO MODAL (Personal Safety App - local) ─── */
function openSafetyDemo() {
  const modal = document.getElementById('safety-modal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('safety-video').play();
}

function closeSafetyDemo(e) {
  if (e && e.target !== document.getElementById('safety-modal')) return;
  const modal = document.getElementById('safety-modal');
  const video = document.getElementById('safety-video');
  video.pause();
  video.currentTime = 0;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDemo();
    closeSafetyDemo();
  }
});

/* ─── NAVBAR: shrink on scroll ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ─── MOBILE NAV TOGGLE ─── */
const navToggle = document.querySelector('.nav-toggle');
const navList   = document.querySelector('nav ul');

navToggle.addEventListener('click', () => {
  navList.classList.toggle('open');
});

document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', () => navList.classList.remove('open'));
});

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ─── TYPING ANIMATION ─── */
const phrases = [
  'Full Stack Developer.',
  'React & Next.js Dev.',
  'Mobile Developer.',
  'Problem Solver.',
];

const typedEl = document.getElementById('typed');
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingTimer;

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  typingTimer = setTimeout(type, delay);
}

type();

/* ─── INTERSECTION OBSERVER: section fade-in ─── */
const fadeEls = document.querySelectorAll('.section-fade');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeEls.forEach(el => fadeObserver.observe(el));

/* ─── INTERSECTION OBSERVER: skill bars ─── */
const skillBars = document.querySelectorAll('.skill-level');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target.style.width;
      entry.target.style.width = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          entry.target.style.width = target;
        });
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

skillBars.forEach(bar => skillObserver.observe(bar));

/* ─── CONTACT FORM ─── */
const form       = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        formStatus.style.color = '#a78bfa';
        formStatus.textContent = 'Message sent — I\'ll get back to you soon!';
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      formStatus.style.color = '#f87171';
      formStatus.textContent = 'Something went wrong. Please try again.';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  });
}
