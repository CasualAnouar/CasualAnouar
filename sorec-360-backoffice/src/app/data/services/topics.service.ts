import { Injectable, inject, signal } from '@angular/core';
import {
  Topic,
  TopicAuthorProfile,
  TopicMessage,
} from '../models/community.model';
import { CatalogService } from './catalog.service';

@Injectable({ providedIn: 'root' })
export class TopicsService {
  private readonly catalog = inject(CatalogService);

  readonly totalCount = 14;

  readonly topics = signal<readonly Topic[]>([
    {
      id: 'arc-de-triomphe-2024',
      title: "Pronostic Prix de l'Arc de Triomphe – édition 2024",
      excerpt: 'Selon moi, Jasper va bien marcher cette année…',
      author: this.catalog.authors['pronostaQuintus'],
      category: this.catalog.category('pronostics'),
      replies: 24,
      views: 156,
      reports: 3,
      status: 'pinned',
      createdAt: '28 sept. 2024, 09:41',
    },
    {
      id: 'reglement-communaute',
      title: 'Règlement de la communauté – à lire avant de poster',
      excerpt: 'Bienvenue sur l’espace communautaire SOREC…',
      author: this.catalog.authors['hippiqueExpert'],
      category: this.catalog.category('discussion-generale'),
      replies: 0,
      views: 104,
      reports: 0,
      status: 'pinned',
      createdAt: '12 janv. 2024, 08:00',
    },
    {
      id: 'vente-pronostics',
      title: 'Vente de pronostics garantis 100 % gagnants',
      excerpt: 'Paiement par virement uniquement, MP…',
      author: this.catalog.authors['tipsterPro'],
      category: this.catalog.category('offres-promos'),
      replies: 2,
      views: 74,
      reports: 9,
      status: 'hidden',
      createdAt: '02 oct. 2024, 17:12',
    },
    {
      id: 'cheval-dope',
      title: "Ce cheval était dopé, c'est scandaleux",
      excerpt: 'Les résultats sont truqués, je le prouve…',
      author: this.catalog.authors['luckyHorse'],
      category: this.catalog.category('resultats-rapports'),
      replies: 67,
      views: 842,
      reports: 8,
      status: 'published',
      createdAt: '30 sept. 2024, 11:26',
    },
    {
      id: 'groupe-pronos-prive',
      title: 'Rejoignez mon groupe de pronos privé',
      excerpt: 'Contactez-moi en MP pour des tuyaux…',
      author: this.catalog.authors['betKing99'],
      category: this.catalog.category('discussion-generale'),
      replies: 4,
      views: 61,
      reports: 6,
      status: 'published',
      createdAt: '03 oct. 2024, 14:05',
    },
    {
      id: 'codes-promos-mars',
      title: 'Nouveaux codes promos disponibles – Mars 2024',
      excerpt: 'CODE15 vous donne 15 % de réduction sur…',
      author: this.catalog.authors['promoMaster'],
      category: this.catalog.category('offres-promos'),
      replies: 13,
      views: 98,
      reports: 5,
      status: 'published',
      createdAt: '18 mars 2024, 10:33',
    },
    {
      id: 'cotes-dimanche',
      title: 'Les cotes du dimanche sont-elles fiables ?',
      excerpt: 'J’ai remarqué des écarts importants entre…',
      author: this.catalog.authors['skepticalBettor'],
      category: this.catalog.category('pronostics'),
      replies: 22,
      views: 307,
      reports: 2,
      status: 'published',
      createdAt: '22 sept. 2024, 19:48',
    },
  ]);

  topic(id: string): Topic | undefined {
    return this.topics().find((t) => t.id === id);
  }

  readonly messages = signal<readonly TopicMessage[]>([
    {
      id: 'm-1',
      author: this.catalog.authors['pronostaQuintus'],
      isTopicAuthor: true,
      authorBlocked: false,
      postedAt: 'il y a 2 h',
      body: 'Salut à tous ! Selon moi, Jasper va bien marcher cette année. Ses performances sur les dernières réunions sont excellentes. Qu’en pensez-vous ?',
      likes: 12,
      reportCount: 0,
    },
    {
      id: 'm-2',
      author: this.catalog.authors['horseAnalyst'],
      isTopicAuthor: false,
      authorBlocked: false,
      postedAt: 'il y a 1 h 45',
      body: 'Je suis d’accord avec toi ! Jasper a montré une belle régularité. Hurricane Lane reste dangereux sur terrain souple, mais je vois Jasper devant.',
      likes: 8,
      reportCount: 0,
    },
    {
      id: 'm-3',
      author: this.catalog.authors['pronostaQuintus'],
      isTopicAuthor: true,
      authorBlocked: false,
      postedAt: 'il y a 1 h 20',
      body: '@HorseAnalyst Exactement ! Et les cotes sont moins mauvaises qu’en début de semaine.',
      likes: 3,
      reportCount: 0,
    },
    {
      id: 'm-4',
      author: this.catalog.authors['skepticalBettor'],
      isTopicAuthor: false,
      authorBlocked: false,
      postedAt: 'il y a 45 min',
      body: 'Arrêtez avec vos pronostics bidons, vous n’y connaissez rien du tout. C’est du grand n’importe quoi ce fil.',
      likes: 0,
      reportCount: 3,
    },
    {
      id: 'm-5',
      author: this.catalog.authors['betKing99'],
      isTopicAuthor: false,
      authorBlocked: true,
      postedAt: 'il y a 30 min',
      body: 'D’accord avec le point technique, mais venez plutôt sur mon groupe privé pour de vrais tuyaux 👉 t.me/betking',
      likes: 1,
      reportCount: 2,
    },
  ]);

  readonly authorProfile = signal<TopicAuthorProfile>({
    author: this.catalog.authors['pronostaQuintus'],
    memberSince: '03 mars 2023',
    messages: 312,
    reports: 0,
    reputation: 95,
    reputationLabel: 'fiable',
  });
}
