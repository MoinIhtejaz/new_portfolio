# Maheer Ihtejaz Moin — Portfolio

A fast, responsive personal portfolio built with **Vite + React + TypeScript + Tailwind CSS**.
Designed for quant (Jane Street, Optiver) and big-tech (Amazon, Atlassian, Google, Meta) applications.

The look: a dark page with large, tight headlines, one vivid teal accent, dot-matrix numerals for results, a floating pill nav and a dark closing section (tokens in `src/index.css`). Geist for text, Doto for numerals. Page order: hero, results wall, the story (job, competitions, degree), each step with its headline pinned beside the detail card, projects, skills, contact. The entry splash lives in `src/components/CtosIntro.tsx`.

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
  kind: "What it is",
  tone: "blue",               // tag colour: gray blue green pink amber purple teal
  summary: "One line for the card.",
  metric: { value: "42%", label: "the headline result" }, // shown on the card cover
  bullets: ["Point 1", "Point 2"],
  stack: ["Python", "PyTorch"],
  links: [{ label: "GitHub", href: "https://..." }], // optional
  mediaKey: "my-project", // add src/assets/media/my-project.png to show media
}
```

Replace the résumé at `public/Maheer_Ihtejaz_Moin_Resume.pdf` to update the download.

## Deploy

Push to GitHub and import into **Vercel** (zero config — Vite is auto-detected).
Build command: `npm run build` · Output dir: `dist`.
