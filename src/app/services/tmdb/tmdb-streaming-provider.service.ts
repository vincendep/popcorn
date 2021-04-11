import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MovieStreamingProviders } from 'src/app/models/domain/streaming-provider';
import { TmdbStreamingProvider } from 'src/app/models/tmdb/tmdb-streaming-provider';
import { TmdbService } from './tmdb.service';

@Injectable({
  providedIn: 'root'
})
export class TmdbStreamingProviderService extends TmdbService {

  // TODO localization service for watch providers
  getMovieWatchProviders(movieId: Number, countryId: string = "IT"): Observable<MovieStreamingProviders> {
    return this.call(`movie/${movieId}/watch/providers`).pipe(
      map((response: any) => response.results[countryId]),
      map((results: any) => new MovieStreamingProviders(
        results?.rent?.map(provider =>
            new TmdbStreamingProvider(provider, this)) || [],
        results?.flatrate?.map(provider =>
            new TmdbStreamingProvider(provider, this)) || [],
        results?.buy?.map(provider =>
            new TmdbStreamingProvider(provider, this)) || []
        )
      )
    )
  }
}
