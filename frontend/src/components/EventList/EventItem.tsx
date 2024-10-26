import { useState } from 'react';
import { Gig } from '../../types';
import { EventDiv, BasicInfo, CaretButton } from './styled';

const EventItem = ({ gig }: { gig: Gig }) => {
  const [infoVisible, setInfoVisible] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedTime = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Europe/Helsinki'
    }).format(date);
    return formattedTime;
  };

  return (
    <EventDiv>
      <BasicInfo onClick={() => setInfoVisible(!infoVisible)}>
        <div style={{ width:'15%' }} />
        <div style={{ textAlign: 'center', width: '60%'}}>
          {gig.title}
        </div>
        <div style={{ textAlign: 'right', width: '15%' }}>
          <CaretButton onClick={() => setInfoVisible(!infoVisible)}>{infoVisible ? '▲': '▼'}</CaretButton><br />
        </div>
      </BasicInfo>
      {formatDate(gig.startTime)} {gig.endTime && `- ${formatDate(gig.endTime)}`}
      {infoVisible && (
        <div>
         <p>{gig.location}</p>
         {gig.description && <div dangerouslySetInnerHTML={{ __html: gig.description}} />}
       </div>
      )}
    </EventDiv>
  );
};

export default EventItem;
