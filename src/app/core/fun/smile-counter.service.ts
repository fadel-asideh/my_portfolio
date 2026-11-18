import { Injectable, inject, signal } from '@angular/core';

import { KeyValueStorage } from '@core/storage/key-value-storage';

/**
 * =============================================================================
 * SMILE COUNTER 😄
 * -----------------------------------------------------------------------------
 * Counts how many times the visitor did something smile-worthy
 * (clicked the mascot, revealed a joke, copied the e-mail …).
 * The number is saved per browser, so returning visitors keep their score.
 * Purely for fun — nothing is ever sent anywhere.
 * =============================================================================
 */
@Injectable({ providedIn: 'root' })
export class SmileCounterService {
  private readonly storage = inject(KeyValueStorage);
  private static readonly STORAGE_KEY = 'smiles';

  private readonly _count = signal<number>(this.readSavedCount());
  readonly count = this._count.asReadonly();

  /** Add one smile and persist the new total. */
  increment(): void {
    this._count.update((value) => value + 1);
    this.storage.write(SmileCounterService.STORAGE_KEY, String(this._count()));
  }

  private readSavedCount(): number {
    const saved = Number(this.storage.read(SmileCounterService.STORAGE_KEY));
    return Number.isFinite(saved) && saved > 0 ? Math.floor(saved) : 0;
  }
}
