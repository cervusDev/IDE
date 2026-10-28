import type {
  IMiddleware,
  IMiddlewareRequest,
  IMiddlewareResponse,
} from '@shared/interfaces/IMiddleware.ts';

import IAuthTokenProvider from '@application/providers/AuthToken/IAuthTokenProvider.js';
import IFactory from './IFactory';
import AuthorizationTokenNotFoundError from '@infra/http/errors/auth/AuthorizationTokenNotFoundError';
import AuthorizationTokenTypeError from '@infra/http/errors/auth/AuthorizationTokenTypeError';
import AuthorizationTokenInvalidError from '@infra/http/errors/auth/AuthorizationTokenInvalidError';

interface IDecryptTokenOutput {
  adminId: number;
}

class AuthenticationMiddleware implements IMiddleware {
  private readonly authTokenProvider: IAuthTokenProvider;

  constructor(factory: IFactory) {
    this.authTokenProvider = factory.makeAuthTokenProvider();
  }
  public async execute(
    request: IMiddlewareRequest,
  ): Promise<IMiddlewareResponse> {
    const token = this.getToken(request.headers.authorization);
    const tokenDecrypted = await this.decryptToken(token);

    const output: IMiddlewareResponse = {
      data: {
        adminId: tokenDecrypted.adminId,
      },
    };
    return output;
  }

  private getToken(authorization?: string): string {
    if (!authorization) {
      throw new AuthorizationTokenNotFoundError();
    }
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer') {
      throw new AuthorizationTokenTypeError();
    }
    if (!token) {
      throw new AuthorizationTokenNotFoundError();
    }
    return token;
  }

  private async decryptToken(token: string): Promise<IDecryptTokenOutput> {
    try {
      const tokenDecrypted = await this.authTokenProvider.decrypt(token);
      const output: IDecryptTokenOutput = {
        adminId: tokenDecrypted.adminId,
      };
      return output;
    } catch {
      throw new AuthorizationTokenInvalidError();
    }
  }
}

export default AuthenticationMiddleware;
