import { StorageService } from './storage.service';

fdescribe('StorageService', async () => {
  let storageService: StorageService
  let storageSpy: any
  let storage: any

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('Storage', ['get', 'set', 'remove', 'create', 'keys']);
    storageSpy.get.and.callFake(async (key: string) => {
      console.log('get fake called')
      return storage[key]
    })
    storageSpy.set.and.callFake(async (key: string, value: any) => {
      console.log('set fake called')
      storage[key] = value
      return storage[key]
    })
    storageSpy.remove.and.callFake(async (key: string) => {
      console.log('remove fake called')
      storage[key] = undefined
    })
    storageSpy.create.and.callFake(async () => {
      console.log('create fake called')
      return storageSpy
    })
    storageSpy.keys.and.callFake(async () => {
      console.log('keys fake called')
      return Object.keys(storage)
    })
    storageService = new StorageService(storageSpy)
  })

  afterEach(() => {
    storage = {}
  })

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });

  it('should return objects', async () => {
    storage = {test: "test"}
    const obj = await storageService.get("test")
    expect(obj).toBeDefined();
  });

  it('should store objects', async () => {
    await storageService.set("test", "test")
    expect(storage.test).toBeDefined()
  })

  it('should delete objects', async () => {
    storage = {test: "test"}
    await storageService.remove("test")
    expect(storage.test).toBeUndefined()
  })

  it('should return keys', async () => {
    storage = {test: "test"}
    const keys = await storageService.keys()
    expect(keys).toContain("test")
  })
});
