import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PortfolioStore } from '@core/state/portfolio.store';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { IconComponent } from '@shared/ui/icon/icon.component';

/**
 * =============================================================================
 * FOOTER
 * -----------------------------------------------------------------------------
 * Credits, social links, a "back to top" rocket and a secret hint 🤫.
 * =============================================================================
 */
@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, TranslatePipe],
  template: `
    <footer class="border-t-2 border-line/10 py-10">
      <div class="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p class="font-display font-semibold">
            © {{ year }} {{ store.content()?.profile?.firstName }} {{ store.content()?.profile?.lastName }}
          </p>
          <p class="text-sm text-muted">{{ 'footer.madeWith' | t }}</p>
          <!-- The secret: try typing it on your keyboard! -->
          <p class="mt-1 font-mono text-xs text-muted/70 select-all">{{ 'footer.hint' | t }}</p>
        </div>

        <div class="flex items-center gap-3">
          @for (link of store.config()?.socialLinks ?? []; track link.url) {
            <a
              [href]="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="icon-btn"
              [attr.aria-label]="link.label"
              [title]="link.label"
            >
              <app-icon [name]="link.icon" class="size-5" />
            </a>
          }

          <!-- Back to top: the rocket lifts off on hover -->
          <a
            href="#top"
            class="icon-btn group bg-sun! text-[#1d1b2f]!"
            [attr.aria-label]="'footer.backToTop' | t"
            [title]="'footer.backToTop' | t"
          >
            <span class="transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-45deg]" aria-hidden="true">🚀</span>
          </a>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly store = inject(PortfolioStore);
  protected readonly year = new Date().getFullYear();
}
