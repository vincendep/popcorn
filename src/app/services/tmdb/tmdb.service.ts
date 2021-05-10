import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { I18nService } from '../i18n.service';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  protected accessToken = environment.TMDB_ACCESS_TOKEN
  protected baseUrl = "https://api.themoviedb.org/3"
  protected imageBaseUrl = "https://image.tmdb.org/t/p"
  protected language: string

  constructor(private i18n: I18nService, protected http: HttpClient) {
    this.i18n.language$.subscribe(language => this.language = language)
  }

  getImage(path: string, size: string = 'original'): string {
    return this.imageBaseUrl + "/" + size + path
  }

  call<T>(path: string, params?: any) {
    return this.http.get<T>(this.buildUrl(path), {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      },
      params: {
        language: this.language,
        ...params
      }
    })
  }

  private buildUrl(path: String) {
    return this.baseUrl + "/" + path
  }
}
