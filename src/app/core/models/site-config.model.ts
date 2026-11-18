/**
 * =============================================================================
 * SITE CONFIG MODEL
 * -----------------------------------------------------------------------------
 * Shape of `public/data/config.json` — data that is the SAME in every language
 * (links, e-mail address, …). Keeping it separate means you change your
 * GitHub URL once, not once per language.
 * =============================================================================
 */
export interface SiteConfig {
  readonly email: string;
  readonly socialLinks: readonly SocialLink[];
  /** Optional link to a downloadable CV (PDF). Leave empty to hide the button. */
  readonly cvUrl?: string;
}

/** A link to a profile on another platform. */
export interface SocialLink {
  /** Must match an icon name in `shared/ui/icon/icon-registry.ts`. */
  readonly icon: 'github' | 'linkedin' | 'mail';
  readonly label: string;
  readonly url: string;
}
