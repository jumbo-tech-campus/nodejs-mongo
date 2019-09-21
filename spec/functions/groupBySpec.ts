import {groupBy} from '../../src/functions';

describe('A groupBy function', () => {
  const arrayToGroup: {
    groupValue: string;
  }[] = [
    {
      groupValue: 'test',
    },
    {
      groupValue: 'test',
    },
    {
      groupValue: 'test2',
    },
    {
      groupValue: 'test2',
    },
    {
      groupValue: 'test2',
    },
  ];

  describe('Grouping an array', () => {
    const grouped = groupBy(arrayToGroup, (item) => item.groupValue);

    it('Returns a grouped array', () => {
      expect(grouped).toEqual({
        test:  [
          {
            groupValue: 'test',
          },
          {
            groupValue: 'test',
          },
        ],
        test2: [
          {
            groupValue: 'test2',
          },
          {
            groupValue: 'test2',
          },
          {
            groupValue: 'test2',
          },
        ],
      });
    });
  });
});