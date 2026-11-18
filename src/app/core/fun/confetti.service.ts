import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

import { MotionPreferenceService } from '@core/browser/motion-preference.service';

/** Where the confetti should burst from (viewport pixels). Defaults to the screen center. */
export interface ConfettiOrigin {
  readonly x: number;
  readonly y: number;
}

/**
 * =============================================================================
 * CONFETTI SERVICE 🎉
 * -----------------------------------------------------------------------------
 * A tiny, dependency-free confetti cannon.
 *
 * How it works:
 *   1. create N small <span>s (colored squares or emojis) at the origin,
 *   2. animate each one with the Web Animations API (fly out, fall, spin, fade),
 *   3. remove them from the DOM when their animation finishes.
 *
 * No canvas, no library, no leftovers. With "reduce motion" switched on we
 * skip the show entirely — the toast message still tells the visitor what
 * happened.
 * =============================================================================
 */
@Injectable({ providedIn: 'root' })
export class ConfettiService {
  private readonly document = inject(DOCUMENT);
  private readonly motion = inject(MotionPreferenceService);

  /** Palette = the accent colors from styles.css. */
  private static readonly COLORS = ['#ffc93c', '#ff6b6b', '#3ddc97', '#4d96ff', '#9b5de5'];
  /** A few pieces are emojis instead of squares, for extra joy. */
  private static readonly EMOJIS = ['😄', '✨', '🎉', '💛', '⭐'];

  burst(origin?: ConfettiOrigin, pieces = 42): void {
    const view = this.document.defaultView;
    if (!view || this.motion.prefersReducedMotion()) {
      return;
    }

    const start = origin ?? { x: view.innerWidth / 2, y: view.innerHeight / 2 };
    for (let i = 0; i < pieces; i++) {
      this.launchPiece(start, i % 6 === 0);
    }
  }

  /** Creates and animates ONE confetti piece. */
  private launchPiece(origin: ConfettiOrigin, useEmoji: boolean): void {
    const piece = this.document.createElement('span');
    piece.setAttribute('aria-hidden', 'true');

    Object.assign(piece.style, {
      position: 'fixed',
      left: `${origin.x}px`,
      top: `${origin.y}px`,
      zIndex: '9999',
      pointerEvents: 'none',
      fontSize: '18px',
    } satisfies Partial<CSSStyleDeclaration>);

    if (useEmoji) {
      piece.textContent = pick(ConfettiService.EMOJIS);
    } else {
      Object.assign(piece.style, {
        width: `${random(6, 11)}px`,
        height: `${random(8, 14)}px`,
        background: pick(ConfettiService.COLORS),
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      });
    }

    this.document.body.appendChild(piece);

    // Physics-ish path: shoot out in a random direction, then fall down.
    const angle = random(0, Math.PI * 2);
    const power = random(90, 260);
    const dx = Math.cos(angle) * power;
    const dy = Math.sin(angle) * power - 120; // a bit of upward kick
    const rotation = random(-720, 720);

    const animation = piece.animate(
      [
        { transform: 'translate(-50%, -50%) rotate(0deg)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${rotation / 2}deg)`, opacity: 1, offset: 0.45 },
        { transform: `translate(${dx * 1.2}px, ${dy + 380}px) rotate(${rotation}deg)`, opacity: 0 },
      ],
      { duration: random(1200, 2000), easing: 'cubic-bezier(.2,.7,.4,1)' },
    );

    animation.onfinish = () => piece.remove();
  }
}

/** Random number between min and max. */
function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/** Random element of a list. */
function pick<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}
