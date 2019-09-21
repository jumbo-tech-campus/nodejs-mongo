import {CustomError} from '../../src/errors';

describe('A CustomError', () => {
  class TestableCustomError extends CustomError {
    protected extendToJSON(): object {
      return {
        additionalProperty: 'additionalValue',
      };
    }
  }

  const testableCustomError = new TestableCustomError('Error');

  it('Is an instance of Error', () => {
    expect(testableCustomError instanceof Error).toEqual(true);
  });
  it('Is an instance of CustomError', () => {
    expect(testableCustomError instanceof CustomError).toEqual(true);
  });

  it('Is an instance of CustomError', () => {
    expect(testableCustomError instanceof TestableCustomError).toEqual(true);
  });

  it('Has the name TestableCustomError', () => {
    expect(testableCustomError.name).toEqual('TestableCustomError');
  });

  it('Has additionalProperty in toJSON result', () => {
    expect(Object.keys(testableCustomError.toJSON())).toContain('additionalProperty');
  });
});
