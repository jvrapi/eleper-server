import { Router } from 'express';

import MedicineController from '../controllers/MedicineController';
import AuthenticationMiddleware from '../middleware/Authentication';

const routes = Router();
const medicineController = new MedicineController();

routes.post('/', AuthenticationMiddleware, medicineController.save);
routes.get('/', medicineController.list);
routes.get('/name/:name', medicineController.listByName);

export default routes;
