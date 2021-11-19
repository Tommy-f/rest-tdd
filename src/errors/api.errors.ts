export class HttpException extends Error {
  public status: number;
  public message: string;

  private errorName(): string {
    switch (this.status) {
      case 400:
        return 'Bad Request';
      case 401:
        return 'Not Found';
      case 408:
        return 'Request Timeout';
      case 409:
        return 'Conflict';
      case 500:
        return 'Internal Server Error';
      case 501:
        return 'Not Implemented';
      case 502:
        return 'Bad Gateway';
      default:
        return 'Unknow Error';
    }
  }

  constructor(status: number, message: string) {
    super(message);
    this.name = this.errorName();
    this.status = status;
    this.message = message;
  }
}
