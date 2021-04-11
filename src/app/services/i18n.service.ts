import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  // TODO fix typescript configuration
  public language$: Observable<string>
  private _language: BehaviorSubject<string>
  private intl: any

  constructor() {
    this.intl = Intl
    this._language = new BehaviorSubject<string>(this.intl.getCanonicalLocales(navigator.language))
    this.language$ = this._language.asObservable()
  }
}

