export function renderHTML(cfg) {
  const themeClass = cfg.theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900';
  const fontClass = cfg.font === 'serif' ? 'font-serif' : cfg.font === 'mono' ? 'font-mono' : 'font-sans';
  const primary = cfg.colors?.primary || '#06b6d4';
  const accent = cfg.colors?.accent || '#fb7185';

  const navLinks = (cfg.nav?.links || []).map(l => `<a href='#' class='text-sm hover:underline'>${escapeHtml(l)}</a>`).join('\n');

  const hero = cfg.hero || {};
  const heroTitle = escapeHtml(hero.title || 'PromptLang Site');
  const heroSubtitle = escapeHtml(hero.subtitle || '');
  const heroCta = escapeHtml(hero.cta || 'Get Started');
  const heroBg = hero.backgroundImage ? `style="background-image:url('${escapeAttr(hero.backgroundImage)}');background-size:cover;background-position:center;"` : '';

  const sectionsHtml = (cfg.sections || []).map(sec => renderSection(sec)).join('\n');

  const cardCount = Math.max(1, Math.min(4, cfg.cards?.columns || 3));
  const cardItems = cfg.cards?.items || [];
  let cardsHtml = '';
  for (let i=0;i<Math.max(cardItems.length, 3);i++) {
    const it = cardItems[i] || { title: `Card ${i+1}`, text: 'Short description.' };
    cardsHtml += `<div class='p-6 rounded-lg border bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm'>
      ${it.image ? `<img src='${escapeAttr(it.image)}' alt='' class='w-full h-36 object-cover rounded mb-3'/>` : ''}
      <h4 class='font-semibold mb-2'>${escapeHtml(it.title)}</h4>
      <p class='text-sm opacity-80'>${escapeHtml(it.text)}</p>
    </div>`;
  }

  return `<!doctype html>
<html class='${themeClass} ${fontClass}'>
<head>
<meta charset='utf-8'/>
<meta name='viewport' content='width=device-width,initial-scale=1'/>
<title>${heroTitle}</title>
<link href='https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css' rel='stylesheet'/>
</head>
<body class='antialiased'>
  <div class='max-w-6xl mx-auto shadow-lg rounded-xl overflow-hidden'>
    <header class='flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800'>
      <div class='text-lg font-bold'>PromptLang</div>
      <nav class='hidden md:flex space-x-4'>${navLinks}</nav>
    </header>

    <main ${heroBg} class='px-6 py-20 text-center ${hero.backgroundImage ? 'text-white' : ''}'>
      <div class='max-w-3xl mx-auto backdrop-blur-sm ${hero.backgroundImage ? 'bg-black/40 p-8 rounded' : ''}'>
        <h1 class='text-3xl md:text-5xl font-extrabold mb-4'>${heroTitle}</h1>
        <p class='text-md md:text-lg opacity-80 mb-6'>${heroSubtitle}</p>
        <div class='flex justify-center gap-3'>
          <a href='#' style='background:${primary}' class='px-6 py-2 rounded-md text-white font-medium inline-block'>${heroCta}</a>
          <a href='#' class='px-6 py-2 rounded-md border inline-block'>Learn More</a>
        </div>
      </div>
    </main>

    ${sectionsHtml}

    <section class='px-6 py-8'>
      <div class='grid gap-6 md:grid-cols-${cardCount} max-w-4xl mx-auto'>${cardsHtml}</div>
    </section>

    <footer class='px-6 py-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm opacity-80'>
      ${escapeHtml(cfg.footer?.text || '')}
    </footer>
  </div>
</body>
</html>`;
}

function renderSection(sec) {
  if (!sec || !sec.type) return '';
  const heading = escapeHtml(sec.heading || '');
  if (sec.type === 'features') {
    const items = (sec.items || []).map(it => `<div class='p-4'><h3 class='font-semibold'>${escapeHtml(it.title)}</h3><p class='text-sm opacity-80'>${escapeHtml(it.text)}</p></div>`).join('\n');
    return `<section class='px-6 py-8 border-t border-b border-gray-100 dark:border-gray-800'><div class='max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>${items}</div></section>`;
  } else if (sec.type === 'projects') {
    const items = (sec.items || []).map(it => `<div class='p-4'><div class='h-40 bg-gray-100 dark:bg-gray-800 rounded mb-2 overflow-hidden'>${it.image ? `<img src='${escapeAttr(it.image)}' alt='' class='w-full h-full object-cover'/>` : ''}</div><h4 class='font-semibold'>${escapeHtml(it.title)}</h4><p class='text-sm opacity-80'>${escapeHtml(it.text)}</p></div>`).join('\n');
    return `<section class='px-6 py-8'><div class='max-w-4xl mx-auto'><h3 class='text-xl font-bold mb-4'>${heading}</h3><div class='grid md:grid-cols-3 gap-6'>${items}</div></div></section>`;
  } else if (sec.type === 'custom') {
    return `<section class='px-6 py-8'><div class='max-w-4xl mx-auto'><h3 class='text-xl font-bold mb-4'>${heading}</h3><div>${escapeHtml(sec.content || '')}</div></div></section>`;
  }
  return '';
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>'"]/g, function(ch) {
    return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch];
  });
}
function escapeAttr(s) {
  return String(s || '').replace(/'/g, "&#39;").replace(/\"/g, '&quot;');
}
