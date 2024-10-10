import express from 'express';
//import cron from 'node-cron';
import { connectToDatabase } from './utils/db';
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('express-async-errors');
import { PORT } from './utils/config';
import Gig from './models';
import logger from './utils/logger';

import fetchIcalRouter from './controllers/fetchIcal';

const app = express();
app.use(express.json());

app.use('/api/fetch', fetchIcalRouter);
app.get('/api/gigs/', async (req, res) => {
	const gigs = await Gig.findAll();
	logger.info('Gigs fetched from PostGres');
	res.json(gigs);
})

const start = async() => {
	await connectToDatabase();
	app.listen(PORT, () => {
		logger.info(`Server running on ${PORT}`);
	});
};

start();
