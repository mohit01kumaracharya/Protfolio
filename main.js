// ==========================================================
// WELCOME SCREEN refined fade-up intro (no typewriter cursor)
// ==========================================================
(function welcome() {
  const greetEl = document.getElementById("welcomeGreeting");
  const nameEl = document.getElementById("welcomeName");

  if (!greetEl || !nameEl) return;

  greetEl.textContent = "Hey, I'm";
  nameEl.textContent = "Mohit Kumar Acharya";

  requestAnimationFrame(() => {
    greetEl.classList.add("is-visible");
    window.setTimeout(() => nameEl.classList.add("is-visible"), 120);
  });
})();

// ==========================================================
// SCROLL REVEAL single reusable pattern for every section
// ==========================================================
(function scrollReveal() {
  const items = document.querySelectorAll(".reveal");

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -60px 0px"
  });

  items.forEach((item) => io.observe(item));
})();

// (Side navigation dots removed the top nav's light bar now
// tracks the current section on its own.)

// Keep the desktop navigation in step with the section currently in
// view. The light bar stays OFF on the welcome screen, turns on when a
// section is clicked/travelled to, and follows scrolling afterwards.
(function navActiveState() {
  const links = Array.from(document.querySelectorAll(".main-nav a"));
  const sections = links
    .map((link) => (link.hash ? document.querySelector(link.hash) : null))
    .filter(Boolean);

  if (!links.length || !sections.length) return;

  let scheduled = false;
  // Nav click pe bar turant clicked link pe pin ho jata hai smooth scroll
  // ke dauran/geometry ke hisaab se kabhi galat section nahi dikhega.
  let pinnedLink = null;
  let pinTimer = null;
  links.forEach((link) => {
    link.addEventListener("click", () => {
      pinnedLink = link;
      clearTimeout(pinTimer);
      // Turant update agar scroll position badli hi na ho (paas wale
      // sections) to bhi bar turant clicked link pe aa jaye.
      scheduleUpdate();
    });
  });
  // User jab khud scroll kare (wheel/touch/keyboard) to pin hatao 
  // bar phir normal scrollspy follow karta hai.
  ["wheel", "touchmove", "keydown"].forEach((evtName) =>
    window.addEventListener(
      evtName,
      () => {
        if (pinnedLink) {
          pinnedLink = null;
          clearTimeout(pinTimer);
          scheduleUpdate();
        }
      },
      { passive: true }
    )
  );

  const update = () => {
    const marker = Math.max(110, window.innerHeight * 0.32);
    // No section crossed yet (welcome screen in view) -> no bar active.
    let current = null;

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= marker) current = section;
    });

    // Page bottom reached -> the last section (Beyond card) wins, even if
    // its top hasn't crossed the marker (it sits close to Achievements).
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 4
    ) {
      current = sections[sections.length - 1];
    }

    // Click-pin sabse upar: jab tak pin active hai, bar clicked link pe hi rahe.
    if (pinnedLink) current = document.querySelector(pinnedLink.hash);

    links.forEach((link) => {
      const active = current !== null && link.hash === `#${current.id}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  const scheduleUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      update();
      scheduled = false;
    });
  };

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  update();
})();


/* =========================================================
   TECHNICAL SKILLS OVERLAY
   Main page + dynamic theme stay alive
   ========================================================= */

(() => {
  const overlay = document.getElementById("skillOverlay");
  const frame = document.getElementById("skillOverlayFrame");
  const closeBtn = document.getElementById("skillOverlayClose");

  if (!overlay || !frame || !closeBtn) return;

  const skillLinks = new Set([
    "Programming-languages.html",
    "DSA.html",
    "Frontend.html",
    "Backend.html",
    "databases.html",
    "apis.html",
    "aiml.html",
    "deployment.html",
    "tools.html",
    "beyond.html"
  ]);

  // iframe se theme-toggle message → parent ka theme badlo
  window.addEventListener("message", (event) => {
    const d = event.data;
    if (d && d.mka === "theme-toggle") {
      const t = document.querySelector(".theme-toggle");
      if (t) t.click();
    }
  });

  let themeFrameRunning = false;

  // ── BEYOND IFRAME WARM-UP idle time pe preload, click pe instant ──
  window.addEventListener("load", () => {
    setTimeout(() => {
      try {
        if (overlay.hidden && frame && !frame.dataset.warm) {
          frame.dataset.warm = "1";
          frame.contentWindow.location.replace(
            new URL("beyond.html", window.location.href).href
          );
        }
      } catch (e) {}
    }, 900);
  });
let themeFrameId = null;
let overlayHistoryActive = false;

  /* ---------------------------------------------------------
     COPY CURRENT MAIN-PAGE THEME INTO THE IFRAME
     --------------------------------------------------------- */
  let frameTweening = false;
  let syncedDoc = null;
  const lastSyncedVars = {};

  function syncFrameTheme() {
    return; // static palette nothing to sync
    const doc = frame.contentDocument;

    if (!doc || !doc.documentElement) return;

    // Frame (re)load hua? Cache aur tween-flag reset warna purani
    // cached values naye document me "no change" bol kar sync rokh
    // deti thin aur iframe galat colour pe atka rehta tha.
    if (syncedDoc !== doc) {
      syncedDoc = doc;
      frameTweening = false;
      Object.keys(lastSyncedVars).forEach((k) => delete lastSyncedVars[k]);
    }

    const frameRoot = doc.documentElement;
    const frameBody = doc.body;
    const parentRoot = document.documentElement;
    const parentTweening = parentRoot.classList.contains("theme-anim");
    const parentStyle = getComputedStyle(parentRoot);

    const themeVariables = [
      "--dyn-hue",
      "--dyn-sat",
      "--dyn-bg-l",
      "--dyn-accent-l",

      "--dyn-text",
      "--dyn-text-dim",
      "--dyn-accent",
      "--dyn-border",

      "--text",
      "--text-dim",
      "--accent",
      "--border",
      "--accent-soft"
    ];

    try {
      if (parentTweening && !frameTweening) {
        /*
         * Parent pe play/pause tween shuru hua. Iframe me per-frame
         * instant copies flicker karte hain (elements ki apni transitions
         * moving target ko chase karti hain). Isliye iframe ko bhi
         * .theme-anim de kar FINAL values ek baar likhte hain iframe
         * apni registered-property transition se USI 1s me USI easing
         * se glide karega. Perfect sync, zero flicker.
         */
        frameTweening = true;
        frameRoot.classList.add("theme-anim");
        // Style recalc FORCE warna class + values ek hi tick me likhe
        // jaate aur transition register hi nahi hota (instant jump).
        void frameRoot.offsetWidth;

        themeVariables.forEach((name) => {
          const value = parentRoot.style.getPropertyValue(name).trim();
          if (value) {
            frameRoot.style.setProperty(name, value);
            lastSyncedVars[name] = value;
          }
        });
      } else if (!parentTweening && frameTweening) {
        // Tween dono jagah khatam live per-frame sync wapas on.
        frameTweening = false;
        frameRoot.classList.remove("theme-anim");
      }

      if (!parentTweening) {
        themeVariables.forEach((name) => {
          const value = parentStyle.getPropertyValue(name).trim();

          // Sirf badli hui values likho redundant style writes recalc
          // churn aur micro-flicker paida karte the.
          if (value && lastSyncedVars[name] !== value) {
            lastSyncedVars[name] = value;
            frameRoot.style.setProperty(name, value);
          }
        });
      }

      /*
       * IMPORTANT:
       * The iframe itself must use the SAME live dynamic
       * background as the main page.
       */
      frameRoot.style.setProperty(
        "background-color",
        "hsl(var(--dyn-hue) var(--dyn-sat) var(--dyn-bg-l))",
        "important"
      );

      if (frameBody) {
        frameBody.style.setProperty(
          "background-color",
          "hsl(var(--dyn-hue) var(--dyn-sat) var(--dyn-bg-l))",
          "important"
        );

        frameBody.style.setProperty(
          "color",
          "var(--text)",
          "important"
        );
      }
    } catch (err) {
      /* frame document swap ke dauran access fail ho sakta hai skip */
    }
  }

  /* ---------------------------------------------------------
     CONTINUOUS THEME LOOP
     Runs while Technical Skills overlay is open.
     --------------------------------------------------------- */
function startThemeLoop() {
  return; // PAPER & INK: no per-frame theme sync
  syncFrameTheme();

  if (themeFrameRunning) return;

  themeFrameRunning = true;

  const loop = () => {
    if (overlay.hidden || !themeFrameRunning) {
      themeFrameRunning = false;
      themeFrameId = null;
      return;
    }

    try {
      syncFrameTheme();
    } catch (err) {
      /* ek bad frame kabhi loop ko mar nahi sakta warna sync freeze
         hota tha aur overlay/main ke colours alag ho jaate the */
    }
    themeFrameId = requestAnimationFrame(loop);
  };

  themeFrameId = requestAnimationFrame(loop);
}

  /* ---------------------------------------------------------
     OPEN
     --------------------------------------------------------- */
function openOverlay(url) {
  overlay.hidden = false;
  document.body.classList.add("skill-overlay-open");
  document.documentElement.classList.add("overlay-lock");
  frame.style.visibility = "hidden";

  startThemeLoop();

  const targetUrl = new URL(url, window.location.href).href;
  let sameDoc = false;
  try { sameDoc = frame.contentWindow.location.href === targetUrl; } catch (e) {}
  if (sameDoc) {
    // warm iframe already loaded turant dikhao (zero reload), top se
    resetFrameScroll();
    requestAnimationFrame(() => { frame.style.visibility = "visible"; resetFrameScroll(); });
  } else {
    frame.contentWindow.location.replace(targetUrl);
  }

  if (!overlayHistoryActive) {
    history.pushState(
      { skillOverlay: true },
      "",
      "#skill-overlay"
    );

    overlayHistoryActive = true;
  }
}


/* ── FRESH START: iframe (Beyond / skill page) hamesha top se shuru ho ── */
function resetFrameScroll() {
  try {
    const w = frame.contentWindow;
    if (!w) return;
    try { w.postMessage({ type: "mkaResetScroll" }, window.location.origin); } catch (e) {}
    w.scrollTo(0, 0);
    const d = frame.contentDocument;
    if (d) {
      if (d.documentElement) d.documentElement.scrollTop = 0;
      if (d.body) d.body.scrollTop = 0;
      if (d.scrollingElement) d.scrollingElement.scrollTop = 0;
    }
  } catch (e) {}
}
frame.addEventListener("load", () => { resetFrameScroll(); });

function hideOverlayOnly() {
  // Beyond card ka lock hamesha saaf karo (chahe overlay pehle se band ho).
  // Warna body.verse-card-open atak jaata tha aur page scroll/click freeze lagta tha.
  document.body.classList.remove("verse-card-open");
  if (overlay.hidden) return;

  overlay.hidden = true;
  document.body.classList.remove("skill-overlay-open");
  document.documentElement.classList.remove("overlay-lock");
  frame.style.visibility = "hidden";
  resetFrameScroll();


  // Iframe theme loop ko completely stop karo
themeFrameRunning = false;

if (themeFrameId) {
  cancelAnimationFrame(themeFrameId);
  themeFrameId = null;
}
}

function closeOverlay() {
  if (overlay.hidden) return;

  hideOverlayOnly();

  if (overlayHistoryActive) {
    overlayHistoryActive = false;
    history.back();
  }
}

window.addEventListener("popstate", () => {
  if (!overlay.hidden) {
    hideOverlayOnly();
  }

  overlayHistoryActive = false;
});

  /* ---------------------------------------------------------
     TECHNICAL SKILLS CARD CLICK
     --------------------------------------------------------- */
  document.addEventListener("click", (event) => {
const link = event.target.closest(
  "#skills .skill-card, .beyond-verse-card"
);

    if (!link) return;

    const href = link.getAttribute("href");

    if (!href) return;

    const fileName = href.split("?")[0].split("#")[0];

    if (!skillLinks.has(fileName)) return;

    /*
     * IMPORTANT:
     * Stop normal page navigation.
     * Main page and its audio element stay alive.
     */
    event.preventDefault();
    event.stopPropagation();

    openOverlay(href);
  });

  /* ---------------------------------------------------------
     CLOSE BUTTON
     --------------------------------------------------------- */
function closeCurrentOverlayView() {
  try {
    const childDocument = frame.contentDocument;
    const rdr2Overlay = childDocument?.querySelector(".rdr2-cinematic");

    if (rdr2Overlay && !rdr2Overlay.hidden) {
      frame.contentWindow.postMessage(
        { type: "closeRdr2Cinematic" },
        window.location.origin
      );
      return;
    }
  } catch (_) {
    // If the iframe is unavailable, fall through and close the whole overlay.
  }

  closeOverlay();
}

closeBtn.addEventListener("click", closeCurrentOverlayView);

window.addEventListener("message", (event) => {
  if (event.origin !== window.location.origin) return;

  if (event.data?.type === "closeBeyondOverlay") {
    closeOverlay();
  }

  // While a verse card is open inside the Beyond page, its own X handles
  // closing the card - the page-level X steps aside so they never overlap.
  if (event.data?.type === "verseDetailOpen" && !overlay.hidden) {
    document.body.classList.add("verse-card-open");
  }
  if (event.data?.type === "verseDetailClose") {
    document.body.classList.remove("verse-card-open");
  }
});

  /* ---------------------------------------------------------
     CLICK OUTSIDE
     --------------------------------------------------------- */
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeOverlay();
    }
  });

  /* ---------------------------------------------------------
     ESC
     --------------------------------------------------------- */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) {
      closeOverlay();
    }
  });

  /* ---------------------------------------------------------
     IFRAME LOAD
     --------------------------------------------------------- */
  frame.addEventListener("load", () => {
    try {
      const doc = frame.contentDocument;

      if (!doc) return;

if (!doc.__parentNavigationFixed) {
  doc.__parentNavigationFixed = true;

doc.addEventListener("click", (event) => {
  const clickedElement = event.target.closest("a, button");

  if (!clickedElement) return;

  // Back to Technical Skills
  if (
    clickedElement.id === "beyondBackBtn"
  ) {
    event.preventDefault();
event.stopImmediatePropagation();
    closeOverlay();
    return;
  }

  // Previous / Next card navigation
  if (
    clickedElement.matches(".skill-page-btn") ||
    clickedElement.matches(".skill-nav-item")
  ) {
    event.preventDefault();
event.stopImmediatePropagation();

    const nextUrl = clickedElement.href;

    // replace() use hoga, isse iframe history mein entry nahi banegi
    if (nextUrl) {
  // Sirf iframe ke andar next/previous page open hoga.
  // Main page alive rahega.
  frame.contentWindow.location.replace(nextUrl);
}

    return;
  }
}, true);
}

      /*
       * Inject overlay-specific CSS.
       * IMPORTANT:
       * We do NOT make the content transparent.
       * This keeps photos/text/cards visible.
       */
      const style = doc.createElement("style");

style.textContent = `
  html {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
    background: hsl(
      var(--dyn-hue)
      var(--dyn-sat)
      var(--dyn-bg-l)
    ) !important;
    animation: none !important;
  }

  /* theme-anim (play/pause colour tween) ke dauran registered-property
     transitions chalne do warna iframe ke andar fade instant-jump
     hota tha (flicker). Baaki waqt transitions band hi rahenge. */
  html:not(.theme-anim) {
    transition: none !important;
  }

  html.theme-anim {
    transition:
      --dyn-hue 1s cubic-bezier(0.45, 0.05, 0.55, 0.95),
      --dyn-sat 1s cubic-bezier(0.45, 0.05, 0.55, 0.95),
      --dyn-bg-l 1s cubic-bezier(0.45, 0.05, 0.55, 0.95),
      --text 1s cubic-bezier(0.45, 0.05, 0.55, 0.95),
      --text-dim 1s cubic-bezier(0.45, 0.05, 0.55, 0.95),
      --accent 1s cubic-bezier(0.45, 0.05, 0.55, 0.95),
      --border 1s cubic-bezier(0.45, 0.05, 0.55, 0.95),
      --dyn-text 1s cubic-bezier(0.45, 0.05, 0.55, 0.95),
      --dyn-text-dim 1s cubic-bezier(0.45, 0.05, 0.55, 0.95),
      --dyn-accent 1s cubic-bezier(0.45, 0.05, 0.55, 0.95),
      --dyn-border 1s cubic-bezier(0.45, 0.05, 0.55, 0.95),
      --accent-soft 1s cubic-bezier(0.45, 0.05, 0.55, 0.95) !important;
  }

  html::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }

  body {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
    background: hsl(
      var(--dyn-hue)
      var(--dyn-sat)
      var(--dyn-bg-l)
    ) !important;
    color: var(--text) !important;
    animation: none !important;
  }

  body::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }

  .skill-detail-page {
    background: transparent !important;
    color: var(--text) !important;
    transition: none !important;
    animation: none !important;
  }

  .skill-nav-item,
  .skill-detail-label,
  .skill-detail-header h1,
  .skill-detail-header p,
  .skill-page-btn,
  .language-number,
  .language-content h2,
  .language-content p {
    color: var(--text) !important;
  }

  .skill-nav-item.active,
  .skill-page-btn:hover {
    color: var(--accent) !important;
  }

  .language-card,
  .skill-page-btn,
  .skill-nav-item {
    border-color: var(--border) !important;
  }
