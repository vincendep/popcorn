import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Page } from '../../models/page';
import { TmdbMovie } from '../../models/tmdb/tmdb-movie';
import { TmdbService } from './tmdb.service';

@Injectable({
  providedIn: 'root'
})
export class TmdbMovieService {

  constructor(
    private tmdb: TmdbService
  ) {}

  // TODO extract
  discoverMovie(filter: {genres?: string, keywords?: string, watchProviders?: string}) {
    return this.tmdb.call('discover/movie', {
      with_genres: filter.genres,
      with_keywords: filter.keywords,
      with_watch_providers: filter.watchProviders
    })
  }

  getMovieCredits(id: number) {
    return this.tmdb.call(`movie/${id}/credits`)
  }

  getMovieDetails(id: number): Observable<TmdbMovie> {
    return this.tmdb.call<TmdbMovie>(`movie/${id}`)
      .pipe(
        map((movie: TmdbMovie) => new TmdbMovie(this.tmdb, movie)
      )
    )
  }

  // TODO extract
  getMovieGenresList() {
    return this.tmdb.call('genre/movie/list')
  }

  getMovieRecommendations(movieId: number, page: number = 1): Observable<Page<TmdbMovie>> {
    return this.tmdb.call(`movie/${movieId}/recommendations`)
      .pipe(
        map((res: any) => new Page<TmdbMovie>(
          res.page,
          res.total_pages,
          res.total_results,
          res.results.map((movie: TmdbMovie) => new TmdbMovie(this.tmdb, movie)
          )
        )
      )
    )
  }

  getMovieVideos(movieId: number) {
    return this.tmdb.call(`movie/${movieId}/videos`)
      .pipe(
        map((response: any) => response.results
      )
    )
  }
}
