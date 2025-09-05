// Compiler is now just a file writer.
// Gemini decides what files exist and what content they have.

export function compile(cfg) {
  if (!cfg.files) throw new Error("No files found in Gemini output");
  return { files: cfg.files };
}
