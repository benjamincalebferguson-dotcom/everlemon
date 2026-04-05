// ── Mobile nav toggle ──
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}

// Close mobile nav on link click
document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-links').classList.remove('open');
  });
});

// ── Nav scroll shadow ──
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 20
    ? '0 2px 20px rgba(74,58,38,0.1)'
    : 'none';
});

// ── FAQ accordion ──
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── Scroll fade-in ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Waitlist form ──
// To activate live submissions:
//   1. Go to formspree.io and sign up (free)
//   2. Create a new form for Ben@stillwithus.com.au
//   3. Copy your Form ID and replace YOUR_FORM_ID below
const FORMSPREE_ID = 'YOUR_FORM_ID';

document.getElementById('waitlist-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('button[type="submit"]');
  const success = document.getElementById('form-success');

  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Demo mode — show success without a real submission
  if (FORMSPREE_ID === 'YOUR_FORM_ID') {
    setTimeout(() => {
      form.style.display = 'none';
      success.style.display = 'block';
    }, 800);
    return;
  }

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' },
    });

    if (res.ok) {
      form.style.display = 'none';
      success.style.display = 'block';
    } else {
      btn.textContent = 'Something went wrong — please email Ben@stillwithus.com.au';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Something went wrong — please email Ben@stillwithus.com.au';
    btn.disabled = false;
  }
});
