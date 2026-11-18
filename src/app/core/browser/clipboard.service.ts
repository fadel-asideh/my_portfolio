import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

/**
 * =============================================================================
 * CLIPBOARD SERVICE
 * -----------------------------------------------------------------------------
 * Copies text to the clipboard and reports success as a boolean promise.
 * The modern Clipboard API needs HTTPS (GitHub Pages has it) — if it is
 * missing or blocked we simply return `false` and the UI can fall back.
 * =============================================================================
 */
@Injectable({ providedIn: 'root' })
export class ClipboardService {
  private readonly navigator = inject(DOCUMENT).defaultView?.navigator;

  async copy(text: string): Promise<boolean> {
    try {
      await this.navigator?.clipboard?.writeText(text);
      return Boolean(this.navigator?.clipboard);
    } catch {
      return false;
    }
  }
}
