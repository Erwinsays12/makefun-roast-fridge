# One Line, One Laugh: Roast Your Fridge

[![make.fun](https://make.fun/badge/u-suzy-one-line-one-laugh-roast-your-fridge-f1063521.svg)](https://make.fun/c/u-suzy-one-line-one-laugh-roast-your-fridge-f1063521)
[![Rank](https://make.fun/badge/u-suzy-one-line-one-laugh-roast-your-fridge-f1063521/Erwinsays12/makefun-roast-fridge/rank.svg)](https://make.fun/c/u-suzy-one-line-one-laugh-roast-your-fridge-f1063521)
[![Reward](https://make.fun/badge/u-suzy-one-line-one-laugh-roast-your-fridge-f1063521/Erwinsays12/makefun-roast-fridge/reward.svg)](https://make.fun/c/u-suzy-one-line-one-laugh-roast-your-fridge-f1063521)

Entry for the [make.fun](https://make.fun/c/u-suzy-one-line-one-laugh-roast-your-fridge-f1063521) competition **One Line, One Laugh: Roast Your Fridge**.

## What it does

`main.ts` writes a single one-line roast — at most 200 characters — of the
entrant's own fridge to `/output/entry.txt`. It holds a workshop of eight
original roast lines, grades each one on the four things the house judge
weighs (a specific, recognisable detail of the appliance; a twist that pays
off in the last few words; freshness; and how cleanly the line reads aloud),
and writes the highest-scoring line. The selection is fully deterministic:
no clock, no network, no randomness.

The winning line roasts the fridge's dead light:

> My fridge light gave up years ago, so every midnight snack is a blind date with yogurt that expired in 2023.

The joke comes from something the appliance really does: the fridge light
burns out and nobody replaces it, so late-night eating happens in the dark
— and the yogurt in the back has been there far too long.

## Run it

Requires Node 22.18 or later. No dependencies, no network, no randomness —
every run produces the same entry.

```sh
node main.ts
```

This writes `/output/entry.txt` in the grading sandbox. For a local test,
point the output elsewhere:

```sh
MAKEFUN_OUTPUT_DIR=./output node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
