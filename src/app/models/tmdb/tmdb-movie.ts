import { TmdbService } from "src/app/services/tmdb/tmdb.service"
import { Movie } from "../domain/movie"

export class TmdbMovie implements Movie {
  readonly id: string
  private imdb_id: string
  private backdrop_path: string
  readonly genres: Array<any>
  readonly title: string
  readonly overview: string
  private poster_path: string
  private release_date: Date
  readonly runtime: number
  private vote_average: number
  private tmdb: TmdbService

  constructor(tmdb: TmdbService, tmdbMovie: TmdbMovie) {
    this.id = tmdbMovie.id
    this.imdb_id = tmdbMovie.imdb_id
    this.backdrop_path = tmdbMovie.backdrop_path
    this.genres = tmdbMovie.genres
    this.title = tmdbMovie.title
    this.overview = tmdbMovie.overview
    this.poster_path = tmdbMovie.poster_path
    this.overview = tmdbMovie.overview
    this.release_date = tmdbMovie.release_date,
    this.runtime = tmdbMovie.runtime,
    this.vote_average = tmdbMovie.vote_average
    this.tmdb = tmdb
  }

  public get imdbId() {
    return this.imdb_id
  }

  public get backdrop() {
    return this.tmdb.getImage(this.backdrop_path)
  }

  public get poster() {
    return this.tmdb.getImage(this.poster_path)
  }

  public get releaseDate() {
    return this.release_date
  }

  public get voteAverage() {
    return this.vote_average / 10
  }
}
