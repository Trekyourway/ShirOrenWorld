# Shir Oren World

## URL structure

- `/` = main umbrella homepage
- `/about`
- `/contact`
- `/ai` = AI world homepage
- `/ai/articles`
- `/ai/learn`
- `/ai/tools`
- `/coaching` = Coaching world homepage
- `/coaching/products/co-work`
- `/coaching/products/90-minutes-out-of-fog`
- `/coaching/articles`
- `/coaching/learn`
- `/coaching/self-check/burnout`
- `/treks` = Treks world homepage
- `/treks/articles`
- `/treks/learn`
- `/treks/solo-hiking`

This repository starts with a content-first route scaffold so the URL structure stays stable as the site grows.

## Build & validation

- `npm run build` — regenerates derived navigation.
- `npm run validate:critical-routes` — enforces no runtime loader patterns (`fetch`, `document.write`) on critical coaching routes.
- `npm test` — runs build + critical-route validation.
