const data = window.PORTFOLIO;
const safe = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const formatNote = value => safe(value).replace(/Lunch with the FT|The New York Times|Actors on Actors|Variety|Financial Times|NYT/g, name => `<em>${name}</em>`);
document.querySelector('#writing-grid').innerHTML = data.writing.map(item => `
  <article class="story-card">
    <a href="${safe(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="Read ${safe(item.title)}">
      <div class="story-image"><img loading="lazy" src="${safe(item.image)}" alt="${safe(item.imageAlt)}" onerror="this.parentElement.classList.add('is-missing')"><span class="image-fallback">${safe(item.title)}</span></div>
    </a>
    <h3><a href="${safe(item.url)}" target="_blank" rel="noopener noreferrer">${safe(item.title)}</a></h3>
    <p class="personal-note">${formatNote(item.note)}</p>
    <a class="story-source" href="${safe(item.url)}" target="_blank" rel="noopener noreferrer">Read article ↗</a>
  </article>
`).join('');
document.querySelector('#film-grid').innerHTML = data.films.map(item => `
  <article class="film-card">
    <a class="film-thumb" href="${safe(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${safe(item.title)} on YouTube">
      <img loading="lazy" src="https://i.ytimg.com/vi/${encodeURIComponent(item.id)}/hqdefault.jpg" alt="Thumbnail for ${safe(item.title)}" onerror="this.parentElement.classList.add('is-missing')">
      <span class="image-fallback">${safe(item.title)}</span><span class="play" aria-hidden="true">▶</span>
    </a>
    <h3><a href="${safe(item.url)}" target="_blank" rel="noopener noreferrer">${safe(item.title)}</a></h3>
    ${item.note ? `<p class="personal-note">${formatNote(item.note)}</p>` : ''}
    <a class="story-source" href="${safe(item.url)}" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
  </article>
`).join('');
const menuButton = document.querySelector('#menu-toggle');
menuButton.addEventListener('click', () => {const open = document.querySelector('nav').classList.toggle('open');menuButton.setAttribute('aria-expanded', String(open));});
document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => {document.querySelector('nav').classList.remove('open');menuButton.setAttribute('aria-expanded', 'false');}));
document.querySelector('#footer-year').textContent = new Date().getFullYear();
window.addEventListener('scroll', () => {const el = document.documentElement; const height = el.scrollHeight - el.clientHeight; document.querySelector('#reading-progress').style.width = `${height ? Math.max(0, Math.min(100, el.scrollTop / height * 100)) : 0}%`;}, {passive:true});
