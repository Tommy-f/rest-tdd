export class HttpException extends Error {
  public status: number;
  public message: string;
  public name: string;

  private errorName(): string {
    switch (this.status) {
      case 204:
        return 'No Content';
      case 400:
        return 'Bad Request';
      case 404:
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
    this.status = status;
    this.message = message;
    this.name = this.errorName();
  }
}
