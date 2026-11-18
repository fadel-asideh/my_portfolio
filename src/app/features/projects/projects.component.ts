import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

import { Project, ProjectCategory } from '@core/models';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { SectionHeadingComponent } from '@shared/ui/section-heading/section-heading.component';
import { ProjectCardComponent } from './project-card/project-card.component';

/** A filter is either one category or "everything". */
export type ProjectFilter = ProjectCategory | 'all';

/**
 * =============================================================================
 * PROJECTS SECTION
 * -----------------------------------------------------------------------------
 * Filter buttons on top, a responsive grid of ProjectCards below.
 *
 * - Filter buttons are generated from the categories that ACTUALLY appear in
 *   the data, so a category with no projects never shows an empty button.
 * - `visibleProjects` is a computed signal: change the filter → the list
 *   updates by itself.
 * =============================================================================
 */
@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProjectCardComponent, SectionHeadingComponent, TranslatePipe],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  readonly projects = input.required<readonly Project[]>();

  protected readonly activeFilter = signal<ProjectFilter>('all');

  /** ['all', 'dotnet', 'python', 'typescript'] — in order of first appearance. */
  protected readonly filters = computed<readonly ProjectFilter[]>(() => [
    'all',
    ...new Set(this.projects().map((project) => project.category)),
  ]);

  protected readonly visibleProjects = computed(() => {
    const filter = this.activeFilter();
    return filter === 'all' ? this.projects() : this.projects().filter((project) => project.category === filter);
  });

  /** How many projects each filter would show (displayed as a small badge). */
  protected countFor(filter: ProjectFilter): number {
    return filter === 'all' ? this.projects().length : this.projects().filter((p) => p.category === filter).length;
  }
}
