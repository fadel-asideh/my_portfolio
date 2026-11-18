import { Injectable } from '@angular/core';

/**
 * =============================================================================
 * KEY-VALUE STORAGE
 * -----------------------------------------------------------------------------
 * A tiny abstraction over `localStorage`.
 *
 * Why not call localStorage directly in every service?
 *   - It can THROW (Safari private mode, blocked cookies, iframes …).
 *     All the try/catch lives here, once.
 *   - Services depend on this abstraction (Dependency Inversion), so unit tests
 *     can swap in `MemoryStorage` without touching the browser.
 *   - All keys get the same prefix, so we never clash with other sites/apps.
 * =============================================================================
 */
export abstract class KeyValueStorage {
  abstract read(key: string): string | null;
  abstract write(key: string, value: string): void;
}

/** Production implementation backed by the browser's localStorage. */
@Injectable()
export class BrowserLocalStorage extends KeyValueStorage {
  private static readonly PREFIX = 'portfolio.';

  override read(key: string): string | null {
    try {
      return localStorage.getItem(BrowserLocalStorage.PREFIX + key);
    } catch {
      return null; // storage unavailable → behave like "nothing saved yet"
    }
  }

  override write(key: string, value: string): void {
    try {
      localStorage.setItem(BrowserLocalStorage.PREFIX + key, value);
    } catch {
      // storage unavailable → the preference just won't survive a reload
    }
  }
}

/** In-memory implementation — handy for unit tests. Forgets everything on reload. */
export class MemoryStorage extends KeyValueStorage {
  private readonly data = new Map<string, string>();

  override read(key: string): string | null {
    return this.data.get(key) ?? null;
  }

  override write(key: string, value: string): void {
    this.data.set(key, value);
  }
}
