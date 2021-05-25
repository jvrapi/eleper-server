import { Router } from 'express';

import SurgeryController from '../controllers/SurgeryController';

const routes = Router();
const surgeryController = new SurgeryController();

routes.post('/', surgeryController.save);
routes.get('/', surgeryController.list);
routes.get('/name/:name', surgeryController.listByName);

export default routes;
