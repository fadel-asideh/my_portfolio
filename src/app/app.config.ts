import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

import { JsonPortfolioDataSource } from '@core/data/json-portfolio-data-source';
import { PortfolioDataSource } from '@core/data/portfolio-data-source';
import { printConsoleGreeting } from '@core/fun/console-greeting';
import { EasterEggService } from '@core/fun/easter-egg.service';
import { BrowserLocalStorage, KeyValueStorage } from '@core/storage/key-value-storage';

/**
 * =============================================================================
 * APPLICATION CONFIG — the "wiring diagram" of the app
 * -----------------------------------------------------------------------------
 * This is the ONLY place that decides which concrete class implements which
 * abstraction (Dependency Inversion Principle):
 *
 *   PortfolioDataSource  →  JsonPortfolioDataSource   (data from JSON files)
 *   KeyValueStorage      →  BrowserLocalStorage       (prefs in localStorage)
 *
 * Want data from an API instead of JSON? Write `ApiPortfolioDataSource`,
 * change one line below, done. No component has to change.
 * =============================================================================
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Log uncaught errors in the browser console instead of failing silently.
    provideBrowserGlobalErrorListeners(),

    // HttpClient, using the modern fetch() API under the hood.
    provideHttpClient(withFetch()),

    // ---- Abstractions → implementations -----------------------------------
    { provide: PortfolioDataSource, useClass: JsonPortfolioDataSource },
    { provide: KeyValueStorage, useClass: BrowserLocalStorage },

    // ---- Things that run once when the app starts -------------------------
    provideAppInitializer(() => {
      printConsoleGreeting();
      inject(EasterEggService).listen();
    }),
  ],
};
