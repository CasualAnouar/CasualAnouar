import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Icon } from '@shared/icon/icon';

@Component({
  selector: 'app-page-header',
  imports: [TranslateModule, Icon],
  template: `
    <nav class="crumb">
      <span>{{ section() | translate }}</span>
      <app-icon name="chevron-right" [size]="13" />
      <span class="here">{{ current() | translate }}</span>
    </nav>
    <div class="page-head">
      <h1>{{ title() | translate }}</h1>
      @if (subtitle()) {
        <p class="page-sub">{{ subtitle()! | translate }}</p>
      }
    </div>
  `,
})
export class PageHeader {
  readonly section = input.required<string>();
  readonly current = input.required<string>();
  readonly title = input.required<string>();
  readonly subtitle = input<string | null>(null);
}
