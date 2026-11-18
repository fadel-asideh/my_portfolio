import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';

import { KeyValueStorage, MemoryStorage } from '@core/storage/key-value-storage';
import { ThemeService } from './theme.service';

/**
 * ThemeService depends on the KeyValueStorage ABSTRACTION, so the test can
 * plug in MemoryStorage instead of the real localStorage (Dependency Inversion).
 */
describe('ThemeService', () => {
  let storage: MemoryStorage;

  function createService(): ThemeService {
    TestBed.configureTestingModule({ providers: [{ provide: KeyValueStorage, useValue: storage }] });
    return TestBed.inject(ThemeService);
  }

  beforeEach(() => {
    storage = new MemoryStorage();
  });

  it('starts with the saved theme', () => {
    storage.write('theme', 'dark');
    expect(createService().theme()).toBe('dark');
  });

  it('toggles, adds the .dark class and remembers the choice', () => {
    storage.write('theme', 'light');
    const service = createService();

    service.toggle();
    TestBed.tick(); // run effects

    expect(service.isDark()).toBe(true);
    expect(TestBed.inject(DOCUMENT).documentElement.classList.contains('dark')).toBe(true);
    expect(storage.read('theme')).toBe('dark');
  });
});
