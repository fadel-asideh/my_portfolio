# 📏 Coding conventions

Small rules that keep the codebase easy to read.

## Files and naming

| Thing | Pattern | Example |
| --- | --- | --- |
| Component | `kebab-name.component.ts` (+ `.html` / `.css`) | `project-card.component.ts` |
| Service | `kebab-name.service.ts` | `theme.service.ts` |
| Store | `kebab-name.store.ts` | `portfolio.store.ts` |
| Directive / Pipe | `kebab-name.directive.ts` / `.pipe.ts` | `reveal-on-scroll.directive.ts` |
| Model | `kebab-name.model.ts` | `site-config.model.ts` |
| Unit test | next to the file, `.spec.ts` | `theme.service.spec.ts` |
| Selector prefix | `app-` | `<app-project-card>` |

One component per folder. A child that only one feature uses lives **inside** that feature's
folder (e.g. `features/hero/mascot/`).

## TypeScript

- `inject()` instead of constructor parameters.
- `readonly` wherever possible. Models are fully `readonly`.
- Private writable signal + public read-only view:
  ```ts
  private readonly _theme = signal<Theme>('light');
  readonly theme = this._theme.asReadonly();
  ```
- `protected` for members used only by the component's own template.
- Constants as `private static readonly UPPER_CASE`.
- No `any`. Prefer union types (`'light' | 'dark'`) over plain strings.

## Templates

- Built-in control flow: `@if`, `@for` (always with `track`), `@switch`, `@let`.
- Decorative emojis and SVGs get `aria-hidden="true"`; icon-only buttons get an `aria-label`.
- Repeated class combinations become a utility in `styles.css` (`sticker`, `btn`, `chip`, …).

## Comments

Every file starts with a **header block** explaining *what it is* and *why it exists*:

```ts
/**
 * =============================================================================
 * NAME
 * -----------------------------------------------------------------------------
 * What it does, why it exists, anything surprising.
 * =============================================================================
 */
```

Inside the code, comment the **why**, not the what:

```ts
// ✅ Passive listener = the browser never waits for us while scrolling.
// ❌ Add a scroll listener.
```

## Formatting

Prettier is configured (`.prettierrc`). Run `npm run format` before committing.
