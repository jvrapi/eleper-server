import { Router } from 'express';

import AnnotationController from '../controllers/AnnotationController';

const routes = Router();
const annotationController = new AnnotationController();

routes.get('/:userId', annotationController.list);
routes.get('/details/:id', annotationController.getById);
routes.post('/', annotationController.save);
routes.put('/', annotationController.update);
routes.delete('/', annotationController.deleteMany);
export default routes;
