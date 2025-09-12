import axios from 'axios';
import { Gig } from '../types';

let token: string | null = null;

const setToken = (newToken: string) => {
	token = `Bearer ${newToken}`;
};

const getAll = async() => {
	const response = await axios.get(`/api/gigs/`);
	const gigs: Gig[] = response.data;
	return gigs.sort((gig1, gig2) => new Date(gig1.startTime).getTime() - new Date(gig2.startTime).getTime());
}

const create = async (newObject: Gig) => {
	const config = {
		headers: { Authorization: token },
	};
	const response = await axios.post(`/api/gigs/`, newObject, config);
	return (response.data);
};

const fetch = async() => {
	const config = {
		headers: { Authorization: token },
	};
	const response = await axios.get(`/api/fetch/`, config);
	return (response.data);
}

export default {
	getAll,
	create,
	setToken,
	fetch
};
