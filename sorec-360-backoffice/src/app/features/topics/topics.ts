import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Icon } from '@shared/icon/icon';
import { Avatar } from '@shared/avatar/avatar';
import { PageHeader } from '@shared/page-header/page-header';
import { TopicsService } from '@data/services/topics.service';
import { CatalogService } from '@data/services/catalog.service';
import { TopicStatus } from '@data/models/community.model';

@Component({
  selector: 'app-topics',
  imports: [RouterLink, TranslateModule, Icon, Avatar, PageHeader],
  templateUrl: './topics.html',
  styleUrl: './topics.scss',
})
export class Topics {
  private readonly topicsService = inject(TopicsService);
  private readonly catalog = inject(CatalogService);

  protected readonly categories = this.catalog.categories;
  protected readonly totalCount = this.topicsService.totalCount;

  protected readonly categoryFilter = signal('all');
  protected readonly statusFilter = signal('all');
  protected readonly sort = signal('reports');
  protected readonly search = signal('');

  protected readonly statuses: readonly TopicStatus[] = [
    'pinned',
    'published',
    'hidden',
    'closed',
  ];

  protected readonly rows = computed(() => {
    const term = this.search().trim().toLowerCase();
    const category = this.categoryFilter();
    const status = this.statusFilter();

    const filtered = this.topicsService.topics().filter((topic) => {
      const matchesCategory = category === 'all' || topic.category.id === category;
      const matchesStatus = status === 'all' || topic.status === status;
      const matchesTerm =
        !term ||
        topic.title.toLowerCase().includes(term) ||
        topic.author.handle.toLowerCase().includes(term);
      return matchesCategory && matchesStatus && matchesTerm;
    });

    return [...filtered].sort((a, b) => {
      if (this.sort() === 'reports') {
        return b.reports - a.reports;
      }
      if (this.sort() === 'views') {
        return b.views - a.views;
      }
      return b.replies - a.replies;
    });
  });

  protected statusKey(status: TopicStatus): string {
    return `topicStatus.${status}`;
  }

  protected statusClass(status: TopicStatus): string {
    switch (status) {
      case 'pinned':
        return 'pill-green';
      case 'hidden':
        return 'pill-red';
      case 'closed':
        return 'pill-orange';
      default:
        return 'pill-grey';
    }
  }

  protected onSearch(value: string): void {
    this.search.set(value);
  }
}
