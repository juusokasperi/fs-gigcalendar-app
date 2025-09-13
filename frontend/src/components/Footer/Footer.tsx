import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import UserContext from '../../UserContext';
import gigService from '../../services/gigs';
import { FooterDiv, Overlay, Spinner } from './styled';
import ConfirmModal from './ConfirmModal';

const Footer = () => {
	const [loading, setLoading] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
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

	const handleRefetchClick = () => {
		setShowConfirmModal(true);
	};

	const handleConfirmRefetch = async () => {
		setShowConfirmModal(false);
		if (!user) return;
		try {
			setLoading(true);
			await gigService.fetch();
			queryClient.invalidateQueries({ queryKey: ['gigs'] });
		} catch (error) {
			console.error('Error during refetch:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleCancelRefetch = () => {
		setShowConfirmModal(false);
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
			{user && ( <a onClick={handleRefetchClick}>Refetch</a> )}
		</div>
		<div style={{ width: '15%', paddingRight: '10px', textAlign: 'right' }}>
			{!user && ( <Link to='/login'>Login</Link>)}
			{user && ( <a onClick={() => { userDispatch({ type: 'LOGOUT' }) }}>Logout</a>)}
		</div>
		<ConfirmModal
			isOpen={showConfirmModal}
			message='Are you sure you want to refetch the data?'
			onConfirm={handleConfirmRefetch}
			onCancel={handleCancelRefetch}
			confirmText='Yes, refetch'
			cancelText='Cancel'
		/>
	</FooterDiv>
	)
};

export default Footer;
