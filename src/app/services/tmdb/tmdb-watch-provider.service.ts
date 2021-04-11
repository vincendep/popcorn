import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieWatchProviders } from 'src/app/models/domain/watch-provider';
import { TmdbWatchProvider } from 'src/app/models/tmdb/tmdb-watch-provider';
import { TmdbService } from './tmdb.service';

@Injectable({
  providedIn: 'root'
})
export class TmdbWatchProviderService extends TmdbService {

  // TODO localization service for watch providers
  getMovieWatchProviders(movieId: Number, countryId: string = "IT"): Observable<MovieWatchProviders> {
    const path = `movie/${movieId}/watch/providers`
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey,
        language: this.languages
      }
    }).pipe(
      map((response: any) => response.results[countryId]),
      map((results: any) => new MovieWatchProviders(
        results?.rent?.map(provider =>
            new TmdbWatchProvider(provider, this)) || [],
        results?.flatrate?.map(provider =>
            new TmdbWatchProvider(provider, this)) || [],
        results?.buy?.map(provider =>
            new TmdbWatchProvider(provider, this)) || []
        )
      )
    )
  }
}
