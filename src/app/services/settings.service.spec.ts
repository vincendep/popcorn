import { first } from 'rxjs/operators';
import { Country } from '../models/domain/country';
import { WatchProvider } from '../models/domain/watch-provider';
import { SettingsService } from './settings.service';
import { MockStorageService } from './storage.service.spec';

fdescribe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    service = new SettingsService(new MockStorageService())
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change country', async () => {
    const aCountry = Country.IT
    await service.changeCountry(aCountry)
    const theCountry = await service.selectedCountry$.pipe(first()).toPromise()
    expect(theCountry).toBe(aCountry)
  });

  it('should change streaming providers', async () => {
    const provider: WatchProvider  = {
      id: '3',
      name:'test',
      logo: 'test',
      displayPriority: 4
    }
    const aProviders = [provider]
    await service.changeWatchProviders(aProviders)
    const theProviders = await service.selectedWatchProviders$.pipe(first()).toPromise()
    expect(theProviders).toBe(aProviders)
  });
});
