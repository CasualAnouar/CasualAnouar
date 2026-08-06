import { AvatarTone } from '@shared/avatar/avatar';
import { IconName } from '@shared/icon/icon';

export type Priority = 'urgent' | 'high' | 'medium';
export type ReportStatus = 'pending' | 'handled';
export type TopicStatus = 'pinned' | 'published' | 'hidden' | 'closed';
export type MemberStatus = 'active' | 'blocked';
export type CategoryStatus = 'published' | 'hidden';
export type ReputationTier = 'at-risk' | 'watch' | 'standard' | 'trusted';
export type StaffRole = 'admin' | 'moderator-f' | 'moderator-m' | 'support';
export type ModerationDecision = 'approved' | 'deleted' | 'blocked';

export interface Author {
  readonly handle: string;
  readonly initials: string;
  readonly tone: AvatarTone;
}

export interface Kpi {
  readonly id: string;
  readonly icon: IconName;
  readonly label: string;
  readonly value: string;
  readonly foot: string;
  readonly tone: 'neutral' | 'green' | 'blue' | 'red';
  readonly actionRoute?: string;
}

export interface PeriodOption {
  readonly id: string;
  readonly label: string;
}

export interface PriorityItem {
  readonly rank: string;
  readonly reason: string;
  readonly excerpt: string;
  readonly author: Author;
  readonly reportCount: number;
  readonly receivedAt: string;
  readonly priority: Priority;
}

export interface TopicSummary {
  readonly id: string;
  readonly title: string;
  readonly author: Author;
  readonly category: Category;
  readonly views: number;
  readonly replies: number;
  readonly postedAt: string;
}

export interface Report {
  readonly id: string;
  readonly excerpt: string;
  readonly source: string;
  readonly author: Author;
  readonly reason: string;
  readonly reportCount: number;
  readonly priority: Priority;
  readonly receivedAt: string;
  readonly status: ReportStatus;
  readonly decision?: ModerationDecision;
  readonly handledAt?: string;
  readonly handledBy?: string;
}

export interface Category {
  readonly id: string;
  readonly label: string;
  readonly color: string;
}

export interface CategoryRow extends Category {
  readonly topics: number;
  readonly messages: number;
  readonly status: CategoryStatus;
}

export interface Topic {
  readonly id: string;
  readonly title: string;
  readonly excerpt: string;
  readonly author: Author;
  readonly category: Category;
  readonly replies: number;
  readonly views: number;
  readonly reports: number;
  readonly status: TopicStatus;
  readonly createdAt: string;
}

export interface TopicMessage {
  readonly id: string;
  readonly author: Author;
  readonly isTopicAuthor: boolean;
  readonly authorBlocked: boolean;
  readonly postedAt: string;
  readonly body: string;
  readonly likes: number;
  readonly reportCount: number;
}

export interface TopicAuthorProfile {
  readonly author: Author;
  readonly memberSince: string;
  readonly messages: number;
  readonly reports: number;
  readonly reputation: number;
  readonly reputationLabel: string;
}

export interface Member {
  readonly id: string;
  readonly handle: string;
  readonly initials: string;
  readonly tone: AvatarTone;
  readonly registeredAt: string;
  readonly topics: number;
  readonly messages: number;
  readonly reports: number;
  readonly reputation: number;
  readonly tier: ReputationTier;
  readonly status: MemberStatus;
}

export interface StaffUser {
  readonly id: string;
  readonly name: string;
  readonly initials: string;
  readonly tone: AvatarTone;
  readonly email: string;
  readonly role: StaffRole;
  readonly permissions: string;
  readonly isCurrentUser: boolean;
}

export interface SessionUser {
  readonly name: string;
  readonly initials: string;
  readonly firstName: string;
  readonly roleLabel: string;
}
