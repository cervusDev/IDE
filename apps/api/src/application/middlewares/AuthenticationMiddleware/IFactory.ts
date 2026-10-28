import IAuthTokenProvider from '@application/providers/AuthToken/IAuthTokenProvider';

interface IAuthenticationMiddlewareFactory {
  makeAuthTokenProvider(): IAuthTokenProvider;
}

export default IAuthenticationMiddlewareFactory;
