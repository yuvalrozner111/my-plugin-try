import { Bar, Item } from "./PluginBar.style.js";

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
