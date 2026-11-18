import contentDe from '../../../../public/data/content/de.json';
import contentEn from '../../../../public/data/content/en.json';
import i18nDe from '../../../../public/data/i18n/de.json';
import i18nEn from '../../../../public/data/i18n/en.json';

/**
 * =============================================================================
 * DATA CONSISTENCY TEST
 * -----------------------------------------------------------------------------
 * The site is bilingual, so every English JSON file has a German twin.
 * It's easy to add a field (or a project) in one language and forget the
 * other. This test catches that: both files must have exactly the same
 * "shape" — same keys, same array lengths, same ids. Only texts may differ.
 * =============================================================================
 */

/** Turns a JSON value into a list of its structural paths, e.g. "projects[2].id=360u". */
function shape(value: unknown, path = ''): string[] {
  if (Array.isArray(value)) {
    return [`${path}.length=${value.length}`, ...value.flatMap((item, i) => shape(item, `${path}[${i}]`))];
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      // ids, categories and accents must match exactly; other strings only need to exist
      ['id', 'category', 'accent', 'link'].includes(key) ? [`${path}.${key}=${String(child)}`] : shape(child, `${path}.${key}`),
    );
  }
  return [path];
}

describe('Bilingual data files', () => {
  it('content/en.json and content/de.json have the same structure', () => {
    expect(shape(contentDe)).toEqual(shape(contentEn));
  });

  it('i18n/en.json and i18n/de.json have the same keys', () => {
    expect(shape(i18nDe)).toEqual(shape(i18nEn));
  });
});
