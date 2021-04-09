import { Router } from 'express';

import UserController from '../controllers/UserController';

const routes = Router();
const userController = new UserController();

routes.post('/authentication', userController.authentication);
routes.post('/', userController.save);

export default routes;
