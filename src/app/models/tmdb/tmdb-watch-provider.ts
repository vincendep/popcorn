import { TmdbService } from "src/app/services/tmdb.service";
import { WatchProvider } from "../domain/watch-provider";

export class TmdbWatchProvider implements WatchProvider {
  readonly id: string;
  readonly name: string;
  private logo_path: string;
  private display_priority: number;

  private tmdb: TmdbService

  constructor(object: any, tmdb: TmdbService) {
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
