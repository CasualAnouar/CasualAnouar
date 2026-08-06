import { Component, computed, inject, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Icon } from '@shared/icon/icon';
import { Avatar } from '@shared/avatar/avatar';
import { PageHeader } from '@shared/page-header/page-header';
import { ModerationService } from '@data/services/moderation.service';
import { ToastService } from '@core/services/toast.service';
import {
  ModerationDecision,
  Priority,
  Report,
} from '@data/models/community.model';

type QueueTab = 'pending' | 'handled';

@Component({
  selector: 'app-moderation-queue',
  imports: [TranslateModule, Icon, Avatar, PageHeader],
  templateUrl: './moderation-queue.html',
  styleUrl: './moderation-queue.scss',
})
export class ModerationQueue {
  private readonly moderation = inject(ModerationService);
  private readonly toast = inject(ToastService);
  private readonly translate = inject(TranslateService);

  protected readonly activeTab = signal<QueueTab>('pending');
  protected readonly search = signal('');

  private readonly reports = signal<readonly Report[]>(
    this.moderation.reports()
  );

  protected readonly pending = computed(() =>
    this.filter(this.reports().filter((r) => r.status === 'pending'))
  );

  protected readonly handled = computed(() =>
    this.filter(this.reports().filter((r) => r.status === 'handled'))
  );

  protected readonly pendingCount = computed(
    () => this.reports().filter((r) => r.status === 'pending').length
  );

  protected readonly handledCount = computed(
    () => this.reports().filter((r) => r.status === 'handled').length
  );

  private filter(rows: readonly Report[]): readonly Report[] {
    const term = this.search().trim().toLowerCase();
    if (!term) {
      return rows;
    }
    return rows.filter(
      (r) =>
        r.excerpt.toLowerCase().includes(term) ||
        r.author.handle.toLowerCase().includes(term) ||
        r.reason.toLowerCase().includes(term)
    );
  }

  protected selectTab(tab: QueueTab): void {
    this.activeTab.set(tab);
  }

  protected onSearch(value: string): void {
    this.search.set(value);
  }

  protected decide(report: Report, decision: ModerationDecision): void {
    this.reports.update((rows) =>
      rows.map((row) =>
        row.id === report.id
          ? {
              ...row,
              status: 'handled' as const,
              decision,
              handledAt: this.translate.instant('common.justNow'),
              handledBy: 'Karim Benali',
            }
          : row
      )
    );
    this.toast.show(
      this.translate.instant(`queue.toast.${decision}`, {
        author: report.author.handle,
      })
    );
  }

  protected priorityKey(priority: Priority): string {
    return `priority.${priority}`;
  }

  protected priorityIcon(priority: Priority): 'alert-circle' | 'alert-triangle' | 'clock' {
    if (priority === 'urgent') {
      return 'alert-circle';
    }
    return priority === 'high' ? 'alert-triangle' : 'clock';
  }

  protected decisionKey(decision: ModerationDecision | undefined): string {
    return decision ? `decision.${decision}` : 'decision.approved';
  }
}
