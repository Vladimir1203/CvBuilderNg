import { TestBed } from '@angular/core/testing';

import { FillSectionsService } from './fill-sections.service';

describe('FillSectionsService', () => {
  let service: FillSectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FillSectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
