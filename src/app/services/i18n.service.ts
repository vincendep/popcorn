import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  // TODO fix typescript configuration
  private intl: any = Intl
  private _language: BehaviorSubject<string> = new BehaviorSubject<string>(this.intl.getCanonicalLocales(navigator.language))
  public language$: Observable<string> = this._language.asObservable()
}

