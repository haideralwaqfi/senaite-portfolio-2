# SENAITE Portfolio

A professional portfolio site for SENAITE LIMS consulting: training, cloud deployment, medical and industrial lab configuration, high-resolution work screenshots, and Shopify integration overview.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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
