async function updateCounts() {
  try {
    const res = await fetch('/api/checkin-counts');
    const data = await res.json();
    document.querySelectorAll('[data-eventid]').forEach(el => {
      const id = el.getAttribute('data-eventid');
      const target = el.querySelector('.antall-pameldte');
      if (target) target.textContent = data[id] ?? '–';
    });
  } catch (err) {
    console.error('Feil ved henting av Checkin-data:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateCounts);
} else {
  updateCounts();
}
