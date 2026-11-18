import { Pipe, PipeTransform, inject } from '@angular/core';

import { TranslationParams, TranslationService } from '@core/i18n/translation.service';

/**
 * =============================================================================
 * TRANSLATE PIPE  —  {{ 'nav.about' | t }}
 * -----------------------------------------------------------------------------
 * A thin template-friendly wrapper around TranslationService.
 *
 * `pure: false` makes Angular re-run the pipe on each change detection.
 * That is required because the RESULT changes when the language changes even
 * though the INPUT key ('nav.about') stays the same. The lookup is a cheap
 * object walk, so this costs practically nothing.
 * =============================================================================
 */
@Pipe({ name: 't', pure: false })
export class TranslatePipe implements PipeTransform {
  private readonly translation = inject(TranslationService);

  transform(key: string, params?: TranslationParams): string {
    return this.translation.translate(key, params);
  }
}
