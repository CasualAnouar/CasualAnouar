import { Component, computed, inject, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Icon } from '@shared/icon/icon';
import { Avatar } from '@shared/avatar/avatar';
import { PageHeader } from '@shared/page-header/page-header';
import { MembersService } from '@data/services/members.service';
import { ToastService } from '@core/services/toast.service';
import { Member, ReputationTier } from '@data/models/community.model';

@Component({
  selector: 'app-members',
  imports: [TranslateModule, Icon, Avatar, PageHeader],
  templateUrl: './members.html',
  styleUrl: './members.scss',
})
export class Members {
  private readonly membersService = inject(MembersService);
  private readonly toast = inject(ToastService);
  private readonly translate = inject(TranslateService);

  protected readonly totalCount = this.membersService.totalCount;
  protected readonly activeCount = this.membersService.activeCount;
  protected readonly blockedCount = this.membersService.blockedCount;

  private readonly source = signal<readonly Member[]>(
    this.membersService.members()
  );

  protected readonly sort = signal('reports');
  protected readonly statusFilter = signal('all');
  protected readonly search = signal('');

  protected readonly rows = computed(() => {
    const term = this.search().trim().toLowerCase();
    const status = this.statusFilter();

    const filtered = this.source().filter((member) => {
      const matchesStatus = status === 'all' || member.status === status;
      const matchesTerm = !term || member.handle.toLowerCase().includes(term);
      return matchesStatus && matchesTerm;
    });

    return [...filtered].sort((a, b) => {
      if (this.sort() === 'reports') {
        return b.reports - a.reports;
      }
      if (this.sort() === 'messages') {
        return b.messages - a.messages;
      }
      return a.reputation - b.reputation;
    });
  });

  protected tierKey(tier: ReputationTier): string {
    return `tier.${tier}`;
  }

  protected tierColor(tier: ReputationTier): string {
    switch (tier) {
      case 'at-risk':
        return '#e6110a';
      case 'watch':
        return '#fea87a';
      case 'trusted':
        return '#4a9438';
      default:
        return '#9aa0a3';
    }
  }

  protected toggleStatus(member: Member): void {
    const nextStatus = member.status === 'blocked' ? 'active' : 'blocked';
    this.source.update((rows) =>
      rows.map((row) =>
        row.id === member.id ? { ...row, status: nextStatus } : row
      )
    );
    this.toast.show(
      this.translate.instant(
        nextStatus === 'blocked'
          ? 'members.toast.blocked'
          : 'members.toast.reactivated',
        { handle: member.handle }
      )
    );
  }

  protected onSearch(value: string): void {
    this.search.set(value);
  }
}
