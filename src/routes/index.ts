import { Router } from 'express';

import AuthenticationMiddleware from '../middleware/Authentication';
import AnnotationsRoutes from './annotation.routes';
import DiseaseRoutes from './disease.routes';
import ExamRoutes from './exam.routes';
import HospitalizationRoutes from './hospitalization.routes';
import MedicineRoutes from './medicine.routes';
import SurgeryRoutes from './surgery.routes';
import UserDiseaseRoutes from './user.disease.routes';
import UserMedicineRoutes from './user.medicine.routes';
import UserRoutes from './user.routes';
import UserSurgeryRoutes from './user.surgery.routes';

const routes = Router();

routes.use('/disease', AuthenticationMiddleware, DiseaseRoutes);
routes.use('/medicine', AuthenticationMiddleware, MedicineRoutes);
routes.use('/surgery', AuthenticationMiddleware, SurgeryRoutes);
routes.use('/user', UserRoutes);
routes.use('/exam', AuthenticationMiddleware, ExamRoutes);
routes.use('/userDisease', AuthenticationMiddleware, UserDiseaseRoutes);
routes.use('/userMedicine', AuthenticationMiddleware, UserMedicineRoutes);
routes.use('/userSurgery', AuthenticationMiddleware, UserSurgeryRoutes);
routes.use('/annotation', AuthenticationMiddleware, AnnotationsRoutes);
routes.use('/hospitalization', AuthenticationMiddleware, HospitalizationRoutes);
export default routes;
