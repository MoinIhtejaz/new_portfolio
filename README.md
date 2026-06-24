# Maheer Ihtejaz Moin — Portfolio

A fast, responsive personal portfolio built with **Vite + React + TypeScript + Tailwind CSS**.
Designed for quant (Jane Street, Optiver) and big-tech (Amazon, Atlassian, Google, Meta) applications.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs to /dist
npm run preview  # preview the production build
```

## Editing content

**All content lives in one file:** [`src/data/portfolio.ts`](src/data/portfolio.ts).
Add a new project, job, or skill there and the UI updates automatically — no component edits needed.

To add a project, append an object to the `projects` array:

```ts
{
  title: "My New Project",
  subtitle: "What it is",
  category: "Quant",          // Quant | Data Science | Systems | Full-Stack
  featured: true,             // optional
  description: "One-line summary.",
  highlights: ["Point 1", "Point 2"],
  stack: ["Python", "PyTorch"],
  links: [{ label: "GitHub", href: "https://..." }], // optional
}
```

Replace the résumé at `public/Maheer_Ihtejaz_Moin_Resume.pdf` to update the download.

## Deploy

Push to GitHub and import into **Vercel** (zero config — Vite is auto-detected).
Build command: `npm run build` · Output dir: `dist`.
