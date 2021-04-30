import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../configs/';
import ExamController from '../controllers/ExamController';

const routes = Router();
const upload = multer(uploadConfig);

const examController = new ExamController();

routes.get('/', examController.list);
routes.post('/', upload.single('exam'), examController.save);
routes.put('/', upload.single('exam'), examController.update);
routes.get('/examFile', examController.examFile);
routes.get('/details/:id', examController.getById);

export default routes;
