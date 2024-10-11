import logger from './logger';
import jwt from 'jsonwebtoken';
import { SECRET } from './config';
import { User } from '../models';

const requestLogger = (req, res, next) => {
	logger.info('Method:' , req.method);
	logger.info('Path:', req.path);
	logger.info('Body:', req.body);
	logger.info('---');
	next();
};

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer '))
		req.token = authorization.replace('Bearer ', '');
	next();
};

const userExtractor = async (req, res, next) => {
	if (!req.token)
		res.status(401).json({ error: 'no token'});

	const decodedToken = jwt.verify(req.token, SECRET);
	const user = await User.findOne({ where: { id: decodedToken.id } });
	if (!user)
		res.status(401).json({ error: 'invalid user' });
	if (user!.id !== decodedToken.id)
		res.status(401).json({ error: 'token mismatch' });
	req.user = user;
	next();
}

const unknownEndPoint = (req, res) => {
	res.status(404).send({ json: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
	logger.error('Error:', error.message);
	if (error.message === 'invalid gig id')
		res(400).json({ error: 'invalid gig id'});
	if (error.name === 'SequelizeValidationError') {
		const formattedErrors = {};
		error.errors.forEach(err => {
		  formattedErrors[err.path] = err.message;
		});
		res.status(400).json({ error: formattedErrors });
	}
	if (error.name === 'TokenExpiredError')
		return res.status(401).json({ error: 'token expired' });
	if (error.name === 'JsonWebTokenError')
		return res.status(401).json({ error: 'invalid token' });
	next(error);
};

export default {
	requestLogger,
	tokenExtractor,
	userExtractor,
	unknownEndPoint,
	errorHandler
};
