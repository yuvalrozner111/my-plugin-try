import styled from "styled-components";

export const OutletContainer = styled.div`
  &.plugin-outlet {
    background: ${({ theme }) => theme.bgColor1};
    color: ${({ theme }) => theme.titleColor};
    font-family: ${({ theme }) => theme.fontFamily};
  }
`;

export const Info = styled.div`
  padding: 12px;
`;
