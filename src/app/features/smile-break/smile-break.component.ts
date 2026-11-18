import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';

import { ConfettiService } from '@core/fun/confetti.service';
import { SmileCounterService } from '@core/fun/smile-counter.service';
import { Joke } from '@core/models';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { SectionHeadingComponent } from '@shared/ui/section-heading/section-heading.component';

/**
 * =============================================================================
 * SMILE BREAK 😄 — a tiny joke machine
 * -----------------------------------------------------------------------------
 * 1. Show the setup.   2. Visitor clicks → punchline + confetti + 1 smile.
 * 3. "Another one!" picks a random new joke (never the same twice in a row).
 * The counter at the bottom remembers the visitor's total smiles.
 * =============================================================================
 */
@Component({
  selector: 'app-smile-break',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, TranslatePipe],
  templateUrl: './smile-break.component.html',
})
export class SmileBreakComponent {
  readonly jokes = input.required<readonly Joke[]>();

  protected readonly smiles = inject(SmileCounterService);
  private readonly confetti = inject(ConfettiService);

  protected readonly index = signal(0);
  protected readonly revealed = signal(false);

  /** `% length` keeps the index valid even if the list changes (language switch). */
  protected readonly joke = computed<Joke | undefined>(() => {
    const list = this.jokes();
    return list.length ? list[this.index() % list.length] : undefined;
  });

  /** A face that gets happier the more smiles were collected. */
  protected readonly moodFace = computed(() => {
    const count = this.smiles.count();
    if (count === 0) return '🙂';
    if (count < 5) return '😊';
    if (count < 15) return '😄';
    if (count < 30) return '🤩';
    return '🥳';
  });

  protected reveal(event: MouseEvent): void {
    this.revealed.set(true);
    this.smiles.increment();

    const target = event.currentTarget as HTMLElement | null;
    const rect = target?.getBoundingClientRect();
    this.confetti.burst(rect ? { x: rect.left + rect.width / 2, y: rect.top } : undefined, 30);
  }

  protected next(): void {
    const length = this.jokes().length;
    if (length > 1) {
      const step = 1 + Math.floor(Math.random() * (length - 1)); // 1 … length-1 → always a different joke
      this.index.update((current) => (current + step) % length);
    }
    this.revealed.set(false);
  }
}
