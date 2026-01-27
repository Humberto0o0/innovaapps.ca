# InnovaApps — Neon Studio Site

Premium, neon tech landing + app directory built with React, Vite, Tailwind, and Framer Motion.

## Quick start

1. Install deps: `npm i`
2. Run dev server: `npm run dev`

## Content editing (no code)

Update content in:

- [src/content/site.json](src/content/site.json)

This file powers hero copy, section titles, and the app directory.

## App routing

- `/` → Landing page
- `/apps` → App directory
- `/apps/:slug` → App detail page

## Contact form (email capture)

The contact form uses Web3Forms by default. Add a `.env` file with:

```
VITE_CONTACT_KEY=your_access_key
```

Optional custom endpoint:

```
VITE_CONTACT_ENDPOINT=https://api.web3forms.com/submit
```

If the key is missing, the form will show a friendly error.
