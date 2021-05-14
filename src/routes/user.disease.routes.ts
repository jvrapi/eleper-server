import { Router } from 'express';

import UserDiseaseController from '../controllers/UserDiseaseController';

const routes = Router();
const userDiseaseController = new UserDiseaseController();

routes.get('/:userId', userDiseaseController.list);
routes.get('/unrecordedDiseases/:id', userDiseaseController.unrecordedDiseases);
routes.post('/saveMany', userDiseaseController.saveMany);

export default routes;
