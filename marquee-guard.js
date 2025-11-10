// Hindrer duplisering ved re-init (f.eks. når header/footer lastes dynamisk)
document.querySelectorAll('.marquee').forEach(m => {
  if (m.dataset.initialized === '1') return;
  m.dataset.initialized = '1';

  // Finn eller bygg innhold
  const row = m.querySelector('.marquee__row');
  if (!row) return;

  // Sørg for en wrap + en klon for sømløs rull
  let wrap = m.querySelector('.marquee__wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'marquee__wrap';
    // flytt eksisterende rad inn i wrap
    wrap.appendChild(row);
    m.appendChild(wrap);
  }
  // legg til én (kun én) klon
  if (!wrap.querySelector('[data-clone="1"]')) {
    const clone = row.cloneNode(true);
    clone.setAttribute('data-clone', '1');
    wrap.appendChild(clone);
  }
});



(function(){
  const SPEED = getComputedStyle(document.documentElement).getPropertyValue('--marquee-speed')?.trim() || '28s';

  function rowHTML(el){
    // Prøv å finne første eksisterende rad
    const r = el.querySelector('.marquee__row');
    if (r) return r.innerHTML.trim();
    // Ellers samle spans i elementet (fallback)
    const spans = Array.from(el.querySelectorAll('span'));
    if (spans.length) return spans.map(s => s.outerHTML).join('');
    // Siste utvei: innerText -> spans
    const txt = el.textContent.trim().replace(/\s+/g,' ').split(' • ').join('•');
    if (!txt) return '';
    return txt.split(/(?<=\.)\s+/).map(t => t ? `<span>${t}</span>` : '').join('');
  }

  function standardizeOne(m){
    if (!m) return;
    if (!m.classList.contains('force-animate')) m.classList.add('force-animate');

    // Sikre korrekt struktur
    const content = rowHTML(m);
    if (!content) return;

    const already = m.querySelector('.marquee__wrap');
    if (!already){
      m.innerHTML = [
        `<div class="marquee__wrap" style="--marquee-speed:${SPEED}">`,
        `  <div class="marquee__row">${content}</div>`,
        `  <div class="marquee__row" aria-hidden="true">${content}</div>`,
        `</div>`
      ].join('\n');
    }else{
      // Pass på at vi har to rader
      const rows = m.querySelectorAll('.marquee__row');
      if (rows.length === 0){
        already.innerHTML = `<div class="marquee__row">${content}</div><div class="marquee__row" aria-hidden="true">${content}</div>`;
      }else if (rows.length === 1){
        const dup = rows[0].cloneNode(true);
        dup.setAttribute('aria-hidden','true');
        already.appendChild(dup);
      }
      // Sikre fart-variabel
      if (!already.style.getPropertyValue('--marquee-speed')){
        already.style.setProperty('--marquee-speed', SPEED);
      }
    }
  }

  function dedupe(){
    // Behold første topp og første bunn
    const tops = Array.from(document.querySelectorAll('.marquee:not(.marquee--bottom)'));
    const bots = Array.from(document.querySelectorAll('.marquee.marquee--bottom'));
    tops.slice(1).forEach(n => n.remove());
    bots.slice(1).forEach(n => n.remove());
  }

  function sync(){
    dedupe();
    document.querySelectorAll('.marquee').forEach(standardizeOne);
  }

  // Init: etter DOMContentLoaded
  function init(){
    sync();
    // Observer for senere injeksjoner fra annen JS
    const obs = new MutationObserver((muts)=>{
      let touched = false;
      for (const m of muts){
        if (m.addedNodes && m.addedNodes.length){
          for (const n of m.addedNodes){
            if (!(n instanceof Element)) continue;
            if (n.matches && (n.matches('.marquee') || n.querySelector?.('.marquee'))){
              touched = true;
              break;
            }
          }
        }
        if (touched) break;
      }
      if (touched) sync();
    });
    obs.observe(document.documentElement, { childList:true, subtree:true });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, {once:true});
  } else {
    init();
  }
})();
