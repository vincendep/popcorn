import { TestBed } from '@angular/core/testing';

import { TmdbStreamingProviderService } from './tmdb-streaming-provider.service';

describe('WatchProviderServiceService', () => {
  let service: TmdbStreamingProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmdbStreamingProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
