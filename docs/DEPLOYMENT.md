# 🚀 Deployment: GitHub Pages

## Option A: automatic with GitHub Actions (recommended)

The workflow `.github/workflows/deploy.yml` runs on every push to `main`:

```
npm ci  →  npm run test:ci  →  npm run build:gh-pages  →  publish to Pages
```

### One-time setup

0. **If `.github/workflows/deploy.yml` doesn't exist yet**, move `setup/deploy.yml` there:
   ```powershell
   mkdir .github\workflows
   move setup\deploy.yml .github\workflows\deploy.yml
   ```
1. Create a repository on GitHub, for example `my_portfolio`.
2. Push the project:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-user>/my_portfolio.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open the **Actions** tab and watch the run. When it finishes, the site is live at
   `https://<your-user>.github.io/my_portfolio/`.

> 💡 Want it at `https://<your-user>.github.io/` (no sub-path)? Name the repository
> `<your-user>.github.io`. Nothing else changes.

---

## Why `--base-href ./`?

GitHub Pages serves project sites from a **sub-path** (`/my_portfolio/`).
A relative base href (`./`) makes all files load relative to wherever `index.html` is, so the
same build works for **any** repository name and on a custom domain.

This works because the site is a single page without Angular routing. The JSON files are also
requested with relative URLs (`data/...`) in `JsonPortfolioDataSource`.

---

## Option B: manual deploy from your computer

```bash
npm run build:gh-pages
npx angular-cli-ghpages --dir=dist/my_portfolio/browser
```

This pushes the build to a `gh-pages` branch. In **Settings → Pages**, choose
**Deploy from a branch → gh-pages**.

---

## Custom domain (optional)

1. Add a file `public/CNAME` containing just your domain, e.g. `fadel.dev`.
2. Set the DNS records at your domain provider (see GitHub's docs on custom domains for Pages).
3. In **Settings → Pages**, enter the domain and enable **Enforce HTTPS**.

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Blank page, 404s for `.js` files in the console | You built with `npm run build` instead of `npm run build:gh-pages`. |
| "Oops — the data took a coffee break" | A JSON file is invalid. Paste it into a JSON validator, or run `npm run test:ci`. |
| Workflow fails at "Run unit tests" | The EN/DE files probably differ in structure. The test output shows where. |
| Old version still visible | Hard refresh (`Ctrl+Shift+R`). GitHub's CDN can take a minute. |
| Fonts look plain | Google Fonts is blocked on that network. The site falls back to system fonts. |
