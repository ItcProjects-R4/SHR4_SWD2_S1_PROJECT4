import { ACCENT } from "../utils/constants";

export default function TabsNav({ tabs, activeTab, onSelect }) {
  return (
    <div className="flex border-b border-[#111] my-7">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onSelect(t)}
          className="px-6 py-2.5 text-[11px] tracking-[2px] bg-transparent border-none uppercase cursor-pointer transition-all duration-200 -mb-px"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            borderBottom: `2px solid ${t === activeTab ? ACCENT : "transparent"}`,
            color: t === activeTab ? ACCENT : "#333",
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
