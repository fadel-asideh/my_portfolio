import { AccentColor } from '@core/models';

/**
 * =============================================================================
 * ACCENT CLASSES
 * -----------------------------------------------------------------------------
 * JSON files say `"accent": "mint"`; templates need real Tailwind classes.
 *
 * Why a lookup table instead of building `'bg-' + accent`?
 * Tailwind scans source files for COMPLETE class names at build time.
 * A dynamically glued string like `bg-${accent}` would never be found and the
 * style would silently be missing. Listing them here keeps Tailwind happy.
 * =============================================================================
 */
export const ACCENT_BG: Readonly<Record<AccentColor, string>> = {
  sun: 'bg-sun',
  coral: 'bg-coral',
  mint: 'bg-mint',
  sky: 'bg-sky',
  grape: 'bg-grape',
};

/** Soft tinted backgrounds for larger areas (card headers …). */
export const ACCENT_SOFT_BG: Readonly<Record<AccentColor, string>> = {
  sun: 'bg-sun/25',
  coral: 'bg-coral/20',
  mint: 'bg-mint/25',
  sky: 'bg-sky/20',
  grape: 'bg-grape/20',
};
