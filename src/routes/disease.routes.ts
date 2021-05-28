import { Router } from 'express';

import DiseaseController from '../controllers/DiseaseController';
import AuthenticationMiddleware from '../middleware/Authentication';
const routes = Router();
const diseaseController = new DiseaseController();

routes.post('/saveMany', AuthenticationMiddleware, diseaseController.saveMany);
routes.post('/', diseaseController.save);
routes.get('/', diseaseController.list);

export default routes;
