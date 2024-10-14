import { useReducer } from 'react';
import { useQuery } from '@tanstack/react-query';
import gigService from './services/gigs';
//import './App.css'
import { Gig } from './types';

const initialState = {
  filter: 'Today',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

const FilterDropDown = ({ dispatch }) => {
  const handleChange = (event) => {
    dispatch({ type: 'SET_FILTER', payload: event.target.value });
  };

  return (
    <div>
      <label htmlFor='filter'>Filter events:</label>
      <select id='filter' onChange={handleChange}>
        <option value='Today'>Today</option>
        <option value='Tomorrow'>Tomorrow</option>
        <option value='Next 7 days'>Next 7 days</option>
        <option value='28 Days'>28 Days</option>
      </select>
    </div>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const result = useQuery<Gig[]>({
    queryKey: ['gigs'],
    queryFn: gigService.getAll,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading)
    return <div>Loading data..</div>

  const gigs: Gig[] = result.data || [];

  const filteredGigs = gigs.filter(gig => {
    const eventDate = new Date(gig.startTime);
    const today = new Date();

    switch (state.filter) {
      case 'Today':
        return eventDate.toDateString() === today.toDateString();
      case 'Tomorrow':
        { const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return eventDate.toDateString() === tomorrow.toDateString(); }
      case 'Next 7 days':
        { const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + 7);
        return eventDate >= today && eventDate <= endOfWeek; }
      case '28 Days':
        { const endOf28 = new Date(today);
          endOf28.setDate(today.getDate() + 28);
          return eventDate >= today && eventDate <= endOf28;
        }
      default:
        return true;
    };
  });

  const groupedGigs = filteredGigs.reduce((acc: Record<string, Gig[]>, gig) => {
    const eventDate = new Date(gig.startTime);
    const dateString = eventDate.toLocaleString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
    if (!acc[dateString])
      acc[dateString] = [];
    acc[dateString].push(gig);
    return acc;
  }, {});

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
    const formattedTime = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div>
      <h1>Event List</h1>
      <FilterDropDown dispatch={dispatch} />
      <ul>
      {Object.entries(groupedGigs).map(([date, gigs]) => (
        <li key={date}>
          <h3>{date}</h3>
          <ul>
            {gigs.map(gig => (
              <li key={gig.id}>
                {gig.title} - {formatDate(gig.startTime)}
              </li>
            ))}
          </ul>
        </li>
      ))}
      </ul>
    </div>
  )
};

export default App
