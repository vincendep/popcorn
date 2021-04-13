import { Movie } from "./movie";

export interface List {
  id: string
  name: string
  description: string
  movies: Movie[]
}
