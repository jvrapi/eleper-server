import { Router } from 'express';

import HospitalizationController from '../controllers/HospitalizationController';

const routes = Router();
const hospitalizationController = new HospitalizationController();

routes.get('/:userId', hospitalizationController.list);
routes.get('/details/:id', hospitalizationController.getById);
routes.post('/', hospitalizationController.save);
routes.put('/', hospitalizationController.update);
routes.delete('/', hospitalizationController.deleteMany);

export default routes;
