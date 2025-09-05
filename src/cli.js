#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { compile } from './compiler.js';
import { callGeminiRest } from './gemini.js';

dotenv.config();

const argv = process.argv.slice(2);

async function main() {
  if (argv.length === 0) {
    console.log('Usage: promptlang "your prompt"  OR  promptlang --file path.dsl  OR  promptlang --gemini "natural prompt"');
    console.log('Example: promptlang "make a dark hero site with title \"AI rocks\""');
    process.exit(0);
  }

  const arg = argv.join(' ');

  // flags
  const useGemini = arg.includes('--gemini') || arg.includes('--ai') || argv[0] === '--gemini' || argv[0] === '--ai';
  const fileFlag = arg.includes('--file') || argv[0] === '--file';
  const outIndex = argv.indexOf('--out');
  let outFile = 'site.html';
  if (outIndex !== -1 && argv.length > outIndex+1) outFile = argv[outIndex+1];

  try {
    if (useGemini) {
      const flagIndex = argv.indexOf('--gemini') !== -1 ? argv.indexOf('--gemini') : argv.indexOf('--ai');
      const userPrompt = argv.slice(flagIndex+1).join(' ').trim();
      if (!userPrompt) { console.error('Provide a prompt after --gemini'); process.exit(1); }
      const apiKey = process.env.GEMINI_API_KEY;
      console.log('Calling Gemini to translate prompt → DSL...');
      const dsl = await callGeminiRest(apiKey, userPrompt);
      console.log('Gemini returned DSL:\n', dsl);
      const html = compile(dsl);
      fs.writeFileSync(outFile, html, 'utf-8');
      console.log(`✅ Wrote ${outFile}`);
      process.exit(0);
    } else if (fileFlag) {
      const filePath = argv[argv.indexOf('--file')+1];
      if (!filePath) { console.error('Provide a file path after --file'); process.exit(1); }
      const content = fs.readFileSync(path.resolve(filePath), 'utf-8');
      const html = compile(content);
      fs.writeFileSync(outFile, html, 'utf-8');
      console.log(`✅ Wrote ${outFile}`);
      process.exit(0);
    } else {
      const inlinePrompt = argv.join(' ');
      if (inlinePrompt === '--example') {
        const ex = `theme: dark\nhero.title: "Ship fast"\nhero.subtitle: "Prompt to site"\nfooter.text: "© 2025"`;
        console.log('Example DSL:\n', ex);
        process.exit(0);
      }
      const html = compile(inlinePrompt);
      fs.writeFileSync(outFile, html, 'utf-8');
      console.log(`✅ Wrote ${outFile}`);
      process.exit(0);
    }
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
}

main();
