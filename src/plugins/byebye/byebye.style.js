import styled from "styled-components";

export const ByeByeContainer = styled.div`
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.bgColor1};
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.textColor};
`;

export const ControlsRow = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`;

export const CounterButton = styled.button`
  background: ${({ theme }) => theme.button?.bgColor || '#2d8cff'};
  color: ${({ theme }) => theme.button?.textColor || 'white'};
  border: 1px solid ${({ theme }) => theme.borderColor};
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font: inherit;

  &:hover {
    background: ${({ theme }) => theme.button?.hoverBgColor || '#1b74e4'};
  }
`;

export const CountLabel = styled.span`
  margin-left: 8px;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
`;
