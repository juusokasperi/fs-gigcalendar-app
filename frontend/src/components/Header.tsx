import logo from '../img/jazzfinland-logo.png';
import '../App.css';

const Header = () => {
return (
	<div className='img'>
		<img src={logo} style={{ width: '50vw', height: 'auto' }} />
	</div>
	);
};

export default Header;
