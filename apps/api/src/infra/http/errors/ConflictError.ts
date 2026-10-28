import { EHttpCode } from "../enums/HttpCode";

class ConflictError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string) {
    this.message = message;
    this.statusCode = EHttpCode.CONFLICT;
  }
}

export default ConflictError;
