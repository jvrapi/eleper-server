import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../configs/';
import ExamController from '../controllers/ExamController';

const routes = Router();
const upload = multer(uploadConfig);

const examController = new ExamController();

routes.post('/', upload.single('exams'), examController.save);
routes.get('/downloadFile', examController.downloadFile);
export default routes;
