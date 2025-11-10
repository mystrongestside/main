(function () {
  const SPEED =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--marquee-speed")
      ?.trim() || "28s";

  function rowHTML(el) {
    const r = el.querySelector(".marquee__row");
    if (r) return r.innerHTML.trim();

    const spans = Array.from(el.querySelectorAll("span"));
    if (spans.length) return spans.map((s) => s.outerHTML).join("");

    const txt = el.textContent
      .trim()
      .replace(/\s+/g, " ")
      .split(" • ")
      .join("•");
    if (!txt) return "";
    return txt
      .split(/(?<=\.)\s+/)
      .map((t) => (t ? `<span>${t}</span>` : ""))
      .join("");
  }

  function standardizeOne(m) {
    if (!m) return;
    if (!m.classList.contains("force-animate"))
      m.classList.add("force-animate");

    const content = rowHTML(m);
    if (!content) return;

    const already = m.querySelector(".marquee__wrap");
    if (!already) {
      m.innerHTML = [
        `<div class="marquee__wrap" style="--marquee-speed:${SPEED}">`,
        `  <div class="marquee__row">${content}</div>`,
        `  <div class="marquee__row" aria-hidden="true">${content}</div>`,
        `</div>`,
      ].join("\n");
    } else {
      const rows = m.querySelectorAll(".marquee__row");
      if (rows.length === 0) {
        already.innerHTML = `<div class="marquee__row">${content}</div><div class="marquee__row" aria-hidden="true">${content}</div>`;
      } else if (rows.length === 1) {
        const dup = rows[0].cloneNode(true);
        dup.setAttribute("aria-hidden", "true");
        already.appendChild(dup);
      }
      if (!already.style.getPropertyValue("--marquee-speed")) {
        already.style.setProperty("--marquee-speed", SPEED);
      }
    }
  }

  function dedupe() {
    const tops = Array.from(
      document.querySelectorAll(".marquee:not(.marquee--bottom)")
    );
    const bots = Array.from(document.querySelectorAll(".marquee.marquee--bottom"));
    tops.slice(1).forEach((n) => n.remove());
    bots.slice(1).forEach((n) => n.remove());
  }

  function sync() {
    dedupe();
    document.querySelectorAll(".marquee").forEach(standardizeOne);
  }

  function init() {
    sync();
    const obs = new MutationObserver((muts) => {
      let touched = false;
      for (const m of muts) {
        if (m.addedNodes && m.addedNodes.length) {
          for (const n of m.addedNodes) {
            if (!(n instanceof Element)) continue;
            if (
              n.matches &&
              (n.matches(".marquee") || n.querySelector?.(".marquee"))
            ) {
              touched = true;
              break;
            }
          }
        }
        if (touched) break;
      }
      if (touched) sync();
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
