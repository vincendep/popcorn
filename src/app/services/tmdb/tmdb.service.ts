import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  protected apiKey = environment.TMDB_API_KEY
  protected baseUrl = "https://api.themoviedb.org/3"
  protected imageBaseUrl = "https://image.tmdb.org/t/p"
  protected languages = []

  constructor(
    protected http: HttpClient,
  ) { }

  getImage(path: string, size: string = 'original'): string {
    return this.imageBaseUrl + "/" + size + path
  }

  protected buildUrl(path: String) {
    return this.baseUrl + "/" + path
  }
}
