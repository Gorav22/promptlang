export function renderVue(cfg) {
  const heroTitle = cfg.hero?.title || "PromptLang Site";
  const heroSubtitle = cfg.hero?.subtitle || "";
  const footer = cfg.footer?.text || "";

  return {
    "package.json": JSON.stringify({
      name: "promptlang-vue",
      private: true,
      dependencies: {
        vue: "^3.0.0"
      }
    }, null, 2),
    "src/App.vue": `<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <main class="flex-grow flex flex-col justify-center items-center text-center">
      <h1 class="text-4xl font-bold">${heroTitle}</h1>
      <p class="mt-2 opacity-70">${heroSubtitle}</p>
    </main>
    <footer class="p-4 text-center opacity-60">${footer}</footer>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>
`
  };
}
