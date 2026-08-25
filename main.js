// ===========================================================
// Saravanan J Portfolio — shared front-end behaviour
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader ----------
     Hide as soon as the DOM is ready (don't wait on external fonts/CDN
     scripts via window 'load' — those can be slow or blocked). A hard
     timeout guarantees the loader can never get stuck on screen. */
  const loader = document.getElementById('loader');
  const hideLoader = () => loader && loader.classList.add('hide');
  setTimeout(hideLoader, 300);
  setTimeout(hideLoader, 1200); // safety net

  /* ---------- Scroll reveal arming ----------
     Content is visible by default in CSS. Only once we know JS and
     IntersectionObserver are working do we "arm" the fade-in effect —
     and even then, everything is force-shown after 2.5s regardless. */
  if ('IntersectionObserver' in window) {
    document.body.classList.add('reveal-armed');
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => el.classList.add('is-visible'));
    }, 2500);
  }

  /* ---------- Theme toggle (defaults to dark) ---------- */
  const root = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const applyTheme = (mode) => {
    if (mode === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('sj-theme', mode);
    if (themeToggle) themeToggle.setAttribute('aria-pressed', mode === 'light');
  };
  const savedTheme = localStorage.getItem('sj-theme') || 'dark';
  applyTheme(savedTheme);
  themeToggle && themeToggle.addEventListener('click', () => {
    applyTheme(root.classList.contains('light') ? 'dark' : 'light');
  });

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  menuBtn && menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuBtn.setAttribute('aria-expanded', !mobileMenu.classList.contains('hidden'));
  });

  /* ---------- Sticky header shadow on scroll ---------- */
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('shadow-lg', window.scrollY > 12);
  });

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('opacity-0', window.scrollY < 400);
      backToTop.classList.toggle('pointer-events-none', window.scrollY < 400);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-counter'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  /* ---------- Skill bars ---------- */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.getAttribute('data-level') + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(el => skillObserver.observe(el));

  /* ---------- Testimonials slider ---------- */
  const track = document.getElementById('testimonial-track');
  const dotsWrap = document.getElementById('testimonial-dots');
  if (track) {
    const slides = track.children.length;
    let index = 0;
    if (dotsWrap) {
      for (let i = 0; i < slides; i++) {
        const dot = document.createElement('button');
        dot.className = 'w-2.5 h-2.5 rounded-full bg-white/20 dot';
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      }
    }
    const dots = dotsWrap ? Array.from(dotsWrap.children) : [];
    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('bg-orange-500', i === index));
    }
    function goTo(i) { index = (i + slides) % slides; update(); }
    document.getElementById('t-prev') && document.getElementById('t-prev').addEventListener('click', () => goTo(index - 1));
    document.getElementById('t-next') && document.getElementById('t-next').addEventListener('click', () => goTo(index + 1));
    update();
    setInterval(() => goTo(index + 1), 6000);
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    const panel = item.querySelector('.faq-a');
    btn.addEventListener('click', () => {
      const isOpen = !panel.classList.contains('hidden');
      document.querySelectorAll('.faq-a').forEach(p => p.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-45'));
      if (!isOpen) {
        panel.classList.remove('hidden');
        item.querySelector('.faq-icon').classList.add('rotate-45');
      }
    });
  });

  /* ---------- Portfolio / blog filters ---------- */
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const buttons = group.querySelectorAll('[data-filter]');
    const targetSelector = group.getAttribute('data-filter-group');
    const items = document.querySelectorAll(targetSelector);
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('btn-gradient', 'text-white'));
        btn.classList.add('btn-gradient', 'text-white');
        const val = btn.getAttribute('data-filter');
        items.forEach(item => {
          const match = val === 'all' || item.getAttribute('data-category') === val;
          item.style.display = match ? '' : 'none';
        });
      });
    });
  });

  /* ---------- Contact form (client-side validation demo) ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(f => { if (!f.value.trim()) valid = false; });
      const honeypot = form.querySelector('input[name="website"]');
      if (honeypot && honeypot.value) valid = false; // simple spam trap
      if (!valid) {
        status.textContent = 'Please fill in all required fields.';
        status.className = 'text-sm mt-3 text-orange-400';
        return;
      }
      status.textContent = 'Thanks! Your message has been sent — I\'ll reply within 24 hours.';
      status.className = 'text-sm mt-3 text-teal-400';
      form.reset();
    });
  }

  /* ---------- Newsletter form ---------- */
  const newsletter = document.getElementById('newsletter-form');
  if (newsletter) {
    newsletter.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('newsletter-status');
      msg.textContent = 'Subscribed! Check your inbox to confirm.';
      msg.className = 'text-xs mt-2 text-teal-400';
      newsletter.reset();
    });
  }

  /* ---------- Exit-intent popup ---------- */
  const exitPopup = document.getElementById('exit-popup');
  if (exitPopup && !sessionStorage.getItem('sj-exit-shown')) {
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY < 10) {
        exitPopup.classList.remove('hidden');
        sessionStorage.setItem('sj-exit-shown', '1');
      }
    });
  }
  document.querySelectorAll('[data-close-popup]').forEach(btn => {
    btn.addEventListener('click', () => exitPopup && exitPopup.classList.add('hidden'));
  });

  /* ---------- Cookie consent ---------- */
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    if (!localStorage.getItem('sj-cookie-consent')) {
      setTimeout(() => cookieBanner.classList.remove('hidden'), 800);
    }
    document.getElementById('cookie-accept') && document.getElementById('cookie-accept').addEventListener('click', () => {
      localStorage.setItem('sj-cookie-consent', 'accepted');
      cookieBanner.classList.add('hidden');
    });
    document.getElementById('cookie-decline') && document.getElementById('cookie-decline').addEventListener('click', () => {
      localStorage.setItem('sj-cookie-consent', 'declined');
      cookieBanner.classList.add('hidden');
    });
  }

  /* ---------- Live chat widget (lightweight mock) ---------- */
  const chatToggle = document.getElementById('chat-toggle');
  const chatPanel = document.getElementById('chat-panel');
  chatToggle && chatToggle.addEventListener('click', () => chatPanel.classList.toggle('hidden'));

  /* ---------- Set current year in footer ---------- */
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
});
