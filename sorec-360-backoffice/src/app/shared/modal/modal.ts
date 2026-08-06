import { Component, input, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-modal',
  imports: [TranslateModule],
  template: `
    <div class="overlay" (click)="dismissed.emit()">
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="title() | translate"
        (click)="$event.stopPropagation()"
      >
        <h3 class="modal-title">{{ title() | translate }}</h3>
        <p class="modal-desc">{{ description() | translate }}</p>

        <div class="modal-body">
          <ng-content />
        </div>

        @if (note()) {
          <p class="modal-note">{{ note()! | translate }}</p>
        }

        <div class="modal-actions">
          <button type="button" class="btn btn-outline" (click)="dismissed.emit()">
            {{ 'action.cancel' | translate }}
          </button>
          <button type="button" class="btn btn-primary" (click)="confirmed.emit()">
            {{ confirmLabel() | translate }}
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './modal.scss',
})
export class Modal {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly confirmLabel = input.required<string>();
  readonly note = input<string | null>(null);

  readonly dismissed = output<void>();
  readonly confirmed = output<void>();
}
