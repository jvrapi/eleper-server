import 'reflect-metadata';
import './database';

import express from 'express';

import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);
// route for view files
/* app.use(
  '/uploads',
  AuthenticationMiddleware,
  express.static(path.join(__dirname, '..', 'uploads'))
); */

export { app };
