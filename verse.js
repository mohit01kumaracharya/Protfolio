// ==========================================================
// BEYOND MY CODING VERSE reusable grid + zoom/swipe detail system
// Used identically by Games, Movies, Series, Anime, Manga, Sports, Hobbies.
// ==========================================================
(function verse() {
  const collections = [
    { gridId: "gamesGrid", items: GAMES },
    { gridId: "moviesGrid", items: MOVIES },
    { gridId: "seriesGrid", items: SERIES },
    { gridId: "animeGrid", items: ANIME },
    { gridId: "cartoonGrid", items: CARTOON },
    { gridId: "mangaGrid", items: MANGA },
    { gridId: "sportsGrid", items: SPORTS },
  ];

  // ---- build the single shared overlay, appended once ----
  const overlay = document.createElement("div");
  overlay.className = "verse-detail";
  overlay.hidden = true;
  overlay.innerHTML = `
    <button class="verse-close" aria-label="Close">✕</button>
    <div class="verse-trailer-bg" aria-hidden="true">
      <img class="verse-trailer-still" alt="" hidden>
    </div>
    <div class="verse-trailer-scrim" aria-hidden="true"></div>
    <div class="verse-detail-media"><img alt=""></div>
    <div class="verse-detail-text">
      <span class="verse-detail-tag"></span>
      <h4></h4>
      <p></p>
    </div>
    <div class="verse-navigation">
      <button class="verse-prev" aria-label="Previous">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
        <span>Previous</span>
      </button>
      <button class="verse-next" aria-label="Next">
        <span>Next</span>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>
    <div class="reels-hint" aria-hidden="true"><span class="reels-hint-ico"></span><span class="reels-hint-txt">Swipe up for next</span></div>`;
  document.body.appendChild(overlay);

  /* ── REEL STAGE ──────────────────────────────────────────────────
     Swipe sirf isi layer ko hilaata hai X (close), sound button aur
     hint chip apni jagah teek rahte hain, bilkul Insta reel jaisa. */
  var reelStage = document.createElement("div");
  reelStage.className = "reel-stage";
  [".verse-trailer-bg", ".verse-trailer-scrim", ".verse-detail-media",
   ".verse-detail-text", ".verse-navigation"].forEach(function (sel) {
    var el = overlay.querySelector(sel);
    if (el) reelStage.appendChild(el);
  });
  overlay.insertBefore(reelStage, overlay.querySelector(".reels-hint"));

    const els = {
  img: overlay.querySelector(".verse-detail-media img"),
  tag: overlay.querySelector(".verse-detail-tag"),
  title: overlay.querySelector("h4"),
  desc: overlay.querySelector("p"),
  prev: overlay.querySelector(".verse-prev"),
  next: overlay.querySelector(".verse-next"),
  back: overlay.querySelector(".verse-back"),
  close: overlay.querySelector(".verse-close"),
  trailerBg: overlay.querySelector(".verse-trailer-bg"),
};

  let activeItems = [];
  let activeIndex = 0;
  let detailSwitchTimer = null;
  let overlayHistoryActive = false;
let closingFromHistory = false;
  

  function fillDetail(item) {
    const media = els.img.closest(".verse-detail-media");
    const fallback = (item.name || "Interest").trim();

    media.dataset.fallback = fallback.slice(0, 1).toUpperCase();
    media.classList.remove("no-detail-image");
    els.img.hidden = false;
    els.img.onerror = () => {
      media.classList.add("no-detail-image");
      els.img.hidden = true;
    };
    els.img.onload = () => {
      media.classList.remove("no-detail-image");
      els.img.hidden = false;
    };

    if (item.img) {
      els.img.src = item.img;
    } else {
      els.img.removeAttribute("src");
      media.classList.add("no-detail-image");
      els.img.hidden = true;
    }

    els.tag.textContent = item.tag || "";
    els.title.textContent = item.name;
    els.desc.textContent = item.desc || "";

    setTrailer(item);
  }

  // ---- trailer stage (LOCAL mp4 only trailers/ folder se) ----
  // Card khulte hi trailer apni awaaz ke saath chalta hai. Koi mute control nahi.
  function setTrailer(item) {
    // SIRF LOCAL FILE trailers/ folder se mp4. Koi YouTube embed nahi.
    const file = item && item.trailerFile;
    const has = !!file;

    overlay.classList.toggle("has-trailer", has);
    els.trailerBg.querySelectorAll("video").forEach((el) => el.remove());

    const still = els.trailerBg.querySelector(".verse-trailer-still");
    still.hidden = true;
    still.removeAttribute("src");

    if (!has) return;

    // Bas itna hi: trailers/ folder me <naam>.mp4 daalo, apne aap chal padega.
    const vid = document.createElement("video");
    vid.className = "verse-trailer-video";
    vid.src = file;
    vid.autoplay = true;
    vid.loop = true;
    vid.muted = false;
    vid.volume = 0.55;
    vid.playsInline = true;
    vid.setAttribute("playsinline", "");
    vid.preload = "auto";
    vid.tabIndex = -1;
    vid.setAttribute("aria-hidden", "true");

    // File abhi nahi dali? -> card ki photo hi blurred cinematic still ban jati hai.
    vid.addEventListener("error", () => {
      vid.remove();
      useCardStill(item);
    }, { once: true });

    els.trailerBg.appendChild(vid);

    // Browser sound ke saath autoplay rok de to chup-chaap muted chalao.
    const playPromise = vid.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        vid.muted = true;
        vid.play().catch(() => {});
      });
    }
  }

  // last resort: card ki photo hi blurred cinematic still ban jati hai
  function useCardStill(item) {
    const still = els.trailerBg.querySelector(".verse-trailer-still");
    if (!item || !item.img) { still.hidden = true; return; }
    still.onerror = () => { still.hidden = true; };
    still.onload = () => { still.hidden = false; };
    still.src = item.img;
  }

  function clearTrailer() {
    els.trailerBg.querySelectorAll("video").forEach((el) => el.remove());
    overlay.classList.remove("has-trailer");
  }

