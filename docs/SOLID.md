# 🧱 SOLID in this project

SOLID is five design principles that keep code easy to change. Here is **where** each one shows up in
this project, with real examples from the code.

---

## S: Single Responsibility Principle
> *A class should have one reason to change.*

Every service does one job:

| Class | Its single job |
| --- | --- |
| `LanguageService` | Know which language is active. |
| `TranslationService` | Turn a key into text. |
| `JsonPortfolioDataSource` | Fetch and cache JSON files. |
| `PortfolioStore` | Combine loaded data into one state. |
| `ThemeService` | Light or dark. |
| `ToastService` | Hold the list of messages. |
| `ToastOutletComponent` | *Draw* the messages. |
| `ConfettiService` | Throw confetti. |
| `ScrollSpyService` | Detect which section is on screen. |

Example: `ToastService` decides *what* to say, `ToastOutletComponent` decides *how it looks*.
Restyling toasts never touches the logic, and vice versa.

---

## O: Open/Closed Principle
> *Open for extension, closed for modification.*

You can extend the app **by adding data, not by editing logic**:

- **New icon** → add one entry in `shared/ui/icon/icon-registry.ts`. `IconComponent` is untouched.
- **New menu item** → add one line in `layout/navigation/nav-items.ts`. Header and scroll-spy pick it up.
- **New language** → add the code to `SUPPORTED_LANGUAGES` and two JSON files. No component changes.
- **New project filter** → use a new `category` in the JSON. Filter buttons are generated from the data.

---

## L: Liskov Substitution Principle
> *A subclass must be usable wherever its parent is expected.*

- `BrowserLocalStorage` and `MemoryStorage` both extend `KeyValueStorage`.
  `ThemeService` works the same with either. The unit tests rely on exactly that.
- Any future `ApiPortfolioDataSource` must return the same Observables as `JsonPortfolioDataSource`,
  so the store keeps working unchanged.

---

## I: Interface Segregation Principle
> *Don't force anyone to depend on things they don't use.*

- Feature components receive **only their slice** of the data:
  `SkillsComponent` gets `SkillGroup[]`, not the whole `PortfolioContent`.
- `KeyValueStorage` has just `read` and `write`, not the entire `Storage` API.
- Models are split by concern: `PortfolioContent`, `SiteConfig`, `Translations`.

---

## D: Dependency Inversion Principle
> *Depend on abstractions, not on concrete classes.*

High-level code depends on **abstract classes**. The concrete choice happens in **one** place:

```ts
// app.config.ts
{ provide: PortfolioDataSource, useClass: JsonPortfolioDataSource },
{ provide: KeyValueStorage,     useClass: BrowserLocalStorage },
```

- `PortfolioStore` only knows `PortfolioDataSource`.
- `ThemeService`, `LanguageService` and `SmileCounterService` only know `KeyValueStorage`.

> Why abstract classes instead of TypeScript interfaces? Interfaces disappear when the code is
> compiled, so Angular can't use them as injection tokens. Abstract classes survive compilation.
