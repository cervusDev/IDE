import { IRoute } from './IRoute';
import { publicAuthRoutes } from './public/auth';
import { publicUserRoutes } from './public/users';

export const httpRoutes: IRoute[] = [
  ...publicAuthRoutes,
  ...publicUserRoutes
];
