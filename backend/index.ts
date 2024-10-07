import express from 'express';
import axios from 'axios';
import ical from 'ical';
import cron from 'node-cron';
import { connectToDatabase } from './utils/db';
require('express-async-errors');
import { PORT, GOOGLE_URL } from './utils/config';
import Gig from './models';


const logger = require('./utils/logger');
const app = express();
app.use(express.json());


//cron.schedule('0 0 * * *', async() => {
app.get('/api/fetchGigs', async (req, res) => {
	logger.info('Fetching gigs from Google Calendar...');
	const response = await axios.get<string>(GOOGLE_URL);
	logger.info('Data fetched successfully.');

	const calendarData: ical.FullCalendar = ical.parseICS(response.data);
	const today = new Date();
	const monthLater = new Date(today);
	monthLater.setDate(today.getDate() + 28);

	const googleEvents = Object.values(calendarData)
		.filter(event => event.type === 'VEVENT'
			&& event.start !== undefined
			&& new Date(event.start) >= today
			&& new Date(event.start) <= monthLater)
		.map(event => ({
			icalId: event.uid,
			title: event.summary,
			description: event.description,
			startTime: event.start,
			endTime: event.end,
			location: event.location,
			source: 'ical'
		}));
	logger.info(`Found ${googleEvents.length} events to process.`);

	for (const event of googleEvents) {
		const existingGig = await Gig.findOne({ where: { icalId: event.icalId }});

		if (!existingGig) {
			if (event.title)
				logger.info('adding gig to DB:', event.title);
			logger.info({
				startTime: event.startTime,
				endTime: event.endTime,
			  });

			await Gig.create({
				icalId: event.icalId,
				title: event.title,
				description: event.description,
				startTime: event.startTime ? new Date(event.startTime).toISOString() : null,
				endTime: event.endTime ? new Date(event.endTime).toISOString(): null,
				location: event.location,
				source: event.source
			});
		};
	};
	logger.info('All gigs processed, sending response.');
	res.status(200).json({ message: `Successfully processed ${googleEvents.length} events.` });
});
//	})

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
