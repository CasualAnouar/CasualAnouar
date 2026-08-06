import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Icon } from '@shared/icon/icon';
import { Avatar } from '@shared/avatar/avatar';
import { SessionService } from '@data/services/session.service';

@Component({
  selector: 'app-topbar',
  imports: [TranslateModule, Icon, Avatar],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  private readonly session = inject(SessionService);
  protected readonly currentUser = this.session.currentUser;
}
