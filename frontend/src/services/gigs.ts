import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/gigs';
import { Gig } from '../types';

const getAll = async() => {
	const response = await axios.get(baseUrl);
	const gigs: Gig[] = response.data;
	return gigs.sort((gig1, gig2) => new Date(gig1.startTime).getTime() - new Date(gig2.startTime).getTime());
}

export default {
	getAll
};
