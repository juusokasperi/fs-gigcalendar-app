import React from 'react';
import { DateDiv, ContentDiv } from '../utils/styledComponents';
import { Gig } from '../types';
import EventItem from './EventItem';
import { generateEventDates } from '../utils/generateEventDates';

const EventList = ({ gigs }: { gigs: Gig[] }) => {
  const groupedGigs = gigs.reduce((acc: Record<string, Gig[]>, gig) => {
    const eventDates = generateEventDates(gig);
    eventDates.forEach(dateString => {
      if (!acc[dateString]) acc[dateString] = [];
      acc[dateString].push(gig);
    })
    return acc;
  }, {});

  return (
    <ContentDiv>
      {Object.entries(groupedGigs).map(([date, gigs]) => (
        <React.Fragment key={date}>
          <DateDiv>{date}</DateDiv>
          {gigs.map(gig => (
            <EventItem key={gig.id} gig={gig} />
          ))}
        </React.Fragment>
      ))}
    </ContentDiv>
  );
};

export default EventList;
