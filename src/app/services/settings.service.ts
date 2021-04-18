import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StreamingProvider } from '../models/domain/streaming-provider';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private initialized: Promise<any>
  private _country: BehaviorSubject<string> = new BehaviorSubject(null)
  private _streamingProviders: BehaviorSubject<StreamingProvider[]> = new BehaviorSubject([])
  public readonly country$: Observable<string> = this._country.asObservable()
  public readonly streamingProviders$: Observable<StreamingProvider[]> = this._streamingProviders.asObservable()


  constructor(private storageService: StorageService) {
    this.initialized = this.loadData()
  }

  public async changeCountry(country: string) {
    await this.initialized
    return await this.storageService.set("settings.country", country)
      .then(_ => this._country.next(country))
  }

  public async changeStreamingProviders(streamingProviders: StreamingProvider[]) {
    await this.initialized
    return await this.storageService.set("settings.streaming-providers", streamingProviders)
      .then(_ => this._streamingProviders.next(streamingProviders))
  }

  private async loadData() {
    const country = await this.storageService.get("settings.country")
    this._country.next(country || null)
    const streamingProviders = await this.storageService.get("settings.streaming-providers")
    this._streamingProviders.next(streamingProviders || [])
  }
}
