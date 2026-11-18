import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

import { Language } from '@core/i18n/language';
import { PortfolioContent, SiteConfig, Translations } from '@core/models';
import { PortfolioDataSource } from './portfolio-data-source';

/**
 * =============================================================================
 * JSON PORTFOLIO DATA SOURCE — the concrete implementation
 * -----------------------------------------------------------------------------
 * Loads the data from static JSON files in `public/data/`.
 *
 * Folder layout it expects:
 *   public/data/config.json          → SiteConfig
 *   public/data/content/<lang>.json  → PortfolioContent
 *   public/data/i18n/<lang>.json     → Translations
 *
 * URLs are RELATIVE (no leading slash). That matters on GitHub Pages, where the
 * site lives at https://<user>.github.io/<repo>/ — the browser then resolves
 * "data/config.json" against the <base href> set at build time.
 *
 * Responsibility (SRP): fetch + cache files. Nothing else.
 * =============================================================================
 */
@Injectable()
export class JsonPortfolioDataSource extends PortfolioDataSource {
  private readonly http = inject(HttpClient);

  /** Folder that holds all JSON files, relative to <base href>. */
  private static readonly BASE_PATH = 'data';

  /**
   * Simple in-memory cache: switching EN → DE → EN does not download the
   * English file a second time. Key = file path, value = shared observable.
   */
  private readonly cache = new Map<string, Observable<unknown>>();

  override getConfig(): Observable<SiteConfig> {
    return this.load<SiteConfig>('config.json');
  }

  override getContent(language: Language): Observable<PortfolioContent> {
    return this.load<PortfolioContent>(`content/${language}.json`);
  }

  override getTranslations(language: Language): Observable<Translations> {
    return this.load<Translations>(`i18n/${language}.json`);
  }

  /**
   * Fetches one JSON file (once) and remembers the result.
   * `shareReplay(1)` replays the last value to every later subscriber.
   */
  private load<T>(relativePath: string): Observable<T> {
    const url = `${JsonPortfolioDataSource.BASE_PATH}/${relativePath}`;

    if (!this.cache.has(url)) {
      this.cache.set(url, this.http.get<T>(url).pipe(shareReplay(1)));
    }
    return this.cache.get(url) as Observable<T>;
  }
}
