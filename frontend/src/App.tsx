import { useReducer } from 'react';
import { useQuery } from '@tanstack/react-query';
import gigService from './services/gigs';
import './App.css'
import { Gig, State, Action } from './types';
import { filterGigs } from './utils/filterGigs';

import FilterDropDown from './components/FilterDropDown';
import EventList from './components/EventList';
import Footer from './components/Footer';
import Header from './components/Header';

const initialState: State = { filter: 'Today' };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data: gigs = [], isLoading } = useQuery<Gig[]>({
    queryKey: ['gigs'],
    queryFn: gigService.getAll,
  });

  if (isLoading)
    return <div>Loading data..</div>

  const filteredGigs = filterGigs(gigs, state.filter);

  return (
    <div className='container'>
      <Header />
      <FilterDropDown dispatch={dispatch} />
      <EventList gigs={filteredGigs} />
      <Footer />
    </div>
  )
};

export default App;
