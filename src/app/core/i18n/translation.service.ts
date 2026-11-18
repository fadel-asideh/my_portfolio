import { Injectable, inject } from '@angular/core';

import { Translations } from '@core/models';
import { PortfolioStore } from '@core/state/portfolio.store';

/** Values that can be inserted into a text, e.g. { count: 3 } for "{{count}} smiles". */
export type TranslationParams = Readonly<Record<string, string | number>>;

/**
 * =============================================================================
 * TRANSLATION SERVICE
 * -----------------------------------------------------------------------------
 * Turns a key like "nav.about" into the text for the active language.
 *
 *   translate('smile.counter', { count: 3 })
 *   // JSON: "smile": { "counter": "{{count}} smiles so far" }
 *   // →     "3 smiles so far"
 *
 * If a key is missing, the key itself is returned — the page never crashes
 * and the missing text is easy to spot while developing.
 *
 * It reads the store's `translations` signal, so anything calling it from a
 * template updates automatically when the language changes.
 * =============================================================================
 */
@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly store = inject(PortfolioStore);

  translate(key: string, params?: TranslationParams): string {
    const dictionary = this.store.translations();
    const text = dictionary ? findByPath(dictionary, key) : undefined;

    if (text === undefined) {
      return key;
    }
    return params ? interpolate(text, params) : text;
  }
}

/**
 * Walks a nested object by a dotted path.
 * findByPath({ nav: { about: 'About' } }, 'nav.about') → 'About'
 * Exported so it can be unit-tested on its own.
 */
export function findByPath(dictionary: Translations, path: string): string | undefined {
  let node: string | Translations | undefined = dictionary;

  for (const segment of path.split('.')) {
    if (node === undefined || typeof node === 'string') {
      return undefined;
    }
    node = node[segment];
  }
  return typeof node === 'string' ? node : undefined;
}

/** Replaces every {{name}} placeholder with the matching param value. */
export function interpolate(text: string, params: TranslationParams): string {
  return text.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}
