import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

/**
 * =============================================================================
 * MOTION PREFERENCE SERVICE
 * -----------------------------------------------------------------------------
 * Some people get dizzy from animations and tell their OS "reduce motion".
 * Every fun animation in JavaScript (confetti, typewriter …) asks this service
 * first, so we stay playful WITHOUT making anyone feel unwell.
 * (CSS animations are already handled in styles.css.)
 * =============================================================================
 */
@Injectable({ providedIn: 'root' })
export class MotionPreferenceService {
  private readonly window = inject(DOCUMENT).defaultView;

  /** True when the visitor asked for less motion. */
  prefersReducedMotion(): boolean {
    return this.window?.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }
}
