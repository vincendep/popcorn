import { TmdbMovieService } from "src/app/services/tmdb/tmdb-movie.service";
import { TmdbWatchProviderService } from "src/app/services/tmdb/tmdb-watch-provider.service";
import { WatchProvider } from "../domain/watch-provider";

export class TmdbWatchProvider implements WatchProvider {
  readonly id: string;
  readonly name: string;
  private logo_path: string;
  private display_priority: number;

  private tmdb: TmdbWatchProviderService

  constructor(object: any, tmdb: TmdbWatchProviderService) {
    this.id = object.id
    this.name = object.name
    this.logo_path = object.logo_path
    this.display_priority = object.display_priority
    this.tmdb = tmdb
  }

  get logo() {
    return new URL(this.tmdb.getImage(this.logo_path))
  }

  get displayPriority() {
    return this.display_priority
  }
}
