import styled from "styled-components";

export const OutletContainer = styled.div`
  margin-top: 8px;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.titleColor};
  font-family: ${({ theme }) => theme.fontFamily};
  border-bottom: 2px solid ${({ theme }) => theme.borderColor};
  border-top: 2px solid ${({ theme }) => theme.borderColor};
  min-width: 54vw;
`;

export const Info = styled.div`
  padding: 12px;
`;
