import { EHttpCode } from "@infra/http/enums/HttpCode";
import IErrorConstructor from "@shared/interfaces/IErrorConstructor";

class AuthorizationTokenNotFoundError extends Error {
  public readonly message: string;

  public readonly name = 'AuthorizationTokenNotFoundError';

  public readonly statusCode: EHttpCode;

  constructor(inputData?: Omit<IErrorConstructor, 'sku'>) {
    super();
    this.message = 'Authorization token not found';
    this.statusCode = inputData?.statusCode || EHttpCode.UNAUTHORIZED;
  }
}

export default AuthorizationTokenNotFoundError;
