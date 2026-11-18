import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';

import { ToastService } from '@core/fun/toast.service';
import { LanguageService } from '@core/i18n/language.service';
import { TranslationService } from '@core/i18n/translation.service';
import { ThemeService } from '@core/theme/theme.service';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { IconComponent } from '@shared/ui/icon/icon.component';
import { NAV_ITEMS } from '../navigation/nav-items';
import { ScrollSpyService } from '../navigation/scroll-spy.service';

/**
 * =============================================================================
 * HEADER
 * -----------------------------------------------------------------------------
 * Sticky top bar with: logo · section menu · language switch · theme switch.
 * On small screens the menu collapses into a playful slide-down panel.
 *
 * The header only *triggers* actions; the real work (switching theme or
 * language) is done by the services — the header stays a thin UI layer.
 * =============================================================================
 */
@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, TranslatePipe],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly language = inject(LanguageService);
  protected readonly scrollSpy = inject(ScrollSpyService);
  private readonly toast = inject(ToastService);
  private readonly translation = inject(TranslationService);

  protected readonly navItems = NAV_ITEMS;
  protected readonly menuOpen = signal(false);

  /** Becomes true after a bit of scrolling → header gets a border + shadow. */
  protected readonly scrolled = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      // Highlight the menu item of the section currently on screen.
      this.scrollSpy.watch(NAV_ITEMS.map((item) => item.sectionId));

      // Passive listener = the browser never waits for us while scrolling.
      const onScroll = () => this.scrolled.set(window.scrollY > 12);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        this.scrollSpy.stop();
      });
    });
  }

  protected toggleTheme(): void {
    this.theme.toggle();
    const key = this.theme.isDark() ? 'header.themeDark' : 'header.themeLight';
    this.toast.show(this.translation.translate(key), this.theme.isDark() ? '🌙' : '☀️');
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  /** Close the mobile menu after a link was chosen. */
  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
