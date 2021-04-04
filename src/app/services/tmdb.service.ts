import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private apiKey = environment.TMDB_API_KEY
  private baseUrl = "https://api.themoviedb.org/3"
  private imageBaseUrl = "https://image.tmdb.org/t/p"
  private defaultExternalSource = "imdb_id"

  constructor(
    private http: HttpClient
  ) { }

  find(id: string, externalSource: string = this.defaultExternalSource) {
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
