import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private apiKey = environment.TMDB_API_KEY
  private baseUrl = "https://api.themoviedb.org/3"
  private imageBaseUrl = "https://image.tmdb.org/t/p"

  constructor(
    private http: HttpClient
  ) { }

  discoverMovie(filter: {genres?: string, keywords?: string, watchProviders?: string} ) {
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

  find(id: string, externalSource: string = "imdb_id") {
    const path = `find/${id}`
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey,
        external_source: externalSource
      }
    })
  }

  getMovieCredits(id: Number) {
    const path = `movie/${id}/credits`
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey,
      }
    })
  }

  getMovieDetails(id: Number) {
    const path = `movie/${id}`
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey
      }
    })
  }

  private movieGenresCache = {}

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

  getMovieRecommendations(id: Number, page: Number = 1) {
    const path = `movie/${id}/recommendations`
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey
      }
    })
  }

  getMovieWatchProviders(id: Number) {
    const path = `movie/${id}/watch/providers`
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey
      }
    })
  }

  getImageUrl(path: string, size: string = 'original') {
    return this.imageBaseUrl + "/" + size + path;
  }

  private buildUrl(path: String) {
    return this.baseUrl + "/" + path
  }
}
