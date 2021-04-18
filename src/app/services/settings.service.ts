import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StreamingProvider } from '../models/domain/streaming-provider';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public readonly country$: Observable<string>
  public readonly streamingProviders$: Observable<StreamingProvider[]>
  private _country: BehaviorSubject<string>
  private _streamingProviders: BehaviorSubject<StreamingProvider[]>

  constructor(
    private storageService: StorageService
  ) {
    this._country = new BehaviorSubject(null)
    this._streamingProviders = new BehaviorSubject([])
    this.country$ = this._country.asObservable()
    this.streamingProviders$ = this._streamingProviders.asObservable()
    this.loadData()
  }

  public async changeCountry(country: string) {
    return await this.storageService.set("settings.country", country)
      .then(_ => this._country.next(country))
  }

  public async changeStreamingProviders(streamingProviders: StreamingProvider[]) {
    return await this.storageService.set("settings.streaming-providers", streamingProviders)
      .then(_ => this._streamingProviders.next(streamingProviders))
  }

  private async loadData() {
    const country = await this.storageService.get("settings.country")
    this._country.next(country || null)
    const streamingProviders = await this.storageService.get("settings.streaming-providers")
    this._streamingProviders.next(streamingProviders)
  }
}
