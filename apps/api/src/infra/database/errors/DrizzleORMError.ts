import { EHttpCode } from "@infra/http/enums/HttpCode";

class DrizzleORMError extends Error {
  public readonly message: string;

  public readonly name = 'DrizzleORMError';

  public readonly statusCode: EHttpCode;

  constructor(message: string) {
    super();
    this.statusCode = EHttpCode.INTERNAL_SERVER_ERROR;
    this.message = message;
  }
}

export default DrizzleORMError;
