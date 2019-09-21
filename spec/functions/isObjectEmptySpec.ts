import {isObjectEmpty} from '../../src/functions/isObjectEmpty';

describe('A isObjectEmpty function', () => {
  it('Correctly asserts it\'s empty', () => {
    expect(isObjectEmpty({})).toEqual(true);
  });

  it('Correctly asserts it\'s empty', () => {
    expect(isObjectEmpty({
      key: 'value',
    })).toEqual(false);
  });
});