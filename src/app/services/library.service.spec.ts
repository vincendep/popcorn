import { TestBed } from '@angular/core/testing';

import { LibraryService } from './library.service';
import { MockStorageService } from './storage.service.spec';

describe('LibraryService', () => {
  let service: LibraryService;

  beforeEach(() => {
    service = new LibraryService(new MockStorageService())
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
