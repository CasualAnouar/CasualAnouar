import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Icon } from '@shared/icon/icon';
import { Avatar } from '@shared/avatar/avatar';
import { DashboardService } from '@data/services/dashboard.service';
import { SessionService } from '@data/services/session.service';
import { Priority } from '@data/models/community.model';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, TranslateModule, Icon, Avatar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly dashboard = inject(DashboardService);
  private readonly session = inject(SessionService);

  protected readonly periods = this.dashboard.periods;
  protected readonly kpis = this.dashboard.kpis;
  protected readonly priorityItems = this.dashboard.priorityItems;
  protected readonly latestTopics = this.dashboard.latestTopics;
  protected readonly currentUser = this.session.currentUser;

  protected readonly selectedPeriod = signal('last30');

  protected selectPeriod(id: string): void {
    this.selectedPeriod.set(id);
  }

  protected priorityLabel(priority: Priority): string {
    return `priority.${priority}`;
  }
}
