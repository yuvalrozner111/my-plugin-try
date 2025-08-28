import styled from "styled-components";

export const ByeByeContainer = styled.div`
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.bgColor};
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.textColor1};
`;

export const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

export const CounterButton = styled.button`
  background: ${({ theme }) => theme.button?.bg || '#2d8cff'};
  color: ${({ theme }) => theme.button?.text || 'white'};
  border: 1px solid ${({ theme }) => theme.borderColor};
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font: inherit;
  max-width: 180px;
  margin: 0 auto;

  &:hover {
    background: ${({ theme }) => theme.button?.hover || '#1b74e4'};
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CountLabel = styled.span`
  margin-left: 8px;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor1};
`;

const StyledLabel = styled.div`
  padding: 4px 8px;
  border-radius: 6px;
`;

export const StyledDiv1 = styled(StyledLabel)`
  color: ${({ theme }) => theme.textColor1};
  background: ${({ theme }) => theme.cardBgColor};
`;

export const StyledDiv2 = styled(StyledLabel)`
  color: ${({ theme }) => theme.textColor2};
  background: ${({ theme }) => theme.cardBgColor2};
`;
