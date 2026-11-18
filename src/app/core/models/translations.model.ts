/**
 * =============================================================================
 * TRANSLATIONS MODEL
 * -----------------------------------------------------------------------------
 * Shape of `public/data/i18n/<lang>.json` — the small UI texts (menu items,
 * button labels, section titles …).
 *
 * It is a nested dictionary, so keys can be grouped:
 *   { "nav": { "about": "About" } }   →   key "nav.about"
 * =============================================================================
 */
export interface Translations {
  readonly [key: string]: string | Translations;
}
