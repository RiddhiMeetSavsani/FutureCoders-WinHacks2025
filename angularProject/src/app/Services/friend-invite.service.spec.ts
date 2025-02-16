import { TestBed } from '@angular/core/testing';

import { FriendInviteService } from './friend-invite.service';

describe('FriendInviteService', () => {
  let service: FriendInviteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendInviteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
