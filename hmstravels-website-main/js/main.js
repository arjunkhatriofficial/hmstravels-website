/* ══════════════════════════════════════════════
   HMS TRAVELS — MASTER JAVASCRIPT
   main.js — linked by ALL pages
══════════════════════════════════════════════ */

/* ─── LOADER ─── */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  const loaderPct = document.getElementById('loaderPct');
  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.floor(Math.random() * 12) + 4;
    if (pct >= 100) { pct = 100; clearInterval(interval); }
    if (loaderPct) loaderPct.textContent = pct + '%';
  }, 120);
  setTimeout(() => loader.classList.add('hide'), 2500);
}

/* ─── CUSTOM CURSOR ─── */
function initCursor() {
  const cur = document.getElementById('cur');
  const curR = document.getElementById('curR');
  if (!cur || !curR) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx - 4 + 'px';
    cur.style.top  = my - 4 + 'px';
  });
  (function animR() {
    rx += (mx - rx) * .13; ry += (my - ry) * .13;
    curR.style.left = rx - 17 + 'px';
    curR.style.top  = ry - 17 + 'px';
    requestAnimationFrame(animR);
  })();
  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.style.transform = 'scale(2.5)'; curR.style.opacity = '.15'; });
    el.addEventListener('mouseleave', () => { cur.style.transform = 'scale(1)';   curR.style.opacity = '.3'; });
  });
}

/* ─── STAR CANVAS ─── */
function initStars() {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);
  const stars = Array.from({ length: 120 }, () => ({
    x: Math.random(), y: Math.random(),
    r: Math.random() * 1.4 + .3,
    o: Math.random() * .7 + .1,
    s: Math.random() * .005 + .001
  }));
  (function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.o += s.s;
      if (s.o > .9 || s.o < .1) s.s *= -1;
      ctx.beginPath();
      ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.o})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
}

/* ─── GOLD PARTICLES ─── */
function initParticles() {
  const pc = document.getElementById('parts');
  if (!pc) return;
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'p';
    p.style.cssText = `left:${Math.random()*100}%;--d:${(Math.random()-.5)*120}px;animation-duration:${6+Math.random()*10}s;animation-delay:${Math.random()*12}s;width:${1+Math.random()*2}px;height:${1+Math.random()*2}px;`;
    pc.appendChild(p);
  }
}

/* ─── NAV SCROLL ─── */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
  // Mark active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav ul a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
}

/* ─── SCROLL REVEAL ─── */
function initReveal() {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
  }, { threshold: .1 });
  document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => ro.observe(el));
}

/* ─── HOW STEPS STAGGER ─── */
function initHowSteps() {
  const hw = document.querySelector('.how-steps');
  if (!hw) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.how-step').forEach((s, i) =>
          setTimeout(() => s.classList.add('vis'), i * 180));
      }
    });
  }, { threshold: .2 });
  obs.observe(hw);
}

/* ─── COUNTER ANIMATION ─── */
function initCounters() {
  const cro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.done) {
        e.target.dataset.done = '1';
        const tgt = parseFloat(e.target.dataset.t);
        const dec = tgt % 1 !== 0;
        const t0 = performance.now();
        (function upd(now) {
          const prog = Math.min((now - t0) / 2000, 1);
          const ease = 1 - Math.pow(1 - prog, 3);
          const v = tgt * ease;
          e.target.textContent = dec ? v.toFixed(1) : Math.floor(v) + (prog < 1 ? '' : '+');
          if (prog < 1) requestAnimationFrame(upd);
          else e.target.textContent = dec ? tgt.toFixed(1) : tgt + '+';
        })(t0);
      }
    });
  }, { threshold: .5 });
  document.querySelectorAll('.stat-n').forEach(el => cro.observe(el));
}

/* ─── FAQ ACCORDION ─── */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const was = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!was) item.classList.add('open');
    });
  });
}

/* ─── COUNTDOWN TIMER ─── */
function initCountdown() {
  const h = document.getElementById('cd-h');
  const m = document.getElementById('cd-m');
  const s = document.getElementById('cd-s');
  if (!h) return;
  const end = new Date();
  end.setHours(end.getHours() + 23);
  end.setMinutes(59); end.setSeconds(59);
  setInterval(() => {
    const diff = Math.max(0, end - new Date());
    h.textContent = String(Math.floor(diff / 3600000)).padStart(2, '0');
    m.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    s.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  }, 1000);
}

/* ─── CONTACT FORM SUBMIT ─── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = form.querySelector('[name="name"]').value;
    const city    = form.querySelector('[name="city"]').value;
    const pickup  = form.querySelector('[name="pickup"]').value;
    const dropoff = form.querySelector('[name="dropoff"]').value;
    const car     = form.querySelector('[name="car"]').value;
    const msg     = `Hi HMS Travels! I'm ${name} from ${city}. I'd like to book the ${car} from ${pickup} to ${dropoff}.`;
    window.open(`https://wa.me/+917003876988?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

/* ─── ROAD DASHES ─── */
function initRoad() {
  document.querySelectorAll('.road-line').forEach(el => {
    el.style.animationDuration = (.5 + Math.random() * .4) + 's';
  });
}

/* ─── BOOT ALL ─── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initStars();
  initParticles();
  initNav();
  initReveal();
  initHowSteps();
  initCounters();
  initFAQ();
  initCountdown();
  initContactForm();
  initRoad();
});
