/**
 * =============================================================================
 * MAIN — the entry point
 * -----------------------------------------------------------------------------
 * Starts the Angular app: renders <app-root> (App) using the providers in
 * app.config.ts. If start-up fails, the error is logged to the console.
 * =============================================================================
 */
import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig).catch((error) => console.error(error));
