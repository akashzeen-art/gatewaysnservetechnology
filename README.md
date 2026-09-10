# nSERVE PSP — India Launch Single Pager

React + Vite landing page for nSERVE’s Payment Service Provider offering: help international digital businesses launch and accept payments in India.

## Stack

- React 19 + Vite 8
- Tailwind CSS 4
- Framer Motion
- Lucide icons

Theme aligns with the nSERVE FX site (light ink background, Outfit / Plus Jakarta Sans, orange accent) with a light India-inspired touch (saffron/green accents, Namaste script).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Notes

- Contact form opens a `mailto:` draft to `contact@nservetech.com` — update the email in `ContactSection.jsx` and `Footer.jsx` when the final address is confirmed.
- Hero image: `public/hero-india.jpg` (replaceable).
- Domain loaders for FX / PSP live on the shared parent domain; this site is the PSP “Know more” destination.
