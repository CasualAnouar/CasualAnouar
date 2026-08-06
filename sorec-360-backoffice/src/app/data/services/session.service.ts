import { Injectable, signal } from '@angular/core';
import { SessionUser } from '../models/community.model';

@Injectable({ providedIn: 'root' })
export class SessionService {
  readonly currentUser = signal<SessionUser>({
    name: 'Karim Benali',
    initials: 'KB',
    firstName: 'Karim',
    roleLabel: 'role.admin',
  });
}
