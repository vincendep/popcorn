import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Page } from '../../models/page';
import { TmdbMovie } from '../../models/tmdb/tmdb-movie';
import { TmdbService } from './tmdb.service';

@Injectable({
  providedIn: 'root'
})
export class TmdbMovieService extends TmdbService {

  // TODO extract
  discoverMovie(filter: {genres?: string, keywords?: string, watchProviders?: string}) {
    return this.call('discover/movie', {
      with_genres: filter.genres,
      with_keywords: filter.keywords,
      with_watch_providers: filter.watchProviders
    })
  }

  getMovieCredits(id: Number) {
    return this.call(`movie/${id}/credits`)
  }

  getMovieDetails(id: Number): Observable<TmdbMovie> {
    return this.call(`movie/${id}`)
      .pipe(
        map(res => new TmdbMovie(res, this)
      )
    )
  }

  // TODO extract
  getMovieGenresList() {
    return this.call('genre/movie/list')
  }

  getMovieRecommendations(movieId: number, page: number = 1): Observable<Page<TmdbMovie>> {
    return this.call(`movie/${movieId}/recommendations`)
      .pipe(
        map((res: any) => new Page<TmdbMovie>(
          res.page,
          res.total_pages,
          res.total_results,
          res.results.map((movie: any) => new TmdbMovie(movie, this)
          )
        )
      )
    )
  }

  getMovieVideos(movieId: number) {
    return this.call(`movie/${movieId}/videos`)
      .pipe(
        map((response: any) => response.results
      )
    )
  }
}
