import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../configs/';
import ExamController from '../controllers/ExamController';

const routes = Router();
const upload = multer(uploadConfig);

const examController = new ExamController();

routes.get('/:id', examController.list);
routes.post('/', upload.single('exams'), examController.save);
routes.get('/downloadFile', examController.downloadFile);
routes.get('/details/:id', examController.getById);

export default routes;
