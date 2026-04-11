# Automatic TOC integration guide

## What was added
- `package.json` with `build:toc`
- `build/generate-toc.js`
- `assets/js/auto-toc.js`
- `docs/CONTENT-TOC-RULES.md`

## How the build works
The build script scans these collection roots when they exist:
- `coaching/articles/`
- `ai/articles/`
- `treks/articles/`

For each folder directly inside those collections:
- it looks for `index.html`
- it extracts a title from `<h1>` or `<title>`
- it checks that the page has meaningful content
- it excludes folders whose names start with `draft-` from the generated TOC
- it still leaves draft pages as normal files/pages in the repository

The generated output file is:
- `data/toc.generated.json`

## Draft behavior
Example draft folder:
- `coaching/articles/draft-example/index.html`

Expected result:
- page can still exist online
- page will not appear in the automatic TOC

## How to render the TOC in a page
1. include the client-side script:

```html
<script src="/assets/js/auto-toc.js" defer></script>
```

2. add a mount point where the TOC should appear:

```html
<nav data-auto-toc></nav>
```

## Build command
```bash
npm run build:toc
```

## Important limitation
The build script currently scans one level of article folders directly under each collection.
Example supported shape:
- `coaching/articles/my-article/index.html`

Not currently supported:
- `coaching/articles/category/my-article/index.html`

## Safety
This system does not require moving existing content.
It is designed to work with the existing URL-first folder structure.
