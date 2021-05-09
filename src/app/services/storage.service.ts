import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage = null;
  private initialized: Promise<any>

  constructor(storage: Storage) {
    this.initialized = this.init(storage);
  }

  async get(key: string) {
    await this.initialized
    return this._storage.get(key)
  }

  async set(key: string, value: any){
    await this.initialized
    return this._storage.set(key, value);
  }

  async remove(key: string){
    await this.initialized
    return this._storage.remove(key);
  }

  async keys() {
    await this.initialized
    return await this._storage.keys()
  }

  private async init(storage: Storage) {
    this._storage = await storage.create();
  }
}
