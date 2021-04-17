export class Movie {
  readonly id: string
  readonly imdbId: string
  readonly backdrop: string
  readonly genres: Array<any>
  readonly title: string
  readonly overview: string
  readonly poster: string
  readonly releaseDate: Date
  readonly runtime: number
  readonly voteAverage: number

  static from(movie: Movie): Movie {
    return {
      id: movie.id,
      imdbId: movie.imdbId,
      backdrop: movie.backdrop,
      genres: movie.genres,
      title: movie.title,
      overview: movie.overview,
      poster: movie.poster,
      releaseDate: movie.releaseDate,
      runtime: movie.runtime,
      voteAverage: movie.voteAverage
    }
  }
}
