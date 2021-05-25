import { Router } from 'express';

import SendMailController from '../controllers/SendMailController';
import UserController from '../controllers/UserController';
import AuthenticationMiddleware from '../middleware/Authentication';

const routes = Router();
const userController = new UserController();
const sendMailController = new SendMailController();

routes.post('/', userController.save);
routes.post('/authentication', userController.authentication);
routes.post('/sendMail', sendMailController.sendRedefineCode);
routes.post('/redefinePassword', userController.redefinePassword);
routes.get('/:userId', AuthenticationMiddleware, userController.record);
routes.get(
	'/details/:userId',
	AuthenticationMiddleware,
	userController.getById
);

routes.put('/', AuthenticationMiddleware, userController.update);
routes.delete('/:userId', AuthenticationMiddleware, userController.delete);

export default routes;
