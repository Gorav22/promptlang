import { GoogleGenerativeAI } from "@google/generative-ai";

const INSTRUCTION = ` 
You are a project generator.

Given a user prompt, return a JSON object with this schema:

{
  "target": "html" | "react" | "vue" | "nextjs",
  "files": {
    "filename": "file content as string",
    "src/App.jsx": "file content",
    ...
  }
}

Rules:
- remember to add whole file code 
- Always return valid JSON only (no explanations, no markdown fences).
- Include all files needed to run the project.
- If "html", give whole html +css project make it designable and very fabulous + include all necessary dependencies and configuration files.
- If "react", give whole react project make it designable and very fabulous + include all necessary dependencies and configuration files.
- If "vue", give whole vue project make it designable and very fabulous + include all necessary dependencies and configuration files.
- If "nextjs", give whole nextjs project make it designable and very fabulous + include all necessary dependencies and configuration files.
`;

export async function geminiGenerateProject(apiKey, userPrompt) {
  if (!apiKey) throw new Error("GEMINI_API_KEY missing");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent([
    INSTRUCTION,
    "User prompt:\n" + userPrompt,
  ]);

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
