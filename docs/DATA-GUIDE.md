# ✏️ Data guide: edit the site without touching code

Everything you see on the page comes from `public/data/`. The TypeScript interfaces in
`src/app/core/models/` describe every field. If you're unsure about one, look there.

> ⚠️ **Always edit the English and German file together.**
> `npm run test:ci` fails if their structure differs, so you'll know if you forgot one.

---

## 1. `config.json`: same for every language

```jsonc
{
  "email": "you@example.com",
  "cvUrl": "",
  "socialLinks": [
    { "icon": "github", "label": "GitHub", "url": "https://github.com/you" }
  ]
}
```

| Field | Meaning |
| --- | --- |
| `email` | Shown in the contact section (copy button + mailto link). |
| `cvUrl` | Optional. Put a PDF in `public/` (e.g. `public/cv.pdf`) and set `"cvUrl": "cv.pdf"` to show a download button. Empty hides the button. |
| `socialLinks[].icon` | `github`, `linkedin` or `mail` (icons from `icon-registry.ts`). |

---

## 2. `content/<lang>.json`: the page content

| Section | Key | Notes |
| --- | --- | --- |
| Hero | `profile` | `rotatingWords` feed the typewriter. |
| Hero stats | `stats[]` | `value`, `label`, `emoji`. |
| About | `about.paragraphs[]`, `about.funFacts[]`, `about.languages[]` | `percent` (0–100) sets the bar width. |
| Toolbox | `skillGroups[]` | `accent`: `sun` · `coral` · `mint` · `sky` · `grape`. |
| Experience | `experience[]` | Newest first. `period` is free text. |
| Projects | `projects[]` | See below. |
| Smile break | `jokes[]` | `setup` + `punchline`. |
| Mascot | `compliments[]` | Shown when someone clicks Bugsy. |

### Add a project

Copy an existing entry in **both** `en.json` and `de.json`, then change it:

```jsonc
{
  "id": "my-new-project",          // unique, same in EN and DE
  "name": "My New Project",
  "tagline": "One short line",
  "context": "Personal project",
  "period": "01/2027 – 03/2027",
  "role": "Everything 🙂",
  "description": "A few sentences …",
  "highlights": ["What I did #1", "What I did #2"],
  "stack": ["Angular", "Tailwind"],
  "category": "typescript",        // dotnet | python | typescript
  "emoji": "🧪",
  "accent": "grape",
  "link": "https://github.com/…",  // optional; omit for private code
  "metrics": [                     // optional
    { "value": "100%", "label": "fun", "emoji": "🎉" }
  ]
}
```

New **category**? Add it to `ProjectCategory` in `core/models/portfolio-content.model.ts`
and a label under `projects.filters` in both `i18n` files.

---

## 3. `i18n/<lang>.json`: UI texts

Small texts are grouped by section and used in templates as `{{ 'group.key' | t }}`.
Placeholders use double curly braces:

```jsonc
"counter": "You've collected {{count}} smiles here 😄"
```

A missing key shows the key itself on the page (for example `smile.counter`), so it's easy to spot.

---

## 4. Add a third language (example: Arabic 🇸🇾)

1. `src/app/core/i18n/language.ts` → `SUPPORTED_LANGUAGES = ['en', 'de', 'ar']`
2. Create `public/data/content/ar.json` and `public/data/i18n/ar.json` (copy the English files and translate them).
3. Optional, for right-to-left: in `LanguageService`'s effect, also set
   `document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'`.
4. Extend `content-consistency.spec.ts` to compare the new files too.

The language button cycles through all languages automatically.
