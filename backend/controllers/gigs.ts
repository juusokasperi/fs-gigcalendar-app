import express, { Request, Response } from 'express';
const router = express.Router();
import logger from '../utils/logger';
import middleware from '../utils/middleware';
import { Gig } from '../models/';

router.get('/', async (req: Request, res: Response) => {
	const gigs = await Gig.findAll();
	logger.info('Gigs fetched from PostGres');
	res.json(gigs);
});

router.post('/', middleware.userExtractor, async (req: Request, res: Response) => {
	console.log(req.body);
	const gig = await Gig.create({ ...req.body, source: 'user' });
	res.json(gig);
});

router.delete('/:id', middleware.userExtractor, async (req: Request, res: Response) => {
	const gigToDelete = await Gig.findByPk(req.params.id);
	if (!gigToDelete)
	  throw Error('invalid gig id');
	await gigToDelete.destroy();
	res.status(204).end();
  });

router.put('/:id', middleware.userExtractor, async (req, res) => {
	const gig = await Gig.findByPk(req.params.id);
	if (!gig)
	  throw Error('invalid gig id');
	const { title, startTime, endTime, location, description, important } = req.body;
	await gig.update({
		title: title ?? gig.title,
		startTime: startTime ?? gig.startTime,
		endTime: endTime ?? gig.endTime,
		location: location ?? gig.location,
		description: description ?? gig.description,
		important: important ?? gig.important
	});

	res.json(gig);
});

export default router;
