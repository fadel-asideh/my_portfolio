import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { About } from '@core/models';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { SectionHeadingComponent } from '@shared/ui/section-heading/section-heading.component';
import { FunFactCardComponent } from './fun-fact-card/fun-fact-card.component';

/**
 * =============================================================================
 * ABOUT SECTION
 * -----------------------------------------------------------------------------
 * Left: the story (paragraphs) + spoken languages with friendly progress bars.
 * Right: a grid of flip cards with fun facts.
 * =============================================================================
 */
@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FunFactCardComponent, RevealOnScrollDirective, SectionHeadingComponent, TranslatePipe],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  readonly about = input.required<About>();
}
