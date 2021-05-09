import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Country } from 'src/app/models/domain/country';
import { WatchProvider } from 'src/app/models/domain/watch-provider';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {

  protected supportedCountries: Country[]
  protected selectedCountry: string
  protected supportedWatchProviders: WatchProvider[]
  protected selectedStreamingProviders: string[]
  private _done: Subject<boolean> = new Subject()

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.settingsService.supportedCountries$
      .pipe(takeUntil(this._done))
      .subscribe(countries => this.supportedCountries = countries)
    this.settingsService.selectedCountry$
      .pipe(takeUntil(this._done))
      .subscribe(country => this.selectedCountry = country?.alpha2)
    this.settingsService.supportedWatchProviders$
      .pipe(takeUntil(this._done))
      .subscribe(providers => this.supportedWatchProviders = providers)
    this.settingsService.selectedWatchProviders$
      .pipe(takeUntil(this._done))
      .subscribe(providers => this.selectedStreamingProviders = providers.map(p => p.id))
  }

  ngOnDestroy() {
    this._done.next(true)
    this._done.complete()
  }

  selectCountry(countryCode: string) {
    this.settingsService.changeCountry(this.supportedCountries.find(c =>
      c.alpha2 === countryCode))
  }

  selectWatchProviders(providerIds: string[]) {
    this.settingsService.changeWatchProviders(this.supportedWatchProviders.filter(p =>
      providerIds.includes(p.id)))
  }
}
