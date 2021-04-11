import { TmdbMovieService } from "src/app/services/tmdb/tmdb-movie.service";
import { TmdbStreamingProviderService } from "src/app/services/tmdb/tmdb-streaming-provider.service";
import { StreamingProvider } from "../domain/streaming-provider";

export class TmdbStreamingProvider implements StreamingProvider {
  private provider_id: string;
  private provider_name: string;
  private logo_path: string;
  private display_priority: number;

  private tmdb: TmdbStreamingProviderService

  constructor(object: any, tmdb: TmdbStreamingProviderService) {
    this.provider_id = object.provider_id
    this.provider_name = object.provider_name
    this.logo_path = object.logo_path
    this.display_priority = object.display_priority
    this.tmdb = tmdb
  }

  get id() {
    return this.provider_id
  }

  get name() {
    return this.provider_name
  }

  get logo() {
    return this.tmdb.getImage(this.logo_path)
  }

  get displayPriority() {
    return this.display_priority
  }
}
