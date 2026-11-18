import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TranslationService } from '@core/i18n/translation.service';
import { PortfolioStore } from '@core/state/portfolio.store';
import { AboutComponent } from '@features/about/about.component';
import { ContactComponent } from '@features/contact/contact.component';
import { ExperienceComponent } from '@features/experience/experience.component';
import { HeroComponent } from '@features/hero/hero.component';
import { ProjectsComponent } from '@features/projects/projects.component';
import { SkillsComponent } from '@features/skills/skills.component';
import { SmileBreakComponent } from '@features/smile-break/smile-break.component';
import { FooterComponent } from '@layout/footer/footer.component';
import { HeaderComponent } from '@layout/header/header.component';
import { ToastOutletComponent } from '@layout/toast-outlet/toast-outlet.component';

/**
 * =============================================================================
 * ROOT COMPONENT — <app-root>
 * -----------------------------------------------------------------------------
 * The "conductor": it reads the store and hands each section the slice of data
 * it needs. Sections never fetch anything themselves.
 *
 * Three screens:
 *   loading → a bouncing smiley
 *   error   → a friendly message + "Try again"
 *   ready   → the full page
 * =============================================================================
 */
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AboutComponent,
    ContactComponent,
    ExperienceComponent,
    FooterComponent,
    HeaderComponent,
    HeroComponent,
    ProjectsComponent,
    SkillsComponent,
    SmileBreakComponent,
    ToastOutletComponent,
  ],
  templateUrl: './app.html',
})
export class App {
  protected readonly store = inject(PortfolioStore);

  constructor() {
    const title = inject(Title);
    const translation = inject(TranslationService);

    // Keep the browser tab title in the active language.
    effect(() => {
      if (this.store.isReady()) {
        title.setTitle(translation.translate('meta.title'));
      }
    });
  }
}
