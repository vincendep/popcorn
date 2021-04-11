import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { StreamingProvider } from 'src/app/models/domain/streaming-provider';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {

  private country: string
  private streamingProviders: StreamingProvider[]
  private _done: Subject<boolean> = new Subject()

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.settingsService.country$
      .pipe(takeUntil(this._done))
      .subscribe(country => this.country = country)
    this.settingsService.streamingProviders$
      .pipe(takeUntil(this._done))
      .subscribe(providers => this.streamingProviders = providers)
  }

  ngOnDestroy() {
    this._done.next(true)
    this._done.complete()
  }

  selectCountry(country: string) {
    this.settingsService.changeCountry(country)
  }

  selectStreamingProviders(providers: StreamingProvider[]) {
    this.settingsService.changeStreamingProviders(providers)
  }
}
