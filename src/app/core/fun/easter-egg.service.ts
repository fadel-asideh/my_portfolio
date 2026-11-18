import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';

import { TranslationService } from '@core/i18n/translation.service';
import { ConfettiService } from './confetti.service';
import { SmileCounterService } from './smile-counter.service';
import { ToastService } from './toast.service';

/**
 * =============================================================================
 * EASTER EGG SERVICE 🥚
 * -----------------------------------------------------------------------------
 * Type the legendary Konami code anywhere on the page:
 *        ↑ ↑ ↓ ↓ ← → ← → B A
 * …and the page enters PARTY MODE for a few seconds (rainbow colors + confetti).
 *
 * The footer drops a hint, so curious visitors can find it.
 * `listen()` is called once at start-up from app.config.ts.
 * =============================================================================
 */
@Injectable({ providedIn: 'root' })
export class EasterEggService {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly confetti = inject(ConfettiService);
  private readonly toast = inject(ToastService);
  private readonly smiles = inject(SmileCounterService);
  private readonly translation = inject(TranslationService);

  private static readonly KONAMI = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a',
  ];
  private static readonly PARTY_DURATION_MS = 6000;

  /** How many keys of the code have been typed correctly so far. */
  private progress = 0;

  listen(): void {
    const onKeyDown = (event: KeyboardEvent) => this.handleKey(event.key);
    this.document.addEventListener('keydown', onKeyDown);
    this.destroyRef.onDestroy(() => this.document.removeEventListener('keydown', onKeyDown));
  }

  /** Starts party mode. Public so a button could trigger it too. */
  party(): void {
    const root = this.document.documentElement;
    root.classList.add('party');
    this.confetti.burst(undefined, 120);
    this.smiles.increment();
    this.toast.show(this.translation.translate('easterEgg.found'), '🕺');
    setTimeout(() => root.classList.remove('party'), EasterEggService.PARTY_DURATION_MS);
  }

  private handleKey(key: string): void {
    const expected = EasterEggService.KONAMI[this.progress];
    const typed = key.length === 1 ? key.toLowerCase() : key;

    if (typed === expected) {
      this.progress++;
      if (this.progress === EasterEggService.KONAMI.length) {
        this.progress = 0;
        this.party();
      }
    } else {
      // Wrong key: restart, but count it as step 1 if it was the first key.
      this.progress = typed === EasterEggService.KONAMI[0] ? 1 : 0;
    }
  }
}
