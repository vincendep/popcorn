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

  getMovieCredits(id: Number) {
    const path = `movie/${id}/credits`
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey,
        language: this.languages
      }
    })
  }

  getMovieDetails(id: Number): Observable<TmdbMovie> {
    const path = `movie/${id}`
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey,
        language: this.languages
      }
    }).pipe(map(res => new TmdbMovie(res, this)))
  }

  getMovieRecommendations(movieId: number, page: number = 1): Observable<Page<TmdbMovie>> {
    const path = `movie/${movieId}/recommendations`
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey,
        language: this.languages
      }
    }).pipe(
        map((res: any) => new Page<TmdbMovie>(
          res.page,
          res.total_pages,
          res.total_results,
          res.results.map((movie: any) => new TmdbMovie(movie, this)))))
  }

  getMovieVideos(movieId: number) {
    const path = `movie/${movieId}/videos`
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey,
        language: this.languages
      }
    }).pipe(
      map((response: any) => response.results)
    )
  }

  // TODO extract
  discoverMovie(filter: {genres?: string, keywords?: string, watchProviders?: string}) {
    const path = 'discover/movie'
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey,
        language: this.languages,
        with_genres: filter.genres,
        with_keywords: filter.keywords,
        with_watch_providers: filter.watchProviders
      }
    })
  }

  // TODO extract
  find(id: string, externalSource: string = "imdb_id"): any {
    const path = `find/${id}`
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey,
        language: this.languages,
        external_source: externalSource
      }
    })
  }

  // TODO extract
  getMovieGenresList() {
    const path = 'genre/movie/list'
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey,
        language: this.languages
      }
    })
  }
}
