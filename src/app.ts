import 'reflect-metadata';
import './database';

import cors from 'cors';
import express from 'express';

import routes from './routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.get('/', (req, res) => {
	res.send('Eliper API');
});

export default app;
