# Abdur Rehman — Portfolio

A personal portfolio for Abdur Rehman, built with React, TypeScript and Vite. It features selected projects, work experience, expertise, education, contact details and a dedicated Manio case study.

## Local development

```bash
npm ci
npm run dev
```

Vite serves the site under `/Abdur-Rehman-Portfolio/` to match GitHub Pages. To check the production output:

```bash
npm run build
npm run preview
```

## Deployment

The GitHub Actions workflow builds on pushes to `main` and publishes `dist/` to GitHub Pages. It copies `index.html` to `404.html` so a direct visit to `/work/manio` can load the React app. GitHub Pages must be configured with **GitHub Actions** as its source.

Live URL: https://rehman4113.github.io/Abdur-Rehman-Portfolio/

## Editing content

Portfolio facts are in `src/data/`; images and the PDF résumé are in `public/assets/`. The homepage and Manio case study are in `src/App.tsx`, with design tokens and responsive styles in `src/styles.css`.
