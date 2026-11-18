import { Injectable, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';

import { PortfolioDataSource } from '@core/data/portfolio-data-source';
import { Language } from '@core/i18n/language';
import { LanguageService } from '@core/i18n/language.service';
import { PortfolioContent, SiteConfig, Translations } from '@core/models';

/**
 * Everything the page needs, bundled, plus a status flag.
 * A "discriminated union": checking `status` tells TypeScript which fields exist.
 */
export type PortfolioState =
  | { readonly status: 'loading' }
  | { readonly status: 'error' }
  | {
      readonly status: 'ready';
      readonly config: SiteConfig;
      readonly content: PortfolioContent;
      readonly translations: Translations;
    };

/**
 * =============================================================================
 * PORTFOLIO STORE — the app's single source of truth
 * -----------------------------------------------------------------------------
 * Flow:   LanguageService.current ──► load JSON files ──► state signal ──► UI
 *
 * When the visitor switches language, `switchMap` cancels any request still
 * in flight and loads the files for the new language. The previous content
 * stays on screen until the new one arrives (no flicker).
 *
 * Components read ready-made signals such as `content()` or `config()` and
 * never deal with HTTP, caching or languages themselves.
 * =============================================================================
 */
@Injectable({ providedIn: 'root' })
export class PortfolioStore {
  private readonly dataSource = inject(PortfolioDataSource);
  private readonly language = inject(LanguageService);

  /** Bumped by `retry()` to force a fresh load after an error. */
  private readonly attempt = signal(0);

  /** What should be loaded right now: the language (+ attempt number). */
  private readonly request = computed(() => ({ language: this.language.current(), attempt: this.attempt() }));

  /** The full state, re-computed on every language change (or retry). */
  readonly state = toSignal(
    toObservable(this.request).pipe(switchMap(({ language }) => this.loadAll(language))),
    { initialValue: { status: 'loading' } as PortfolioState },
  );

  // ---- Convenience selectors (null while not ready) -------------------------

  readonly isReady = computed(() => this.state().status === 'ready');
  readonly hasError = computed(() => this.state().status === 'error');

  readonly content = computed(() => {
    const state = this.state();
    return state.status === 'ready' ? state.content : null;
  });

  readonly config = computed(() => {
    const state = this.state();
    return state.status === 'ready' ? state.config : null;
  });

  readonly translations = computed(() => {
    const state = this.state();
    return state.status === 'ready' ? state.translations : null;
  });

  /** Try loading again (used by the "Try again" button on the error screen). */
  retry(): void {
    this.attempt.update((n) => n + 1);
  }

  /** Loads the three JSON files in parallel and combines them into one state. */
  private loadAll(language: Language): Observable<PortfolioState> {
    return forkJoin({
      config: this.dataSource.getConfig(),
      content: this.dataSource.getContent(language),
      translations: this.dataSource.getTranslations(language),
    }).pipe(
      map((data): PortfolioState => ({ status: 'ready', ...data })),
      catchError((error: unknown) => {
        console.error('[PortfolioStore] Could not load portfolio data', error);
        return of<PortfolioState>({ status: 'error' });
      }),
    );
  }
}
