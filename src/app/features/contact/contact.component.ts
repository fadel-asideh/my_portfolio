import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { ClipboardService } from '@core/browser/clipboard.service';
import { ConfettiService } from '@core/fun/confetti.service';
import { SmileCounterService } from '@core/fun/smile-counter.service';
import { ToastService } from '@core/fun/toast.service';
import { TranslationService } from '@core/i18n/translation.service';
import { SiteConfig } from '@core/models';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { IconComponent } from '@shared/ui/icon/icon.component';
import { SectionHeadingComponent } from '@shared/ui/section-heading/section-heading.component';

/**
 * =============================================================================
 * CONTACT SECTION
 * -----------------------------------------------------------------------------
 * A big friendly card with the e-mail address (copy with one click 🎉),
 * a mailto button, social links and — if configured — a CV download.
 * No contact form on purpose: GitHub Pages is static hosting, and a mailto
 * link is simpler, more private and never ends up in a spam backend.
 * =============================================================================
 */
@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, RevealOnScrollDirective, SectionHeadingComponent, TranslatePipe],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  readonly config = input.required<SiteConfig>();

  private readonly clipboard = inject(ClipboardService);
  private readonly toast = inject(ToastService);
  private readonly confetti = inject(ConfettiService);
  private readonly smiles = inject(SmileCounterService);
  private readonly translation = inject(TranslationService);

  protected async copyEmail(event: MouseEvent): Promise<void> {
    const copied = await this.clipboard.copy(this.config().email);

    if (copied) {
      this.toast.show(this.translation.translate('contact.copied'), '📋');
      this.confetti.burst({ x: event.clientX, y: event.clientY }, 30);
      this.smiles.increment();
    } else {
      this.toast.show(this.translation.translate('contact.copyFailed'), '🙈');
    }
  }
}
