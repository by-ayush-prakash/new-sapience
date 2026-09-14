/* ============================================================
   NEW SAPIENCE — shared behavior
   ============================================================ */
(function () {
  'use strict';

  /* ---------- NAV ---------- */
  var nav = document.getElementById('nav');
  if (nav) {
    /* Hide on scroll down, reveal on scroll up. A delta threshold stops the
       bar flickering on trackpad jitter; rAF keeps it off the scroll thread. */
    var lastY = window.scrollY, ticking = false;
    var apply = function () {
      var y = window.scrollY, d = y - lastY;
      nav.classList.toggle('stuck', y > 20);
      if (Math.abs(d) > 6) {
        var dw2 = document.getElementById('drawer');
        var open = dw2 && dw2.classList.contains('on');
        nav.classList.toggle('nav--up', d > 0 && y > 140 && !open);
        lastY = y;
      }
      ticking = false;
    };
    var st = function () {
      if (!ticking) { ticking = true; requestAnimationFrame(apply); }
    };
    apply(); addEventListener('scroll', st, { passive: true });
  }
  var bg = document.getElementById('burger'), dw = document.getElementById('drawer');
  if (bg && dw) {
    bg.addEventListener('click', function () {
      var open = dw.classList.toggle('on');
      bg.classList.toggle('on', open);
      bg.setAttribute('aria-expanded', open ? 'true' : 'false');
      dw.setAttribute('aria-hidden', open ? 'false' : 'true');
      dw.toggleAttribute('inert', !open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    dw.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        bg.classList.remove('on'); dw.classList.remove('on');
        bg.setAttribute('aria-expanded', 'false');
        dw.setAttribute('aria-hidden', 'true');
        dw.setAttribute('inert', '');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- REVEAL ---------- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .1, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('[data-rv],.stg').forEach(function (el) { io.observe(el); });

  /* ---------- COUNTERS ---------- */
  var co = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      co.unobserve(e.target);
      var el = e.target, end = +el.dataset.count, t0 = performance.now();
      if (!end) { el.textContent = '0'; return; }
      (function tick(n) {
        var p = Math.min((n - t0) / 1500, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: .6 });
  document.querySelectorAll('[data-count]').forEach(function (el) { co.observe(el); });

  /* ---------- MESH GRADIENT ----------
     Rendered into a 340px buffer and upscaled by CSS. Blur on a small
     buffer is ~30x cheaper than on a full-width one and looks identical.
     Paused when off-screen, throttled to ~24fps.                        */
  var PALS = {
    navy: { base: '#02070F', bands: [
      { c: 'rgba(11,79,214,1)',     y: .30, amp: .20, f: 1.05, w: .34, s: .0030 },
      { c: 'rgba(13,33,73,1)',      y: .80, amp: .20, f: .86,  w: .36, s: -.0025 },
      { c: 'rgba(2,6,12,1)',        y: .10, amp: .16, f: 1.35, w: .30, s: .0018, o: 'source-over' },
      { c: 'rgba(3,8,16,1)',        y: .58, amp: .22, f: .95,  w: .16, s: -.0033, o: 'source-over' },
      { c: 'rgba(231,241,250,.95)', y: .50, amp: .24, f: 1.0,  w: .055, s: .0036 },
      { c: 'rgba(120,170,246,.72)', y: .92, amp: .14, f: 1.2,  w: .10, s: -.0042 }] },
    verify: { base: '#01080C', bands: [
      { c: 'rgba(15,140,104,1)',    y: .24, amp: .19, f: 1.0,  w: .32, s: .0028 },
      { c: 'rgba(11,79,214,.92)',   y: .86, amp: .18, f: .9,   w: .34, s: .0024 },
      { c: 'rgba(1,6,11,1)',        y: .46, amp: .20, f: 1.28, w: .22, s: -.0021, o: 'source-over' },
      { c: 'rgba(1,5,9,1)',         y: .06, amp: .14, f: 1.5,  w: .22, s: .0015, o: 'source-over' },
      { c: 'rgba(238,246,255,.94)', y: .62, amp: .23, f: 1.02, w: .06, s: .0038 },
      { c: 'rgba(154,98,6,.55)',    y: .52, amp: .26, f: .74,  w: .09, s: -.0032 }] },
    deep: { base: '#010610', bands: [
      { c: 'rgba(14,96,190,1)',     y: .34, amp: .22, f: .95,  w: .34, s: .0024 },
      { c: 'rgba(13,33,73,1)',      y: .82, amp: .18, f: 1.12, w: .32, s: -.0030 },
      { c: 'rgba(1,4,10,1)',        y: .08, amp: .14, f: 1.45, w: .26, s: .0016, o: 'source-over' },
      { c: 'rgba(2,6,13,1)',        y: .62, amp: .20, f: 1.05, w: .14, s: -.0028, o: 'source-over' },
      { c: 'rgba(226,239,255,.92)', y: .52, amp: .25, f: 1.0,  w: .055, s: .0035 }] }
  };

  function mesh(cv, P) {
    var x = cv.getContext('2d', { alpha: false });
    var RW = 340, RH = 210, t = Math.random() * 80, vis = true, last = 0;
    function size() {
      var w = cv.offsetWidth || 1, h = cv.offsetHeight || 1;
      // cap the buffer on tall mobile cards — it is CSS-upscaled, so a taller
      // buffer only costs blur time and buys nothing visually
      RH = Math.min(620, Math.max(60, Math.round(RW * h / w)));
      cv.width = RW; cv.height = RH;
    }
    size(); addEventListener('resize', size, { passive: true });
    new IntersectionObserver(function (e) { vis = e[0].isIntersecting; }, { rootMargin: '160px' }).observe(cv);
    var BLUR = Math.round(RW * 0.085);
    function draw(now) {
      requestAnimationFrame(draw);
      if (!vis || now - last < 42) return;
      last = now; t += 1.8;
      x.filter = 'none'; x.globalCompositeOperation = 'source-over';
      x.fillStyle = P.base; x.fillRect(0, 0, RW, RH);
      x.filter = 'blur(' + BLUR + 'px)';
      for (var i = 0; i < P.bands.length; i++) {
        var b = P.bands[i];
        x.beginPath();
        var amp = RH * b.amp, base = RH * b.y, ph = t * b.s + i * 1.7;
        for (var px = -30; px <= RW + 30; px += 10) {
          var yy = base + Math.sin(px / RW * 6.283 * b.f + ph) * amp
                        + Math.cos(px / RW * 6.283 * b.f * .45 - ph * .7) * amp * .55;
          px === -30 ? x.moveTo(px, yy) : x.lineTo(px, yy);
        }
        x.globalCompositeOperation = b.o || 'lighter';
        x.strokeStyle = b.c; x.lineWidth = RH * b.w; x.lineCap = 'round'; x.stroke();
      }
      x.filter = 'none'; x.globalCompositeOperation = 'source-over';
    }
    requestAnimationFrame(draw);
  }
  document.querySelectorAll('canvas[data-mesh]').forEach(function (cv) {
    mesh(cv, PALS[cv.dataset.mesh] || PALS.navy);
  });

  /* ---------- HERO PERSPECTIVE PLANE ---------- */
  (function () {
    var cv = document.getElementById('grid3d'); if (!cv) return;
    var x = cv.getContext('2d'), W, H, DPR, t = 0, vis = true, last = 0;
    function size() {
      DPR = Math.min(devicePixelRatio || 1, 2); W = cv.offsetWidth || 1; H = cv.offsetHeight || 1;
      cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR); x.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    size(); addEventListener('resize', size, { passive: true });
    new IntersectionObserver(function (e) { vis = e[0].isIntersecting; }, { rootMargin: '120px' }).observe(cv);
    var C = 13, R = 7;
    function pt(i, j) {
      var u = i / C, v = j / R, k = .80 + .20 * v;
      return [W * .5 + (u - .5) * W * 1.14 * k,
              H * (.05 + v * .92) + Math.sin(u * 4.6 + t * .6) * 9 * (1 - v * .55) + Math.cos(v * 3.1 - t * .4) * 5];
    }
    function loop(now) {
      requestAnimationFrame(loop);
      if (!vis || now - last < 33) return;
      last = now; t += .012; x.clearRect(0, 0, W, H);
      var m = (getComputedStyle(cv).color.match(/\d+/g)) || [12, 20, 31];
      var S = function (a) { return 'rgba(' + m[0] + ',' + m[1] + ',' + m[2] + ',' + a + ')'; };
      x.lineWidth = 1;
      var i, j, p, a, b;
      for (j = 0; j <= R; j++) { x.beginPath();
        for (i = 0; i <= C; i++) { p = pt(i, j); i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1]); }
        x.strokeStyle = S(.13); x.stroke(); }
      for (i = 0; i <= C; i++) { x.beginPath();
        for (j = 0; j <= R; j++) { p = pt(i, j); j ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1]); }
        x.strokeStyle = S(.10); x.stroke(); }
      x.beginPath();
      for (j = 0; j < R; j++) for (i = 0; i < C; i++) { a = pt(i, j); b = pt(i + 1, j + 1); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); }
      x.strokeStyle = S(.05); x.stroke();
      x.fillStyle = S(.28);
      for (j = 0; j <= R; j++) for (i = 0; i <= C; i++) { p = pt(i, j); x.beginPath(); x.arc(p[0], p[1], 1.05, 0, 6.2832); x.fill(); }
    }
    requestAnimationFrame(loop);
  })();

  /* ---------- DEEP LINKS INTO THE ACCORDION ----------
     deployment.html#robotics points at a collapsed <details>. Without this
     the browser jumps to a closed row and the link looks broken.          */
  function openTarget() {
    var id = location.hash.slice(1);
    if (!id) return;
    var el = document.getElementById(id);
    if (!el || el.tagName !== 'DETAILS') return;
    el.open = true;
    requestAnimationFrame(function () {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  openTarget();
  addEventListener('hashchange', openTarget);

  /* ---------- CISA SECTOR CAROUSEL ---------- */
  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var vp = root.querySelector('.carousel__vp');
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    var prog = root.querySelector('.crail-prog i');
    var ctr = root.querySelector('.carousel__ct');
    var cards = root.querySelectorAll('.scard');
    if (!vp) return;

    function step() {
      var c = root.querySelector('.scard');
      if (!c) return 300;
      var gap = parseFloat(getComputedStyle(root.querySelector('.carousel__tr')).gap) || 16;
      return c.getBoundingClientRect().width + gap;
    }
    function update() {
      var max = vp.scrollWidth - vp.clientWidth;
      // Fraction of the track seen so far, counting what is on screen now.
      var seen = vp.scrollWidth > 0
        ? Math.min(1, (vp.scrollLeft + vp.clientWidth) / vp.scrollWidth) : 1;
      if (prog) prog.style.width = (seen * 100).toFixed(2) + '%';
      if (prev) prev.disabled = vp.scrollLeft < 4;
      if (next) next.disabled = vp.scrollLeft > max - 24;
      if (ctr && cards.length) {
        // Label the last card in view, so it agrees with the bar.
        var i = Math.max(1, Math.min(cards.length, Math.round(seen * cards.length)));
        ctr.textContent = String(i).padStart(2, '0') + ' / ' + String(cards.length).padStart(2, '0');
      }
    }
    if (prev) prev.addEventListener('click', function () { vp.scrollBy({ left: -step() * 2, behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { vp.scrollBy({ left: step() * 2, behavior: 'smooth' }); });
    vp.addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update, { passive: true });

    /* drag to scroll */
    var down = false, sx = 0, sl = 0, moved = 0;
    vp.addEventListener('pointerdown', function (e) {
      down = true; moved = 0; sx = e.clientX; sl = vp.scrollLeft; vp.classList.add('drag');
    });
    vp.addEventListener('pointermove', function (e) {
      if (!down) return;
      var d = e.clientX - sx; moved = Math.abs(d);
      vp.scrollLeft = sl - d;
    });
    function release() { if (!down) return; down = false; vp.classList.remove('drag'); update(); }
    vp.addEventListener('pointerup', release);
    vp.addEventListener('pointerleave', release);
    vp.addEventListener('pointercancel', release);
    vp.addEventListener('click', function (e) { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);

    update();
  });

})();

