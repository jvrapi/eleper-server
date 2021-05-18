import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../configs/';
import ExamController from '../controllers/ExamController';

const routes = Router();
const upload = multer(uploadConfig);

const examController = new ExamController();

routes.get('/:id', examController.list);
routes.get('/details/:id', examController.getById);
routes.get('/examFile/:id', examController.examFile);
routes.post('/', upload.single('exam'), examController.save);
routes.put('/', upload.single('exam'), examController.update);
routes.delete('/:id', examController.delete);
routes.delete('/', examController.deleteMany);

export default routes;
