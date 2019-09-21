import {NotFoundError} from '../../src/errors';

describe('A NotFoundError', () => {
  const notFoundError = new NotFoundError();

  it('Can convert to JSON', () => {
    expect(notFoundError.toJSON()).toEqual({
      name:    'NotFoundError',
      message: 'Not found',
      stack:   jasmine.any(String),
    });
  });
});