function pushVerseHistory(type) {
  history.pushState(
    {
      versePage: true,
      verseType: type
    },
    "",
    `${window.location.pathname}${window.location.search}#verse-card`
  );
}

function announceDetailState(isOpen) {
  const eventName = isOpen ? "verse:detailOpen" : "verse:detailClose";
  const messageType = isOpen ? "verseDetailOpen" : "verseDetailClose";

  window.dispatchEvent(new CustomEvent(eventName));

  // Beyond page jab main-page overlay ke andar ho: parent ko batao (X button ka overlap rokne ke liye).
  if (window.parent !== window) {
    window.parent.postMessage({ type: messageType }, window.location.origin);
  }
}

function updateNavigation() {
  els.prev.disabled = activeIndex <= 0;
  els.next.disabled = activeIndex >= activeItems.length - 1;
  // First card shows only Next, last card shows only Previous (CSS hides).
  overlay.classList.toggle("at-start", activeIndex <= 0);
  overlay.classList.toggle("at-end", activeIndex >= activeItems.length - 1);
}

function applyAccent(item) {
  // PAPER & INK redesign: per-title colour accents retired. Ek static
  // palette poori site pe isliye yahan kuch set nahi hota.
  return;
  const themes = (typeof VERSE_THEMES !== "undefined") ? VERSE_THEMES : {};
  const accent = item && themes[item.id];
  if (accent) overlay.style.setProperty("--v-accent", accent);
  else overlay.style.removeProperty("--v-accent");
}

function reelResetLock(){ reelGestureUsed = false; lastReelAdvance = 0; }

function open(items, index) {
  reelResetLock();          // overlay khulte hi lock saaf -> pehla swipe block na ho
  if (!items?.length) return;

  activeItems = items;
  activeIndex = Math.max(0, Math.min(items.length - 1, index));

  fillDetail(activeItems[activeIndex]);
  updateNavigation();
  syncReelsHint();
  applyAccent(activeItems[activeIndex]);

  overlay.hidden = false;
  overlay.classList.add("is-open");
  // Page-level flag: while a card is open, the Beyond page's own close
  // button steps aside so only the card's X is visible/clickable.
  document.body.classList.add("verse-card-open");

  // Restart the cinematic opening animation on every open.
  overlay.classList.remove("cinematic-in");
  void overlay.offsetWidth;
  overlay.classList.add("cinematic-in");

  if (!overlayHistoryActive) {
    pushVerseHistory("normal");
    overlayHistoryActive = true;
  }

  announceDetailState(true);
}

