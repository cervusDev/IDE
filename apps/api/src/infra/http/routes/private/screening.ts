import { IRoute } from '../IRoute';
import { makeCreateScreeningController } from '@application/controllers/screenings/create/factory';
import { createScreeningControllerBody } from '@application/controllers/screenings/create/schemas';
import { makeDeleteScreeningController } from '@application/controllers/screenings/delete/factory';
import { deleteScreeningControllerParamsSchema } from '@application/controllers/screenings/delete/schema';
import { makeFindScreeningByIdController } from '@application/controllers/screenings/findById/factory';
import { findScreeningByIdControllerParamsSchema, findScreeningByIdControllerResponseSchema } from '@application/controllers/screenings/findById/schemas';
import { makeListScreeningController } from '@application/controllers/screenings/list/factory';
import { listScreeningControllerQuerySchema, listScreeningControllerResponseSchema } from '@application/controllers/screenings/list/schemas';
import { makeListScreeningByRegistrationController } from '@application/controllers/screenings/listByRegistration/factory';
import { listScreeningByRegistrationControllerQuerySchema, listScreeningByRegistrationControllerResponseSchema } from '@application/controllers/screenings/listByRegistration/schemas';
import { makeUpdateScreeningController } from '@application/controllers/screenings/update/factory';
import { updateScreeningControllerBody, updateScreeningControllerParams } from '@application/controllers/screenings/update/schemas';
import makeAuthenticationMiddleware from '@application/middlewares/AuthenticationMiddleware/factory';
import { EHttpCode } from '@infra/http/enums/HttpCode';

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
  },
  {
    method: 'GET',
    path: '/screenings',
    middlewares: [makeAuthenticationMiddleware()],
    controller: makeListScreeningController(),
    schemas: {
      query: listScreeningControllerQuerySchema,
      response: {
        [EHttpCode.OK]: listScreeningControllerResponseSchema,
      }
    }
  },
  {
    method: 'GET',
    path: '/screenings-versions:registration',
    controller: makeListScreeningByRegistrationController(),
    middlewares: [makeAuthenticationMiddleware()],
    schemas: {
      query: listScreeningByRegistrationControllerQuerySchema,
      response: {
        [EHttpCode.OK]: listScreeningByRegistrationControllerResponseSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/screenings/:id',
    controller: makeFindScreeningByIdController(),
    middlewares: [makeAuthenticationMiddleware()],
    schemas: {
      params: findScreeningByIdControllerParamsSchema,
      response: {
        [EHttpCode.OK]: findScreeningByIdControllerResponseSchema
      }
    }
  },
  {
    method: 'DELETE',
    path: '/screenings/:registration',
    controller: makeDeleteScreeningController(),
    middlewares: [makeAuthenticationMiddleware()],
    schemas: {
      params: deleteScreeningControllerParamsSchema,
    }
  }
];
