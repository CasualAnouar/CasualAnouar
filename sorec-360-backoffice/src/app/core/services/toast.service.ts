import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private timer: ReturnType<typeof setTimeout> | null = null;

  readonly message = signal<string | null>(null);

  show(message: string, durationMs = 3200): void {
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
    this.message.set(message);
    this.timer = setTimeout(() => this.message.set(null), durationMs);
  }

  dismiss(): void {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.message.set(null);
  }
}
