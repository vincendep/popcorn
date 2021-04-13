import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  // TODO inject at startup
  constructor(private storage: Storage) {
    this.init();
  }

  async get(key: string) {
    return await this._storage?.get(key)
  }

  async set(key: string, value: any){
    return await this._storage?.set(key, value);
  }

  async remove(key: string){
    return await this._storage?.remove(key);
  }

  async keys() {
    return await this._storage?.keys()
  }

  private async init() {
    this._storage = await this.storage.create();
  }
}
