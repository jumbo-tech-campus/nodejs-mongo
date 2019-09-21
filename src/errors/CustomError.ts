export abstract class CustomError extends Error {
  public constructor(message: string) {
    super(message);

    this.name = this.constructor.name;
  }

  public toJSON(): object {
    return {
      name:    this.name,
      message: this.message,
      stack:   this.stack,
      ...this.extendToJSON(),
    };
  }

  protected extendToJSON(): object {
    return {};
  }
}
