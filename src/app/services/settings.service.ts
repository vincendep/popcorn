import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StreamingProvider } from '../models/domain/streaming-provider';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _country: BehaviorSubject<string>
  public country$: Observable<string>
  private _streamingProviders: BehaviorSubject<StreamingProvider[]>
  public streamingProviders$: Observable<StreamingProvider[]>

  constructor() {
    this._country = new BehaviorSubject(localStorage.getItem("settings.country"))
    this.country$ = this._country.asObservable()
    this._streamingProviders = new BehaviorSubject(JSON.parse(localStorage.getItem("settings.streaming-providers")))
    this.streamingProviders$ = this._streamingProviders.asObservable()
  }

  public changeCountry(country: string) {
    localStorage.setItem("settings.country", country)
    this._country.next(country)
  }

  public changeStreamingProviders(streamingProviders: StreamingProvider[]) {
    localStorage.setItem("settings.streaming-providers", JSON.stringify(streamingProviders))
    this._streamingProviders.next(streamingProviders)
  }
}
