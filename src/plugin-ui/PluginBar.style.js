import styled from "styled-components";

export const Bar = styled.nav`
  display: flex; gap: 8px; padding: 8px;
  border-bottom: 1px solid #e5e7eb; background: #fafafa;
`;

export const Item = styled.button`
  padding: 6px 10px; border-radius: 10px; font: inherit; cursor: pointer;
  border: 1px solid #e5e7eb; background: ${p => (p.$active ? "#eef2ff" : "white")};
`;
