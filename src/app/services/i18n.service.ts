import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  // TODO fix typescript configuration
  private intl: any

  constructor() {
    this.intl = Intl
  }

  getLanguage(): Observable<Array<string>> {
    if (this.isServiceAvailable()) {
      return of(this.intl.getCanonicalLocales(navigator.language))
    } else {
      return of(null)
    }
  }

  private isServiceAvailable(): boolean {
    return this.intl && typeof this.intl === 'object'
  }
}

