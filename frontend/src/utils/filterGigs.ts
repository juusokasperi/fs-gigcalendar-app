import { Gig } from '../types';

export const filterGigs = (gigs: Gig[], filter: string): Gig[] => {
	return gigs.filter(gig => {
	  const eventDate = new Date(gig.startTime);
	  const today = new Date();

	  switch (filter) {
		case 'Today':
		  return eventDate.toDateString() === today.toDateString();
		case 'Tomorrow': {
		  const tomorrow = new Date(today);
		  tomorrow.setDate(today.getDate() + 1);
		  return eventDate.toDateString() === tomorrow.toDateString();
		}
		case 'Next 7 days': {
		  const endOfWeek = new Date(today);
		  endOfWeek.setDate(today.getDate() + 7);
		  return eventDate >= today && eventDate <= endOfWeek;
		}
		case '28 Days': {
		  const endOf28 = new Date(today);
		  endOf28.setDate(today.getDate() + 28);
		  return eventDate >= today && eventDate <= endOf28;
		}
		default:
		  return true;
	  }
	});
  };
