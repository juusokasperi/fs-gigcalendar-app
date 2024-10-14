import { useState } from 'react';
import { Gig } from '../types';

const EventItem = ({ gig }: { gig: Gig }) => {
  const [infoVisible, setInfoVisible] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedTime = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
    return formattedTime;
  };

  return (
    <div>
      {!infoVisible ? (
        <div>
		  <p>
          {gig.title} <button onClick={() => setInfoVisible(true)}>view</button><br />
          {formatDate(gig.startTime)} {gig.endTime && `- ${formatDate(gig.endTime)}`}
          </p>
		</div>
      ) : (
        <div>
          <p>{gig.title} <button onClick={() => setInfoVisible(false)}>hide</button><br />
          {formatDate(gig.startTime)} {gig.endTime && `- ${formatDate(gig.endTime)}`}</p>
          <p>{gig.location}</p>
          {gig.description && <div dangerouslySetInnerHTML={{ __html: gig.description}} />}
        </div>
      )}
    </div>
  );
};

export default EventItem;
