import { useTranslation } from "react-i18next";
import { Bar, Item } from "./PluginBar.style.js";

export default function PluginBar({ plugins, activeId, onSelect }) {
  const { t } = useTranslation();

  return (
    <Bar>
      {plugins.map(p => {
        let translatedTitle = t(p.titleKey, { 
          ns: p.id, 
          defaultValue: p.id 
        });

        if (!translatedTitle || translatedTitle === "") {
          translatedTitle = p.id;
        }

        return (
          <Item 
            key={p.id} 
            $active={p.id === activeId} 
            onClick={() => onSelect(p.id)} 
            title={translatedTitle} 
          >
            {p.icon ?? "🔌"} {translatedTitle}
          </Item>
        );
      })}
    </Bar>
  );
}