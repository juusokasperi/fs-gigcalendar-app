import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useReducer } from 'react';
import { useQuery } from '@tanstack/react-query';
import gigService from './services/gigs';
import { ContainerDiv } from './styled';
import { Gig, FilterState, FilterAction } from './types';
import { filterGigs } from './utils/filterGigs';

import FilterDropDown from './components/FilterDropDown';
import EventList from './components/EventList';
import Login from './components/Login';
import Footer from './components/Footer';
import Header from './components/Header';

const initialState: FilterState = { filter: 'Today' };

const reducer = (state: FilterState, action: FilterAction) => {
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
    <Router>
      <ContainerDiv>
        <Header />
        <Routes>
          <Route path='/' element={
            <>
            <FilterDropDown dispatch={dispatch} />
            <EventList gigs={filteredGigs} /> </>
          } />
          <Route path='/login' element={
              <Login />
          }/>
          </Routes>
        <Footer />
      </ContainerDiv>
    </Router>
  )
};

export default App;
