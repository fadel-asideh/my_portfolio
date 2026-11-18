import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

import { FunFact } from '@core/models';

/**
 * =============================================================================
 * FUN FACT CARD — a card that flips over on click / tap / Enter
 * -----------------------------------------------------------------------------
 * Front: big emoji + title.   Back: the actual fun fact.
 * The 3D flip is pure CSS (see the component styles). It is a real <button>,
 * so keyboard users can flip it too, and `aria-pressed` tells screen readers
 * which side is showing.
 * =============================================================================
 */
@Component({
  selector: 'app-fun-fact-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="flip-card h-44 w-full cursor-pointer text-left [perspective:1000px]"
      [class.is-flipped]="flipped()"
      [attr.aria-pressed]="flipped()"
      (click)="flipped.set(!flipped())"
    >
      <span class="flip-inner relative block size-full">
        <!-- FRONT -->
        <span class="flip-face sticker absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
          <span class="text-5xl" aria-hidden="true">{{ fact().emoji }}</span>
          <span class="font-display text-lg font-semibold">{{ fact().title }}</span>
        </span>
        <!-- BACK -->
        <span class="flip-face flip-back sticker absolute inset-0 flex items-center justify-center bg-sun! p-5 text-center text-[#1d1b2f]">
          <span class="font-medium">{{ fact().detail }}</span>
        </span>
      </span>
    </button>
  `,
  styles: `
    .flip-inner {
      transform-style: preserve-3d;
      transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .is-flipped .flip-inner {
      transform: rotateY(180deg);
    }
    .flip-face {
      backface-visibility: hidden;
    }
    .flip-back {
      transform: rotateY(180deg);
    }
  `,
})
export class FunFactCardComponent {
  readonly fact = input.required<FunFact>();
  protected readonly flipped = signal(false);
}
