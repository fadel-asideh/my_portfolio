import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { ICONS, IconName } from './icon-registry';

/**
 * =============================================================================
 * <app-icon name="github" />
 * -----------------------------------------------------------------------------
 * Renders an SVG icon from the registry. Size and color are inherited from the
 * parent (`1em`, `currentColor`), so `class="size-6 text-coral"` just works.
 * Icons are decorative (`aria-hidden`) — buttons carry their own aria-label.
 * =============================================================================
 */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex shrink-0', 'aria-hidden': 'true' },
  template: `
    <svg
      viewBox="0 0 24 24"
      class="size-full"
      [attr.fill]="icon().style === 'fill' ? 'currentColor' : 'none'"
      [attr.stroke]="icon().style === 'stroke' ? 'currentColor' : 'none'"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      @for (path of icon().paths; track $index) {
        <path [attr.d]="path" />
      }
    </svg>
  `,
})
export class IconComponent {
  /** Which icon to draw. Typos are caught at compile time thanks to `IconName`. */
  readonly name = input.required<IconName>();

  protected readonly icon = computed(() => ICONS[this.name()]);
}
