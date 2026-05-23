# SENAITE Portfolio

A professional portfolio site for SENAITE LIMS consulting: training, cloud deployment, medical and industrial lab configuration, high-resolution work screenshots, and Shopify integration overview.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Node.js 20.9+** is required (see `.nvmrc`).

### Developing in WSL (Windows)

If the project lives under `/mnt/c/...` and you use **WSL**, native modules must be installed for **Linux**. After cloning or if you see `lightningcss` / `oxide` errors:

```bash
# In WSL — use Node 20+
nvm use 20   # or: nvm install 20
npm run setup:wsl
npm run dev
```

If you switch back to **Windows PowerShell**, run `npm install` again (or `npm run setup:win`) so Windows native bindings are linked.

Do **not** mix installs: use either WSL or Windows for `npm install`, not both on the same `node_modules` without re-running setup.

## Authentication (admin)

Email/password and Google sign-in with **admin** role for `/admin`.

1. Copy env template and set secrets:

```bash
cp .env.example .env
```

2. Set in `.env`:

- `AUTH_SECRET` — random string (`openssl rand -base64 32`)
- `AUTH_URL` — `http://localhost:3000` (or your domain)
- `ADMIN_EMAIL` — your email (gets `ADMIN` role on register or Google sign-in)
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — optional; from [Google Cloud Console](https://console.cloud.google.com/apis/credentials) with redirect `http://localhost:3000/api/auth/callback/google`

3. Initialize database and optional admin password:

```bash
npm run db:push
npm run db:seed
```

4. Open `/register` or `/login`, or use **Continue with Google**.

Routes:

| Path | Access |
|------|--------|
| `/login`, `/register` | Public |
| `/admin` | `ADMIN` role only |

## Customize your content

### 1. Contact & identity

Edit `src/data/site.ts`:

- `name`, `title`, `tagline`
- `email`, `linkedin`, `github`, `location`

### 2. Services & projects

Edit `src/data/portfolio.ts`:

- `portfolioItems` — add/remove projects
- `services`, `shopifyIntegration`, `processSteps`

### 3. Screenshots (high resolution)

1. Export screenshots from your SENAITE / cloud / Shopify work (PNG or WebP, **1920px wide** recommended).
2. Save to `public/screenshots/`:
   - Thumbnail: ~800×500 (e.g. `my-project-thumb.webp`)
   - Full size: ~1920×1080 (e.g. `my-project-full.webp`)
3. Update each item in `portfolioItems`:

```ts
thumbnail: "/screenshots/my-project-thumb.webp",
fullImage: "/screenshots/my-project-full.webp",
```

Placeholder SVGs are included until you add real images.

## Shopify integration (future)

This site **describes** Shopify + SENAITE integration patterns. A live sync requires a separate backend (custom Shopify app or middleware) with:

- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_ADMIN_API_ACCESS_TOKEN`
- Webhook endpoints for `orders/create`, etc.

Do not put secrets in this frontend repo. Scope depends on your catalog, compliance, and sample-registration workflow.

## Deploy

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com), Netlify, or any Node host. Static export is possible if you remove server-only features.

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com)
- `next/image` for optimized gallery images
