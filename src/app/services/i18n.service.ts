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
    console.log("I18NService created")
  }

  getLanguage(): Observable<string> {
    return of(this.intl.getCanonicalLocales(navigator.language))
  }

  isServiceAvailable(): boolean {
    return this.intl && typeof this.intl === 'object'
  }
}

