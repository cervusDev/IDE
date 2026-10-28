import { EHttpCode } from "@infra/http/enums/HttpCode";
import IErrorConstructor from "@shared/interfaces/IErrorConstructor";

class AuthorizationTokenInvalidError extends Error {
  public readonly message: string;

  public readonly name = 'AuthorizationTokenInvalidError';

  public readonly statusCode: EHttpCode;

  constructor(inputData?: Omit<IErrorConstructor, 'sku'>) {
    super();
    this.message = 'Authorization token invalid';
    this.statusCode = inputData?.statusCode || EHttpCode.UNAUTHORIZED;
  }
}

export default AuthorizationTokenInvalidError;
