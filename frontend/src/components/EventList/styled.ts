import styled from 'styled-components';

export const EventDiv = styled.div`
  margin: 0;
  padding: 10px;

  &:nth-child(odd) {
    background-color: #ffffff;
  }
  &:nth-child(even) {
    background-color: #fff8ed;
  }
  @media (prefers-color-scheme: dark) {
    &:nth-child(odd) {
    background-color: #242424;
    }
    &:nth-child(even) {
    background-color: #000000;
    }
  }
`

export const DateDiv = styled.div`
	font-family: 'Bebas Neue', sans-serif;
  text-transform: uppercase;
  font-size: 1.5em;
  font-weight: normal;
  padding: 2px;
  color: #fdfdfd;
  background-color: #363636;
`

export const BasicInfo = styled.div`
  font-weight: 500;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`

export const CaretButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.8em;
  color: #363636;
`
export const ContentDiv = styled.div`
  flex: 1;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  margin: 0;
`

export default { DateDiv, BasicInfo, EventDiv, CaretButton, ContentDiv };
