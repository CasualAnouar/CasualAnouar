import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Icon } from '@shared/icon/icon';
import { Avatar } from '@shared/avatar/avatar';
import { TopicsService } from '@data/services/topics.service';
import { ToastService } from '@core/services/toast.service';
import { TopicMessage, TopicStatus } from '@data/models/community.model';

@Component({
  selector: 'app-topic-detail',
  imports: [RouterLink, TranslateModule, Icon, Avatar],
  templateUrl: './topic-detail.html',
  styleUrl: './topic-detail.scss',
})
export class TopicDetail {
  private readonly topicsService = inject(TopicsService);
  private readonly toast = inject(ToastService);
  private readonly translate = inject(TranslateService);

  readonly id = input.required<string>();

  protected readonly topic = computed(() => this.topicsService.topic(this.id()));
  protected readonly messages = this.topicsService.messages;
  protected readonly authorProfile = this.topicsService.authorProfile;

  protected statusKey(status: TopicStatus): string {
    return `topicStatus.${status}`;
  }

  protected act(message: TopicMessage, action: 'hide' | 'delete' | 'ban'): void {
    this.toast.show(
      this.translate.instant(`topicDetail.toast.${action}`, {
        author: message.author.handle,
      })
    );
  }
}
