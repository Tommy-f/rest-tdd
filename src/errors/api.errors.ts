import httpStatusCodes from './status.errors';

export class NotFound extends Error {
  private statusCode = httpStatusCodes.NOT_FOUND;
  constructor(message: string) {
    super(message);
    this.message = `${message} Not Found`;
    this.statusCode = this.statusCode;
  }
}

export class BadRequest extends Error {
  private statusCode = httpStatusCodes.BAD_REQUEST;
  constructor() {
    super();
    this.message = 'Bad Request';
    this.statusCode = this.statusCode;
  }
}

export class InternalServer extends Error {
  private statusCode = httpStatusCodes.INTERNAL_SERVER;
  constructor() {
    super();
    this.message = 'Internal Server Error';
    this.statusCode = this.statusCode;
  }
}
