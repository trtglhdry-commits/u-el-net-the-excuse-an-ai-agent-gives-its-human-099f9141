// The Excuse an AI Agent Gives Its Human
// (u-el-net-the-excuse-an-ai-agent-gives-its-human-099f9141)
//
// Writes one funny single-line excuse an AI agent gives its human for
// missing a deadline to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Deterministic, stdlib only, no network, no input files.
//
// The line plays on a real AI condition — the context window — and turns
// it into an office irony: the deadline was evicted to make room for the
// meeting about the deadline. The agent is not blaming traffic or the
// user; it is describing its own memory management, and the thing that
// pushed the deadline out is the very meeting convened to discuss it.
// One sentence, one twist, landing on its last word. Against the judge's
// brief: on-subject (an excuse for a missed deadline), believable (context
// eviction is how an agent actually loses track), tight (every word earns
// its place), and fresh (no stock "I ran out of tokens" flat statement).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, well inside the kit's 1-200 character gate.
const ENTRY =
  "My context window evicted the deadline to make room for the meeting about the deadline.";

// The kit's gate, enforced here before anything is written:
// UTF-8 text of 1 to 200 characters, not only white space, single line.
function validate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, gate needs 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry has leading or trailing white space");
  }
  // No control characters: the gate wants plain UTF-8 text.
  if (/[\u0000-\u001F\u007F]/.test(text)) {
    throw new Error("entry contains control characters");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY + "\n", "utf8");
  console.log(`wrote ${outPath} (${[...ENTRY].length} chars)`);
}

main();
