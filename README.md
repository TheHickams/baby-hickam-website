# Baby Hickam

A responsive, single-page announcement site for Baby Hickam, Tyler, and Austin. The site uses a soft watercolor coastal theme, includes a public registry, and conditionally reveals baby-shower details to guests who receive an RSVP query parameter.

## Prerequisites

- Node.js 24 LTS
- npm (included with Node.js)

## Install and run locally

```bash
npm ci
npm run dev
```

Vite prints the local URL in the terminal. To preview the guest version of the page, add any `rsvp` query parameter, for example `http://localhost:5173/?rsvp=invite-code`.

## Build and preview production output

```bash
npm run build
npm run preview
```

The production site is written to `dist/`.

## Quality checks

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

Run `npm run format` to apply Prettier formatting.

## Edit site content

Frequently changed content lives in [`src/config/site.json`](src/config/site.json), including:

- Baby and parent names
- Due date (`YYYY-MM-DD`)
- Babylist registry URL
- Introductory and note copy
- Baby-shower date, time, location, enabled state, and RSVP destination

The app validates required fields when it starts. Invalid configuration produces a detailed console error during local development. Registry and RSVP links accept only `http` and `https` URLs; an empty or invalid URL hides its button.

The pre-due-date treatment remains visible through the configured due date. The following calendar day, the site automatically removes “Expected,” switches to a neutral month/year treatment, and displays `afterDueDateMessage` without claiming the baby has been born.

## GitHub Pages configuration

1. In the GitHub repository, open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Configure the custom domain as `baby.hickam.com` and enable HTTPS once DNS is active.
4. Point the domain DNS at GitHub Pages according to GitHub's current custom-domain instructions.

The committed `.env` uses `/` as the Vite base path and `https://baby.hickam.com` as the canonical URL. For a project Pages deployment at `https://USERNAME.github.io/REPOSITORY/`, set these values in the workflow before the build:

```bash
VITE_BASE_PATH=/REPOSITORY/ VITE_PUBLIC_SITE_URL=https://USERNAME.github.io/REPOSITORY npm run build
```

This keeps the repository path configurable in one environment variable instead of scattering it through the application.

## Release and deployment

CI validates every push to `main` and every pull request targeting `main`; it never deploys. Production deployment runs only for a semantic release tag (or a manual recovery run):

```bash
git tag v1.0.0
git push origin v1.0.0
```

The release workflow checks formatting, linting, types, tests, and the production build before uploading `dist/` with the official GitHub Pages actions.

## RSVP-gating limitation

The baby-shower card appears only when the URL includes the `rsvp` query parameter, such as `?rsvp=LONG_RANDOM_CODE`. The parameter's value can be any string, including an empty string. This is client-side presentation gating on a static website, not authentication: it discourages casual discovery but cannot protect sensitive information from a determined visitor. Do not put private or sensitive information in the configuration or deployment bundle.

## Artwork

The production page uses the original project artwork in `baby-hickam-artwork/`. Essential names, messages, dates, and controls remain semantic HTML; illustrations are decorative and can fail to load without affecting comprehension.
