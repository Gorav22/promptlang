import { parsePrompt } from './parser.js';
import { renderHTML } from './renderer.js';

export function compile(prompt) {
  const cfg = parsePrompt(prompt || '');
  return renderHTML(cfg);
}
