import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

import { Project } from '@core/models';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { IconComponent } from '@shared/ui/icon/icon.component';
import { ACCENT_SOFT_BG } from '@shared/utils/accent-classes';

/**
 * =============================================================================
 * PROJECT CARD
 * -----------------------------------------------------------------------------
 * Shows one project. The "What I did" list is collapsed by default so the grid
 * stays calm and scannable; one click expands it.
 * Responsibility: display a single project (filtering happens in the parent).
 * =============================================================================
 */
@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, TranslatePipe],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();

  protected readonly expanded = signal(false);
  protected readonly accentSoftBg = ACCENT_SOFT_BG;
}
