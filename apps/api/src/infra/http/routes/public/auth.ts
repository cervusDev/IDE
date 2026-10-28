import { IRoute } from '../IRoute';
import { makeAuthController } from '@application/controllers/auth/factory';
import { authControllerBody, authControllerResponse } from '@application/controllers/auth/schemas';
import { EHttpCode } from '@infra/http/enums/HttpCode';

export const publicAuthRoutes: IRoute[] = [
  {
    method: 'POST',
    path: '/auth',
    controller: makeAuthController(),
    schemas: {
      body: authControllerBody,
      response: {
        [EHttpCode.OK]: authControllerResponse,
      },
    },
  },
];
