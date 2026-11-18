# 🏛️ Architecture

This document explains **how the app is put together** and **why**.

---

## 1. The big picture

```
┌──────────────────────────────────────────────────────────────────────┐
│  public/data/*.json   (content, translations, config)                │
└──────────────┬───────────────────────────────────────────────────────┘
               │ HTTP (relative URLs → works on GitHub Pages)
┌──────────────▼───────────────────────────────────────────────────────┐
│  PortfolioDataSource  (abstract)                                     │
│     └─ JsonPortfolioDataSource   fetch + cache                       │
└──────────────┬───────────────────────────────────────────────────────┘
               │ Observables
┌──────────────▼───────────────────────────────────────────────────────┐
│  PortfolioStore      state = loading | error | ready                 │
│     reacts to LanguageService.current() → reloads on language switch │
└──────────────┬───────────────────────────────────────────────────────┘
               │ Signals (content(), config(), translations())
┌──────────────▼───────────────────────────────────────────────────────┐
│  App (root)  → hands each section ONLY the data it needs              │
│     ├─ HeroComponent        [content]                                │
│     ├─ AboutComponent       [about]                                  │
│     ├─ SkillsComponent      [groups]                                 │
│     ├─ ExperienceComponent  [jobs]                                   │
│     ├─ ProjectsComponent    [projects]                               │
│     ├─ SmileBreakComponent  [jokes]                                  │
│     └─ ContactComponent     [config]                                 │
└──────────────────────────────────────────────────────────────────────┘
```

**Data flows one way:** JSON → data source → store → root → sections.
No section fetches data or changes the store.

---

## 2. Layers (folders)

| Layer | Folder | Rule |
| --- | --- | --- |
| **Core** | `src/app/core/` | App-wide services and models. **No components.** |
| **Shared** | `src/app/shared/` | Reusable UI pieces with **no business knowledge** (icon, heading, typewriter, `t` pipe). |
| **Layout** | `src/app/layout/` | The page frame: header, footer, toasts, navigation config. |
| **Features** | `src/app/features/` | One folder per page section. May use `core` and `shared`, **never another feature**. |

Dependency direction: `features → shared → core`, `layout → shared → core`.
`core` never imports from the other layers.

Path aliases (`tsconfig.json`) keep imports short and show the layer at a glance:

```ts
import { PortfolioStore } from '@core/state/portfolio.store';
import { IconComponent } from '@shared/ui/icon/icon.component';
```

---

## 3. Key building blocks

### 3.1 `PortfolioDataSource` (core/data)
An **abstract class** that says *what* data exists (`getConfig`, `getContent`, `getTranslations`),
not *where* it comes from. `JsonPortfolioDataSource` is today's implementation.
Swapping to an API or a CMS is a one-line change in `app.config.ts`.

### 3.2 `PortfolioStore` (core/state)
The single source of truth. It turns the current language into a loaded state:

```ts
language signal ──toObservable──► switchMap(loadAll) ──toSignal──► state signal
```

- `switchMap` cancels a request still running if the language changes again.
- On a language switch the old content stays visible until the new one arrives (no flicker).
- `retry()` reloads after an error.

### 3.3 Translations: two kinds of text
| Kind | File | How it's used |
| --- | --- | --- |
| **Content** (long texts, lists) | `content/<lang>.json` | Already translated objects, passed into components via `input()`. |
| **UI strings** (labels, buttons) | `i18n/<lang>.json` | Looked up by key: `{{ 'nav.about' \| t }}`. |

This keeps components free of `if (lang === 'de')` checks.

### 3.4 Theme
`ThemeService` toggles a `dark` class on `<html>`. `styles.css` defines **semantic color tokens**
(`--surface`, `--card`, `--ink`, `--muted`, `--line`) that switch values under `.dark`.
Components use `bg-card`, `text-ink`, … and never think about themes.
A tiny inline script in `index.html` applies the saved theme **before** Angular starts (no white flash).

### 3.5 The "fun" services (core/fun)
| Service | Job |
| --- | --- |
| `ToastService` | Queue of short messages (rendered by `ToastOutletComponent`). |
| `ConfettiService` | Dependency-free confetti using the Web Animations API. |
| `SmileCounterService` | Counts smiles, persisted per browser. |
| `EasterEggService` | Konami code → party mode. |
| `console-greeting.ts` | A hello for developers who open DevTools. |

All animations check `MotionPreferenceService` and stay calm for visitors who prefer reduced motion.

---

## 4. Component conventions

- **Standalone** components with `ChangeDetectionStrategy.OnPush`.
- **Signals** for state (`signal`, `computed`), **`input()`** for data from the parent.
- **Presentational sections**: feature components get data through inputs and don't inject the store.
  That makes them predictable and easy to test.
- Section templates live in separate `.html` files. Tiny shared components keep inline templates.
- Templates use the built-in control flow: `@if`, `@for`, `@switch`, `@let`.

---

## 5. Change detection: zoneless

The app runs **without zone.js** (`ng new --zoneless`). Angular re-renders when a **signal** read
by a template changes, or after a template event. That's why all state is in signals.

---

## 6. Styling system

`src/styles.css` is the whole design system:

1. Tailwind import + `dark:` variant bound to the `.dark` class
2. Semantic tokens for light and dark
3. Fonts, accent palette, named animations (`animate-wave`, `animate-float`, …)
4. Reusable utilities: `sticker`, `sticker-hover`, `btn`, `icon-btn`, `chip`
5. Scroll-reveal, party mode, reduced-motion safety net

Accent colors coming from JSON (`"accent": "mint"`) are mapped to full class names in
`shared/utils/accent-classes.ts`, because Tailwind only generates classes it can find written out
in full in the source code.
