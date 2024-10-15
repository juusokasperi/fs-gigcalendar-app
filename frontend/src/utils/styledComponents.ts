import styled from 'styled-components';

export const ContainerDiv = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex: 1;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background-color: #ffffff;
  margin: 0 auto;
  padding: 0;

  @media (min-width: 768px) {
    width: 70vw;
    max-width: 800px;
    margin: 0 auto;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #000000;
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

export const ContentDiv = styled.div`
  flex: 1;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  margin: 0;
`

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

export const FooterDiv = styled.div`
  background-color:  #fcca0021;
  padding: 5px;
  padding-bottom: 10px;
  text-align: center;
  font-size: 10px;
`

export const HeaderDiv = styled.div`
  margin: 0;
  background-color: #fcc800;
  padding-top: 10px;
  padding-bottom: 0px;
`

export const Dropdown = styled.div`
  margin: 0px;
  position: relative;
  display: inline-block;
  background-color: #fcc800;
`

export const Select = styled.select`
  background-color: #363636;
  margin: 5px;
  border: 0px;
  border-radius: 2.5px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 30px;
  font-size: 1em;
  color: #999999;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24'%3E%3Cpath fill='%23999999' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px;
`
