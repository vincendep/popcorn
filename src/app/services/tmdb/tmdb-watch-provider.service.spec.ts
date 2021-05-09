import { TestBed } from '@angular/core/testing';

import { TmdbWatchProviderService } from './tmdb-watch-provider.service';

describe('WatchProviderServiceService', () => {
  let service: TmdbWatchProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmdbWatchProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
