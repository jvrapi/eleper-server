import { Router } from 'express';

import MedicineController from '../controllers/MedicineController';

const routes = Router();
const medicineController = new MedicineController();

routes.post('/', medicineController.save);
routes.get('/', medicineController.list);

export default routes;
