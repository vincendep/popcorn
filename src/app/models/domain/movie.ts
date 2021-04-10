export interface Movie {
  id: string
  imdbId: string
  backdrop: URL
  genres: Array<any>
  title: string
  overview: string
  poster: URL
  releaseDate: Date
  runtime: number
  voteAverage: number
}
