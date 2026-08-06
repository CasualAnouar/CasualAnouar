import { Injectable, inject, signal } from '@angular/core';
import {
  Kpi,
  PeriodOption,
  PriorityItem,
  TopicSummary,
} from '../models/community.model';
import { CatalogService } from './catalog.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly catalog = inject(CatalogService);

  readonly periods = signal<readonly PeriodOption[]>([
    { id: 'today', label: 'period.today' },
    { id: 'week', label: 'period.week' },
    { id: 'month', label: 'period.month' },
    { id: 'last30', label: 'period.last30' },
    { id: 'year', label: 'period.year' },
    { id: 'all', label: 'period.all' },
  ]);

  readonly kpis = signal<readonly Kpi[]>([
    {
      id: 'active-members',
      icon: 'users',
      label: 'dashboard.kpi.activeMembers',
      value: '4 218',
      foot: 'dashboard.kpi.activeMembersFoot',
      tone: 'green',
    },
    {
      id: 'topics',
      icon: 'message',
      label: 'dashboard.kpi.topics',
      value: '1 220',
      foot: 'dashboard.kpi.topicsFoot',
      tone: 'neutral',
    },
    {
      id: 'messages',
      icon: 'activity',
      label: 'dashboard.kpi.messages',
      value: '9 742',
      foot: 'dashboard.kpi.messagesFoot',
      tone: 'blue',
    },
    {
      id: 'pending-reports',
      icon: 'flag',
      label: 'dashboard.kpi.pendingReports',
      value: '12',
      foot: 'dashboard.kpi.pendingReportsAction',
      tone: 'red',
      actionRoute: '/moderation/file',
    },
  ]);

  readonly priorityItems = signal<readonly PriorityItem[]>([
    {
      rank: '01',
      reason: 'Désinformation',
      excerpt: "J'ai une source à l'écurie, la course de diman…",
      author: this.catalog.authors['insideTrack'],
      reportCount: 3,
      receivedAt: 'hier',
      priority: 'urgent',
    },
    {
      rank: '02',
      reason: 'Contenu à risque (jeu)',
      excerpt: 'Je remets tout mon salaire ce soir, cette fois…',
      author: this.catalog.authors['misterCash'],
      reportCount: 5,
      receivedAt: 'il y a 10 h',
      priority: 'urgent',
    },
    {
      rank: '03',
      reason: 'Harcèlement',
      excerpt: 'Tu ferais mieux de te taire, on sait tous où t…',
      author: this.catalog.authors['raceKing12'],
      reportCount: 3,
      receivedAt: 'il y a 6 h',
      priority: 'urgent',
    },
    {
      rank: '04',
      reason: 'Contenu à risque (jeu)',
      excerpt: 'Code promo TRICHE2024 pour contourner les limi…',
      author: this.catalog.authors['promoHunter'],
      reportCount: 4,
      receivedAt: 'il y a 4 h',
      priority: 'urgent',
    },
  ]);

  readonly latestTopics = signal<readonly TopicSummary[]>([
    {
      id: 'groupe-pronos-prive',
      title: 'Rejoignez mon groupe de pronos privé',
      author: this.catalog.authors['betKing99'],
      category: this.catalog.category('discussion-generale'),
      views: 61,
      replies: 4,
      postedAt: 'il y a 1 h',
    },
    {
      id: 'arc-de-triomphe-2024',
      title: "Pronostic Prix de l'Arc de Triomphe – édition 2024",
      author: this.catalog.authors['pronostaQuintus'],
      category: this.catalog.category('pronostics'),
      views: 156,
      replies: 24,
      postedAt: 'il y a 2 h',
    },
    {
      id: 'cheval-dope',
      title: "Ce cheval était dopé, c'est scandaleux",
      author: this.catalog.authors['luckyHorse'],
      category: this.catalog.category('resultats-rapports'),
      views: 842,
      replies: 67,
      postedAt: 'il y a 3 h',
    },
    {
      id: 'gagne-500-mad',
      title: "J'ai gagné 500 MAD au Tiercé ce matin !",
      author: this.catalog.authors['chanceLuck77'],
      category: this.catalog.category('resultats-rapports'),
      views: 203,
      replies: 18,
      postedAt: 'il y a 4 h',
    },
  ]);
}
