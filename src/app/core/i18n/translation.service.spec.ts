import { findByPath, interpolate } from './translation.service';

/**
 * Tests for the two pure helper functions behind the `t` pipe.
 * Pure functions need no Angular TestBed — just input → output.
 */
describe('Translation helpers', () => {
  const dictionary = { nav: { about: 'About' }, greeting: 'Hi {{name}}!' };

  describe('findByPath', () => {
    it('finds a nested key', () => {
      expect(findByPath(dictionary, 'nav.about')).toBe('About');
    });

    it('returns undefined for a missing key', () => {
      expect(findByPath(dictionary, 'nav.missing')).toBeUndefined();
    });

    it('returns undefined when the path points to a group, not a text', () => {
      expect(findByPath(dictionary, 'nav')).toBeUndefined();
    });
  });

  describe('interpolate', () => {
    it('replaces placeholders with params', () => {
      expect(interpolate('Hi {{name}}!', { name: 'Fadel' })).toBe('Hi Fadel!');
    });

    it('leaves unknown placeholders untouched', () => {
      expect(interpolate('{{count}} smiles', {})).toBe('{{count}} smiles');
    });
  });
});
