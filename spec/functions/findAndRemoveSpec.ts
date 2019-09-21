import {findAndRemove} from '../../src/functions';

describe('A findAndRemove function', () => {
  const array = [1, 2, 3, 4, 5];

  describe('Finding an item', () => {
    const item = findAndRemove(array, (item) => item === 2);

    it('Returns item 2', () => {
      expect(item).toEqual(2);
    });

    it('Removed item 2 from the array', () => {
      expect(array).toEqual([1, 3, 4, 5]);
    });
  });

  describe('Finding an item that does not exist', () => {
    const item = findAndRemove(array, (item) => item === 7);

    it('Returns undefined', () => {
      expect(item).toEqual(undefined);
    });
  });
});