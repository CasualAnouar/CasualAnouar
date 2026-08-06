import { Injectable, signal } from '@angular/core';
import { CategoryRow, StaffUser } from '../models/community.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  readonly staff = signal<readonly StaffUser[]>([
    {
      id: 'karim-benali',
      name: 'Karim Benali',
      initials: 'KB',
      tone: 'blue',
      email: 'karim.benali@sorec.ma',
      role: 'admin',
      permissions: 'Tous droits · modération · configuration',
      isCurrentUser: true,
    },
    {
      id: 'salma-radi',
      name: 'Salma Radi',
      initials: 'SR',
      tone: 'red',
      email: 'salma.radi@sorec.ma',
      role: 'moderator-f',
      permissions: 'Modération des contenus & des membres',
      isCurrentUser: false,
    },
    {
      id: 'youssef-amrani',
      name: 'Youssef Amrani',
      initials: 'YA',
      tone: 'green',
      email: 'youssef.amrani@sorec.ma',
      role: 'moderator-m',
      permissions: 'Modération des contenus & des membres',
      isCurrentUser: false,
    },
    {
      id: 'nadia-el-fassi',
      name: 'Nadia El Fassi',
      initials: 'NE',
      tone: 'orange',
      email: 'nadia.elfassi@sorec.ma',
      role: 'support',
      permissions: 'Lecture seule · traitement des signalements',
      isCurrentUser: false,
    },
  ]);

  readonly categories = signal<readonly CategoryRow[]>([
    {
      id: 'pronostics',
      label: 'Pronostics',
      color: '#3f4891',
      topics: 412,
      messages: 3120,
      status: 'published',
    },
    {
      id: 'discussion-generale',
      label: 'Discussion générale',
      color: '#b85a1e',
      topics: 268,
      messages: 1840,
      status: 'published',
    },
    {
      id: 'resultats-rapports',
      label: 'Résultats & rapports',
      color: '#7ec26c',
      topics: 221,
      messages: 1502,
      status: 'published',
    },
    {
      id: 'offres-promos',
      label: 'Offres & promos',
      color: '#e6110a',
      topics: 159,
      messages: 980,
      status: 'published',
    },
    {
      id: 'debutants',
      label: 'Débutants',
      color: '#fea87a',
      topics: 112,
      messages: 742,
      status: 'published',
    },
    {
      id: 'sorec-tv',
      label: 'Sorec TV',
      color: '#b0b0b0',
      topics: 48,
      messages: 214,
      status: 'hidden',
    },
    {
      id: 'archives-2023',
      label: 'Archives 2023',
      color: '#b0b0b0',
      topics: 0,
      messages: 0,
      status: 'hidden',
    },
  ]);

  readonly categoryPalette: readonly string[] = [
    '#3f4891',
    '#7ec26c',
    '#fea87a',
    '#e6110a',
    '#b85a1e',
    '#b0b0b0',
    '#4a9438',
    '#2f3539',
  ];
}
