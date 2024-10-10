import { RRule } from 'rrule';

export interface CalendarEvent {
	icalId: string,
	title: string,
	description?: string,
	startTime: string,
	endTime?: string,
	location: string,
	source: string,
	rrule?: string | RRule;
};
