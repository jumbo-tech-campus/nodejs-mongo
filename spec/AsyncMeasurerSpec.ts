import {StatsD} from 'hot-shots';
import {Measurable} from '../src/Measurable';
import {AsyncMeasurer} from '../src/AsyncMeasurer';

describe('A AsyncMeasurer', () => {
  const tagsMock = {
    test: 'test',
  };
  let measurableMock: Measurable<any>;
  const statsDMock         = {} as StatsD;
  statsDMock.timing        = () => void 0;
  const resultMock         = {};
  const defaultTags        = {
    default: 'tag',
    statsd:  'tag',
  };

  const asyncMeasurer = new AsyncMeasurer(statsDMock);

  beforeEach(() => {
    measurableMock = {
      tags:     {
        test: 'test',
      },
      statName: 'Measurable',
      execute:  () => Promise.resolve(resultMock),
    };
  });

  describe('Measuring a measurable', () => {
    let result: any;

    beforeEach(async () => {
      spyOn(statsDMock, 'timing');

      result = await asyncMeasurer.measure(measurableMock, defaultTags);
    });

    it('Has the correct result', () => {
      expect(result).toEqual(resultMock);
    });

    it('Timing has been called on statsd client', () => {
      expect(statsDMock.timing).toHaveBeenCalledWith(
        'measurable', jasmine.any(Number), {
          ...defaultTags,
          ...tagsMock,
        });
    });
  });

  describe('Without default tags', () => {
    let result: any;

    beforeEach(async () => {
      spyOn(statsDMock, 'timing');

      result = await asyncMeasurer.measure(measurableMock);
    });

    it('Has the correct result', () => {
      expect(result).toEqual(resultMock);
    });

    it('Timing has been called on statsd client', () => {
      expect(statsDMock.timing).toHaveBeenCalledWith(
        'measurable', jasmine.any(Number), tagsMock);
    });
  });

  describe('The measurable throws an error', () => {
    let result: any;
    const error = Error('Error');

    beforeEach(async () => {
      spyOn(statsDMock, 'timing');

      measurableMock.execute = () => Promise.reject(error);

      try {
        await asyncMeasurer.measure(measurableMock, defaultTags);
      } catch (error) {
        result = error;

        return;
      }

      fail();
    });

    it('Has the correct result', () => {
      expect(result).toEqual(error);
    });

    it('Timing has been called on statsd client', () => {
      expect(statsDMock.timing).toHaveBeenCalledWith(
        'measurable', jasmine.any(Number), {
          ...defaultTags,
          ...tagsMock,
        });
    });
  });
});