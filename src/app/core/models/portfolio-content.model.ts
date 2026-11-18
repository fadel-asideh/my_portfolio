/**
 * =============================================================================
 * PORTFOLIO CONTENT MODELS
 * -----------------------------------------------------------------------------
 * These interfaces describe the shape of `public/data/content/<lang>.json`.
 * They are the "contract" between the JSON files and the UI:
 *   - If you add a field to the JSON, add it here first.
 *   - TypeScript will then tell you every component that should use it.
 *
 * Every text in here is already translated (one JSON file per language),
 * so components never need to know which language is active.
 * =============================================================================
 */

/** Root object of one content file. */
export interface PortfolioContent {
  readonly profile: Profile;
  readonly stats: readonly Stat[];
  readonly about: About;
  readonly skillGroups: readonly SkillGroup[];
  readonly experience: readonly Experience[];
  readonly projects: readonly Project[];
  readonly jokes: readonly Joke[];
  readonly compliments: readonly string[];
}

/** Who is this portfolio about? Shown in the hero section. */
export interface Profile {
  readonly firstName: string;
  readonly lastName: string;
  /** Short headline below the name, e.g. "Fullstack developer · Backend focus". */
  readonly headline: string;
  /** Words cycled by the typewriter effect ("APIs", "clean code", …). */
  readonly rotatingWords: readonly string[];
  readonly location: string;
  /** Small badge in the hero, e.g. "Open to new opportunities". */
  readonly availability: string;
  readonly intro: string;
}

/** A big friendly number ("50+ REST APIs"). */
export interface Stat {
  readonly value: string;
  readonly label: string;
  readonly emoji: string;
}

/** The "About me" section. */
export interface About {
  readonly paragraphs: readonly string[];
  readonly funFacts: readonly FunFact[];
  readonly languages: readonly SpokenLanguage[];
}

/** A flip card: front shows emoji + title, back reveals the detail. */
export interface FunFact {
  readonly emoji: string;
  readonly title: string;
  readonly detail: string;
}

/** A human language the person speaks (not a programming language!). */
export interface SpokenLanguage {
  readonly name: string;
  readonly level: string;
  /** 0–100, used for the little progress bar. */
  readonly percent: number;
}

/** A group of related skills ("Backend", "Databases", …). */
export interface SkillGroup {
  readonly id: string;
  readonly emoji: string;
  readonly title: string;
  readonly skills: readonly string[];
  /** Accent color name from the design system: sun | coral | mint | sky | grape. */
  readonly accent: AccentColor;
}

/** One job on the timeline. */
export interface Experience {
  readonly id: string;
  readonly role: string;
  readonly company: string;
  readonly location: string;
  readonly workMode: string;
  /** Free text so each language can format dates its own way ("12/2024"). */
  readonly period: string;
  readonly emoji: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly stack: readonly string[];
}

/** A project card in the "Projects" section. */
export interface Project {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly context: string;
  readonly period: string;
  readonly role: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly stack: readonly string[];
  /** Used by the filter buttons. Must match a key in `ProjectCategory`. */
  readonly category: ProjectCategory;
  readonly emoji: string;
  readonly accent: AccentColor;
  /** Optional numbers shown as badges on the card. */
  readonly metrics?: readonly Stat[];
  /** Optional public link (repository, demo …). Omit for private client work. */
  readonly link?: string;
}

/** A two-step joke for the "Smile break" section. */
export interface Joke {
  readonly setup: string;
  readonly punchline: string;
}

/** Accent colors available in the design system (see styles.css). */
export type AccentColor = 'sun' | 'coral' | 'mint' | 'sky' | 'grape';

/** Project filter categories. `all` is added by the UI and is not stored in JSON. */
export type ProjectCategory = 'dotnet' | 'python' | 'typescript';
