import { renderHTML } from './renderer_html.js';
import { renderReact } from './renderer_react.js';
import { renderVue } from './renderer_vue.js';

export function compile(cfg) {
  switch (cfg.target) {
    case "react":
      return { files: renderReact(cfg) };
    case "vue":
      return { files: renderVue(cfg) };
    case "html":
    default:
      return { files: renderHTML(cfg) };
  }
}
