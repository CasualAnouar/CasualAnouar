import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'pilotage/vue-ensemble' },
      {
        path: 'pilotage/vue-ensemble',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'moderation/file',
        loadComponent: () =>
          import('./features/moderation-queue/moderation-queue').then(
            (m) => m.ModerationQueue
          ),
      },
      {
        path: 'moderation/sujets',
        loadComponent: () =>
          import('./features/topics/topics').then((m) => m.Topics),
      },
      {
        path: 'moderation/sujets/:id',
        loadComponent: () =>
          import('./features/topic-detail/topic-detail').then(
            (m) => m.TopicDetail
          ),
      },
      {
        path: 'moderation/membres',
        loadComponent: () =>
          import('./features/members/members').then((m) => m.Members),
      },
      {
        path: 'configuration/parametres',
        loadComponent: () =>
          import('./features/settings/settings').then((m) => m.Settings),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
