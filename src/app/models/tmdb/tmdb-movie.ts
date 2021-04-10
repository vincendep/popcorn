import { TmdbService } from "src/app/services/tmdb.service"
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

  constructor(object: any, tmdb: TmdbService) {
    this.id = object.id
    this.imdb_id = object.imdb_id
    this.backdrop_path = object.backdrop_path
    this.genres = object.genres
    this.title = object.title
    this.overview = object.overview
    this.poster_path = object.poster_path
    this.overview = object.overview
    this.release_date = object.release_date,
    this.runtime = object.runtime,
    this.vote_average = object.vote_average
    this.tmdb = tmdb
  }

  public get imdbId() {
    return this.imdb_id
  }

  public get backdrop() {
    return new URL(this.tmdb.getImage(this.backdrop_path))
  }

  public get poster() {
    return new URL(this.tmdb.getImage(this.poster_path))
  }

  public get releaseDate() {
    return this.release_date
  }

  public get voteAverage() {
    return this.vote_average / 10
  }
}
