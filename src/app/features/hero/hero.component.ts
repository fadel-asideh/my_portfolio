import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { PortfolioContent } from '@core/models';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { IconComponent } from '@shared/ui/icon/icon.component';
import { TypewriterComponent } from '@shared/ui/typewriter/typewriter.component';
import { MascotComponent } from './mascot/mascot.component';

/**
 * =============================================================================
 * HERO SECTION — the first thing a visitor sees
 * -----------------------------------------------------------------------------
 * Name, headline, typewriter, call-to-action buttons, Bugsy, quick stats.
 *
 * "Presentational" component: it receives data through `input()` and does not
 * inject the store. That makes it easy to reuse and trivial to test — pass in
 * an object, check the output.
 * =============================================================================
 */
@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, MascotComponent, RevealOnScrollDirective, TranslatePipe, TypewriterComponent],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  readonly content = input.required<PortfolioContent>();

  /** Alternating tilt for the stat stickers — looks hand-placed. */
  protected readonly tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];
}
