import { TestBed } from '@angular/core/testing';

import { SendCustomConfigService } from './send-custom-config.service';

describe('SendCustomConfigService', () => {
  let service: SendCustomConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendCustomConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
