(() => {
  const menu = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (menu && nav) menu.addEventListener('click', () => { const shown = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(shown)); });
  const searchForms = document.querySelectorAll('[data-search-form]');
  searchForms.forEach(form => form.addEventListener('submit', e => {const input=form.querySelector('input[name="q"]'); if(!input.value.trim()){e.preventDefault(); input.focus();}}));
  const query = new URLSearchParams(location.search).get('q') || '';
  if (document.body.dataset.page === 'search') {
    const input = document.querySelector('[data-search-page-input]');
    if (input) input.value = query;
    const results = document.querySelector('[data-results]');
    const note = document.querySelector('[data-results-note]');
    const pages = window.SITE_INDEX || [];
    const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const matches = tokens.length ? pages.filter(p => tokens.every(t => (p.title+' '+p.desc+' '+p.category+' '+p.text).toLowerCase().includes(t))) : [];
    if (note) note.textContent = !tokens.length ? 'Enter a word or phrase to search the historical website.' : `${matches.length} result${matches.length === 1 ? '' : 's'} for “${query}”`;
    if(results) results.innerHTML = matches.length ? matches.map(p => `<a class="archive-item" href="${p.href}"><span class="archive-date">${p.category}</span><span><strong>${p.title}</strong><p>${p.desc}</p></span><span class="arrow" aria-hidden="true">↗</span></a>`).join('') : (tokens.length ? '<div class="empty-state">No matching pages found. Try a broader search, or explore the <a href="sitemap.html">site map</a>.</div>' : '');
  }
  document.querySelectorAll('[data-demo-form]').forEach(form => form.addEventListener('submit', event => {event.preventDefault(); const result=form.querySelector('.form-result'); if(result){result.classList.add('show');result.focus();} form.reset();}));
})();
