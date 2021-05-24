import { Router } from 'express';

import UserSurgeryController from '../controllers/UserSurgeryController';

const routes = Router();
const userSurgeryController = new UserSurgeryController();

routes.get('/:userId', userSurgeryController.list);
routes.get('/details/:id', userSurgeryController.getById);
routes.post('/', userSurgeryController.save);
routes.put('/', userSurgeryController.update);
routes.delete('/', userSurgeryController.deleteMany);
export default routes;
