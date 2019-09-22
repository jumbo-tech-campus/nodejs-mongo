import {MongoQueryError} from '../../src/errors/MongoQueryError';

describe('A MongoQueryError', () => {
  const originalError = new Error();

  const mongoQueryError = new MongoQueryError(originalError, 'queryName');

  it('Can convert to json correctly', () => {
    expect(mongoQueryError.toJSON()).toEqual({
      name:          'MongoQueryError',
      message:       MongoQueryError.MSG,
      stack:         jasmine.any(String),
      originalError: {
        name:    'Error',
        message: '',
        stack:   jasmine.any(String),
      },
      queryName:     'queryName',
    });
  });
});