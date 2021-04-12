import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { I18nService } from '../i18n.service';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  protected apiKey = environment.TMDB_API_KEY
  protected baseUrl = "https://api.themoviedb.org/3"
  protected imageBaseUrl = "https://image.tmdb.org/t/p"
  protected language: string

  constructor(
    private i18n: I18nService,
    protected http: HttpClient) {
    this.i18n.language$.subscribe(language => this.language = language)
  }

  getImage(path: string, size: string = 'original'): string {
    return this.imageBaseUrl + "/" + size + path
  }

  protected call(path: string, params?: any) {
    return this.http.get(this.buildUrl(path), {
      params: {
        api_key: this.apiKey,
        language: this.language,
        ...params
      }
    })
  }

  protected buildUrl(path: String) {
    return this.baseUrl + "/" + path
  }
}