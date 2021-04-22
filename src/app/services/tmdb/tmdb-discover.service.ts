import { Injectable } from '@angular/core';
import { TmdbService } from './tmdb.service';

@Injectable({
  providedIn: 'root'
})
export class TmdbDiscoverService {

  constructor(
    private tmdb: TmdbService
  ) {}

  discoverMovie(filter: {genres?: string, keywords?: string, watchProviders?: string}) {
    return this.tmdb.call('discover/movie', {
      with_genres: filter.genres,
      with_keywords: filter.keywords,
      with_watch_providers: filter.watchProviders
    })
  }
}
