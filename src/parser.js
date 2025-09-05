export function parsePrompt(input) {
  const lines = String(input).split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const cfg = {
    theme: 'light',
    colors: { primary: '#06b6d4', accent: '#fb7185' },
    font: 'system',
    nav: { links: [] },
    hero: { title: '', subtitle: '', cta: '' },
    cards: { columns: 3 },
    footer: { text: '' }
  };

  for (const line of lines) {
    // support comments starting with #
    if (line.startsWith('#')) continue;
    const [key, ...rest] = line.split(':');
    if (!key) continue;
    const value = rest.join(':').trim().replace(/^['"]|['"]$/g, '');

    if (key === 'theme') cfg.theme = value;
    else if (key === 'colors') {
      const parts = value.split(',').map(p => p.trim());
      for (const p of parts) {
        const [k,v] = p.split('=').map(s => s && s.trim());
        if (k && v) cfg.colors[k] = v;
      }
    } else if (key === 'font') cfg.font = value;
    else if (key === 'nav.links') cfg.nav.links = value.split(',').map(s=>s.trim());
    else if (key.startsWith('hero.')) {
      const sub = key.split('.')[1];
      if (sub) cfg.hero[sub] = value;
    } else if (key === 'cards') {
      const n = parseInt(value);
      if (!isNaN(n)) cfg.cards.columns = n;
      else if (value.includes('columns')) {
        const v = parseInt(value.split(' ')[0]);
        if (!isNaN(v)) cfg.cards.columns = v;
      }
    } else if (key.startsWith('footer.')) {
      const sub = key.split('.')[1];
      if (sub) cfg.footer[sub] = value;
    } else {
      // unknown keys stored at top-level for future use
      cfg[key] = value;
    }
  }

  return cfg;
}
