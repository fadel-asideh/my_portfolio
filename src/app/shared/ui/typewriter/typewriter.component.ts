import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, input, signal } from '@angular/core';

import { MotionPreferenceService } from '@core/browser/motion-preference.service';

/**
 * =============================================================================
 * <app-typewriter [words]="['APIs', 'clean code']" />
 * -----------------------------------------------------------------------------
 * Types a word letter by letter, waits, deletes it, types the next one … forever.
 *
 * Implementation notes:
 * - The state is ONE signal (`text`). Everything else is timing.
 * - Each run gets a `runId`. When the words change (language switch), the
 *   effect starts a new run and older timers notice their id is outdated and
 *   quietly stop. No timer is left behind.
 * - With "reduce motion" on, words simply swap every few seconds.
 * =============================================================================
 */
@Component({
  selector: 'app-typewriter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="whitespace-nowrap">{{ text() }}</span
    ><span class="ml-0.5 inline-block w-[3px] animate-pulse bg-current align-middle" style="height: 0.9em" aria-hidden="true"></span>
    <!-- Screen readers get the full list once instead of hearing every letter -->
    <span class="sr-only">{{ words().join(', ') }}</span>
  `,
})
export class TypewriterComponent {
  readonly words = input.required<readonly string[]>();

  /** Milliseconds per typed / deleted character, and pause on a full word. */
  private static readonly TYPE_MS = 75;
  private static readonly DELETE_MS = 35;
  private static readonly HOLD_MS = 1600;

  protected readonly text = signal('');

  private readonly motion = inject(MotionPreferenceService);
  private runId = 0;
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    // (Re)start whenever the list of words changes.
    effect(() => this.start(this.words()));
    inject(DestroyRef).onDestroy(() => this.stopTimer());
  }

  private start(words: readonly string[]): void {
    this.stopTimer();
    const run = ++this.runId;
    if (words.length === 0) {
      return;
    }

    if (this.motion.prefersReducedMotion()) {
      this.swapCalmly(words, 0, run);
    } else {
      this.typeLoop(words, 0, 0, false, run);
    }
  }

  /**
   * One "tick" of the animation.
   * @param wordIndex which word we are on
   * @param charCount how many letters are currently visible
   * @param deleting  are we typing (false) or erasing (true)?
   */
  private typeLoop(words: readonly string[], wordIndex: number, charCount: number, deleting: boolean, run: number): void {
    if (run !== this.runId) {
      return; // a newer run took over
    }

    const word = words[wordIndex];
    this.text.set(word.slice(0, charCount));

    let next: () => void;
    let delay: number;

    if (!deleting && charCount < word.length) {
      next = () => this.typeLoop(words, wordIndex, charCount + 1, false, run);
      delay = TypewriterComponent.TYPE_MS;
    } else if (!deleting) {
      next = () => this.typeLoop(words, wordIndex, charCount, true, run);
      delay = TypewriterComponent.HOLD_MS;
    } else if (charCount > 0) {
      next = () => this.typeLoop(words, wordIndex, charCount - 1, true, run);
      delay = TypewriterComponent.DELETE_MS;
    } else {
      next = () => this.typeLoop(words, (wordIndex + 1) % words.length, 0, false, run);
      delay = TypewriterComponent.TYPE_MS * 4;
    }

    this.timer = setTimeout(next, delay);
  }

  /** Reduced-motion variant: no typing, just a calm swap. */
  private swapCalmly(words: readonly string[], wordIndex: number, run: number): void {
    if (run !== this.runId) {
      return;
    }
    this.text.set(words[wordIndex]);
    this.timer = setTimeout(() => this.swapCalmly(words, (wordIndex + 1) % words.length, run), 2800);
  }

  private stopTimer(): void {
    clearTimeout(this.timer);
  }
}
