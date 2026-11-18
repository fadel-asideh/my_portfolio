import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/**
 * =============================================================================
 * REVEAL ON SCROLL  —  <div appReveal> … </div>
 * -----------------------------------------------------------------------------
 * Fades + slides an element in the first time it scrolls into view.
 *
 * - The CSS lives in styles.css (`.reveal` / `.is-visible`).
 * - An IntersectionObserver watches the element; once visible, we add the
 *   class and stop watching (one-time animation, zero ongoing cost).
 * - `[revealDelay]="150"` lets lists appear one item after another.
 * - Old browsers without IntersectionObserver simply show everything.
 * =============================================================================
 */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class RevealOnScrollDirective {
  /** Optional delay in milliseconds before this element animates in. */
  readonly revealDelay = input(0);

  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Only touch the DOM after Angular rendered the element.
    afterNextRender(() => this.observe());
  }

  private observe(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.show();
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(this.element);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  private show(): void {
    this.element.style.transitionDelay = `${this.revealDelay()}ms`;
    this.element.classList.add('is-visible');
  }
}
