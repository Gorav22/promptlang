import fetch from 'node-fetch';

/**
 * Improved Gemini connector.
 *
 * This function instructs the AI to output a strict JSON object representing the PromptLang DSL.
 * The expected JSON shape:
 * {
 *   theme: "dark"|"light",
 *   colors: { primary: "#...", accent: "#..." },
 *   font: "system"|"serif"|"mono"|<google-font-name>,
 *   nav: { links: ["Home","About"] },
 *   hero: { title, subtitle, cta, backgroundImage } ,
 *   sections: [ { type: "features"|"projects"|"custom", heading, items: [ ... ] } ],
 *   cards: { columns: 3, items: [ {title, text, image} ] },
 *   footer: { text }
 * }
 *
 * The implementation below calls a generic REST endpoint. You must replace the URL with a
 * working Gemini endpoint or swap to the official SDK.
 */

const INSTRUCTION = `You are an assistant that converts a user's plain-language website request into a strict JSON object.
Return ONLY valid JSON — no extra explanation.
Use this schema (example values included):

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

Only include keys relevant to the design. Do not include commentary or code fences.`;

export async function geminiToDslJson(apiKey, userPrompt) {
  if (!apiKey) throw new Error('GEMINI API key required');
  const payload = {
    prompt: INSTRUCTION + "\nUser prompt:\n" + userPrompt,
    // Add model or other parameters as required by the endpoint/SDK.
  };

  const res = await fetch('https://api.generative.google.example/v1/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error('Gemini call failed: ' + res.status + ' ' + txt);
  }

  const data = await res.json();

  // Try to extract JSON from several plausible fields
  let text = data?.output_text || data?.text || JSON.stringify(data);
  // If the response contains extra commentary, attempt to extract first JSON object
  const firstJson = extractFirstJson(text);
  if (firstJson) return JSON.parse(firstJson);

  // Fallback: try to parse the raw text
  try { return JSON.parse(text); } catch(e) {
    throw new Error('Could not parse JSON from Gemini response. Raw response:\n' + text);
  }
}

function extractFirstJson(s) {
  const start = s.indexOf('{');
  if (start === -1) return null;
  // find matching brace (simple approach)
  let depth = 0;
  for (let i = start; i < s.length; i++) {
    if (s[i] === '{') depth++;
    else if (s[i] === '}') {
      depth--;
      if (depth === 0) return s.slice(start, i+1);
    }
  }
  return null;
}
