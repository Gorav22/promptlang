import { GoogleGenerativeAI } from "@google/generative-ai";
import { jsonrepair } from "jsonrepair";

const INSTRUCTION = ` 
You are a project generator.

Return ONLY valid JSON (no markdown, no code fences, no explanations).

Schema:
{
  "target": "html" | "react" | "vue" | "nextjs",
  "files": {
    "filename": "file content as string",
    "src/App.jsx": "file content",
    ...
  }
}

Rules:
- Do NOT wrap JSON inside strings.
- Every value in "files" must be raw string (file code).
- Always include complete runnable project files.
- If "html", provide full HTML + CSS + dependencies.
- If "react", provide full React project.
- If "vue", provide full Vue project.
- If "nextjs", provide full Next.js project.
`;

export async function geminiGenerateProject(apiKey, userPrompt) {
  if (!apiKey) throw new Error("GEMINI_API_KEY missing");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent([
    INSTRUCTION,
    "User prompt:\n" + userPrompt,
  ]);

  let text = result.response.text().trim();

  
  text = text.replace(/```json\s*/gi, "")
             .replace(/```/g, "")
             .trim();

 
  let rawJson = extractFirstJson(text);
  if (!rawJson) {
    throw new Error("Gemini did not return JSON:\n" + text);
  }

 
  try {
    rawJson = jsonrepair(rawJson);
  } catch (err) {
    throw new Error("Failed to repair JSON:\n" + rawJson);
  }

 
  try {
    return JSON.parse(rawJson);
  } catch (err) {
    throw new Error("Failed to parse JSON after repair:\n" + rawJson);
  }
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
