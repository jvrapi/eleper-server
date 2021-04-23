import { Router } from 'express';

import DiseaseController from '../controllers/DiseaseController';

const routes = Router();
const diseaseController = new DiseaseController();

routes.post('/saveMany', diseaseController.saveMany);

export default routes;
