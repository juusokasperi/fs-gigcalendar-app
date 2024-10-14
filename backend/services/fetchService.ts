import axios from 'axios';
import { Gig } from '../models/';
import logger from '../utils/logger';
import { GOOGLE_URL } from '../utils/config';
import ical from 'ical';
import { Sequelize } from 'sequelize';
import { rrulestr } from 'rrule';
import { CalendarEvent } from '../utils/types';
import sanitizeHtml from 'sanitize-html';

const sanitizeOptions = {
	allowedTags: ['b', 'i', 'u', 'em', 'strong', 'a', 'p', 'br'],
	allowedAttributes: { 'a': ['href'] }
};

const fetchGoogleEvents = async () => {
	logger.info('Fetching gigs from Google Calendar...');
	const response = await axios.get<string>(GOOGLE_URL);
	logger.info('Data fetched successfully.');

	const calendarData: ical.FullCalendar = ical.parseICS(response.data);
	const today = new Date();
	const monthLater = new Date(today);
	monthLater.setDate(today.getDate() + 28)

	const googleEvents: CalendarEvent[] = Object.values(calendarData)
		.filter(event => {
			if (!event.uid || !event.summary || !event.start || !event.location )
				return false;
			if (event.type === 'VEVENT' && event.start && (event.start || event.rrule)) {
				const eventStart = event.start ? new Date(event.start) : null;
				if (event.rrule) return true;
				return eventStart && eventStart >= today && eventStart <= monthLater;
			};
			return false;
		})
		.flatMap(event => {
			const source = 'ical';
			const sanitizedTitle = sanitizeHtml(event.summary!, sanitizeOptions);
			const sanitizedDescription = event.description ? sanitizeHtml(event.description.replace(/\n/g, '<br />'), sanitizeOptions) : undefined;
			const sanitizedLocation = sanitizeHtml(event.location!, sanitizeOptions);

			if (event.rrule) {
				const rule = typeof event.rrule === 'string'
					? rrulestr(event.rrule)
					: event.rrule;
				const occurrences = rule.between(today, monthLater);

				return occurrences.map(occurrence => {
					const startTime = occurrence.toISOString();
					const eventEndTime = event.end ? new Date(event.end) : undefined;
					const eventStartTime = new Date(event.start!);
					const endTime = eventEndTime
						? new Date(new Date(occurrence).getTime() + (eventEndTime.getTime() - eventStartTime.getTime())).toISOString()
						: undefined;

					return {
					icalId: event.uid as string,
					title: sanitizedTitle,
					description: sanitizedDescription,
					startTime,
					endTime,
					location: sanitizedLocation,
					source
				}});
			} else {
				const startTime = event.start ? new Date(event.start).toISOString() : undefined;
				const endTime = event.end ? new Date(event.end).toISOString() : undefined;

				return [{
					icalId: event.uid as string,
					title: sanitizedTitle,
					description: sanitizedDescription,
					startTime: startTime!,
					endTime,
					location: sanitizedLocation,
					source
				}];
			}
		});

	logger.info(`Found ${googleEvents.length} events to process.`);
	return googleEvents;
};

const processEvents = async (googleEvents: CalendarEvent[]) => {
	const existingGigs = await Gig.findAll({ where: Sequelize.literal('"ical_id" IS NOT NULL')});
	const existingGigsMap = new Map(
		existingGigs.map(gig =>
			[`${gig.icalId}-${new Date(gig.startTime).toISOString()}`, gig]));
	const processedUids = new Set<string>();

	for (const event of googleEvents) {
		const key = `${event.icalId}-${new Date(event.startTime).toISOString()}`;
		const existingGig = existingGigsMap.get(key);
		processedUids.add(key);

		if (existingGig) {
			await updateGig(existingGig, event);
		} else {
			await addGig(event);
		}
	};
	return { existingGigs, processedUids };
};

const updateGig = async (existingGig: Gig, event: CalendarEvent) => {
	const existingStartTime = existingGig.startTime ? new Date(existingGig.startTime).toISOString() : null;
	const existingEndTime = existingGig.endTime ? new Date(existingGig.endTime).toISOString() : null;
	const updatedStartTime = event.startTime ? new Date(event.startTime).toISOString() : null;
	const updatedEndTime = event.endTime ? new Date(event.endTime).toISOString() : null;

	if (existingGig.title !== event.title
		|| existingGig.description !== event.description
		|| existingGig.location !== event.location
		|| existingStartTime !== updatedStartTime
		|| existingEndTime !== updatedEndTime) {
		logger.info(`Updating gig in DB: ${event.title}`);
		await existingGig.update({
			title: event.title,
			description: event.description,
			startTime: updatedStartTime!,
			endTime: updatedEndTime!,
		});
	};
};

const addGig = async (event: CalendarEvent) => {
	if (event.icalId && event.title && event.description && event.location
		&& event.startTime && event.source) {
		logger.info('Adding gig to DB:', event.title);
		await Gig.create({
			icalId: event.icalId!,
			title: event.title,
			description: event.description,
			startTime: new Date(event.startTime!).toISOString(),
			endTime: event.endTime ? new Date(event.endTime).toISOString(): undefined,
			location: event.location,
			source: event.source
		});
	};
};

const deleteCanceledGigs = async (existingGigs: Gig[], processedUids: Set<string>) => {
	const gigsToDelete = existingGigs.filter(gig => !processedUids.has(`${gig.icalId}-${new Date(gig.startTime).toISOString()}`) && gig.source === 'ical');
	for (const gig of gigsToDelete) {
		logger.info(`Deleting gig from DB as it is no longer in iCal: ${gig.title}`);
		await gig.destroy();
	}
}

export default {
	fetchGoogleEvents, processEvents, deleteCanceledGigs
};
