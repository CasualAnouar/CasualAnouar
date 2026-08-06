import { Injectable, signal } from '@angular/core';
import { NavSection } from '../models/navigation.model';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  readonly sections = signal<readonly NavSection[]>([
    {
      label: 'nav.section.pilotage',
      items: [
        {
          label: 'nav.overview',
          icon: 'grid',
          route: '/pilotage/vue-ensemble',
          exact: true,
        },
      ],
    },
    {
      label: 'nav.section.moderation',
      items: [
        {
          label: 'nav.queue',
          icon: 'flag',
          route: '/moderation/file',
          exact: true,
          badge: 12,
        },
        {
          label: 'nav.topics',
          icon: 'message',
          route: '/moderation/sujets',
          exact: false,
        },
        {
          label: 'nav.members',
          icon: 'users',
          route: '/moderation/membres',
          exact: true,
        },
      ],
    },
    {
      label: 'nav.section.configuration',
      items: [
        {
          label: 'nav.settings',
          icon: 'settings',
          route: '/configuration/parametres',
          exact: true,
        },
      ],
    },
  ]);
}
