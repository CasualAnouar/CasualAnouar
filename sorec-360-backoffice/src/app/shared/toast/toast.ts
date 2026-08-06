import { Component, inject } from '@angular/core';
import { Icon } from '@shared/icon/icon';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [Icon],
  template: `
    @if (message(); as text) {
      <div class="toast" role="status">
        <app-icon name="info" [size]="17" />
        <span>{{ text }}</span>
      </div>
    }
  `,
  styleUrl: './toast.scss',
})
export class Toast {
  private readonly toast = inject(ToastService);
  protected readonly message = this.toast.message;
}
