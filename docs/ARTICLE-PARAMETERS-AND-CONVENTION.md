# Article parameters and convention guide

This file is the single source of truth for future article creation.
It is written for maintainers and future AI assistants.

## Site vision / implementation / management

### Vision
- The site is divided into worlds (for example: AI, Coaching, Treks).
- Each world owns its own collections (for example: articles, learn, tools, products).
- New content should be created from one stable template and one editable object only (`PAGE`).

### Implementation split (what is controlled where)
- `data/site-shell.variables.json` controls shared labels and reusable world/article metadata (UI text, naming, identity).
- `data/navigation.generated.json` is generated output and should **not** be edited manually.
- `build/generate-navigation-from-config.js` defines how navigation is generated from structure + metadata.
- The article file itself defines page content through one `PAGE` object.

### Management rules
- Do not hardcode article identity values across multiple places.
- Every new article must provide identity fields in `PAGE`.
- Global article numeric id is always 4 digits and globally unique across the site.
- Article code letters represent a catalog/series/topic and can evolve over time.

## Folder convention
Published article:
- `<world>/articles/<slug>/index.html`

Draft article:
- `<world>/articles/draft-<slug>/index.html`

## Why folder names matter
- folder structure determines world and collection for generated navigation
- folders starting with `draft-` stay online but are excluded from generated navigation
- the folder slug should be short, stable, and URL-safe

## Single editable object
Every article template should contain one object named `PAGE` at the top of the file.
Only that object should need editing for a normal new page.

## Required PAGE fields
Core page fields:
- `pageType` — `article` or `product`
- `slug` — short stable URL slug
- `pageTitle` — browser title
- `navTitle` — title used in generated navigation
- `eyebrow`
- `heroTitle`
- `heroSubtitle`
- `leadText`

Identity fields (mandatory for all new articles):
- `articleNumber` — **4 digits**, globally unique across the entire site (e.g. `0042`)
- `versionLabel` — explicit version (e.g. `V1`, `V2`)
- `articleCode` — code with letters/digits where letters represent a series/catalog/topic (e.g. `AIA-0042`)
  - `articleCode` is **not** a replacement for `articleNumber`; it is a catalog/series marker.
  - `articleNumber` remains the numeric global identifier.

Navigation/breadcrumb fields:
- `worldLabel`
- `collectionLabel`
- `breadcrumbMainLabel`
- `breadcrumbMainHref`
- `breadcrumbSectionLabel`
- `breadcrumbSectionHref`
- `breadcrumbCurrentLabel`

Content fields:
- `metaItems`
- `quickNav`
- `blocks`
- `cta`
- `footerNote`

## Fixed footer identity block
Every article must show a fixed identity block near the footer:
- `מאמר <articleCode>-<articleNumber>` (or equivalent local display rule)
- `גרסה <versionLabel>`

Example:
- `מאמר A-0042`
- `גרסה V2`

This supports:
- fast article lookup
- error reporting by article id
- safe version updates without ambiguity

## Generator and navigation expectations
- Generator should prefer `PAGE.navTitle` for navigation labels.
- Generator should consume article identity fields from the same source-of-truth path.
- No duplicated hardcoded navigation labels per-page.
- No manual editing of generated navigation output.

## Responsive requirement
Every article template should remain mobile-first and responsive.
At minimum:
- viewport meta tag must exist
- buttons stack on small screens
- text sizes shrink appropriately on mobile
- split/two-column blocks collapse to one column on smaller screens
- content width should stay readable without horizontal scrolling

## Prompt for any AI (copy/paste)
Use this prompt when asking any AI model to create a new article page:

"Create one article file compatible with Shir Oren World single-object convention.
Use one `PAGE` object as the only editable content source.
Do not hardcode article identity values outside `PAGE`.
Provide all required fields:
`pageType`, `slug`, `pageTitle`, `navTitle`, `articleNumber` (4 digits, globally unique), `versionLabel`, `articleCode`,
`eyebrow`, `heroTitle`, `heroSubtitle`, `leadText`,
`worldLabel`, `collectionLabel`, breadcrumb fields,
`metaItems`, `quickNav`, `blocks`, `cta`, `footerNote`.
Keep output mobile-first and responsive.
Do not add duplicate static navigation markup.
If a side/quick TOC is needed, derive it from `quickNav`/headings and keep compatibility with the generator/shell pipeline."

## Recommended workflow for a new article
1. Copy the template file.
2. Create a new folder slug under the correct world/collection.
3. Paste the template into `index.html` under the target world/article slug path.
4. Fill **only** `PAGE` first, including identity fields (`articleNumber`, `versionLabel`, `articleCode`, `navTitle`).
5. Validate mobile + desktop.
6. Run the generation/build flow.
7. Publish (remove `draft-`) only when ready for navigation.
