import { Storage } from '@ionic/storage';
import { StorageService } from './storage.service';

fdescribe('StorageService', async () => {
  let storageService: StorageService

  beforeEach(() => {
    storageService = new StorageService(new MockStorage({test: "test"}))
  })

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });

  it('should return objects', async () => {
    expect(await storageService.get("test")).toBeDefined();
  });

  it('should store objects', async () => {
    await storageService.set("anotherTest", "anotherTest")
    expect(await storageService.get("anotherTest")).toBeDefined()
  })

  it('should delete objects', async () => {
    await storageService.remove("test")
    expect(await storageService.get("test")).toBeUndefined()
  })

  it('should return keys', async () => {
    expect(await storageService.keys()).toContain("test")
  })
});

export class MockStorageService extends StorageService {
  constructor(storage: any = {}) {
    super(new MockStorage(storage))
  }
}

class MockStorage extends Storage {
  private _storage = {}

  constructor(storage: any) {
    super()
    this._storage = storage
  }

  public async get(key: string) {
    return this._storage[key]
  }

  public async set(key: string, value: any) {
    return this._storage[key] = value
  }

  public async remove(key: string) {
    return delete this._storage[key]
  }

  public async keys() {
    return Object.keys(this._storage)
  }
}
