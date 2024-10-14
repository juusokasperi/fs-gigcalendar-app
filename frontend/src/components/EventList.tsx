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
    <div>
      {Object.entries(groupedGigs).map(([date, gigs]) => (
        <div key={date}>
          <h3>{date}</h3>
          {gigs.map(gig => (
            <EventItem key={gig.id} gig={gig} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default EventList;
