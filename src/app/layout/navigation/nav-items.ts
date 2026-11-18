/**
 * =============================================================================
 * NAVIGATION ITEMS
 * -----------------------------------------------------------------------------
 * The menu is DATA, not markup. Header (desktop + mobile) and scroll-spy all
 * read this one list, so adding a section = adding one line here.
 *
 * `sectionId` must match the `id` attribute of the section element.
 * `labelKey` is a key in public/data/i18n/<lang>.json.
 * =============================================================================
 */
export interface NavItem {
  readonly sectionId: string;
  readonly labelKey: string;
  readonly emoji: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { sectionId: 'about', labelKey: 'nav.about', emoji: '👋' },
  { sectionId: 'skills', labelKey: 'nav.skills', emoji: '🧰' },
  { sectionId: 'experience', labelKey: 'nav.experience', emoji: '💼' },
  { sectionId: 'projects', labelKey: 'nav.projects', emoji: '🚀' },
  { sectionId: 'smile', labelKey: 'nav.smile', emoji: '😄' },
  { sectionId: 'contact', labelKey: 'nav.contact', emoji: '💌' },
];
