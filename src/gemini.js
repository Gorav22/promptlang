import { GoogleGenerativeAI } from "@google/generative-ai";

// Instruction we send to Gemini
const INSTRUCTION = `You are an assistant that converts a user's plain-language website request into a strict JSON object.
Return ONLY valid JSON — no extra explanation.
Schema example:

{
  theme: "dark",
  colors: { primary: "#06b6d4", accent: "#fb7185" },
  font: "system",
  nav: { links: ["Home", "Work", "Contact"] },
  hero: { title: "Ship fast", subtitle: "Built from prompts", cta: "Get Started", backgroundImage: "https://example.com/image.jpg" },
  sections: [
    { type: "features", heading: "Why PromptLang", items: [{title:"Prompt-driven", text:"..."}, {title:"Tailwind", text:"..."}] },
    { type: "projects", heading: "Projects", items: [{title:"Project A", text:"...", image:"https://..."}] }
  ],
  cards: { columns: 3, items: [{title:"Card 1", text:"..."}, {title:"Card 2", text:"..."}] },
  footer: { text: "© 2025" }
}

Return JSON only, no commentary, no code fences.`;

export async function geminiToDslJson(apiKey, userPrompt) {
  if (!apiKey) throw new Error("GEMINI_API_KEY missing");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent([INSTRUCTION, "User prompt:\n" + userPrompt]);

  const text = result.response.text();

  // Try to extract JSON safely
  const firstJson = extractFirstJson(text);
  if (firstJson) return JSON.parse(firstJson);

  return JSON.parse(text);
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
