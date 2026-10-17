/* ════════════════════════════════════════════════════════════════
   MOTION LAYER Paper & Ink
   Word-mask reveals, line masks, stagger, marquee-ready hooks,
   scroll progress, gentle parallax. Zero dependencies.
   ════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  document.documentElement.classList.add("has-js");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── 1 · scroll progress hairline ── */
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.prepend(bar);

  /* ── 2 · kinetic type: word split ── */
  let wordIndex = 0;
  function wrapWord(text) {
    const outer = document.createElement("span");
    outer.className = "w-split";
    const inner = document.createElement("span");
    inner.className = "w-in";
    inner.style.setProperty("--i", wordIndex++);
    inner.textContent = text;
    outer.appendChild(inner);
    return outer;
  }
  function splitNode(node) {
    const parent = node.parentNode;
    const frag = document.createDocumentFragment();
    const parts = node.textContent.split(/(\s+)/);
    parts.forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
      frag.appendChild(wrapWord(part));
    });
    parent.replaceChild(frag, node);
  }
  function splitElement(el) {
    wordIndex = 0;
    Array.from(el.childNodes).forEach((child) => {
      if (child.nodeType === 3) splitNode(child);
      else if (child.nodeType === 1) {
        // poora element (jaise yellow italic span) ek hi "word" block me
        const outer = document.createElement("span");
        outer.className = "w-split";
        const inner = document.createElement("span");
        inner.className = "w-in";
        inner.style.setProperty("--i", wordIndex++);
        child.parentNode.insertBefore(outer, child);
        outer.appendChild(inner);
        inner.appendChild(child);
      }
    });
  }

  /* ── 3 · line mask for headings ── */
  function maskHeading(el) {
    const inner = document.createElement("span");
    while (el.firstChild) inner.appendChild(el.firstChild);
    el.appendChild(inner);
    el.classList.add("mask-line");
  }

  /* ── 4 · collect targets ── */
  const splitTargets = document.querySelectorAll("#welcomeName, .beyond-hero h1");
  const maskTargets = document.querySelectorAll(
    ".section-title, .skill-detail-header h1, .verse-section > h3, .thank-you h2, .hero-bigname, .hero-tagline"
  );
  const staggerTargets = document.querySelectorAll(
    ".courses-grid, .skills-grid, .internships-grid, .soft-skills-grid, .hobbies-grid, .verse-grid, .welcome-meta, .language-list, .contact-links, .journey-timeline"
  );

  staggerTargets.forEach((grid) => {
    grid.classList.add("stagger");
    Array.from(grid.children).forEach((child, i) => child.style.setProperty("--i", i));
  });

  /* ── 5 · IntersectionObserver reveal on enter ── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      io.unobserve(entry.target);
      // reveal khatam hone ke baad hover transitions instant (delay 0)
      window.setTimeout(() => entry.target.classList.add("settled"), 1400);
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });

  if (!reduced) {
    splitTargets.forEach((el) => { splitElement(el); io.observe(el); });
    maskTargets.forEach((el) => { maskHeading(el); io.observe(el); });
    staggerTargets.forEach((el) => io.observe(el));
  }

  /* hero name ka marker sweep: words land hone ke baad draw hota hai */
  const name = document.getElementById("welcomeName");
  if (name) {
    name.classList.add("sweep-draw");
    requestAnimationFrame(() => requestAnimationFrame(() => name.classList.add("in")));
  }

  /* ── 5a · SECTION CONTEXT pop-up ────────────────────────────────
     Index page pe .reveal.is-visible ye kaam kar leta hai, par
     BEYOND page me .reveal hai hi nahi — isliye yahan apna observer.
     (jo context kisi .reveal ke andar hai, use chhod dete hain) */
  (function contextPop() {
    var ctx = [].slice.call(document.querySelectorAll('.section-context'));
    if (!ctx.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      ctx.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-visible');
        io2.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    ctx.forEach(function (el) {
      if (el.closest('.reveal')) return;   // index wala rule sambhal lega
      io2.observe(el);
    });
    // safety: agar observer kisi wajah se na chale to 3s baad sab dikha do
    setTimeout(function () {
      ctx.forEach(function (el) { el.classList.add('is-visible'); });
    }, 3000);
  })();

  /* ── 5a2 · SKILL CARDS: heading aur context ek hi line se shuru ──
     Har row me sabse lambi heading dekh kar sab cards ki heading ko
     utna hi lamba kar dete hain → context bhi bilkul ek jagah se shuru.
     (hobbies wale equalizer jaisa, har width pe kaam karta hai) */
  (function equalizeSkillCards() {
    var grid = document.querySelector('#skills .skills-grid');
    if (!grid) return;
    function fit() {
      var cards = [].slice.call(grid.children);
      cards.forEach(function (c) {
        var h = c.querySelector('h3');
        if (h) h.style.minHeight = '';
      });
      /* row grouping me 4px tolerance — rounding se 1px farq pad sakta hai */
      var rows = [];
      cards.forEach(function (c) {
        var t = c.getBoundingClientRect().top;
        var row = null;
        for (var i = 0; i < rows.length; i++) {
          if (Math.abs(rows[i].top - t) <= 4) { row = rows[i]; break; }
        }
        if (row) row.items.push(c); else rows.push({ top: t, items: [c] });
      });
      rows.forEach(function (r) {
        var max = 0;
        r.items.forEach(function (c) {
          var h = c.querySelector('h3');
          if (h) max = Math.max(max, h.getBoundingClientRect().height);
        });
        if (max > 0) r.items.forEach(function (c) {
          var h = c.querySelector('h3');
          if (h) h.style.minHeight = Math.ceil(max) + 'px';
        });
      });
    }
    fit();
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(fit); }
    window.addEventListener('load', fit);
    window.addEventListener('resize', function () {
      clearTimeout(window.__skillFitT);
      window.__skillFitT = setTimeout(fit, 120);
    });
  })();

  /* ── 5b · missing photos → graceful placeholder ── */
  document.querySelectorAll(".journey-photo").forEach((img) => {
    const fail = () => img.closest(".journey-photo-link")?.classList.add("no-photo");
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener("error", fail, { once: true });
  });

  /* ── 6 · parallax + progress (single rAF-throttled scroll handler) ── */
  const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"));
  // hooks lagao (markup chhuna nahi pada)
  document.querySelectorAll(".welcome-meta, .beyond-hero-content").forEach((el) => {
    el.setAttribute("data-parallax", "");
    el.dataset.factor = el.classList.contains("welcome-meta") ? "0.07" : "0.045";
    parallaxEls.push(el);
  });

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      bar.style.setProperty("--sp", max > 0 ? (window.scrollY / max).toFixed(4) : 0);
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        const delta = (r.top + r.height / 2) - vh / 2;
        el.style.setProperty("--py", (delta * -(parseFloat(el.dataset.factor) || 0.05)).toFixed(1) + "px");
      });
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// ── header scroll state (premium shadow) ──
(function () {
  const hdr = document.querySelector(".site-header");
  if (!hdr) return;
  const onScroll = () => hdr.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

/* ── HOVER-SYNC: scroll ke baad bhi card under cursor hover kare ── */
(function () {
  const SEL = ".verse-card, .verse-row-photo, .skill-card, .course-card, .contact-link, .language-card, .beyond-verse-card, .journey-photo-link, .welcome-cta, .beyond-cta";
  let mx = -1, my = -1, cur = null, tick = false;
  // Journey: kisi bhi item (photo ke bahar bhi) par hover ho to uska square dot fill ho
  let journeyCur = null;
  function refresh() {
    tick = false;
    if (mx < 0) return;
    const el = document.elementFromPoint(mx, my);
    const jItem = el && el.closest ? el.closest(".journey-item") : null;
    if (jItem !== journeyCur) {
      if (journeyCur) journeyCur.classList.remove("hv");
      journeyCur = jItem;
      if (journeyCur) journeyCur.classList.add("hv");
    }
    const card = el && el.closest ? el.closest(SEL) : null;
    if (card === cur) return;
    if (cur) cur.classList.remove("hv");
    cur = card;
    if (cur) cur.classList.add("hv");
  }
  function queue() { if (!tick) { tick = true; requestAnimationFrame(refresh); } }
  // scroll khatam hone ke baad ek baar phir verify (layout settle hone ke liye)
  let t = 0;
  function queueSettled() {
    queue();
    clearTimeout(t);
    t = window.setTimeout(refresh, 80);
  }
  function clearAll() {
    if (cur) { cur.classList.remove("hv"); cur = null; }
    if (journeyCur) { journeyCur.classList.remove("hv"); journeyCur = null; }
  }

  /* Touch device (phone/tablet): hover sirf us element par jo user ki ungli se
     chhua jaye. Screen ke center ya scroll ke baad kisi element par hover nahi.
     Ungli uthte hi hover khatam. Scroll (ungli khiskhane) par bhi hover hata do. */
  const touchMode = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (touchMode) {
    let tStart = null;
    const hoverAt = (x, y) => {
      const el = document.elementFromPoint(x, y);
      const card = el && el.closest ? el.closest(SEL) : null;
      const jItem = el && el.closest ? el.closest(".journey-item") : null;
      if (card !== cur) {
        if (cur) cur.classList.remove("hv");
        cur = card;
        if (cur) cur.classList.add("hv");
      }
      if (jItem !== journeyCur) {
        if (journeyCur) journeyCur.classList.remove("hv");
        journeyCur = jItem;
        if (journeyCur) journeyCur.classList.add("hv");
      }
    };
    document.addEventListener("touchstart", (e) => {
      const t = e.touches[0];
      if (!t) return;
      tStart = { x: t.clientX, y: t.clientY, moved: false };
      hoverAt(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener("touchmove", (e) => {
      const t = e.touches[0];
      if (!t || !tStart || tStart.moved) return;
      if (Math.hypot(t.clientX - tStart.x, t.clientY - tStart.y) > 10) {
        tStart.moved = true;   // ye scroll hai, tap nahi
        clearAll();
      }
    }, { passive: true });
    document.addEventListener("touchend", () => { tStart = null; clearAll(); }, { passive: true });
    document.addEventListener("touchcancel", () => { tStart = null; clearAll(); }, { passive: true });
    return;
  }

  document.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; queue(); }, { passive: true });
  window.addEventListener("scroll", queueSettled, { passive: true, capture: true });
  window.addEventListener("resize", queueSettled);
  if ("onscrollend" in window) window.addEventListener("scrollend", queueSettled, { passive: true });
  document.documentElement.addEventListener("mouseleave", clearAll);
})();

/* ── HOBBIES heading + context dono align, aur poora text dikhe ──
   Har grid-row me sabse lambi paragraph jitni min-height sabko milti
   hai → text kate ga nahi (koi "...") aur sab cards ka heading/context
   ek hi line se shuru hoga. Har screen size pe dobara calculate hota hai. */
(function equalizeHobbyText() {
  var grid = document.querySelector(".hobbies-grid");
  if (!grid) return;

  function rowsOf(cards) {
    var map = {}, order = [];
    cards.forEach(function (c) {
      var t = Math.round(c.getBoundingClientRect().top);
      if (!map[t]) { map[t] = []; order.push(t); }
      map[t].push(c);
    });
    return order.map(function (t) { return map[t]; });
  }

  function run() {
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".hobby-card"));
    if (!cards.length) return;

    // pehle purani min-height hatao (warni purana value chipka rahega)
    cards.forEach(function (c) {
      var p = c.querySelector(".hobby-body p");
      if (p) p.style.minHeight = "";
    });

    rowsOf(cards).forEach(function (row) {
      var max = 0;
      row.forEach(function (c) {
        var p = c.querySelector(".hobby-body p");
        if (p) max = Math.max(max, p.getBoundingClientRect().height);
      });
      if (max <= 0) return;
      row.forEach(function (c) {
        var p = c.querySelector(".hobby-body p");
        if (p) p.style.minHeight = Math.ceil(max) + "px";
      });
    });
  }

  var t = null;
  function debounced() { clearTimeout(t); t = window.setTimeout(run, 150); }

  run();
  window.addEventListener("load", run);
  window.addEventListener("resize", debounced);
  window.setTimeout(run, 400);
  window.setTimeout(run, 1200);
})();

/* ── PHONE NAV hamburger toggle (index + beyond + skill pages) ──
   Desktop pe button hi nahi dikhta, isliye yahan ka kuch bhi desktop
   layout ko chhoo ta nahi. Sirf chhoti screen pe kaam karta hai. */
(function phoneNav() {
  var openNavs = [];

  function setOpen(nav, btn, open) {
    nav.classList.toggle("is-open", open);
    if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function closeAll(except) {
    openNavs.forEach(function (rec) {
      if (rec.nav !== except) setOpen(rec.nav, rec.btn, false);
    });
  }

  document.querySelectorAll(".nav-toggle").forEach(function (btn) {
    var nav = btn.closest("nav");
    if (!nav) return;

    btn.addEventListener("click", function (e) {
      e.preventDefault(); e.stopPropagation();
      var willOpen = !nav.classList.contains("is-open");
      closeAll(nav);
      setOpen(nav, btn, willOpen);
    });

    // link dabane se menu band ho jaaye (anchor ka default scroll chalne do)
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(nav, btn, false); });
    });

    openNavs.push({ nav: nav, btn: btn });
  });

  /* ── THEME TOGGLE (ya koi bhi menu-safe control) dabane se menu
        BAND NAHI hoga. Menu sirf 2 haalat me band hota hai:
          1) user ne khud hamburger / X dabaya
          2) user ne menu ke kisi link se kisi section pe navigate kiya
        Theme badalne se, ya kisi bhi "safe" control se, menu wapas
        khula rahega. ────────────────────────────────────────────── */
  function isMenuSafe(node) {
    if (!node || typeof node.closest !== "function") return false;
    return !!node.closest(".theme-toggle, [data-menu-safe]");
  }

  // bahar kahin tap/click → band  (par theme toggle par NAHI)
  document.addEventListener("click", function (e) {
    if (isMenuSafe(e.target)) return;              // theme toggle = menu khula rahe
    openNavs.forEach(function (rec) {
      if (!rec.nav.contains(e.target)) setOpen(rec.nav, rec.btn, false);
    });
  });

  // Escape → band
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAll(null);
  });

  // bada screen ho jaaye to menu band (desktop layout pe koi asar na ho)
  window.addEventListener("resize", function () {
    if (window.innerWidth > 860) closeAll(null);
  });
})();



