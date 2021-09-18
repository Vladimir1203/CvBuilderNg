import { TestBed } from '@angular/core/testing';

import { SaveCVService } from './save-cv.service';

describe('SaveCVService', () => {
  let service: SaveCVService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveCVService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
