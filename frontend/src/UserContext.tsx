import { createContext, useReducer, Dispatch, PropsWithChildren } from 'react';
import gigService from './services/gigs';

interface UserState {
	username: string;
	token: string;
}

type UserContextType = [
	UserState | null,
	Dispatch<UserAction>
];

type UserAction =
	| { type: 'LOGIN'; payload: { username: string, token: string } }
	| { type: 'LOGOUT' };

const userReducer = (state: UserState | null, action: UserAction): UserState | null => {
	switch (action.type) {
	case "LOGIN":
  	  window.localStorage.setItem(
		'loggedGigappUser',
		JSON.stringify(action.payload)
	  );
	  gigService.setToken(action.payload.token);
	  return action.payload;
	case "LOGOUT":
	  window.localStorage.removeItem('loggedGigappUser');
	  return null;
	default:
	  return state;
	}
};

const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = (props: PropsWithChildren<{object}>) => {
	const [user, userDispatch] = useReducer(userReducer, null);

	return (
	  <UserContext.Provider value={[user, userDispatch]}>
		{props.children}
	  </UserContext.Provider>
	);
  };

export default UserContext;
