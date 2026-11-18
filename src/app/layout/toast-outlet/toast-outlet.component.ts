import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ToastService } from '@core/fun/toast.service';

/**
 * =============================================================================
 * TOAST OUTLET
 * -----------------------------------------------------------------------------
 * Renders the messages queued in ToastService at the bottom of the screen.
 * `aria-live="polite"` makes screen readers announce them without
 * interrupting what the visitor is currently doing.
 * =============================================================================
 */
@Component({
  selector: 'app-toast-outlet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex flex-col items-center gap-2 px-4"
      aria-live="polite"
      role="status"
    >
      @for (toast of toasts.toasts(); track toast.id) {
        <button
          type="button"
          class="sticker pointer-events-auto flex animate-pop-in items-center gap-3 px-4 py-3 text-left font-display font-medium"
          (click)="toasts.dismiss(toast.id)"
        >
          <span class="text-2xl" aria-hidden="true">{{ toast.emoji }}</span>
          <span>{{ toast.message }}</span>
        </button>
      }
    </div>
  `,
})
export class ToastOutletComponent {
  protected readonly toasts = inject(ToastService);
}
