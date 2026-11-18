import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * =============================================================================
 * <app-section-heading emoji="🧰" title="Skills" subtitle="…" />
 * -----------------------------------------------------------------------------
 * The same heading style for every section, so the page feels consistent.
 * The emoji does a little wiggle on hover — small surprise, small smile.
 * =============================================================================
 */
@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="mb-10 text-center md:mb-14">
      <span
        class="mb-3 inline-block text-5xl transition-transform hover:animate-wiggle"
        aria-hidden="true"
        >{{ emoji() }}</span
      >
      <h2 class="text-4xl font-bold tracking-tight md:text-5xl">
        <!-- the yellow "highlighter" stripe behind the title -->
        <span class="bg-[linear-gradient(transparent_60%,var(--color-sun)_60%)] px-1 dark:bg-[linear-gradient(transparent_60%,color-mix(in_srgb,var(--color-grape)_70%,transparent)_60%)]">
          {{ title() }}
        </span>
      </h2>
      @if (subtitle()) {
        <p class="mx-auto mt-4 max-w-2xl text-lg text-muted">{{ subtitle() }}</p>
      }
    </header>
  `,
})
export class SectionHeadingComponent {
  readonly emoji = input.required<string>();
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
}
