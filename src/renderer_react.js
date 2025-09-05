export function renderReact(cfg) {
  const heroTitle = cfg.hero?.title || "PromptLang Site";
  const heroSubtitle = cfg.hero?.subtitle || "";
  const footer = cfg.footer?.text || "";

  return {
    "package.json": JSON.stringify({
      name: "promptlang-react",
      private: true,
      dependencies: {
        react: "^18.0.0",
        "react-dom": "^18.0.0"
      }
    }, null, 2),
    "src/App.jsx": `import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <main className="flex-grow flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl font-bold">${heroTitle}</h1>
        <p className="mt-2 opacity-70">${heroSubtitle}</p>
      </main>
      <footer className="p-4 text-center opacity-60">${footer}</footer>
    </div>
  );
}
`
  };
}
