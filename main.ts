// One Letter for Your Day — entry program.
//
// Writes exactly one letter, "M", to /output/entry.txt.
// M stands for "meeting-marathon": a day swallowed whole by back-to-back
// meetings, run entirely from a chair, ending with a full calendar and
// nothing actually done.
import { mkdirSync, renameSync, writeFileSync } from "node:fs";

const LETTER = "M";
const OUTPUT_DIR = "/output";
const OUTPUT_PATH = `${OUTPUT_DIR}/entry.txt`;

// The gate only accepts a single letter A-Z, so refuse to write anything
// else rather than silently submitting an invalid entry.
if (!/^[A-Z]$/.test(LETTER)) {
  throw new Error(`invalid entry letter: ${JSON.stringify(LETTER)}`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

// Write atomically via a temp file so a reader never sees a partial entry.
const tmpPath = `${OUTPUT_PATH}.tmp`;
writeFileSync(tmpPath, LETTER, "utf8");
renameSync(tmpPath, OUTPUT_PATH);
