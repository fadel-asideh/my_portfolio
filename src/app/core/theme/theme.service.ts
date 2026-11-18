import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

import { KeyValueStorage } from '@core/storage/key-value-storage';

/** The two looks of the site. */
export type Theme = 'light' | 'dark';

/**
 * =============================================================================
 * THEME SERVICE (dark mode 🌙)
 * -----------------------------------------------------------------------------
 * Responsibility: decide light vs. dark and apply it by toggling the `dark`
 * class on <html>. Tailwind's `dark:` variant and the CSS variables in
 * styles.css do the rest — no component needs to know about themes.
 *
 * NOTE: index.html contains a tiny inline script with the same start-up logic,
 * so the correct theme is visible before Angular has even loaded.
 * =============================================================================
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storage = inject(KeyValueStorage);
  private readonly document = inject(DOCUMENT);

  /** Must match the key used in index.html (with the 'portfolio.' prefix). */
  private static readonly STORAGE_KEY = 'theme';

  private readonly _theme = signal<Theme>(this.detectInitialTheme());
  readonly theme = this._theme.asReadonly();

  /** Convenience flag for templates: `@if (theme.isDark()) { 🌙 }` */
  readonly isDark = computed(() => this._theme() === 'dark');

  constructor() {
    effect(() => {
      const theme = this._theme();
      this.document.documentElement.classList.toggle('dark', theme === 'dark');
      this.storage.write(ThemeService.STORAGE_KEY, theme);
    });
  }

  toggle(): void {
    this._theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  private detectInitialTheme(): Theme {
    const saved = this.storage.read(ThemeService.STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    const prefersDark = this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}
