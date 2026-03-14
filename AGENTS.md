# Environment

## Installed Packages

Dependencies:
- `@base-ui/react` (^1.0.0)
- `@phosphor-icons/react` (^2.1.10)
- `framer-motion` (^12.36.0)
- `next` (^15.3.3)
- `react` (^19.1.0)
- `react-dom` (^19.1.0)

Dev dependencies:
- `@tailwindcss/postcss` (^4.1.8)
- `tailwindcss` (^4.1.8)
- `typescript` (^5.8.3)

## CSS Setup

`src/app/globals.css` is imported by `src/app/layout.tsx` and **must not be deleted**.
It imports Tailwind CSS — all Tailwind utility classes are available.

If your skill files include token setup instructions (e.g. `tailwind-v4-tokens.md`), follow those exactly. They will tell you what to put in `globals.css` and whether to create a `variables.css`.

## Framework

This is a **Next.js** app using the App Router (`src/app/`).
The dev server runs automatically — just edit files and they hot-reload.
