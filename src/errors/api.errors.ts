import httpStatusCodes from './status.errors';

export class NotFound extends Error {
  private errorCode = httpStatusCodes.NOT_FOUND;
  constructor(message: string) {
    super();
    this.message = `${message} Not Found`;
    this.errorCode = this.errorCode;
  }
}

export class BadRequest extends Error {
  private errorCode = httpStatusCodes.BAD_REQUEST;
  constructor() {
    super();
    this.message = 'Bad Request';
    this.errorCode = this.errorCode;
  }
}

export class InternalServer extends Error {
  private errorCode = httpStatusCodes.INTERNAL_SERVER;
  constructor() {
    super();
    this.message = 'Internal Server Error';
    this.errorCode = this.errorCode;
  }
}
