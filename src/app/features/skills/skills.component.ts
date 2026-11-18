import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { SkillGroup } from '@core/models';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { SectionHeadingComponent } from '@shared/ui/section-heading/section-heading.component';
import { ACCENT_BG } from '@shared/utils/accent-classes';

/**
 * =============================================================================
 * SKILLS SECTION ("Toolbox")
 * -----------------------------------------------------------------------------
 * One sticker card per skill group, each with its own accent color.
 * Chips wiggle on hover — a tiny reward for curious mice.
 * =============================================================================
 */
@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealOnScrollDirective, SectionHeadingComponent, TranslatePipe],
  templateUrl: './skills.component.html',
})
export class SkillsComponent {
  readonly groups = input.required<readonly SkillGroup[]>();
  protected readonly accentBg = ACCENT_BG;
}
