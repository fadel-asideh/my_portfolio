# 👋 fadel.dev — Personal Portfolio

A bilingual (🇬🇧 English / 🇩🇪 German) portfolio website built with **Angular 22** and **Tailwind CSS 4**.
Simple design, playful details, and built to make visitors smile. 😄

> All content comes from JSON files, so you can update the site **without touching any code**.

---

## ✨ Features

| Feature | Where it lives |
| --- | --- |
| 🌗 **Dark mode**: remembers your choice and follows the OS setting on the first visit | `core/theme/theme.service.ts` |
| 🌍 **Two languages (EN/DE)**: auto-detects the browser language, one-click switch | `core/i18n/` + `public/data/i18n/` |
| 📦 **All data from JSON**: profile, skills, jobs, projects, jokes | `public/data/` |
| 🐞 **Bugsy the mascot**: eyes follow your mouse, grins on hover, falls asleep when you're idle, hands out compliments + confetti on click | `features/hero/mascot/` |
| ⌨️ **Typewriter headline**: cycles through what I build | `shared/ui/typewriter/` |
| 🃏 **Flip cards** with fun facts | `features/about/fun-fact-card/` |
| 🔎 **Project filter** by tech stack | `features/projects/` |
| 😄 **Smile break**: a developer-joke machine with a smile counter | `features/smile-break/` |
| 📋 **Copy e-mail** with confetti | `features/contact/` |
| 🕹️ **Easter egg**: type the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) | `core/fun/easter-egg.service.ts` |
| ♿ **Accessible**: keyboard-friendly, ARIA labels, respects *reduce motion* | everywhere |
| 🚀 **Auto-deploy to GitHub Pages** via GitHub Actions | `.github/workflows/deploy.yml` |

---

## 🚀 Quick start

```bash
npm install        # install dependencies (once)
npm start          # dev server on http://localhost:4200 (opens the browser)
npm run test:ci    # run the unit tests once
npm run build      # production build → dist/my_portfolio/browser
```

Requirements: **Node.js 22+** and npm.

---

## ✏️ Change the content

You only need to edit JSON files. See **[docs/DATA-GUIDE.md](docs/DATA-GUIDE.md)** for every field.

```
public/data/
├── config.json          ← e-mail, GitHub, LinkedIn, optional CV link (same for all languages)
├── content/
│   ├── en.json          ← profile, skills, experience, projects, jokes (English)
│   └── de.json          ← … the same in German
└── i18n/
    ├── en.json          ← small UI texts: menu, buttons, headings (English)
    └── de.json          ← … the same in German
```

💡 A unit test checks that the English and German files have the **same structure**,
so you can't forget to translate something.

---

## 🌐 Deploy to GitHub Pages

1. Make sure the workflow is at `.github/workflows/deploy.yml` (if it's in `setup/`, move it there).
2. Push this project to a GitHub repository (branch `main`).
3. In the repository: **Settings → Pages → Source → GitHub Actions**.
4. Done. Every push to `main` tests, builds and publishes the site.

Details and alternatives: **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**.

---

## 🗂️ Project structure

```
src/app/
├── core/                 # app-wide logic, NO UI
│   ├── models/           # TypeScript interfaces = the shape of the JSON files
│   ├── data/             # PortfolioDataSource (abstraction) + JSON implementation
│   ├── state/            # PortfolioStore: single source of truth (signals)
│   ├── i18n/             # languages, LanguageService, TranslationService
│   ├── theme/            # ThemeService (dark mode)
│   ├── storage/          # KeyValueStorage abstraction over localStorage
│   ├── browser/          # small browser helpers (clipboard, reduced motion)
│   └── fun/              # confetti, toasts, smile counter, easter egg 🎉
├── shared/               # reusable building blocks, no business logic
│   ├── ui/               # icon, section heading, typewriter
│   ├── directives/       # appReveal (scroll animation)
│   ├── pipes/            # `t` translation pipe
│   └── utils/            # accent color → Tailwind class maps
├── layout/               # header, footer, toast outlet, navigation config
├── features/             # one folder per page section
│   ├── hero/  (+ mascot/)
│   ├── about/ (+ fun-fact-card/)
│   ├── skills/
│   ├── experience/
│   ├── projects/ (+ project-card/)
│   ├── smile-break/
│   └── contact/
├── app.ts / app.html     # root component: assembles the sections
└── app.config.ts         # dependency wiring (which class implements which abstraction)
```

Deep dive: **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** · SOLID explained: **[docs/SOLID.md](docs/SOLID.md)**

---

## 🧰 Tech stack

- **Angular 22**: standalone components, signals, zoneless change detection, new control flow (`@if`, `@for`)
- **Tailwind CSS 4**: utility classes plus a small design system in `src/styles.css`
- **Vitest**: unit tests
- **GitHub Actions + GitHub Pages**: CI/CD and hosting
- Zero UI libraries: confetti, icons, mascot and animations are all hand-made

---

## 📚 Documentation

| Document | What's inside |
| --- | --- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Layers, data flow, how the pieces talk to each other |
| [docs/SOLID.md](docs/SOLID.md) | Where and how each SOLID principle is applied |
| [docs/DATA-GUIDE.md](docs/DATA-GUIDE.md) | How to edit content, add a project, add a language |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | GitHub Pages setup, custom domain, troubleshooting |
| [docs/CODING-CONVENTIONS.md](docs/CODING-CONVENTIONS.md) | Naming, file layout, comment style |
| [CHANGELOG.md](CHANGELOG.md) | Version history |

---

Made with ☕, Angular & Tailwind in Fürth.
