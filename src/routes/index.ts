import { Router } from 'express';

import AuthenticationMiddleware from '../middleware/Authentication';
import AnnotationsRoutes from './annotation.routes';
import DiseaseRoutes from './disease.routes';
import ExamRoutes from './exam.routes';
import UserDiseaseRoutes from './user.disease.routes';
import UserMedicineRoutes from './user.medicine.routes';
import UserRoutes from './user.routes';

const routes = Router();

routes.use('/disease', DiseaseRoutes);
routes.use('/user', UserRoutes);
routes.use('/exam', AuthenticationMiddleware, ExamRoutes);
routes.use('/userDisease', AuthenticationMiddleware, UserDiseaseRoutes);
routes.use('/userMedicine', AuthenticationMiddleware, UserMedicineRoutes);
routes.use('/annotation', AuthenticationMiddleware, AnnotationsRoutes);
export default routes;
