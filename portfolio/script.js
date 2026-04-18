// ===== SIDEBAR NAV & MOBILE TOGGLE =====
const sidebar = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Close sidebar on nav click (mobile)
navItems.forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('open');
    }
  });
});

// Close sidebar on outside click
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});

// ===== ACTIVE NAV ON SCROLL =====
const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-section') === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

sections.forEach(sec => observerNav.observe(sec));

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== TYPEWRITER =====
const words = [
  'Mahasiswa Sistem Informasi',
  'IT Enthusiast',
  'Web Developer',
  'Tech Explorer',
];
let wi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typeLoop() {
  const word = words[wi];
  if (!deleting) {
    tw.textContent = word.slice(0, ci + 1);
    ci++;
    if (ci === word.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    tw.textContent = word.slice(0, ci - 1);
    ci--;
    if (ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }
  }
  setTimeout(typeLoop, deleting ? 60 : 90);
}
setTimeout(typeLoop, 800);

// ===== SMOOTH SCROLL FOR NAV =====
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = item.getAttribute('data-section');
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== CONTACT FORM (redirect to mailto) =====
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const msg = document.getElementById('message').value;

  const subject = encodeURIComponent(`Pesan dari ${name}`);
  const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${msg}`);
  window.location.href = `mailto:apoybang16@gmail.com?subject=${subject}&body=${body}`;

  formSuccess.classList.add('show');
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.6';

  setTimeout(() => {
    form.reset();
    formSuccess.classList.remove('show');
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
  }, 5000);
});
