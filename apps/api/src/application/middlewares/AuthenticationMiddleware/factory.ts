
import JwtProvider from '@application/providers/AuthToken/implementations/JwtProvider.js';
import AuthenticationMiddleware from './index';

function makeAuthenticationMiddleware() {
  const middleware = new AuthenticationMiddleware({
    makeAuthTokenProvider: () => new JwtProvider(),
  });
  return middleware;
}

export default makeAuthenticationMiddleware;
