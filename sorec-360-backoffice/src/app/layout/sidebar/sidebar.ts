import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Icon } from '@shared/icon/icon';
import { Avatar } from '@shared/avatar/avatar';
import { NavigationService } from '@data/services/navigation.service';
import { SessionService } from '@data/services/session.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, TranslateModule, Icon, Avatar],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly navigation = inject(NavigationService);
  private readonly session = inject(SessionService);

  protected readonly sections = this.navigation.sections;
  protected readonly currentUser = this.session.currentUser;
}
