import { Component, computed, input } from '@angular/core';

export type AvatarTone = 'blue' | 'orange' | 'dark' | 'green' | 'red' | 'grey';

@Component({
  selector: 'app-avatar',
  template: `<span
    class="avatar"
    [class]="'tone-' + tone()"
    [style.width.px]="size()"
    [style.height.px]="size()"
    [style.fontSize.px]="fontSize()"
    >{{ initials() }}</span
  >`,
  styleUrl: './avatar.scss',
})
export class Avatar {
  readonly label = input.required<string>();
  readonly tone = input<AvatarTone>('grey');
  readonly size = input(30);

  protected readonly initials = computed(() =>
    this.label().replace(/[^a-zA-ZÀ-ÿ0-9]/g, '').slice(0, 2).toUpperCase()
  );

  protected readonly fontSize = computed(() =>
    Math.max(10, Math.round(this.size() * 0.4))
  );
}
