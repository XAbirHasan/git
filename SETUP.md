# VitePress Site Setup

How to run, customize, and deploy this Git documentation site locally.

## Getting Started

This project uses **pnpm** (see `pnpm-lock.yaml` and the `packageManager` field in `package.json`), not npm, using npm instead would create a conflicting lockfile.

```bash
pnpm install
pnpm run docs:dev       # dev server at http://localhost:5173
pnpm run docs:build     # outputs to docs/.vitepress/dist
pnpm run docs:preview   # serve the production build locally
```

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds and deploys automatically on every push to `master`. You just need to point GitHub Pages at it, once: **Settings → Pages → Source → GitHub Actions**. Push, then watch the **Actions** tab for the deployment.

For manual deployment instead, run `pnpm run docs:build` and upload `docs/.vitepress/dist` to any static host.

## Customization

**Base URL**, if you fork this and the repo name isn't `git`:
```typescript
// docs/.vitepress/config.mts
export default defineConfig({
  base: '/your-repo-name/',
})
```

**Theme colors** live in `docs/.vitepress/theme/custom.css` (the `--vp-c-brand-*` properties), not in `config.mts`.

**Adding a page:** create the `.md` file, then add it to `sidebar` in `config.mts`.

## Troubleshooting

**Build errors:** `rm -rf node_modules && pnpm install`. Still broken? Also clear `docs/.vitepress/cache`.

**GitHub Pages not updating:** check Settings → Pages → Source is actually set to GitHub Actions. The workflow declares its own `permissions` block, so the repo-wide "Workflow permissions" setting under Settings → Actions → General doesn't matter here.

**Port in use:** `pnpm run docs:dev -- --port 3000`

## Further Reading

- [VitePress documentation](https://vitepress.dev/)
- [GitHub Pages documentation](https://docs.github.com/pages)
