import { TestBed } from '@angular/core/testing';

import { LegacyService } from './legacy.service';

describe('LegacyService', () => {
  let service: LegacyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegacyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
