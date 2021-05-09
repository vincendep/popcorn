import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Page } from 'src/app/models/common/page';
import { MovieList } from 'src/app/models/domain/list';
import { Movie } from 'src/app/models/domain/movie';
import { WatchProvider } from 'src/app/models/domain/watch-provider';
import { TmdbMovie } from 'src/app/models/tmdb/tmdb-movie';
import { TmdbService } from './tmdb.service';

@Injectable({
  providedIn: 'root'
})
export class TmdbDiscoverService {

  constructor(private tmdb: TmdbService) {}

  // TODO
  getRandomMoviesByProviders(providers: WatchProvider[]): Observable<Page<MovieList>> {
    return null
  }

  getPopularMovies(page: number = 1) {
    return this.tmdb.call('movie/popular', { 'page': page })
      .pipe(
        map((res: any) => new Page<TmdbMovie>(
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

  getTopRatedMovies(page: number = 1, region?: string) {
    return this.tmdb.call(`movie/top_rated`, { 'page': page, 'region': region })
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

  private discoverMovie(filter: {
    region?: string,
    sortBy?: string,
    certification?: {
      code?: string,
      country?: string,
      lte?: string,
      gte?: string,
    },
    includeAdult?: boolean,
    includeVideo?: boolean,
    page?: number,
    release?: {
      primaryReleaseYear?: number,
      primaryReleaseDateGte?: Date,
      primaryReleaseDateLte?: Date,
      releaseDateGte?: Date,
      releaseDateLte?: Date,
      withRelease?: {
        types?: number[],
        disgiuntive?: boolean
      }
    },
    year?: Date,
    vote?: {
      countGte?: number,
      countLte?: number,
      averageGte?: number,
      averageLte?: number
    },
    withCast?: number[],
    withCrew?: number[],
    withPeople?: number[],
    withCompanies?: number[],
    withGenres?: number[],
    withoutGenres?: number[],
    withKeywords?: number[],
    withoutKeywords?: number[],
    withRuntime?: {
      gte?: number,
      lte?: number
    },
    withOriginalLanguage?: string,
    withWatchProviders?: {
      providers?: number[],
      disgiuntive?: boolean,
      region?: string,
      monetizationType?: string
    }
  } = {}) {
    return this.tmdb.call('discover/movie', {
      region: filter.region,
      sort_by: filter.sortBy,
      certification_country: filter.certification?.country,
      certification: filter.certification?.code,
      'certification.lte': filter.certification?.lte,
      'certification.gte': filter.certification?.gte,
      include_adult: filter.includeAdult || false,
      include_video: filter.includeVideo || false,
      page: filter.page || 1,
      primary_release_year: filter.release?.primaryReleaseYear,
      'primary_release_date.gte': filter.release?.primaryReleaseDateGte,
      'primary_release_date.lte': filter.release?.primaryReleaseDateLte,
      'release_date.gte': filter.release?.releaseDateGte,
      'release_date.lte': filter.release?.releaseDateLte,
      with_release_type: filter.release?.withRelease?.types?.join(filter.release?.withRelease?.disgiuntive ? '|' : '&'),
      year: filter.year,
      'vote_count.gte': filter.vote?.countGte,
      'vote_count.lte': filter.vote?.countLte,
      'vote_average.gte': filter.vote?.averageGte,
      'vote_average.lte': filter.vote?.averageLte,
      with_cast: filter.withCast?.join(','),
      with_crew: filter.withCrew?.join(','),
      with_people: filter.withCrew?.join(','),
      with_companies: filter.withCompanies?.join(','),
      with_genres: filter.withGenres?.join(','),
      without_genres: filter.withoutGenres?.join(','),
      with_keywords: filter.withKeywords?.join(','),
      without_keywords: filter.withoutKeywords?.join(','),
      'with_runtime.gte': filter.withRuntime?.gte,
      'with_runtime.lte': filter.withRuntime?.lte,
      with_original_language: filter.withOriginalLanguage,
      with_watch_providers: filter.withWatchProviders?.providers?.join(filter.withWatchProviders?.disgiuntive ? '|' : '&'),
      watch_region: filter.withWatchProviders?.region,
      with_watch_monetization_types: filter.withWatchProviders?.monetizationType
    })
  }
}

class DiscoverList {
  static readonly TRENDING;
  static readonly POPULAR;
  static readonly BEST_OF;
  static readonly ORIGINALS;
  static readonly FOR_YOU;

}
