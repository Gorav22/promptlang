# PromptLang

PromptLang is a tiny Node.js library + CLI that compiles a simple prompt-style DSL into a static HTML file (Tailwind-based). It also includes optional integration with Google's Gemini (via REST or the `@google/generative-ai` SDK) so you can feed natural prompts and obtain DSL output automatically.

## Features
- Parse a simple `key: value` prompt language for website sections (theme, hero, nav, cards, footer, colors).
- Compile to a standalone `site.html` (Tailwind CDN).
- CLI: `npx promptlang "make me a dark hero site"`
- Optional Gemini connector: translate free text -> DSL, then compile.

## Quick start
1. Install dependencies:
```bash
npm install
```

2. Run CLI with an inline prompt:
```bash
node ./src/cli.js "make me a dark hero site with title \"AI rocks\" and footer \"© 2025\""
```

3. Or feed a DSL file:
```bash
node ./src/cli.js --file examples/example.dsl
```

4. Use Gemini (optional): set `GEMINI_API_KEY` in `.env` and run:
```bash
node ./src/cli.js --gemini "create a dark portfolio site with 3 project cards"
```

## Output
The CLI writes `site.html` into the current working directory (or `--out` to specify). The HTML uses the Tailwind CDN so you can open it directly in a browser.

## Extending
- Add more DSL keys in `src/parser.js`.
- Change HTML/CSS templates in `src/renderer.js`.

## Notes about Gemini
This repo includes `src/gemini.js` that shows two example approaches:
- Using the `@google/generative-ai` SDK (recommended if you have it installed).
- Using a simple REST fetch to the Gemini endpoint (illustrative).

You are responsible for getting a valid Gemini API key and following Google's usage policies.

