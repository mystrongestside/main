(function updateBarnUngdomSessions() {
  const dataScript = document.getElementById('sessions-barn-ungdom');
  if (!dataScript) {
    return;
  }

  let rawSessions;
  try {
    rawSessions = JSON.parse(dataScript.textContent.trim());
  } catch (error) {
    console.error('[updateDates] Klarte ikke å tolke sessions JSON', error);
    return;
  }

  if (!Array.isArray(rawSessions)) {
    console.error('[updateDates] Sessions JSON er ikke en liste');
    return;
  }

  const parsedSessions = rawSessions
    .map((entry) => {
      if (typeof entry !== 'string') {
        return null;
      }

      const date = new Date(entry);
      return Number.isNaN(date.getTime()) ? null : date;
    })
    .filter((date) => date instanceof Date)
    .sort((a, b) => a.getTime() - b.getTime());

  if (parsedSessions.length === 0) {
    console.warn('[updateDates] Ingen gyldige datoer i listen');
    return;
  }

  const now = new Date();
  const upcomingSessions = parsedSessions.filter((date) => date >= now);

  const nextSession = upcomingSessions.length > 0 ? upcomingSessions[0] : null;

  const nextSessionElements = Array.from(
    document.querySelectorAll('#next-session, [data-next-session]')
  );

  if (nextSessionElements.length > 0) {
    if (nextSession) {
      const formattedNext = formatSession(nextSession, { includeWeekday: true });
      nextSessionElements.forEach((element) => {
        element.textContent = `Neste økt: ${formattedNext}`;
        element.hidden = false;
      });
    } else {
      nextSessionElements.forEach((element) => {
        element.textContent = 'Ingen planlagte økter akkurat nå.';
        element.hidden = false;
      });
    }
  }

  const sessionsToRender = upcomingSessions.length > 0 ? upcomingSessions : parsedSessions;

  const remainingCountElement = document.getElementById('remaining-count');
  if (remainingCountElement) {
    const countValue = upcomingSessions.length > 0 ? upcomingSessions.length : parsedSessions.length;
    remainingCountElement.textContent = String(countValue);
  }

  const remainingDatesElement = document.getElementById('remaining-dates');
  if (remainingDatesElement) {
    remainingDatesElement.textContent = '';
    sessionsToRender.forEach((date) => {
      const item = document.createElement('li');
      item.textContent = formatSession(date, { includeWeekday: true });
      remainingDatesElement.appendChild(item);
    });
  }
})();

function formatSession(date, { includeWeekday = false } = {}) {
  const options = {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  };

  if (includeWeekday) {
    options.weekday = 'long';
  }

  const formatted = date.toLocaleString('no-NO', options);
  return capitalise(formatted);
}

function capitalise(value) {
  if (typeof value !== 'string' || value.length === 0) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}
