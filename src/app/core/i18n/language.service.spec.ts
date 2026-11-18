import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';

import { KeyValueStorage, MemoryStorage } from '@core/storage/key-value-storage';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let storage: MemoryStorage;

  beforeEach(() => {
    storage = new MemoryStorage();
    storage.write('language', 'en');
    TestBed.configureTestingModule({ providers: [{ provide: KeyValueStorage, useValue: storage }] });
  });

  it('starts with the saved language', () => {
    expect(TestBed.inject(LanguageService).current()).toBe('en');
  });

  it('toggles EN → DE → EN and updates <html lang>', () => {
    const service = TestBed.inject(LanguageService);

    service.toggle();
    TestBed.tick();
    expect(service.current()).toBe('de');
    expect(TestBed.inject(DOCUMENT).documentElement.lang).toBe('de');
    expect(storage.read('language')).toBe('de');

    service.toggle();
    expect(service.current()).toBe('en');
  });
});
