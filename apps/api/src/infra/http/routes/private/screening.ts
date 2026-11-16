import { IRoute } from '../IRoute';
import { makeCreateScreeningController } from '@application/controllers/screenings/create/factory';
import { createScreeningControllerBody } from '@application/controllers/screenings/create/schemas';
import { makeUpdateScreeningController } from '@application/controllers/screenings/update/factory';
import { updateScreeningControllerBody, updateScreeningControllerParams } from '@application/controllers/screenings/update/schemas';
import makeAuthenticationMiddleware from '@application/middlewares/AuthenticationMiddleware/factory';

export const privateScreeningRoutes: IRoute[] = [
  {
    method: 'POST',
    path: '/screenings',
    middlewares: [makeAuthenticationMiddleware()],
    controller: makeCreateScreeningController(),
    schemas: {
      body: createScreeningControllerBody,
    },
  },
  {
    method: 'PUT',
    path: '/screenings/:registration',
    middlewares: [makeAuthenticationMiddleware()],
    controller: makeUpdateScreeningController(),
    schemas: {
      body: updateScreeningControllerBody,
      params: updateScreeningControllerParams
    }
  }
];
