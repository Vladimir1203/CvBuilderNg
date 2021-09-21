import { TestBed } from '@angular/core/testing';

import { CheckedLoggedInUserService } from './checked-logged-in-user.service';

describe('CheckedLoggedInUserService', () => {
  let service: CheckedLoggedInUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckedLoggedInUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
