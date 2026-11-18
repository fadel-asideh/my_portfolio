/**
 * =============================================================================
 * ICON REGISTRY
 * -----------------------------------------------------------------------------
 * All SVG icons of the site in one place (no icon font, no extra download).
 * To add an icon: add one entry below — the IconComponent picks it up
 * automatically (Open/Closed Principle).
 *
 * `fill` icons are solid shapes (brand logos); `stroke` icons are outlines.
 * Brand paths (GitHub, LinkedIn) come from Simple Icons (CC0 licence).
 * =============================================================================
 */
export interface IconDefinition {
  readonly style: 'fill' | 'stroke';
  readonly paths: readonly string[];
}

export const ICONS = {
  github: {
    style: 'fill',
    paths: [
      'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
    ],
  },
  linkedin: {
    style: 'fill',
    paths: [
      'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    ],
  },
  mail: { style: 'stroke', paths: ['M3 6h18v12H3z', 'm3 7 9 6 9-6'] },
  sun: {
    style: 'stroke',
    paths: [
      'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
      'M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
    ],
  },
  moon: { style: 'stroke', paths: ['M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z'] },
  menu: { style: 'stroke', paths: ['M4 7h16M4 12h16M4 17h16'] },
  close: { style: 'stroke', paths: ['M6 6l12 12M18 6 6 18'] },
  copy: { style: 'stroke', paths: ['M9 9h11v11H9z', 'M5 15H4V4h11v1'] },
  external: { style: 'stroke', paths: ['M14 4h6v6', 'M20 4 10 14', 'M18 14v6H4V6h6'] },
  pin: { style: 'stroke', paths: ['M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z', 'M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'] },
  arrowUp: { style: 'stroke', paths: ['M12 19V5', 'm5 12 7-7 7 7'] },
  download: { style: 'stroke', paths: ['M12 4v12', 'm6 10 6 6 6-6', 'M4 20h16'] },
} as const satisfies Record<string, IconDefinition>;

/** Union of all icon names: 'github' | 'linkedin' | 'mail' | … */
export type IconName = keyof typeof ICONS;