/* ==========================================================
   REEL HARD-LOCK  (ek gesture = BILKUL 1 hi trailer)
   Phone pe pointerup + lostpointercapture + touchend, sab ek hi
   swipe me fire hote hain, isliye goTo() par hi do (2) locks hain:
     (a) gesture lock  - ek swipe me sirf pehli call pass
     (b) time lock     - 620ms ke andar doosri call block
   Isse kitna bhi zor/force lagaye, 1 swipe = 1 reel.
   ========================================================== */
var reelGestureUsed = false;   // (a)
var lastReelAdvance = 0;       // (b)
var REEL_LOCK_MS = 620;

function goTo(index) {
  if (!activeItems.length || overlay.hidden) return;

  const isReel = overlay.classList.contains("has-trailer");
  if (isReel) {
    if (reelGestureUsed) return;                    // (a) is swipe me ho chuka
    const now = Date.now();
    if (now - lastReelAdvance < REEL_LOCK_MS) return; // (b) bahut jaldi
    reelGestureUsed = true;
    lastReelAdvance = now;
  }

  const nextIndex = Math.max(0, Math.min(activeItems.length - 1, index));
  if (nextIndex === activeIndex) return;

  activeIndex = nextIndex;
  updateNavigation();
  syncReelsHint();
  overlay.classList.add("is-switching");
  clearTimeout(detailSwitchTimer);

  detailSwitchTimer = setTimeout(() => {
    if (overlay.hidden || activeIndex !== nextIndex) return;

    fillDetail(activeItems[nextIndex]);
    applyAccent(activeItems[nextIndex]);
    // Replay the full cinematic opening for every card direct opens and
    // next/prev navigation both get the same themed entrance.
    overlay.classList.remove("cinematic-in");
    void overlay.offsetWidth;
    overlay.classList.add("cinematic-in");
    overlay.classList.remove("is-switching");
  }, 170);
}

function close(fromBrowserBack = false) {
  overlay.classList.remove("is-open");
  document.body.classList.remove("verse-card-open"); // scroll lock yahan khulna zaroori hai
  clearTrailer();

  announceDetailState(false);

  if (!fromBrowserBack && overlayHistoryActive) {
    history.back();
    return;
  }

  overlayHistoryActive = false;

  setTimeout(() => {
    overlay.hidden = true;
  }, 300);
}


  // Parent (main page) jab overlay dubara khole → purani detail band + scroll top
  window.__mkaVerseClose = function () {
    if (overlay.classList.contains("is-open")) close(true);
  };

  els.close.addEventListener("click", () => close());
els.back?.addEventListener("click", () => close());

els.next.addEventListener("click", () => {
  reelGestureUsed = false; goTo(activeIndex + 1);
});

