import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Experience } from '@core/models';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { SectionHeadingComponent } from '@shared/ui/section-heading/section-heading.component';

/**
 * =============================================================================
 * EXPERIENCE SECTION — a vertical timeline
 * -----------------------------------------------------------------------------
 * A dashed line runs down the left; each job is a sticker card hanging off it
 * with an emoji "pin". Order = order in the JSON (newest first).
 * =============================================================================
 */
@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealOnScrollDirective, SectionHeadingComponent, TranslatePipe],
  templateUrl: './experience.component.html',
})
export class ExperienceComponent {
  readonly jobs = input.required<readonly Experience[]>();
}
