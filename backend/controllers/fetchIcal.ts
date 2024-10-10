import express, { Request, Response } from 'express';
const router = express.Router();
import logger from '../utils/logger';
import fetchService from '../services/fetchService';
import { CalendarEvent } from '../utils/types';

//cron.schedule('0 0 * * *', async() => {

router.get('/', async (req: Request, res: Response) => {
	const googleEvents: CalendarEvent[] = await fetchService.fetchGoogleEvents();
	const { existingGigs, processedUids } = await fetchService.processEvents(googleEvents);
	await fetchService.deleteCanceledGigs(existingGigs, processedUids);

	logger.info('Matching iCal entries saved to PostGresQL, sending response.');
	res.status(200).json({ message: `Successfully processed ${googleEvents.length} events.` });
});
	//	})

export default router;
