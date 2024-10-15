import { DateDiv, ContentDiv } from '../utils/styledComponents';
import { Gig } from '../types';
import EventItem from './EventItem';

const EventList = ({ gigs }: { gigs: Gig[] }) => {
  const groupedGigs = gigs.reduce((acc: Record<string, Gig[]>, gig) => {
    const eventDate = new Date(gig.startTime);
    const dateString = eventDate.toLocaleString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
    if (!acc[dateString]) acc[dateString] = [];
    acc[dateString].push(gig);
    return acc;
  }, {});

  return (
    <ContentDiv>
      {Object.entries(groupedGigs).map(([date, gigs]) => (
        <>
          <DateDiv>{date}</DateDiv>
          {gigs.map(gig => (
            <EventItem key={gig.id} gig={gig} />
          ))}
        </>
      ))}
    </ContentDiv>
  );
};

export default EventList;
