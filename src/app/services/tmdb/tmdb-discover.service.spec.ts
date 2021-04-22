import { TestBed } from '@angular/core/testing';

import { TmdbDiscoverService } from './tmdb-discover.service';

describe('TmdbDiscoverService', () => {
  let service: TmdbDiscoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmdbDiscoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
