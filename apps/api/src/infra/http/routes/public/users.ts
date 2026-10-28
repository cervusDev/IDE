import { makeCreateUserController } from '@application/controllers/users/create/factory';
import { IRoute } from '../IRoute';
import { createUserControllerBody } from '@application/controllers/users/create/schemas';

export const publicUserRoutes: IRoute[] = [
  {
    method: 'POST',
    path: '/create-user',
    controller: makeCreateUserController(),
    schemas: {
      body: createUserControllerBody,
    },
  },
];
