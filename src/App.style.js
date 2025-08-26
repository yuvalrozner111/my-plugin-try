import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.bgColor1};
    color: ${props => props.theme.titleColor};
    font-family: ${props => props.theme.fontFamily};
  }
`;
