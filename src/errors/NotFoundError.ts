import {CustomError} from './CustomError';

export class NotFoundError extends CustomError {
  public static MESSAGE: string = 'Not found';

  public constructor(message?: string) {
    super(message || NotFoundError.MESSAGE);
  }
}