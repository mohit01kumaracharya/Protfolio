/* ════════════════════════════════════════════════════════════════
   THEME TOGGLE light ↔ dark, persisted in localStorage.
   Default: light pages stay light, Beyond stays cinematic dark 
   jab tak user khud toggle na kar de.
   ════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var KEY = "mka-theme";
  var root = document.documentElement;

  function current() { return root.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
  /* Favicon site theme ke saath badle (tab icon hamesha saaf dikhe) */
  var FAV = {
    light: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%229%22%20fill%3D%22%23F4F1EA%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2246%22%20font-family%3D%22Georgia%2Cserif%22%20font-style%3D%22italic%22%20font-size%3D%2240%22%20fill%3D%22%2316294D%22%20text-anchor%3D%22middle%22%3EM%3C%2Ftext%3E%3C%2Fsvg%3E",
    dark: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%229%22%20fill%3D%22%23171512%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2246%22%20font-family%3D%22Georgia%2Cserif%22%20font-style%3D%22italic%22%20font-size%3D%2240%22%20fill%3D%22%23FF7A88%22%20text-anchor%3D%22middle%22%3EM%3C%2Ftext%3E%3C%2Fsvg%3E"
  };
  function setFavicon(t) {
    var link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml";
      document.head.appendChild(link);
    }
    link.href = FAV[t] || FAV.light;
  }

  function apply(t) {
    root.setAttribute("data-theme", t);
    setFavicon(t);
    try { localStorage.setItem(KEY, t); } catch (e) {}
  }

  function makeBtn(floating) {
    var b = document.createElement("button");
    b.className = "theme-toggle" + (floating ? " float" : "");
    b.type = "button";
    b.setAttribute("aria-label", "Toggle dark / light theme");
    b.title = "Theme badlo";
    b.innerHTML =
      '<svg class="tt-ico tt-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
      '<svg class="tt-ico tt-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>' +
      '<span class="tt-label">Theme</span>';
    b.addEventListener("click", function () {
      // iframe (overlay) ke andar: parent page ko bhi toggle karo taaki
      // theme-sync loop dark ko wapas light na kar de
      if (window.parent !== window) {
        try { window.parent.postMessage({ mka: "theme-toggle" }, "*"); } catch (e) {}
      }
      apply(current() === "dark" ? "light" : "dark");
    });
    return b;
  }

  // Parent (main page) se theme-set message → iframe follow kare
  window.addEventListener("message", function (e) {
    var d = e.data;
    if (d && d.mka === "theme-set" && (d.theme === "light" || d.theme === "dark")) {
      root.setAttribute("data-theme", d.theme);
      try { localStorage.setItem(KEY, d.theme); } catch (err) {}
    }
  });

  // Har page pe fixed floating toggle kabhi hidden nahi hota
  document.body.appendChild(makeBtn(true));

  // page load pe favicon theme ke mutabiq
  setFavicon(current());
})();
