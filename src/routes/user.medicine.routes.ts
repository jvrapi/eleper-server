import { Router } from 'express';

import UserMedicineController from '../controllers/UserMedicineController';

const routes = Router();
const userMedicineController = new UserMedicineController();

routes.get('/:id', userMedicineController.list);
routes.get('/details/:id', userMedicineController.getById);
routes.post('/', userMedicineController.saveMany);
routes.put('/', userMedicineController.update);
routes.delete('/:id', userMedicineController.delete);
routes.delete('/', userMedicineController.deleteMany);
export default routes;
