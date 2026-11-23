# TeddyPups U.A.E. technical assignment

A responsive recreation of the public TeddyPups reference website for the Insta Biz Web full-stack developer assessment. The project uses Node.js to generate static HTML. CSS and browser JavaScript implement the layouts and interactions.

## Run locally

Node.js 20+ and Python 3 are required for the commands below. The build itself uses only Node's standard library.

```bash
npm run build
npm run check
npm run preview
```

Open http://localhost:4173. The static output is written to `dist/` and can be published at the root of any static web host with directory indexes. No environment variables are needed.

## Push to GitHub

This folder is a local Git repository with the project already committed on `main`. Create an empty repository on GitHub (without a README, `.gitignore`, or license), then run:

```bash
git remote add origin https://github.com/<your-account>/teddypups-assignment.git
git push -u origin main
```

`dist/`, `node_modules/`, `.netlify/`, and `.wrangler/` are ignored, so only the source, tests, and deployment configuration are pushed.

## Deploy to Netlify

Import this repository into Netlify. Select `main` as the production branch and keep the base directory at the repository root. The repository includes `netlify.toml` with `npm run build` as the build command and `dist` as the publish directory. The `.nvmrc` file pins the Node.js build major to 24. No environment variables or framework presets are required.

## Deploy to Cloudflare Pages

The same static `dist/` output is Cloudflare Pages ready. Pages serves each directory's `index.html`, redirects `/puppies/index.html` to `/puppies/`, and uses the generated `404.html` for unknown routes.

### Git integration

This is the direct GitHub to Cloudflare path. After the first connection, every push to `main` builds and deploys automatically, and pushes to other branches create preview deployments.

1. In the Cloudflare dashboard, open **Workers & Pages → Create → Pages → Connect to Git** and pick this repository.
2. Keep the repository root as the project root, name the Pages project `teddypups-assignment` (matching `wrangler.jsonc`), choose **None** as the framework preset, and select `main` as the production branch.
3. Set the build command to `npm run build` and the build output directory to `dist`.
4. Leave environment variables empty and deploy. Cloudflare reads `.nvmrc`, which pins Node.js 24 (supported by the Pages build image); the build uses only Node's standard library.

`wrangler.jsonc` records the Pages project name, the `./dist` output directory, and a compatibility date for Wrangler-based deploys. The project name also determines the default URL, for example `https://teddypups-assignment.pages.dev`.

### Direct upload

```bash
npx wrangler login
npx wrangler pages project create teddypups-assignment
npm run deploy:cloudflare
```

`npm run deploy:cloudflare` builds the site and uploads `dist/` with `wrangler pages deploy`. The build also writes a `_headers` file with frame, MIME-sniffing, referrer, and permissions headers. A custom domain can be attached in the Pages project's **Custom domains** settings.

## Developer contact

Muhammed Hammad S · [Email](mailto:mdhammad2906@gmail.com) · [+91 63697 40522](tel:+916369740522)

## Project structure

| File | Role |
| --- | --- |
| `build.mjs` | Shared layout, page templates, puppy profile routes, static output |
| `wrangler.jsonc` | Cloudflare Pages project name, output directory, and compatibility date |
| `src/data.mjs` | Catalog, archive, profile media, FAQ, and adoption steps |
| `src/families.mjs` | 64 family gallery entries and featured selections |
| `src/style.css` | Page styles and responsive layouts |
| `src/client.js` | Filters, FAQ search, tabs, mobile navigation, media viewers, and enquiry draft |
| `test/site.test.mjs` | Route integrity, gallery counts, and cross-page link checks |

## Review paths

- **Puppies**. Combine origin, breed, and sex filters. The query string stores the selection.
- **Max's profile**. Switch between photo and video, open the lightbox, and try the enquiry form.
- **Happy families**. Open a photo and move using the arrow keys. Press Escape to close.
- **How it works**. Switch between In Dubai and Imported.
- **FAQ**. Search questions and answers, then expand a result.
- **Visit & contact**. Try the required fields and generate a draft without contacting the business.

## Demo boundaries

This project covers the reference site's seven main routes and 42 puppy profile routes. Archive profiles use their listing cover images. Available profiles use the inspected photo and video assets, with some secondary assets omitted. The illustrations and some lower-page layouts differ from the reference.

Reference photographs and video load from the reference host, so a network connection and continued media availability are required. The photo fallback uses the original media URL. Brand assets and media belong to their respective owners. The form validates the enquiry and generates a reviewable email draft. This demo does not use the original site's submission backend or retain enquiry details.

`LOOM-WALKTHROUGH.md` contains the recording outline and AI-use disclosure.
