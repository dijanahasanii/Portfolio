document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
});

window.addEventListener('scroll', () => {
  const backToTop = document.querySelector('.back-to-top a');
  if (window.pageYOffset > 300) {
    backToTop.style.opacity = '1';
    backToTop.style.visibility = 'visible';
  } else {
    backToTop.style.opacity = '0';
    backToTop.style.visibility = 'hidden';
  }
});

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert('Message sent successfully!');
        form.reset();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .catch(error => {
      alert('There was a problem sending your message. Please try again later.');
      console.error('Error:', error);
    });
  });
}

const skillBars = document.querySelectorAll('.skill-level');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.style.width;
      entry.target.style.width = '0';
      setTimeout(() => {
        entry.target.style.width = width;
      }, 100);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
  skillObserver.observe(bar);
});