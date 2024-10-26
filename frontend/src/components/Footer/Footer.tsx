import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import UserContext from '../../UserContext';
import gigService from '../../services/gigs';
import { FooterDiv, Overlay, Spinner } from './styled';

const Footer = () => {
	const [loading, setLoading] = useState(false);
	const queryClient = useQueryClient();

	const userContext = useContext(UserContext);
	if (!userContext)
		throw new Error('UserContext not found.');
	const [user, userDispatch] = userContext;

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedGigappUser');
		if (loggedUserJSON) {
			const loggedInUser = JSON.parse(loggedUserJSON);
			userDispatch({ type: 'LOGIN', payload: loggedInUser });
		};
	}, []);

	const handleRefetch = async () => {
		if (!user) return;
		if (window.confirm("Are you sure you want to refetch the data?")) {
			try {
				setLoading(true);
				await gigService.fetch();
				queryClient.invalidateQueries({ queryKey: ['gigs'] });
			} catch (error) {
				console.error('Error during refetch:', error);
			} finally {
				setLoading(false);
			}
		}
	};

	const cal = 'https://calendar.google.com/calendar/u/0/embed?src=ub9hkd0tjl3vk82t9jn5qudemc@group.calendar.google.com';
	const home = 'https://www.juusorinta.com';

	return (
	<FooterDiv>
		{ loading && (
			<Overlay>
					<Spinner />
					<div style={{ marginTop: '10px' }}>Refetching</div>
			</Overlay>
		)}
		<div style={{ width: '70%', paddingLeft: '10px', textAlign: 'left'}}>
			Powered by <a href={cal}>Jazz-kalenteri</a> & <a href={home}>Juuso Rinta</a>
		</div>
		<div style={{ width: '15%', textAlign: 'center'}}>
			{user && ( <a onClick={() => handleRefetch() }>Refetch</a> )}
		</div>
		<div style={{ width: '15%', paddingRight: '10px', textAlign: 'right' }}>
			{!user && ( <Link to='/login'>Login</Link>)}
			{user && ( <a onClick={() => { userDispatch({ type: 'LOGOUT' }) }}>Logout</a>)}
		</div>
	</FooterDiv>
	)
};

export default Footer;
