export interface Gig {
	id: number;
	icalId?: string;
	title: string;
	startTime: string;
	endTime?: string;
	location: string;
	description?: string;
	source: string;
	important: boolean;
  };
