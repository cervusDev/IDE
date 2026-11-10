import { IRoute } from './IRoute';
import { privateScreeningRoutes } from './private/screening';
import { publicAuthRoutes } from './public/auth';
import { publicUserRoutes } from './public/users';

export const httpRoutes: IRoute[] = [
  ...publicAuthRoutes,
  ...publicUserRoutes,
  ...privateScreeningRoutes,
];
