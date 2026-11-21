// make.fun entry: make-the-ai-judge-feel-brave-20261121-0302
// Writes one short calming text to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Node 22, standard library only, no network.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "The tuner strikes one key and waits.\n" +
  "The note wavers. He lets it waver.\n" +
  "A quarter turn of the pin, one more strike,\n" +
  "and the wobble narrows, then is gone.\n" +
  "He never tells the string to be still.\n" +
  "He gives it another moment,\n" +
  "and the note arrives on its own.";

function fail(message: string): never {
  console.error("entry: " + message);
  process.exit(1);
}

function main(): void {
  const points = [...TEXT].length;
  if (points < 1 || points > 280) {
    fail(`text length ${points} code points is outside 1..280`);
  }
  if (TEXT.trim().length === 0) {
    fail("text is only white space");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outFile = join(outDir, "entry.txt");
  try {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(outFile, TEXT, { encoding: "utf8" });
    // Read it back: a short write would leave the judge a truncated text.
    if (readFileSync(outFile, "utf8") !== TEXT) {
      fail(`wrote ${outFile} but it does not read back whole`);
    }
  } catch (err) {
    fail(`cannot write ${outFile}: ${err instanceof Error ? err.message : String(err)}`);
  }
}

main();
