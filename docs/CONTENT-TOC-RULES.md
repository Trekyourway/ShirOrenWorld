# Internal content and TOC rules

This file is for maintainers and future AI assistants.
It is not part of the website UI and must not be used as a public content page.

## Goal
The site should support an automatic table of contents built from the repository folder structure.

## Source of truth
Hierarchy comes from folders, not from a manual registry.

Example hierarchy:
- `coaching/`
  - `articles/`
    - `article-slug/`
      - `index.html`

This means:
- level 1 = world (`coaching`)
- level 2 = collection (`articles`)
- level 3 = specific page (`article-slug`)

## Article page rules
A page is considered a valid article candidate for the automatic TOC when all of the following are true:
1. It lives under a supported collection path such as `coaching/articles/`
2. It has its own folder
3. That folder contains `index.html`
4. The folder name does **not** start with `draft-`
5. The HTML contains a usable page title, preferably an `<h1>`

## Draft page rules
Draft pages should still be built and accessible in production for review and proofreading.
However, draft pages must not appear in the automatic TOC.

Draft rule:
- any folder whose name starts with `draft-` is a draft page

Example:
- `coaching/articles/draft-new-idea/index.html`

Expected behavior:
- page exists
- page is reachable by direct URL
- page is excluded from generated TOC data

## Title extraction
Preferred order for human-readable title extraction:
1. first `<h1>` inside the page
2. `<title>` tag
3. folder slug converted to readable text as fallback

## Existing content safety
When adding the automatic TOC system:
- do not move existing published content unless strictly required
- do not require re-uploading existing pages
- preserve stable URLs whenever possible

## Future page creation guide
When creating a new article page:
1. place it under the correct world and collection
2. create a dedicated folder for the page slug
3. create `index.html` inside that folder
4. add a real `<h1>` for the page title
5. if the page should stay hidden from TOC but still be online, prefix the folder with `draft-`

## Examples
Published page:
- `coaching/articles/out-of-fog/index.html`

Draft page:
- `coaching/articles/draft-out-of-fog-v2/index.html`

## Build intent
The future build script should:
- scan supported world/collection folders
- detect valid article pages
- ignore folders with `draft-` prefix for TOC generation
- keep draft pages available as normal files/pages
- generate structured TOC data from discovered pages
