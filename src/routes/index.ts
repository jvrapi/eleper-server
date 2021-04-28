import { Router } from 'express';

import AuthenticationMiddleware from '../middleware/Authentication';
import DiseaseRoutes from './disease.routes';
import ExamRoutes from './exam.routes';
import UserDiseaseRoutes from './user.disease.routes';
import UserRoutes from './user.routes';

const routes = Router();

routes.use('/disease', DiseaseRoutes);
routes.use('/exam', AuthenticationMiddleware, ExamRoutes);
routes.use('/userDisease', AuthenticationMiddleware, UserDiseaseRoutes);
routes.use('/user', UserRoutes);

export default routes;
