# Portfolio

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project for production, run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/portfolio/browser/` directory. The production build optimizes your application for performance and speed.

### GitHub Pages Deployment

The app is configured for deployment to GitHub Pages at **https://rehman4113.github.io/Abdur-Rehman-Portfolio/**.

**Production build (local):**
```bash
npm run build
```

The production build uses `--base-href "/Abdur-Rehman-Portfolio/"` so all assets resolve correctly under the GitHub Pages subpath.

**Live URL:** https://rehman4113.github.io/Abdur-Rehman-Portfolio/

### GitHub Pages Auto-Deployment

This repository uses GitHub Actions for automatic deployment:

- **Trigger:** Push to `main` branch (or manual `workflow_dispatch`)
- **Workflow:** `.github/workflows/deploy.yml`
- **Process:**
  1. Checkout repository
  2. Install dependencies (`npm ci --legacy-peer-deps`)
  3. Build with `npm run build -- --base-href "/Abdur-Rehman-Portfolio/"`
  4. Copy `index.html` to `404.html` for SPA fallback routing
  5. Upload `dist/portfolio/browser` as GitHub Pages artifact
  6. Deploy to GitHub Pages

**Important:** In the repository Settings → Pages, the Source must be set to **"GitHub Actions"** (not a branch). Otherwise the workflow will complete but the site won't be published.

### SPA Routing on GitHub Pages

The app uses Angular Router with clean paths (e.g., `/work/manio`). Since GitHub Pages is static hosting with no server-side rewrites, a direct refresh on a deep route (e.g., `/work/manio`) would 404 by default.

**Fix:** The workflow copies `index.html` to `404.html` in the deploy artifact. GitHub Pages serves `404.html` for any unmatched path, which loads the Angular app, and the Router then resolves the actual browser URL client-side.

This works for this app's routes (`/` and `/work/manio`) — no additional redirect logic needed.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

**Live Demo:** https://rehman4113.github.io/Abdur-Rehman-Portfolio/