// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Nav scroll state
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('.nav__links a').forEach((a) =>
  a.addEventListener('click', () => nav.classList.remove('open'))
);

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
  io.observe(el);
});

// Active nav link highlight
const sections = [...document.querySelectorAll('main section[id]')];
const links = new Map(
  [...document.querySelectorAll('.nav__links a')].map((a) => [a.getAttribute('href').slice(1), a])
);
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((a) => (a.style.color = ''));
        const link = links.get(e.target.id);
        if (link) link.style.color = 'var(--text)';
      }
    });
  },
  { threshold: 0.5 }
);
sections.forEach((s) => spy.observe(s));
