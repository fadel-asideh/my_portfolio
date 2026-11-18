import { Observable } from 'rxjs';

import { Language } from '@core/i18n/language';
import { PortfolioContent, SiteConfig, Translations } from '@core/models';

/**
 * =============================================================================
 * PORTFOLIO DATA SOURCE — the abstraction (Dependency Inversion Principle)
 * -----------------------------------------------------------------------------
 * The rest of the app only knows THIS abstract class, never *where* the data
 * comes from. Today it is JSON files (`JsonPortfolioDataSource`); tomorrow it
 * could be a headless CMS or a REST API — you would write a new class that
 * extends this one and change ONE line in `app.config.ts`.
 *
 * Why an abstract class and not an interface?
 * Interfaces disappear when TypeScript compiles, so Angular cannot use them as
 * injection tokens. An abstract class survives compilation and can be injected.
 * =============================================================================
 */
export abstract class PortfolioDataSource {
  /** Language-independent settings (links, e-mail …). */
  abstract getConfig(): Observable<SiteConfig>;

  /** All page content (profile, projects, …) in the given language. */
  abstract getContent(language: Language): Observable<PortfolioContent>;

  /** Small UI strings (menu, buttons, headings) in the given language. */
  abstract getTranslations(language: Language): Observable<Translations>;
}
