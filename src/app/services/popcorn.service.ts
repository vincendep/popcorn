import { Injectable } from '@angular/core';
import { I18nService } from './i18n.service';
import { LibraryService } from './library.service';
import { SettingsService } from './settings.service';
import { TmdbDiscoverService } from './tmdb/tmdb-discover.service';
import { TmdbMovieService } from './tmdb/tmdb-movie.service';
import { TmdbWatchProviderService } from './tmdb/tmdb-watch-provider.service';

@Injectable({
  providedIn: 'root'
})
export class PopcornService {

  constructor(
    private _discoverService: TmdbDiscoverService,
    private _movieService: TmdbMovieService,
    private _watchProviderService: TmdbWatchProviderService,
    private _libraryService: LibraryService,
    private _settingsService: SettingsService,
    private _i18nService: I18nService
  ) { }

  get discoverService() {
    return this._discoverService
  }

  get movieService() {
    return this._movieService
  }

  get watchProviderService() {
    return this._watchProviderService
  }

  get libraryService() {
    return this._libraryService
  }

  get settingsService() {
    return this._settingsService
  }

  get i18nService() {
    return this._i18nService
  }
}
