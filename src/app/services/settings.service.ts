import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Country } from '../models/domain/country';
import { WatchProvider } from '../models/domain/watch-provider';
import { StorageService } from './storage.service';
import { TmdbWatchProviderService } from './tmdb/tmdb-watch-provider.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _supportedCountries = new BehaviorSubject<Country[]>([])
  public readonly supportedCountries$ = this._supportedCountries.asObservable();
  private _supportedWatchProviders = new BehaviorSubject<WatchProvider[]>([]);
  public readonly supportedWatchProviders$ = this._supportedWatchProviders.asObservable();
  private _selectedCountry = new BehaviorSubject<Country>(null)
  public readonly selectedCountry$ = this._selectedCountry.asObservable()
  private _selectedWatchProviders = new BehaviorSubject<WatchProvider[]>([])
  public readonly selectedWatchProviders$ = this._selectedWatchProviders.asObservable();

  constructor(
    private storageService: StorageService,
    private watchProviderService: TmdbWatchProviderService
  ) {
    this.init();
  }

  public async changeCountry(country: Country) {
    return this.storageService.set("settings.country", country?.alpha2)
      .then(_ =>
        this._selectedCountry.next(country))
      .then(_ =>
        this.watchProviderService.getWatchProviders(this._selectedCountry.getValue()).toPromise())
      .then(providers =>
        this._supportedWatchProviders.next(providers))
      .then(_ =>
        this._selectedWatchProviders.next(this._selectedWatchProviders.getValue().filter(wp =>
          this._supportedWatchProviders.getValue().some(swp =>
            swp.id == wp.id))))
  }

  public async removeWatchProvider(watchProviderId: string) {
    const selectedWatchProviders = this._selectedWatchProviders.getValue()
    const watchProvider = selectedWatchProviders.find(wp => wp.id == watchProviderId)
    if (watchProvider) {
      selectedWatchProviders.splice(selectedWatchProviders.indexOf(watchProvider), 1)
      this.changeWatchProviders(selectedWatchProviders)
    } else {
      throw `Cannot remove WatchProvider with id ${watchProviderId}`
    }
  }

  public async addWatchProvider(watchProvider: WatchProvider) {
    const selectedWatchProviders = this._selectedWatchProviders.getValue()
    if (! selectedWatchProviders.some(wp => wp.id == watchProvider.id)) {
      selectedWatchProviders.push(watchProvider)
      this.changeWatchProviders(selectedWatchProviders)
    } else {
      throw `Cannot add WatchProvider with id ${watchProvider.id}`
    }
  }

  public async changeWatchProviders(watchProviders: WatchProvider[]) {
    return this.storageService.set("settings.watch-providers", watchProviders.map(p => p.id))
      .then(_ => this._selectedWatchProviders.next(watchProviders))
  }

  private init() {
    this._supportedCountries.next([Country.DE, Country.ES, Country.FR, Country.IT, Country.US])
    this.storageService.get('settings.country')
    .then(countryCode =>
      this._selectedCountry.next(this._supportedCountries.getValue().find(c =>
        c.alpha2 == countryCode)))
    .then(_ =>
      this.watchProviderService.getWatchProviders(this._selectedCountry.getValue()).toPromise())
    .then(providers =>
      this._supportedWatchProviders.next(providers))
    .then(_ =>
      this.storageService.get('settings.watch-providers'))
    .then(providerIds =>
      this._selectedWatchProviders.next(this._supportedWatchProviders.getValue().filter(wp =>
        (providerIds || []).includes(wp.id))))
  }
}
