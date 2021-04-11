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
