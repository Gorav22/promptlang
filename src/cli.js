#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { geminiGenerateProject } from "./gemini.js";
import { compile } from "./compiler.js";

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage:");
    console.error("  gorav yourproject.gorav");
    console.error("  or");
    console.error('  gorav --ai "Create a weather app using React"');
    process.exit(1);
  }

  const isAiMode = args.includes("--ai");
  const userArg = args.filter((a) => !a.startsWith("--"))[0];
  let cfg;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ Missing GEMINI_API_KEY in environment variables.");
    process.exit(1);
  }

  if (userArg.endsWith(".gorav")) {
    const filePath = path.resolve(userArg);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Config file not found: ${filePath}`);
      process.exit(1);
    }

    console.log("📂 Reading configuration from .gorav file...");
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const { projectName, description, urls = [] } = jsonData;

    if (!description) {
      console.error("❌ Missing 'description' in .gorav file.");
      process.exit(1);
    }

    console.log(`🤖 Calling Gemini to generate project "${projectName}"...`);
    cfg = await geminiGenerateProject(apiKey, `${description}\nURLs: ${urls.join(", ")}`);
  } 
  else if (isAiMode) {
    console.log("🤖 Calling Gemini to generate project files...");
    cfg = await geminiGenerateProject(apiKey, userArg);
  } 
  else {
    console.error("❌ Invalid command. Use a .gorav file or --ai mode.");
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
