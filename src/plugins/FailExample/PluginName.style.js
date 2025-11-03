import styled from "styled-components";

export const PluginNameContainer = styled.div`
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.bgColor};
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.textColor1};
`;