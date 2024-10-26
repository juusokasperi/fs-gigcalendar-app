import logo from '../../img/logo.png';
import { HeaderDiv } from './styled';

const Header = () => {
return (
	<HeaderDiv>
		<img src={logo} style={{ maxHeight: '15vh' }} />
	</HeaderDiv>
	);
};

export default Header;
