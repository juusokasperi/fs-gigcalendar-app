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
