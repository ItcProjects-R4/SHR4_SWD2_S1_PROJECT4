import { ACCENT } from "../utils/constants";

export default function TabsNav({ tabs, activeTab, onSelect }) {
  const hasCompare = tabs.includes("compare");

  return (
    <div className="flex border-b border-[#111] my-7">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onSelect(t)}
          className="transition-all duration-200 -mb-px uppercase cursor-pointer bg-transparent border-x-0 border-t-0"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            borderBottom: `2px solid ${t === activeTab ? ACCENT : "transparent"}`,
            color: t === activeTab ? ACCENT : "#333",
          }}
        >
          <span
            className={`hidden lg:inline px-6 py-2.5 text-[11px] tracking-[2px]`}
          >
            {t}
          </span>
          <span
            className={`lg:hidden ${hasCompare ? "px-3 py-2 text-[9px] tracking-[1px]" : "px-6 py-2.5 text-[11px] tracking-[2px]"}`}
          >
            {t}
          </span>
        </button>
      ))}
    </div>
  );
}
