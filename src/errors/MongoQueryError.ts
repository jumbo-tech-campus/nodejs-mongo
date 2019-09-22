import {CustomError} from '@jtc/common';

export class MongoQueryError extends CustomError {
  public static MSG: string = 'Error while querying Mongo';

  private readonly error: Error;
  private readonly queryName: string;

  public constructor(error: Error, queryName: string) {
    super(MongoQueryError.MSG);

    this.error     = error;
    this.queryName = queryName;
  }

  protected extendToJSON(): object {
    return {
      originalError: {
        name:    this.error.name,
        message: this.error.message,
        stack:   this.error.stack,
      },
      queryName:     this.queryName,
    };
  }
}