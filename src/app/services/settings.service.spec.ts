import { first } from 'rxjs/operators';
import { StreamingProvider } from '../models/domain/streaming-provider';
import { SettingsService } from './settings.service';
import { MockStorageService } from './storage.service.spec';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    service = new SettingsService(new MockStorageService())
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change country', async () => {
    const aCountry = 'country'
    await service.changeCountry(aCountry)
    const theCountry = await service.country$.pipe(first()).toPromise()
    expect(theCountry).toBe(aCountry)
  });

  it('should change streaming providers', async () => {
    const provider: StreamingProvider  = {
      id: '3',
      name:'test',
      logo: 'test',
      displayPriority: 4
    }
    const aProviders = [provider]
    await service.changeStreamingProviders(aProviders)
    const theProviders = await service.streamingProviders$.pipe(first()).toPromise()
    expect(theProviders).toBe(aProviders)
  });
});
