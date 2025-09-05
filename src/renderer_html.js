export function renderHTML(cfg) {
  const heroTitle = cfg.hero?.title || "PromptLang Site";
  const heroSubtitle = cfg.hero?.subtitle || "";
  const footer = cfg.footer?.text || "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${heroTitle}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white min-h-screen flex flex-col">
  <main class="flex-grow flex flex-col justify-center items-center text-center">
    <h1 class="text-4xl font-bold">${heroTitle}</h1>
    <p class="mt-2 opacity-70">${heroSubtitle}</p>
  </main>
  <footer class="p-4 text-center opacity-60">${footer}</footer>
</body>
</html>`;

  return { "index.html": html };
}
