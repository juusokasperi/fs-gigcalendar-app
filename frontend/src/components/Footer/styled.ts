import styled, { keyframes } from 'styled-components';

export const FooterDiv = styled.div`
  background-color:  #fcca0021;
  padding: 5px;
  padding-bottom: 10px;
  text-align: center;
  font-size: 10px;
  flex-direction: row;
  display: flex;
`
export const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.5);
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
	z-index: 1000;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
