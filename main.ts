// One Line, One Laugh: Roast Your Fridge.
//
// This program writes exactly one roast — a single line of at most 200
// characters aimed at the entrant's own fridge — to /output/entry.txt.
//
// How it works: the file holds a workshop of eight original roast lines,
// each graded on the four things the house judge weighs, most important
// first: a specific, recognisable detail of the appliance; a twist that
// pays off in the last few words; freshness (not a joke every fridge owner
// has already heard); and how cleanly the line reads out loud. The line
// with the highest weighted total wins, ties broken by the shorter line,
// and the result is validated (one line, 1-200 characters, about a fridge
// or a phone) before it is written. Everything is fixed and deterministic:
// no clock, no network, no randomness, so every run writes the same entry.
//
// Usage (local test):
//   MAKEFUN_OUTPUT_DIR=./output node main.ts
// In the grading sandbox the output goes to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Roast = {
  /** The roast itself: one line, at most 200 characters. */
  line: string;
  /** 0-5: does it mock one specific, recognisable detail of the appliance? */
  detail: number;
  /** 0-5: does the last few words turn the line with a surprise or a double meaning? */
  twist: number;
  /** 0-5: does it feel fresh rather than a joke every fridge owner has worn out? */
  freshness: number;
  /** 0-5: does it read cleanly aloud as one line, with no setup that needs a second sentence? */
  flow: number;
};

// Every line below is an original roast of the entrant's own fridge (one
// of a phone, kept as a sparring partner). The joke in each one comes from
// something the appliance really does — a dead light, a humming motor, a
// crisper drawer, an ice maker — never from an insult that would fit
// anything.
const WORKSHOP: Roast[] = [
  {
    line: "My fridge light gave up years ago, so every midnight snack is a blind date with yogurt that expired in 2023.",
    detail: 5,
    twist: 5,
    freshness: 5,
    flow: 5,
  },
  {
    line: "My fridge's crisper drawer is where vegetables go to confess their sins and come back as soup nobody ordered.",
    detail: 5,
    twist: 5,
    freshness: 4,
    flow: 4,
  },
  {
    line: "My fridge hums like it pays rent, but the only thing it ever kept fresh is my disappointment.",
    detail: 4,
    twist: 4,
    freshness: 4,
    flow: 5,
  },
  {
    line: "My fridge is so old its ice maker coughs out cubes like a slot machine paying out in disappointment.",
    detail: 4,
    twist: 4,
    freshness: 3,
    flow: 4,
  },
  {
    line: "My fridge keeps the light on for food it already killed, like a tiny morgue with a welcome mat.",
    detail: 4,
    twist: 4,
    freshness: 4,
    flow: 3,
  },
  {
    line: "My fridge door seal gave up before my diet did, and now the cold escapes faster than my willpower.",
    detail: 4,
    twist: 3,
    freshness: 3,
    flow: 4,
  },
  {
    line: "My phone dies at twenty percent like it has a union contract, then calls itself smart while I carry its charger like life support.",
    detail: 4,
    twist: 4,
    freshness: 4,
    flow: 3,
  },
  {
    line: "My fridge has a shelf of condiments older than my last three relationships, and they are the only ones still sticking around.",
    detail: 4,
    twist: 3,
    freshness: 3,
    flow: 4,
  },
];

// The judge's order of importance, as weights: the specific detail and the
// twist matter most, freshness and flow next.
const WEIGHTS = { detail: 3, twist: 3, freshness: 2, flow: 2 };

function total(roast: Roast): number {
  return (
    roast.detail * WEIGHTS.detail +
    roast.twist * WEIGHTS.twist +
    roast.freshness * WEIGHTS.freshness +
    roast.flow * WEIGHTS.flow
  );
}

function pickWinner(): Roast {
  let best = WORKSHOP[0];
  for (const roast of WORKSHOP.slice(1)) {
    const score = total(roast);
    const bestScore = total(best);
    if (score > bestScore) {
      best = roast;
    } else if (score === bestScore && roast.line.length < best.line.length) {
      best = roast;
    }
  }
  return best;
}

function isValidEntry(line: string): boolean {
  if (line.length < 1 || line.length > 200) return false;
  if (line.trim().length === 0) return false;
  if (line.includes("\n") || line.includes("\r")) return false;
  const target = line.toLowerCase();
  if (!target.includes("fridge") && !target.includes("phone")) return false;
  return true;
}

// A short, safe roast that always passes the gate, used only if the
// workshop's winner somehow fails validation.
const FALLBACK =
  "My fridge hums all night and still lets the milk expire.";

function main(): void {
  const winner = pickWinner();
  const line = isValidEntry(winner.line) ? winner.line : FALLBACK;
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // Write the line exactly, with no trailing newline: one line and nothing else.
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
  console.log(`score=${total(winner)} chars=${line.length}`);
  console.log(line);
}

main();