`;

      doc.head.appendChild(style);

      /*
       * Apply CURRENT theme BEFORE showing iframe.
       * This prevents yellow/default-color flash.
       */
      syncFrameTheme();
startThemeLoop();

      /*
       * Show the page only after the current theme has
       * already been applied.
       */
      requestAnimationFrame(() => {
        syncFrameTheme();
        frame.style.visibility = "visible";
      });

    } catch (error) {
      console.log("Technical Skills iframe error:", error);
      frame.style.visibility = "visible";
    }
  });

})();
/* ── THEME BROADCAST: parent → overlay iframe ── */
(function () {
  function broadcast() {
    var f = document.getElementById("skillOverlayFrame");
    if (!f || !f.contentWindow) return;
    try {
      f.contentWindow.postMessage(
        { mka: "theme-set", theme: document.documentElement.getAttribute("data-theme") },
        window.location.origin
      );
    } catch (e) {}
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest(".theme-toggle")) setTimeout(broadcast, 30);
  });
  var f = document.getElementById("skillOverlayFrame");
  if (f) f.addEventListener("load", broadcast);
  window.__mkaThemeBroadcast = broadcast;
})();

/* ── START AT TOP ──────────────────────────────────────────────────
   Refresh / reload / back-forward pe page hamesha WELCOME section se
   shuru ho browser ki yaad ki hui scroll position ko ignore karo.
   (Nav links se #about / #skills jaana ab bhi kaam karta hai wo
   reload nahi, same-session navigation hai.) */
(function mkaStartAtTop() {
  if (window.parent !== window) return; // iframe me mat chhero

  function toTop() {
    try { window.scrollTo({ top: 0, behavior: "instant" }); } catch (e) {}
    try { window.scrollTo(0, 0); } catch (e) {}
    var d = document.documentElement, b = document.body;
    if (d) d.scrollTop = 0;
    if (b) b.scrollTop = 0;
  }

  function navType() {
    try {
      var e = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
      return e ? e.type : "";
    } catch (err) { return ""; }
  }

  // overlay chhod kar refresh karne pe #skill-overlay bach jata tha
  if (location.hash === "#skill-overlay") {
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
  }

  var t = navType();
  if (t === "reload" || t === "back_forward") {
    // purana hash bhool jao naye visit ki tarah upar se shuru
    if (location.hash) {
      try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
    }
    toTop();
    window.addEventListener("load", toTop);
    setTimeout(toTop, 60);
    setTimeout(toTop, 260);
    setTimeout(toTop, 600);
  } else if (!location.hash) {
    toTop();
    window.addEventListener("load", toTop);
    setTimeout(toTop, 60);
  }

  window.addEventListener("pageshow", function (e) { if (e.persisted) toTop(); });
})();
