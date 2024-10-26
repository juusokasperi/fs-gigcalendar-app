import axios from 'axios';
const baseUrl = 'http://localhost:3001/api';
import { Gig } from '../types';

let token: string | null = null;

const setToken = (newToken: string) => {
	token = `Bearer ${newToken}`;
};

const getAll = async() => {
	const response = await axios.get(`${baseUrl}/gigs/`);
	const gigs: Gig[] = response.data;
	return gigs.sort((gig1, gig2) => new Date(gig1.startTime).getTime() - new Date(gig2.startTime).getTime());
}

const create = async (newObject: Gig) => {
	const config = {
		headers: { Authorization: token },
	};
	const response = await axios.post(`${baseUrl}/gigs/`, newObject, config);
	return (response.data);
};

const fetch = async() => {
	const config = {
		headers: { Authorization: token },
	};
	const response = await axios.get(`${baseUrl}/fetch/`, config);
	return (response.data);
}

export default {
	getAll,
	create,
	setToken,
	fetch
};
