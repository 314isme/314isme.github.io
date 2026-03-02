(() => {
  "use strict";

  const KONAMI = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "KeyB", "KeyA",
  ];

  const PALETTES = ["gb-green", "gb-blue", "gb-red", "gb-yellow"];
  let paletteIndex = -1;
  let idx = 0;

  function applyNextPalette() {
    const root = document.documentElement;

    PALETTES.forEach(p => root.classList.remove(p));

    paletteIndex++;

    if (paletteIndex >= PALETTES.length) {
      paletteIndex = -1;
      return;
    }

    root.classList.add(PALETTES[paletteIndex]);
  }

  window.addEventListener("keydown", (e) => {
    const el = e.target;
    const typing =
      el instanceof HTMLElement &&
      (el.tagName === "INPUT" ||
       el.tagName === "TEXTAREA" ||
       el.isContentEditable);

    if (typing) return;

    if (e.code === KONAMI[idx]) {
      idx++;
      if (idx === KONAMI.length) {
        applyNextPalette();
        idx = 0;
      }
    } else {
      idx = e.code === KONAMI[0] ? 1 : 0;
    }
  }, { passive: true });

})();