/* ═══════════════════════════════════════════════════════════════════
   v70 · WELCOME TITLE FITTER
   CSS formula fallback font ke hisaab se bana hai; asli font (Fraunces)
   usse chauda ho sakta hai. Ye fitter asli font load hone ke baad size ko
   utna chhota kar deta hai ki naam hamesha EK LINE me rahe aur na kate.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  function targets() {
    return [document.getElementById('welcomeName'),
            document.querySelector('.beyond-hero h1')].filter(Boolean);
  }
  function fit(el) {
    el.style.removeProperty('font-size'); // hamesha CSS formula se shuru
    var guard = 0;
    while (el.scrollWidth > el.clientWidth + 1 && guard++ < 40) {
      var cur = parseFloat(getComputedStyle(el).fontSize) || 16;
      if (cur <= 11) break;
      var ratio = el.clientWidth / el.scrollWidth;
      if (!isFinite(ratio) || ratio <= 0 || ratio >= 1) break;
      /* CSS !important ko harane ke liye inline !important zaroori hai */
      el.style.setProperty('font-size', (cur * ratio * 0.99) + 'px', 'important');
    }
  }
  function fitAll() { targets().forEach(fit); }
  function boot() {
    fitAll();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
    window.addEventListener('load', fitAll);
    window.addEventListener('resize', function () {
      clearTimeout(window.__fitT);
      window.__fitT = setTimeout(fitAll, 120);
    });
    setTimeout(fitAll, 1200);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
