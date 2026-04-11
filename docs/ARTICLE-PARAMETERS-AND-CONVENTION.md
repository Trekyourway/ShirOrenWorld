# Article parameters and convention guide

This file is the single source of truth for future article creation.
It is written for maintainers and future AI assistants.

## Goal
When creating a new article page, all article-specific content should be editable from one central object only.
Everything else in the template should stay stable unless there is a design/system change.

## Folder convention
Published article:
- `pages/coaching/articles/<slug>/index.md`

Draft article:
- `pages/coaching/articles/draft-<slug>/index.md`

Published product:
- `pages/coaching/products/<slug>/index.md`

Draft product:
- `pages/coaching/products/draft-<slug>/index.md`

## Why folder names matter
- folder structure determines world and collection for the site TOC
- folders starting with `draft-` stay online but are excluded from the generated TOC
- the folder slug should be short, stable, and URL-safe

## Single editable object
Every article template should contain one object named `PAGE` at the top of the file.
Only that object should need editing for a normal new page.

## Required PAGE fields
- `pageType` — `article` or `product`
- `slug` — short stable URL slug
- `pageTitle` — browser title
- `eyebrow` — small label above the hero
- `heroTitle` — main H1
- `heroSubtitle` — hero supporting text
- `leadText` — lead card text
- `worldLabel` — e.g. `קואוצ'ינג`
- `collectionLabel` — e.g. `מאמרים` or `מוצרים`
- `breadcrumbMainLabel`
- `breadcrumbMainHref`
- `breadcrumbSectionLabel`
- `breadcrumbSectionHref`
- `breadcrumbCurrentLabel`
- `metaItems` — array of pills under the hero
- `quickNav` — in-page quick navigation array
- `blocks` — all content blocks in order
- `cta` — CTA block data
- `footerNote`

## What each field is for
- `pageTitle` helps browser title and fallback title extraction
- `heroTitle` is the actual visible H1 and should match the article intent
- `slug` supports folder naming and long-term URL stability
- `quickNav` is the internal page TOC
- `blocks` is the page body structure
- `cta` controls the closing conversion block

## Responsive requirement
Every page template should remain mobile-first and responsive.
At minimum:
- viewport meta tag must exist
- buttons stack on small screens
- text sizes shrink appropriately on mobile
- split/two-column blocks collapse to one column on smaller screens
- content width should stay readable without horizontal scrolling

## Recommended workflow for a new article
1. copy the template file
2. create a new folder slug under the correct collection
3. paste the template into `index.md`
4. edit only the `PAGE` object first
5. preview on mobile and desktop
6. keep the folder name without `draft-` only when the page should appear in the site TOC

## Prompt hint for future AI tools
When asking an AI tool to create a new page, say:
- use the existing Shir Oren World article template
- keep all article-specific values inside the single `PAGE` object
- preserve responsive behavior
- preserve the existing block system
- preserve the internal in-page quick navigation
- match the current site convention for folder-based TOC discovery
