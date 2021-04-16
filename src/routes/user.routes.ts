import { Router } from 'express';

import SendMailController from '../controllers/SendMailController';
import UserController from '../controllers/UserController';

const routes = Router();
const userController = new UserController();
const sendMailController = new SendMailController();

routes.post('/', userController.save);
routes.post('/authentication', userController.authentication);
routes.post('/sendMail', sendMailController.sendRedefineCode);
routes.post('/redefinePassword', userController.redefinePassword);

export default routes;
