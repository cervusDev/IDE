import { IRoute } from '../IRoute';
import { makeCreateScreeningController } from '@application/controllers/screenings/create/factory';
import { createScreeningControllerBody } from '@application/controllers/screenings/create/schemas';
import makeAuthenticationMiddleware from '@application/middlewares/AuthenticationMiddleware/factory';

export const privateScreeningRoutes: IRoute[] = [
  {
    method: 'POST',
    path: '/create-screening',
    middlewares: [makeAuthenticationMiddleware()],
    controller: makeCreateScreeningController(),
    schemas: {
      body: createScreeningControllerBody,
    },
  },
];
