import { Router } from 'express';

import UserRoutes from './user.routes';

const routes = Router();

routes.use('/user', UserRoutes);

export default routes;
