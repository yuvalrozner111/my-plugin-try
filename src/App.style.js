import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%; }

  /* Remove default browser body margin */
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.titleColor};
    font-family: ${({ theme }) => theme.fontFamily}, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* sensible defaults for elements */
  img { max-width: 100%; display: inline-block; }
  a { color: inherit; text-decoration: none; }
`;

export const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.titleColor};
  font-family: ${({ theme }) => theme.fontFamily};
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

export const ThemeButton = styled.button`
  /* compact toggle switch */
  width: 48px;
  height: 28px;
  padding: 2px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.08);
  background: ${({ theme, active }) => (active ? theme.button.bg2 : 'transparent')};
  position: relative;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  transition: background 180ms ease, border-color 180ms ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(100,108,255,0.12);
  }

  /* knob */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: ${({ active }) => (active ? 'calc(100% - 22px)' : '2px')};
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: ${({ theme }) => (theme.button.knob || '#fff')};
    box-shadow: 0 1px 4px rgba(0,0,0,0.18);
    transition: left 180ms ease, background 180ms ease;
  }
`;

export const LogoContainer = styled.img`
  margin-top: 0rem;
  height: 6.4em;
  padding: 0.8em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
`;

export const AppTitle = styled.div`
  font-size: 2.6em !important;
  font-weight: bold;
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
