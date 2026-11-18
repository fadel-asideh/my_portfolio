import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

import { ConfettiService } from '@core/fun/confetti.service';
import { SmileCounterService } from '@core/fun/smile-counter.service';
import { ToastService } from '@core/fun/toast.service';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

/** Bugsy's possible moods. Each mood has its own mouth + eyes. */
type Mood = 'happy' | 'grinning' | 'excited' | 'sleeping';

/**
 * =============================================================================
 * MASCOT "BUGSY" 🐞 — the friendliest bug you'll ever find in production
 * -----------------------------------------------------------------------------
 * Things Bugsy does:
 *   👀  eyes follow the mouse pointer
 *   😁  grins when you hover
 *   🎉  click → confetti + a random compliment + one smile on the counter
 *   😴  falls asleep if nobody moves for a while, wakes up on any movement
 *
 * All behaviour is driven by two signals (`mood`, `pupil`) — the SVG in the
 * template only *reads* them. Logic and drawing stay separate.
 * =============================================================================
 */
@Component({
  selector: 'app-mascot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  templateUrl: './mascot.component.html',
  styleUrl: './mascot.component.css',
})
export class MascotComponent {
  /** Compliments come from the content JSON, so they are translated. */
  readonly compliments = input.required<readonly string[]>();

  private readonly confetti = inject(ConfettiService);
  private readonly toast = inject(ToastService);
  private readonly smiles = inject(SmileCounterService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  /** After this many ms without any activity Bugsy takes a nap. */
  private static readonly NAP_AFTER_MS = 15000;
  /** Max distance (SVG units) a pupil may move from the eye's center. */
  private static readonly PUPIL_RANGE = 5;

  private readonly hovering = signal(false);
  private readonly excited = signal(false);
  private readonly sleeping = signal(false);

  /** Pupil offset in SVG units, updated on pointer move. */
  protected readonly pupil = signal({ x: 0, y: 0 });

  /** The single mood shown — priority: excited > sleeping > grinning > happy. */
  protected readonly mood = computed<Mood>(() => {
    if (this.excited()) return 'excited';
    if (this.sleeping()) return 'sleeping';
    if (this.hovering()) return 'grinning';
    return 'happy';
  });

  /** Mouth shape for each mood (SVG path data in a 200×200 box). */
  protected readonly mouthPath = computed(() => {
    switch (this.mood()) {
      case 'excited':
        return 'M66 118 Q100 172 134 118 Z';
      case 'grinning':
        return 'M70 120 Q100 158 130 120 Z';
      case 'sleeping':
        return 'M88 130 Q100 136 112 130';
      default:
        return 'M72 122 Q100 146 128 122';
    }
  });

  /** Open mouths are filled; the calm smile is just a line. */
  protected readonly mouthFilled = computed(() => this.mood() === 'grinning' || this.mood() === 'excited');

  private napTimer?: ReturnType<typeof setTimeout>;
  private lastComplimentIndex = -1;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const onPointerMove = (event: PointerEvent) => {
        this.wakeUp();
        this.lookAt(event.clientX, event.clientY);
      };
      const onActivity = () => this.wakeUp();

      document.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('keydown', onActivity);
      window.addEventListener('scroll', onActivity, { passive: true });
      this.scheduleNap();

      destroyRef.onDestroy(() => {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('keydown', onActivity);
        window.removeEventListener('scroll', onActivity);
        clearTimeout(this.napTimer);
      });
    });
  }

  // ---- Template event handlers ---------------------------------------------

  protected onHover(isHovering: boolean): void {
    this.hovering.set(isHovering);
  }

  /** The best part: click Bugsy! */
  protected celebrate(event: MouseEvent): void {
    this.wakeUp();
    this.excited.set(true);
    setTimeout(() => this.excited.set(false), 1200);

    // Keyboard "clicks" have no coordinates (0,0) → burst from Bugsy instead.
    const rect = this.host.getBoundingClientRect();
    const fromKeyboard = event.clientX === 0 && event.clientY === 0;
    this.confetti.burst({
      x: fromKeyboard ? rect.left + rect.width / 2 : event.clientX,
      y: fromKeyboard ? rect.top + rect.height / 2 : event.clientY,
    });

    this.toast.show(this.nextCompliment(), '🐞');
    this.smiles.increment();
  }

  // ---- Behaviour -----------------------------------------------------------

  /** Moves the pupils toward a point on the screen. */
  private lookAt(pointerX: number, pointerY: number): void {
    const rect = this.host.getBoundingClientRect();
    const dx = pointerX - (rect.left + rect.width / 2);
    const dy = pointerY - (rect.top + rect.height / 2.2);
    const distance = Math.hypot(dx, dy) || 1;

    // Far away → pupils at the edge. Very close → pupils move less.
    const strength = Math.min(distance / 150, 1) * MascotComponent.PUPIL_RANGE;
    this.pupil.set({ x: (dx / distance) * strength, y: (dy / distance) * strength });
  }

  private wakeUp(): void {
    if (this.sleeping()) {
      this.sleeping.set(false);
    }
    this.scheduleNap();
  }

  private scheduleNap(): void {
    clearTimeout(this.napTimer);
    this.napTimer = setTimeout(() => this.sleeping.set(true), MascotComponent.NAP_AFTER_MS);
  }

  /** Random compliment, never the same one twice in a row. */
  private nextCompliment(): string {
    const list = this.compliments();
    if (list.length === 0) return '🙂';

    let index = Math.floor(Math.random() * list.length);
    if (list.length > 1 && index === this.lastComplimentIndex) {
      index = (index + 1) % list.length;
    }
    this.lastComplimentIndex = index;
    return list[index];
  }
}
