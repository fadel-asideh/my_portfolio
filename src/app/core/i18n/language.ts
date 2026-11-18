/**
 * =============================================================================
 * SUPPORTED LANGUAGES
 * -----------------------------------------------------------------------------
 * The single source of truth for which languages exist.
 * To add a language (e.g. Arabic):
 *   1. add 'ar' to SUPPORTED_LANGUAGES below,
 *   2. create public/data/i18n/ar.json and public/data/content/ar.json.
 * Nothing else needs to change (Open/Closed Principle).
 * =============================================================================
 */

/** All language codes the site can display. `as const` keeps them as literal types. */
export const SUPPORTED_LANGUAGES = ['en', 'de'] as const;

/** Union type of the codes above: 'en' | 'de'. */
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

/** Used when nothing else tells us which language the visitor prefers. */
export const DEFAULT_LANGUAGE: Language = 'en';

/** Type guard: is an unknown string one of our supported languages? */
export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}
