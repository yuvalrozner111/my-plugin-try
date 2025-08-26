import styled from "styled-components";

const Bar = styled.nav`
  display: flex; gap: 8px; padding: 8px;
  border-bottom: 1px solid #e5e7eb; background: #fafafa;
`;
const Item = styled.button`
  padding: 6px 10px; border-radius: 10px; font: inherit; cursor: pointer;
  border: 1px solid #e5e7eb; background: ${p => (p.$active ? "#eef2ff" : "white")};
`;

export default function PluginBar({ plugins, activeId, onSelect }) {
  return (
    <Bar>
      {plugins.map(p => (
        <Item key={p.id} $active={p.id === activeId} onClick={() => onSelect(p.id)} title={p.title}>
          {p.icon ?? "🔌"} {p.title}
        </Item>
      ))}
    </Bar>
  );
}
