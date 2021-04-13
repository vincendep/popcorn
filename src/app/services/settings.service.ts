import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StreamingProvider } from '../models/domain/streaming-provider';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _country: BehaviorSubject<string>
  public country$: Observable<string>
  private _streamingProviders: BehaviorSubject<StreamingProvider[]>
  public streamingProviders$: Observable<StreamingProvider[]>

  constructor(
    private storageService: StorageService
  ) {
    this.init()
    this.loadData()
  }

  public changeCountry(country: string) {
    this.storageService.set("settings.country", country)
      .then(_ => this._country.next(country))
  }

  public changeStreamingProviders(streamingProviders: StreamingProvider[]) {
    this.storageService.set("settings.streaming-providers", streamingProviders)
      .then(_ => this._streamingProviders.next(streamingProviders))
  }

  private init() {
    this._country = new BehaviorSubject(null)
    this.country$ = this._country.asObservable()
    this._streamingProviders = new BehaviorSubject([])
    this.streamingProviders$ = this._streamingProviders.asObservable()
  }

  private loadData() {
    this.storageService.get("settings.country")
      .then(country => this._country.next(country || null))
    this.storageService.get("settings.streaming-providers")
      .then(sp => this._streamingProviders.next(sp || []))
  }
}
