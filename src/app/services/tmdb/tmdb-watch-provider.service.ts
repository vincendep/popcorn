import { Injectable } from '@angular/core';
import { forkJoin, merge, Observable, zip } from 'rxjs';
import { distinct, map, mergeMap } from 'rxjs/operators';
import { Country } from 'src/app/models/domain/country';
import { WatchProvider } from 'src/app/models/domain/watch-provider';
import { TmdbWatchProvider } from 'src/app/models/tmdb/tmdb-streaming-provider';
import { TmdbService } from './tmdb.service';

@Injectable({
  providedIn: 'root'
})
export class TmdbWatchProviderService {

  constructor(private tmdb: TmdbService) {}

  getWatchProviders(country?: Country) {
    return forkJoin([
      this.tmdb.call('watch/providers/movie', country ? { watch_region: country.alpha2 } : null)
        .pipe(map((res: any) => res.results)),
      this.tmdb.call('watch/providers/tv', country ? { watch_region: country.alpha2 } : null)
        .pipe(map((res: any) => res.results))])
      .pipe(
        map(([wpm, wpt]) => [...wpm, ...wpt]),
        map(wp => {
          const unique = {};
          wp.forEach(p => unique[p.provider_id] = new TmdbWatchProvider(p, this.tmdb));
          return (Object.values(unique) as WatchProvider[]).sort(WatchProvider.comparator());
        })
      )
  }
}
