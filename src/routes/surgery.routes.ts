import { Router } from 'express';

import SurgeryController from '../controllers/SurgeryController';
import AuthenticationMiddleware from '../middleware/Authentication';
const routes = Router();
const surgeryController = new SurgeryController();

routes.post('/', AuthenticationMiddleware, surgeryController.save);
routes.get('/', surgeryController.list);
routes.get('/name/:name', surgeryController.listByName);

export default routes;
