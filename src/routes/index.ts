import { Router } from 'express';

import AuthenticationMiddleware from '../middleware/Authentication';
import DiseaseRoutes from './disease.routes';
import UserDiseaseRoutes from './user.disease.routes';
import UserRoutes from './user.routes';

const routes = Router();

routes.use('/user', UserRoutes);
routes.use('/disease', DiseaseRoutes);
routes.use('/userDisease', AuthenticationMiddleware, UserDiseaseRoutes);

export default routes;
