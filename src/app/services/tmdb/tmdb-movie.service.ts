import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Movie } from 'src/app/models/domain/movie';

import { Page } from '../../models/common/page';
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
  getMovieGenresList() {
    return this.tmdb.call('genre/movie/list')
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

  getMovieRecommendations(movieId: number, page: number = 1): Observable<Page<TmdbMovie>> {
    return this.tmdb.call(`movie/${movieId}/recommendations`, { 'page': page })
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

  getPopularMovies(page: number = 1) {
    return this.tmdb.call('movie/popular', { 'page': page })
      .pipe(
        map((res: any) => new Page<Movie>(
          res.page,
          res.total_pages,
          res.total_results,
          res.results.map((movie: TmdbMovie) => new TmdbMovie(this.tmdb, movie))
        )
      )
    )
  }

  getTrendingMovies(timeWindow: 'day' | 'week' = 'day', page: number = 1) {
    return this.tmdb.call(`trending/movie/${timeWindow}`, { 'page': page })
      .pipe(
        map((res: any) => new Page<Movie>(
          res.page,
          res.total_pages,
          res.total_results,
          res.results.map((movie: TmdbMovie) => new TmdbMovie(this.tmdb, movie))
        )
      )
    )
  }
}
