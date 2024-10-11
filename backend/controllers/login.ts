import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express, { Request, Response } from 'express';
const router = express.Router();

import { SECRET } from '../utils/config';
import { User } from '../models';

router.post('/', async(req: Request, res: Response) => {
	const body = req.body;
	if (!body.username || !body.password)
		res.status(401).json({ error: 'missing username or password' });
	const user = await User.findOne({ where: { username: body.username } });
	const passwordCorrect = user == null
	? false
	: await bcrypt.compare(body.password, user.passwordHash);

	if (!(user && passwordCorrect))
		res.status(401).json({ error: 'invalid username or password' });
	const userForToken = {
		username: user!.username,
		id: user!.id
	};
	const token = jwt.sign(userForToken, SECRET, { expiresIn: 60*60 });
	res.status(200).send({ token, username: user!.username });
});

export default router;
