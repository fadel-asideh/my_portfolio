import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

/**
 * =============================================================================
 * SCROLL SPY SERVICE
 * -----------------------------------------------------------------------------
 * Tells the header which section is currently on screen, so the matching menu
 * item can be highlighted.
 *
 * It uses ONE IntersectionObserver with a thin "detection band" in the middle
 * of the viewport (rootMargin -45% top / -50% bottom). Whichever section
 * crosses that band becomes the active one. No scroll listeners, no math.
 * =============================================================================
 */
@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private readonly document = inject(DOCUMENT);
  private observer?: IntersectionObserver;

  private readonly _activeId = signal<string | null>(null);
  readonly activeId = this._activeId.asReadonly();

  /** Start watching the given section ids. Safe to call again (restarts). */
  watch(sectionIds: readonly string[]): void {
    this.stop();
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          this._activeId.set(visible.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    for (const id of sectionIds) {
      const element = this.document.getElementById(id);
      if (element) {
        this.observer.observe(element);
      }
    }
  }

  stop(): void {
    this.observer?.disconnect();
  }
}
