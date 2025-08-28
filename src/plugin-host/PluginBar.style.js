import styled from "styled-components";

export const Bar = styled.nav`
  display: flex; gap: 8px; padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.bgColor1};
  font-family: ${({ theme }) => theme.fontFamily};
`;

export const Item = styled.button`
  padding: 6px 10px; border-radius: 10px; font: inherit; cursor: pointer;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ $active, theme }) => $active ? '#597097ff' : (theme.button.bgColor)};
  color: ${({ theme }) => theme.button.textColor};
`;
