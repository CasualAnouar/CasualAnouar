import { Component, computed, inject, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Icon } from '@shared/icon/icon';
import { Avatar } from '@shared/avatar/avatar';
import { PageHeader } from '@shared/page-header/page-header';
import { Modal } from '@shared/modal/modal';
import { SettingsService } from '@data/services/settings.service';
import { ToastService } from '@core/services/toast.service';
import { CategoryRow, StaffRole } from '@data/models/community.model';

@Component({
  selector: 'app-settings',
  imports: [TranslateModule, Icon, Avatar, PageHeader, Modal],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  private readonly settings = inject(SettingsService);
  private readonly toast = inject(ToastService);
  private readonly translate = inject(TranslateService);

  protected readonly staff = this.settings.staff;
  protected readonly palette = this.settings.categoryPalette;

  private readonly categoryRows = signal<readonly CategoryRow[]>(
    this.settings.categories()
  );
  protected readonly categories = this.categoryRows.asReadonly();

  protected readonly publishedCount = computed(
    () => this.categoryRows().filter((c) => c.status === 'published').length
  );

  protected readonly inviteOpen = signal(false);
  protected readonly categoryOpen = signal(false);

  protected readonly inviteName = signal('');
  protected readonly inviteEmail = signal('');
  protected readonly inviteRole = signal<StaffRole>('moderator-m');

  protected readonly categoryName = signal('');
  protected readonly categoryColor = signal('#3f4891');
  protected readonly categoryStatus = signal<'published' | 'hidden'>('published');

  protected roleKey(role: StaffRole): string {
    return `role.${role}`;
  }

  protected roleClass(role: StaffRole): string {
    if (role === 'admin') {
      return 'pill-red';
    }
    return role === 'support' ? 'pill-orange' : 'pill-blue';
  }

  protected openInvite(): void {
    this.inviteName.set('');
    this.inviteEmail.set('');
    this.inviteRole.set('moderator-m');
    this.inviteOpen.set(true);
  }

  protected confirmInvite(): void {
    const name = this.inviteName().trim();
    this.inviteOpen.set(false);
    this.toast.show(
      this.translate.instant('settings.toast.invited', {
        name: name || this.translate.instant('settings.invite.defaultName'),
      })
    );
  }

  protected openCategory(): void {
    this.categoryName.set('');
    this.categoryColor.set('#3f4891');
    this.categoryStatus.set('published');
    this.categoryOpen.set(true);
  }

  protected confirmCategory(): void {
    const label = this.categoryName().trim();
    if (!label) {
      this.categoryOpen.set(false);
      return;
    }

    this.categoryRows.update((rows) => [
      ...rows,
      {
        id: label.toLowerCase().replace(/\s+/g, '-'),
        label,
        color: this.categoryColor(),
        topics: 0,
        messages: 0,
        status: this.categoryStatus(),
      },
    ]);

    this.categoryOpen.set(false);
    this.toast.show(
      this.translate.instant('settings.toast.categoryAdded', { label })
    );
  }

  protected toggleCategory(row: CategoryRow): void {
    this.categoryRows.update((rows) =>
      rows.map((item) =>
        item.id === row.id
          ? {
              ...item,
              status: item.status === 'published' ? 'hidden' : 'published',
            }
          : item
      )
    );
  }

  protected removeCategory(row: CategoryRow): void {
    this.categoryRows.update((rows) => rows.filter((item) => item.id !== row.id));
    this.toast.show(
      this.translate.instant('settings.toast.categoryRemoved', { label: row.label })
    );
  }
}
