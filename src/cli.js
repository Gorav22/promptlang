#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { geminiGenerateProject } from "./gemini.js";
import { compile } from "./compiler.js";

const args = process.argv.slice(2);
const aiMode = args.includes("--ai") || args.includes("--gemini");

async function main() {
  let userPrompt = args.filter((a) => !a.startsWith("--")).join(" ");
  if (!userPrompt) {
    console.error("Usage: node ./src/cli.js --ai \"your site description\"");
    process.exit(1);
  }

  let cfg;
  if (aiMode) {
    console.log("🤖 Calling Gemini to generate project files...");
    const apiKey = process.env.GEMINI_API_KEY;
    cfg = await geminiGenerateProject(apiKey, userPrompt);
  } else {
    console.error("Only AI mode is supported now.");
    process.exit(1);
  }

  console.log("✅ Gemini returned project:", cfg.target);

  const outDir = path.resolve("./output");
  fs.mkdirSync(outDir, { recursive: true });

  const { files } = compile(cfg);

  for (const [filename, content] of Object.entries(files)) {
    const fullPath = path.join(outDir, filename);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, "utf-8");
  }

  console.log("🎉 Project generated in ./output/");
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
