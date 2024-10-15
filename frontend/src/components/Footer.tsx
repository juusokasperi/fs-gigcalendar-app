import { FooterDiv } from '../utils/styledComponents';

const Footer = () => {
	const cal = 'https://calendar.google.com/calendar/u/0/embed?src=ub9hkd0tjl3vk82t9jn5qudemc@group.calendar.google.com';
	const home = 'https://www.juusorinta.com';

	return (
	<FooterDiv>
		Powered by <a href={cal}>Jazz-kalenteri</a> & <a href={home}>Juuso Rinta</a>
	</FooterDiv>
	)
};

export default Footer;
