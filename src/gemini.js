import { GoogleGenerativeAI } from "@google/generative-ai";

const INSTRUCTION = ` 
You are a project generator.

Given a user prompt, return a JSON object with this schema:

{
  "target": "html" | "react" | "vue" | "nextjs" | "nodejs" | "express" | "other",
  "files": {
    "filename": "file content as string",
    "src/App.jsx": "file content",
    ...
  }
}

Rules:
- remember to add whole file code 
- also try to add configuration files like package.json, vite.config.js, tsconfig.json, next.config.js, .gitignore, etc.
- if the project is React, Vue, Nextjs, Nodejs or Express, include all necessary dependencies in package.json
- if the project is HTML, include all necessary files like index.html, styles.css, script.js, images, etc.
- if the project is React, Vue or Nextjs, include all necessary files like index.html, main.jsx, App.jsx/App.vue, components/, assets/, etc.
- if the project is Nodejs or Express, include all necessary files like index.js/app.js, routes/, controllers/, models/, etc.
- make the project designable and very fabulous
- use modern best practices and libraries
- use clear and consistent naming conventions
- ensure code quality and readability
- ensure the project is runnable and functional
- do not include any explanations or comments outside the JSON object
- Use the target field to determine the type of project to generate.
- If "other", choose a suitable project type based on the user prompt and explain your choice in a comment inside the JSON object.
- Always use the files field to provide all necessary files for the project.
- also add backend in the project if needed
- If the user prompt is ambiguous or lacks detail, make reasonable assumptions to fill in the gaps.
- If the user prompt specifies a particular framework or library, ensure it is used appropriately in the project.
- If the user prompt requests specific features or functionality, ensure they are implemented in the project.
- If the user prompt includes design preferences (e.g., color scheme, layout style), incorporate them into the project design.
- If the user prompt requests responsiveness or accessibility, ensure the project meets these criteria.
- If the user prompt includes performance considerations, optimize the project accordingly.
- If the user prompt requests integration with third-party services or APIs, include them in the project.
- If the user prompt specifies a target audience or user persona, tailor the project to their needs and preferences.
- If the user prompt includes a deadline or time constraint, prioritize essential features and deliver a minimum viable product.
- If the user prompt requests documentation or comments within the code, include them appropriately.
- If the user prompt requests testing or quality assurance, include relevant tests and validation.
- If the user prompt includes deployment or hosting requirements, provide necessary configuration files or scripts.
- If the user prompt requests version control or collaboration features, include relevant files or instructions.
- If the user prompt includes budget or resource constraints, optimize the project accordingly.
- If the user prompt requests scalability or future-proofing, design the project with these considerations in mind.
- If the user prompt includes any other specific requirements or constraints, ensure they are addressed in the project.
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
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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
