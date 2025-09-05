import { GoogleGenerativeAI } from "@google/generative-ai";

const INSTRUCTION = `You are an assistant that converts a plain prompt into a strict JSON config (DSL) for generating a website project.
Always include a "target" field: "html", "react", or "vue".
Schema example:

{
  "target": "react",
  "theme": "dark",
  "hero": { "title": "AI Designer", "subtitle": "Smart sites" },
  "sections": [
    { "type": "projects", "heading": "Projects", "items": [ { "title": "App1", "text": "..." } ] }
  ],
  "footer": { "text": "© 2025" }
}

Return JSON only. No commentary.`;

export async function geminiToDslJson(apiKey, userPrompt) {
  if (!apiKey) throw new Error("GEMINI_API_KEY missing");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent([INSTRUCTION, "User prompt:\n" + userPrompt]);
  const text = result.response.text();

  const json = extractFirstJson(text);
  if (!json) throw new Error("Gemini did not return JSON:\n" + text);
  return JSON.parse(json);
}

function extractFirstJson(s) {
  const start = s.indexOf("{");
  if (start === -1) return null;
  let depth = 0;
  for (let i = start; i < s.length; i++) {
    if (s[i] === "{") depth++;
    else if (s[i] === "}") {
      depth--;
      if (depth === 0) return s.slice(start, i + 1);
    }
  }
  return null;
}
