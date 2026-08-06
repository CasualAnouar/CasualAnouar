import { Injectable, signal } from '@angular/core';
import { Author, Category } from '../models/community.model';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  readonly categories = signal<readonly Category[]>([
    { id: 'pronostics', label: 'Pronostics', color: '#3f4891' },
    { id: 'discussion-generale', label: 'Discussion générale', color: '#b85a1e' },
    { id: 'resultats-rapports', label: 'Résultats & rapports', color: '#7ec26c' },
    { id: 'offres-promos', label: 'Offres & promos', color: '#e6110a' },
    { id: 'debutants', label: 'Débutants', color: '#fea87a' },
    { id: 'sorec-tv', label: 'Sorec TV', color: '#b0b0b0' },
    { id: 'archives-2023', label: 'Archives 2023', color: '#b0b0b0' },
  ]);

  category(id: string): Category {
    return (
      this.categories().find((c) => c.id === id) ?? {
        id,
        label: id,
        color: '#b0b0b0',
      }
    );
  }

  readonly authors: Readonly<Record<string, Author>> = {
    pronostaQuintus: { handle: 'PronostaQuintus', initials: 'PR', tone: 'dark' },
    betKing99: { handle: 'BetKing_99', initials: 'BE', tone: 'orange' },
    luckyHorse: { handle: 'LuckyHorse', initials: 'LU', tone: 'green' },
    chanceLuck77: { handle: 'ChanceLuck77', initials: 'CH', tone: 'green' },
    insideTrack: { handle: 'InsideTrack', initials: 'IN', tone: 'grey' },
    misterCash: { handle: 'MisterCash', initials: 'MI', tone: 'orange' },
    raceKing12: { handle: 'RaceKing12', initials: 'RA', tone: 'red' },
    promoHunter: { handle: 'PromoHunter', initials: 'PR', tone: 'dark' },
    skepticalBettor: { handle: 'SkepticalBettor', initials: 'SK', tone: 'red' },
    tipsterPro: { handle: 'TipsterPro', initials: 'TI', tone: 'dark' },
    vieuxTurfiste: { handle: 'VieuxTurfiste', initials: 'VI', tone: 'green' },
    jonas12: { handle: 'Jonas12', initials: 'JO', tone: 'blue' },
    newbieTurf: { handle: 'NewbieTurf', initials: 'NE', tone: 'grey' },
    turfMasterX: { handle: 'TurfMaster_x', initials: 'TU', tone: 'blue' },
    hippiqueExpert: { handle: 'HippiqueExpert', initials: 'HI', tone: 'orange' },
    promoMaster: { handle: 'PromoMaster', initials: 'PR', tone: 'red' },
    horseAnalyst: { handle: 'HorseAnalyst', initials: 'HO', tone: 'dark' },
  };
}
