import { EHttpCode } from "@infra/http/enums/HttpCode";
import IErrorConstructor from "@shared/interfaces/IErrorConstructor";

class AuthorizationTokenTypeError extends Error {
  public readonly message: string;

  public readonly name = 'AuthorizationTokenTypeError';

  public readonly statusCode: EHttpCode;

  constructor(inputData?: Omit<IErrorConstructor, 'sku'>) {
    super();
    this.message = 'Authorization token type is wrong';
    this.statusCode = inputData?.statusCode || EHttpCode.UNAUTHORIZED;
  }
}

export default AuthorizationTokenTypeError;
