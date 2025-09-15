// src/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%; }

  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.titleColor};
    font-family: ${({ theme }) => theme.fontFamily}, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img { max-width: 100%; display: inline-block; }
  a { color: inherit; text-decoration: none; }
`;