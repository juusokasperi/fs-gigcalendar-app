import '../App.css';

const Footer = () => {
	const url = 'https://calendar.google.com/calendar/u/0/embed?src=ub9hkd0tjl3vk82t9jn5qudemc@group.calendar.google.com';

	return (
	<div className='footer' key='footer'>
		Powered by <a href={url}>Jazz-kalenteri</a> & Juuso Rinta
	</div>
	)
};

export default Footer;
