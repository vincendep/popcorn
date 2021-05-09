import { Movie } from "./movie";

export interface MovieList {
  id: string
  name: string
  description: string
  backdrop: string
  movies: Movie[]
}
