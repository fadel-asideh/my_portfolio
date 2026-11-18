import { Injectable, signal } from '@angular/core';

/** One little message bubble at the bottom of the screen. */
export interface Toast {
  readonly id: number;
  readonly emoji: string;
  readonly message: string;
}

/**
 * =============================================================================
 * TOAST SERVICE
 * -----------------------------------------------------------------------------
 * Shows short, friendly messages ("Copied! 🎉").
 * - Any component can call `show()`.
 * - `ToastOutletComponent` (in layout/) is the only one that renders them.
 * This split keeps "what to say" and "how it looks" in different places.
 * =============================================================================
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  /** How long a toast stays visible, in milliseconds. */
  private static readonly LIFETIME_MS = 3200;
  /** Never stack more than this many — the newest win. */
  private static readonly MAX_VISIBLE = 3;

  private nextId = 0;
  private readonly _toasts = signal<readonly Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(message: string, emoji = '😊'): void {
    const toast: Toast = { id: this.nextId++, emoji, message };

    this._toasts.update((list) => [...list, toast].slice(-ToastService.MAX_VISIBLE));
    setTimeout(() => this.dismiss(toast.id), ToastService.LIFETIME_MS);
  }

  dismiss(id: number): void {
    this._toasts.update((list) => list.filter((toast) => toast.id !== id));
  }
}
