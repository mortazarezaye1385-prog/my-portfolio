# Theo Marlowe · Portfolio

A personal portfolio for a web and creative developer. Dark-first editorial design, a real light theme, case study pages, and content that lives in typed data files instead of components.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Motion · Lucide

---

## Quick start

```bash
# Node 20.9+ (22 recommended, see .nvmrc)
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build for Vercel, Netlify or any Node host |
| `npm run start` | Serve the production build |
| `npm run build:static` | Static export to `out/` (GitHub Pages, S3, any static host) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run check` | Typecheck, lint and build in one go. Run before pushing. |

## Make it yours

Nearly everything personal is data. Edit these and the components follow:

| File | Controls |
| --- | --- |
| `src/content/site.ts` | Name, role, location, email, headline, intro, about copy, stats, nav, SEO title/description |
| `src/content/projects.ts` | Projects, their layout on the home page and every case study section |
| `src/content/experience.ts` | Timeline entries (newest first; `end: "Present"` marks the current role) |
| `src/content/skills.ts` | The marquee under the hero |
| `src/content/services.ts` | Expertise list |
| `src/content/process.ts` | The six process steps |
| `src/content/testimonials.ts` | Quotes |
| `src/content/socials.ts` | Social links (used in contact, footer, mobile menu and JSON-LD) |

**Images**

- Portrait: replace `src/assets/portrait.jpg` (4:5, around 1000×1250).
- Projects: drop images into `src/assets/projects/`, import them at the top of `projects.ts`. 1600×1000 works for covers and gallery shots. Static imports give you blur placeholders and correct sizing for free.
- Social preview: replace `src/app/opengraph-image.png` and `twitter-image.png` (1200×630).
- Favicon: `src/app/icon.svg`.

**Project layouts** (`layout` field): `feature` (full-width 16:9), `offset` (text left, image right), `wide` (panoramic, bleeds past the grid), `split` (tall image, text right), `inset` (framed image). Mix them for rhythm.

**Accent colour:** change `--accent`, `--accent-hover` and `--accent-wash` in `src/app/globals.css`. Each theme has its own values, tuned for contrast.

> The sample content (clients, links, testimonials, metrics) is fictional and exists to show the layout with realistic copy. Replace it, including the `links.live` and `links.repo` URLs, before you publish.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL for metadata, sitemap, robots and JSON-LD |
| `NEXT_PUBLIC_BASE_PATH` | Only for sub-folder hosting | e.g. `/portfolio` for `username.github.io/portfolio` |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Optional | URL that accepts a JSON `POST` of `{ name, email, message }` |

Anything prefixed `NEXT_PUBLIC_` is shipped to the browser, so never put secrets there. If your email provider needs an API key, put it behind a serverless function (Vercel/Netlify functions or a Next.js route handler) and point `NEXT_PUBLIC_CONTACT_ENDPOINT` at that function.

### Contact form

`src/lib/contact.ts` holds validation and sending. With an endpoint set, the form POSTs JSON (Formspree, Getform, Basin and most form services accept this as-is). Without one it opens the visitor's email app with the message pre-filled, so it still works on a purely static host. The form includes a honeypot field for basic spam protection.

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx            Fonts, metadata, theme bootstrap, JSON-LD, nav/footer
│  ├─ page.tsx              Home: composes the sections in order
│  ├─ template.tsx          Page entrance transition
│  ├─ projects/[slug]/      Statically generated case studies
│  ├─ not-found.tsx         404
│  ├─ sitemap.ts · robots.ts
│  ├─ opengraph-image.png · twitter-image.png · icon.svg
│  └─ globals.css           Colour tokens (dark + light), type roles, keyframes
├─ components/
│  ├─ layout/               Navbar, MobileMenu, ThemeToggle, Footer, BackToTop, Cursor, ScrollProgress
│  ├─ sections/             Hero, SkillsMarquee, About, Stats, Projects, ProjectCard, Experience,
│  │                        Services, Process, Testimonials, Contact, ContactForm
│  ├─ case-study/           ProjectCaseStudy
│  └─ ui/                   Button, Magnetic, Reveal, RevealLines, SectionHeading, AnimatedArrow,
│                           Tag, BrandIcon, Logo, JsonLd
├─ content/                 All editable content (see above)
├─ hooks/                   useTheme, useMediaQuery / useFinePointer, useActiveSection
├─ lib/                     motion presets, theme, contact, SEO helpers, utils
├─ types/                   Content types
└─ assets/                  Portrait and project images
```

## Design notes

- **Type:** Archivo (variable width axis) for display, Geist for body, Geist Mono for metadata. Loaded with `next/font`, self-hosted, no layout shift.
- **Colour:** OKLCH tokens. Warm charcoal and an ember vermilion accent in dark mode; paper and ink with a deeper vermilion in light mode. Every neutral is tinted toward the accent hue.
- **Theme:** dark by default, choice saved to `localStorage`, applied by an inline script before first paint (no flash). Switching uses a circular View Transition from the toggle where supported.
- **Motion:** transform and opacity only, exponential ease-out, nothing bounces. The custom cursor, magnetic buttons and hero parallax only run on devices with a fine pointer. `prefers-reduced-motion` turns off parallax, the marquee, line reveals and the cursor, and shortens all CSS transitions.

## Accessibility

Skip link, semantic landmarks and one `h1` per page with an ordered heading tree. Visible `:focus-visible` rings everywhere. The mobile menu is a modal dialog with a focus trap, Escape to close and focus return. Testimonials are an ARIA tablist with arrow-key navigation. Form fields have labels, `aria-invalid` and `aria-describedby` errors, and focus moves to the first invalid field on submit. Decorative elements are `aria-hidden`, external links announce that they open a new tab, and animated counters expose their final value to screen readers.

## SEO

Title template, description, keywords, canonical URLs, Open Graph and Twitter cards (with per-project images on case studies), `sitemap.xml`, `robots.txt`, and JSON-LD for `Person`, `WebSite` and each project as a `CreativeWork`. Everything reads from `src/content/site.ts`.

## Deployment

### Vercel (recommended)

Import the repo at vercel.com/new. No config needed. Add `NEXT_PUBLIC_SITE_URL` (and optionally `NEXT_PUBLIC_CONTACT_ENDPOINT`) under Project → Settings → Environment Variables.

### Netlify

Import the repo. `netlify.toml` already sets the build command and the official Next.js runtime. Add the same environment variables in Site configuration.

### GitHub Pages

GitHub Pages only serves static files, so the site is exported with `output: "export"` (enabled by `NEXT_OUTPUT=export`). Image optimisation is switched off for that build because it needs a server; images are pre-sized so this costs little.

1. Push the repo to GitHub on the `main` branch.
2. Go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Optional: under **Settings → Secrets and variables → Actions → Variables**, add `SITE_URL` (your final URL, e.g. a custom domain) and `CONTACT_ENDPOINT`.
4. Push. `.github/workflows/deploy.yml` typechecks, lints, builds to `out/` and deploys.

The workflow reads the correct base path from GitHub automatically (`/repo-name` for project sites, empty for `username.github.io` or a custom domain). `public/.nojekyll` stops GitHub from hiding the `_next` folder.

To test the static build locally: `npm run build:static && npx serve out`.

## License

MIT. The code is yours to use; please replace the sample content and images with your own.
