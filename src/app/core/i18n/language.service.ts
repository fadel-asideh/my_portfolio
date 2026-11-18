import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

import { KeyValueStorage } from '@core/storage/key-value-storage';
import { DEFAULT_LANGUAGE, Language, SUPPORTED_LANGUAGES, isLanguage } from './language';

/**
 * =============================================================================
 * LANGUAGE SERVICE
 * -----------------------------------------------------------------------------
 * Knows WHICH language is active. That is its only job (SRP) — it does not
 * load files or translate text; other services react to its `current` signal.
 *
 * Start-up order of preference:
 *   1. what the visitor picked last time (saved in storage)
 *   2. the browser language (a German browser gets German)
 *   3. DEFAULT_LANGUAGE
 * =============================================================================
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly storage = inject(KeyValueStorage);
  private readonly document = inject(DOCUMENT);

  private static readonly STORAGE_KEY = 'language';

  /** All languages, e.g. for rendering the switcher buttons. */
  readonly available = SUPPORTED_LANGUAGES;

  /** Private writable signal; the outside world only gets a read-only view. */
  private readonly _current = signal<Language>(this.detectInitialLanguage());
  readonly current = this._current.asReadonly();

  constructor() {
    // Whenever the language changes: remember it and update <html lang="…">
    // (screen readers and search engines use that attribute).
    effect(() => {
      const language = this._current();
      this.storage.write(LanguageService.STORAGE_KEY, language);
      this.document.documentElement.lang = language;
    });
  }

  /** Switch to a specific language. */
  use(language: Language): void {
    this._current.set(language);
  }

  /** Cycle to the next language (EN → DE → EN …). Used by the toggle button. */
  toggle(): void {
    const index = this.available.indexOf(this._current());
    this._current.set(this.available[(index + 1) % this.available.length]);
  }

  private detectInitialLanguage(): Language {
    const saved = this.storage.read(LanguageService.STORAGE_KEY);
    if (isLanguage(saved)) {
      return saved;
    }

    // "de-DE" → "de"
    const browserLanguage = this.document.defaultView?.navigator.language?.slice(0, 2);
    return isLanguage(browserLanguage) ? browserLanguage : DEFAULT_LANGUAGE;
  }
}
