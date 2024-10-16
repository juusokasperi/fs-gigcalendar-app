import { Gig } from '../types';

export const generateEventDates = (event: Gig) => {
	const start = new Date(event.startTime);
	const end = event.endTime ? new Date(event.endTime) : start;

	const endLocalDate = new Date(end);
	endLocalDate.setUTCHours(0, 0, 0, 0);

	const dates = [];
	const currentDate = new Date(start);

	while (currentDate < endLocalDate) {
	  dates.push(currentDate.toLocaleString('en-US' , {
		weekday: 'short',
		day: 'numeric',
		month: 'short'
	  }));
	  currentDate.setDate(currentDate.getDate() + 1);
	};

	if (event.endTime) {
	  const lastDate = dates[dates.length - 1];
	  const endDateString = endLocalDate.toLocaleString('en-US', {
		weekday: 'short',
		day: 'numeric',
		month: 'short'
	  });
	  if (lastDate !== endDateString)
		dates.push(endDateString);
	};

	return dates;
  };
