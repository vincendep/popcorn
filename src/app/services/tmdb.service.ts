import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Movie } from '../models/domain/movie';
import { Page } from '../models/page';
import { TmdbMovie } from '../models/tmdb/tmdb-movie';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = environment.TMDB_API_KEY
  private baseUrl = "https://api.themoviedb.org/3"
  private imageBaseUrl = "https://image.tmdb.org/t/p"
  private movieGenresCache = {}

  constructor(private http: HttpClient) {}

  discoverMovie(filter: {genres?: string, keywords?: string, watchProviders?: string}) {
    const path = 'discover/movie'
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey,
        with_genres: filter.genres,
        with_keywords: filter.keywords,
        with_watch_providers: filter.watchProviders
      }
    })
  }

  find(id: string, externalSource: string = "imdb_id"): any {
    const path = `find/${id}`
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey,
        external_source: externalSource
      }
    })
  }

  getImage(path: string, size: string = 'original'): string {
    return this.imageBaseUrl + "/" + size + path
  }

  getMovieCredits(id: Number) {
    const path = `movie/${id}/credits`
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey,
      }
    })
  }

  getMovieDetails(id: Number): Observable<TmdbMovie> {
    const path = `movie/${id}`
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey
      }
    }).pipe(map(res => new TmdbMovie(res, this)))
  }

  getMovieGenresList(language: string = 'en-US') {
    if (this.movieGenresCache[language]) {
      return of(this.movieGenresCache[language])
    } else {
      const path = 'genre/movie/list'
      return this.http.get(this.buildUrl(path), {
        params: {
          api_key: this.apiKey,
          language: language
        }
      }).pipe(
        tap(genresList => this.movieGenresCache[language] = genresList)
      )
    }
  }

  getMovieRecommendations(id: number, page: number = 1): Observable<Page<TmdbMovie>> {
    const path = `movie/${id}/recommendations`
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey
      }
    }).pipe(
        map((res: any) => new Page<TmdbMovie>(
          res.page,
          res.total_pages,
          res.total_results,
          res.results.map((movie: any) => new TmdbMovie(movie, this)))))
  }

  getMovieWatchProviders(id: Number) {
    const path = `movie/${id}/watch/providers`
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey
      }
    })
  }

  private buildUrl(path: String) {
    return this.baseUrl + "/" + path
  }
}
