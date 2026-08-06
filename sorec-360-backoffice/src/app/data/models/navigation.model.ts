import { IconName } from '@shared/icon/icon';

export interface NavItem {
  readonly label: string;
  readonly icon: IconName;
  readonly route: string;
  readonly exact: boolean;
  readonly badge?: number;
}

export interface NavSection {
  readonly label: string;
  readonly items: readonly NavItem[];
}
