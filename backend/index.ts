import express from 'express';
//import cron from 'node-cron';
import { connectToDatabase } from './utils/db';
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('express-async-errors');
import { PORT } from './utils/config';
import logger from './utils/logger';
import middleware from './utils/middleware';
import cors from 'cors';

import fetchIcalRouter from './controllers/fetchIcal';
import gigsRouter from './controllers/gigs';
import loginRouter from './controllers/login';

const app = express();
app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/fetch', fetchIcalRouter);
app.use('/api/gigs', gigsRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

const start = async() => {
	await connectToDatabase();
	app.listen(PORT, () => {
		logger.info(`Server running on ${PORT}`);
	});
};

start();
