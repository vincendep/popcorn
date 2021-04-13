export interface Movie {
  id: string
  imdbId: string
  backdrop: string
  genres: Array<any>
  title: string
  overview: string
  poster: string
  releaseDate: Date
  runtime: number
  voteAverage: number
}

export function extractMovie(movie: Movie): Movie {
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