els.prev.addEventListener("click", () => {
  reelGestureUsed = false; goTo(activeIndex - 1);
});
window.addEventListener("popstate", () => {
  if (overlayHistoryActive) {
    close(true);
  }
});
  document.addEventListener("keydown", (e) => {
    if (overlay.hidden) return;
    if (e.key === "ArrowRight") { reelGestureUsed = false; goTo(activeIndex + 1); }
    if (e.key === "ArrowLeft") { reelGestureUsed = false; goTo(activeIndex - 1); }
    if (e.key === "Escape") close();
  });

  // Trailer sirf X button ya back se band hoga, screen ke khaali hisse ke
  // tap se nahi.

  // touch swipe: horizontal har card pe; trailer stage pe phone me VERTICAL
  // swipe bhi (reels-style scroll feel)
  let touchX = null;
  let touchY = null;
  overlay.addEventListener("touchstart", (e) => {
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
  });
  overlay.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    const dy = e.changedTouches[0].clientY - touchY;
    touchX = null;
    touchY = null;
    /* ZAROORI: vertical (reels-style) swipe yahan handle NAHI hota.
       wo reelsSnap() karta hai (1 swipe = 1 reel, busy lock ke saath).
       Agar yahan bhi goTo() chalate to EK swipe me 2 reel badal jati. */
    if (window.__reelBusy) return;         // reel transition chal rahi hai
    if (Math.abs(dy) >= Math.abs(dx)) return; // vertical = reelsSnap ka kaam
    if (Math.abs(dx) > 50) {
      reelGestureUsed = false; goTo(activeIndex + (dx < 0 ? 1 : -1));
    }
  });

  // ---- render each grid ----
  collections.forEach(({ gridId, items }) => {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    if (!items.length) {
      grid.innerHTML = `<p class="placeholder-note">Add your picks to js/data.js cards will appear here automatically.</p>`;
      return;
    }
    grid.classList.add("verse-list");
    items.forEach((item, i) => {
      // Beyond cards: left photo, right name + description, bottom-right par studio ka naam.
      // item.trailerUrl bhara ho to sirf PHOTO clickable link hai (naye tab mein YouTube trailer khulta hai).
      const hasLink = !!(item.trailerUrl && item.trailerUrl.trim());
      const row = document.createElement("div");
      row.className = "verse-row";
      const initial = (item.name || "?").trim().slice(0, 1).toUpperCase();
      const studioTag = item.studio ? `<span class="verse-row-studio">${item.studio}</span>` : "";
      row.innerHTML = `<div class="verse-row-photo" data-fallback="${initial}"><img src="${item.img || ""}" alt="${item.name || ""}" loading="lazy"></div><div class="verse-row-body"><h3 class="verse-row-name">${item.name || "Untitled"}</h3>${item.desc ? `<p class="verse-row-desc">${item.desc}</p>` : ""}</div>${studioTag}`;
      if (hasLink) {
        const photo = row.querySelector(".verse-row-photo");
        const link = document.createElement("a");
        link.className = "verse-row-photo-link";
        link.href = item.trailerUrl.trim();
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.setAttribute("aria-label", `Watch trailer: ${item.name || "Untitled"}`);
        photo.parentNode.insertBefore(link, photo);
        link.appendChild(photo);
      }
      const rowImage = row.querySelector("img");
      rowImage.addEventListener("error", () => row.classList.add("no-image"), { once: true });
      rowImage.addEventListener("load", () => row.classList.remove("no-image"));
      if (!item.img) row.classList.add("no-image");

      grid.appendChild(row);
    });
  });

  /* ── REELS MODE (phone) ───────────────────────────────────────────
     Trailer khula ho to upar / neeche swipe karke USI section ke
     agle / pichhle card par jao bilkul Insta reel jaisa. Phone pe
     arrows chhup jaate hain (CSS §33). Aakhri card ke baad swipe se
     kuch nahi hota: naya section kholna padta hai. */
  function syncReelsHint() {
    var hint = overlay.querySelector(".reels-hint");
    if (!hint) return;
    var txt = hint.querySelector(".reels-hint-txt");
    var last = activeIndex >= activeItems.length - 1;
    var first = activeIndex <= 0;
    hint.classList.toggle("is-end", last);
    if (txt) txt.textContent = last
      ? "Last card close to open another section"
      : (first ? "Swipe up for next" : "Swipe up / down");
  }

  /* ── REELS SNAP (phone) ──────────────────────────────────────────
     • Ungli / mouse se kheencho → content saath chalta hai
     • Chhodte hi FARQ: ya to agla trailer SLIDE hoke LOCK ho jaata hai,
       ya wapas apni jagah (rubber-band). 1 scroll = 1 trailer jitna
       zor lagaoge utna door nahi jaata.
     • Aakhri / pehle card par aage kheenchne se rubber-band, koi switch
       nahi: naya section kholna padta hai.
     • Wheel / trackpad se bhi chalta hai (desktop preview me test ke liye). */
  (function reelsSnap() {
    var H = 1, busy = false, down = false, pid = null;
    var startY = 0, lastY = 0, lastT = 0, vel = 0, dy = 0, dxTot = 0, startX = 0;
    var RESIST = 0.3; // aakhri card par kitna "rubber" lage
    var EASE = "transform .32s cubic-bezier(.22,.68,.24,1)";
    var wheelAcc = 0, wheelT = 0;

    function phone() { return window.matchMedia("(max-width: 860px)").matches; }
    function live() { return !overlay.hidden && overlay.classList.contains("is-open"); }
    function setY(px, anim) {
      reelStage.style.transition = anim ? EASE : "none";
      reelStage.style.transform = "translate3d(0," + px + "px,0)";
    }
    function atEnd() { return activeIndex >= activeItems.length - 1; }
    function atStart() { return activeIndex <= 0; }

    /* ek kadam aage / peeche SNAP karke lock */
    function snap(dir) {
      busy = window.__reelBusy = true;
      setY(dir * -H, true); // purana trailer bahar slide
      window.setTimeout(function () {
        var target = activeIndex + dir;
        if (target < 0 || target > activeItems.length - 1) {
          setY(0, true); // end wapas lock
          window.setTimeout(function () { busy = window.__reelBusy = false; }, 340);
          return;
        }
        goTo(target); // naya trailer (fill + cinematic-in)
        window.setTimeout(function () {
          setY(0, false); // naya content apni jagah LOCK
          window.setTimeout(function () { busy = window.__reelBusy = false; }, 120);
        }, 180);
      }, 250);
    }

    function onDown(e) {
      if (!live() || !phone() || busy || down) return;
      // Control buttons (sound / close / prev / next) par pointer capture
      // mat lagao, warna tap ka click overlay par chala jata hai aur card
      // band ho jata hai.
      if (e.target && e.target.closest && e.target.closest(".verse-close, .verse-prev, .verse-next")) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      down = true; pid = e.pointerId;
      H = overlay.clientHeight || window.innerHeight;
      startY = lastY = e.clientY; lastT = e.timeStamp || Date.now();
      vel = 0; dy = 0; dxTot = 0; startX = e.clientX;
      try { overlay.setPointerCapture(pid); } catch (err) {}
    }

    function onMove(e) {
      if (!down || e.pointerId !== pid) return;
      var raw = e.clientY - startY;
      dxTot = e.clientX - startX;
      if ((raw < 0 && atEnd()) || (raw > 0 && atStart())) raw *= RESIST;
      dy = raw;
      var now = e.timeStamp || Date.now();
      if (now > lastT) { vel = (e.clientY - lastY) / (now - lastT); lastY = e.clientY; lastT = now; }
      setY(dy, false);
    }

    function onUp(e) {
      if (!down || (e.pointerId != null && e.pointerId !== pid)) return;
      down = false;
      try { overlay.releasePointerCapture(pid); } catch (err) {}
      pid = null;
      if (busy) return;

      var dist = Math.abs(dy);
      var fast = Math.abs(vel) > 0.35; // px per ms
      var pass = dist > H * 0.16 || (fast && dist > 20);

      // horizontal swipe ho to reel mat badlo (wo touchend handler ka kaam)
      if (Math.abs(dxTot) > Math.abs(dy)) { setY(0, true); dy = 0; return; }
      if (!pass) { setY(0, true); dy = 0; return; } // chhota pull → wapas
      var dir = dy < 0 ? 1 : -1;
      dy = 0;
      snap(dir); // 1 scroll = 1 trailer
    }

    overlay.addEventListener("pointerdown", onDown);
    overlay.addEventListener("pointermove", onMove);
    overlay.addEventListener("pointerup", onUp);
    overlay.addEventListener("pointercancel", onUp);
    overlay.addEventListener("lostpointercapture", onUp);

    /* wheel / trackpad desktop preview me bhi reel chalegi */
    // Naya gesture shuru = lock kholo (pointer ho ya touch, dono cover)
  function newGesture() { reelGestureUsed = false; }
  overlay.addEventListener("pointerdown", newGesture, { capture: true, passive: true });
  overlay.addEventListener("touchstart", newGesture, { capture: true, passive: true });
  window.addEventListener("touchstart", newGesture, { capture: true, passive: true });

  overlay.addEventListener("wheel", function (e) {
      if (!live()) return;
      // NON-passive + preventDefault → wheel gesture neeche wale beyond page
      // tak KABHI nahi pahunchta. Card khula ho to page hamesha freeze.
      if (e.cancelable) e.preventDefault();
      if (!phone() || busy) return;
      var now = Date.now();
      if (now - wheelT > 420) wheelAcc = 0;
      wheelT = now;
      wheelAcc += e.deltaY;
      if (Math.abs(wheelAcc) > 60) {
        var dir = wheelAcc > 0 ? 1 : -1;
        wheelAcc = 0;
        reelGestureUsed = false;   // wheel bhi ek naya gesture hai
        snap(dir);
      }
    }, { passive: false });
  })();
})();