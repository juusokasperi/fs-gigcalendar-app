import { Dispatch } from 'react';

export interface Gig {
	id?: number;
	icalId?: string;
	title: string;
	startTime: string;
	endTime?: string;
	location: string;
	description?: string;
	source: string;
	important: boolean;
  };

export type FilterState = {
	filter: string;
};

export type FilterAction = {
	type: 'SET_FILTER';
	payload: string;
};

export type FilterDropDownProps = {
	dispatch: Dispatch<FilterAction>;
};

export interface LoginFormValues {
	username: string;
	password: string;
};
