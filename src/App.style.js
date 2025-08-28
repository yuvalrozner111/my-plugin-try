import styled from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.titleColor};
  font-family: ${({ theme }) => theme.fontFamily};
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }

  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: ${({ theme }) => theme.button.bg2};
    color: ${({ theme }) => theme.button.text2};
    cursor: pointer;
    transition: border-color 0.25s;
  }

  .logo {
    margin-top: 0rem;
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.react:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
  align-items: center;
`;

export const IconButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.12);
  background: transparent;
  color: inherit;
  text-decoration: none;
  font-size: 14px;
`;
