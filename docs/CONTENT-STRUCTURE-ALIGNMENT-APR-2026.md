# Content structure alignment note · April 2026

This note resolves the current mismatch between the old public-content convention and the newer single-object article convention.

## Current mismatch
There are now two conventions in the repository:

1. Legacy published content under public routes such as:
- `coaching/articles/<slug>/index.html`

2. New source convention under:
- `pages/coaching/articles/<slug>/index.md`

The route shells and newer article template expect the `pages/...` convention.
The original build command in `package.json` still points to the older generator.

## What was added
To bridge the gap safely without editing old files in place:

- new article source mirror:
  - `pages/coaching/articles/perfectionism-research-meaning-and-outcomes/index.md`
- new unified generator:
  - `build/generate-site-toc-v3.js`

## What the v3 generator does
- scans the newer `pages/.../index.md` convention first
- falls back to legacy public `.../index.html` files when no `pages/...` source exists for the same slug
- keeps excluding folders starting with `draft-`
- keeps writing output to:
  - `data/toc.generated.json`

## Recommended build command for production
Use:

```bash
node build/generate-site-toc-v3.js
```

Or change the package script later to point `build:toc` to the v3 file.

## Recommended rule going forward
For every new article:

1. keep the canonical editable source in:
- `pages/<world>/<collection>/<slug>/index.md`

2. if the current deployment still needs a public mirrored HTML file under the legacy route tree,
   keep the legacy file only as a route-facing compatibility layer.

## Why this matters
Without a single convention:
- TOC generation can miss content
- future AI edits may target the wrong source file
- maintainers may update one copy and forget the other

## Practical next cleanup step
A future cleanup pass should do one of these, not both:

### Option A
Make `pages/.../index.md` the single source of truth and adjust deployment accordingly.

### Option B
Revert fully to legacy `.../index.html` pages and remove the newer mixed convention.

Option A is cleaner and is more aligned with the single `PAGE` object workflow.
