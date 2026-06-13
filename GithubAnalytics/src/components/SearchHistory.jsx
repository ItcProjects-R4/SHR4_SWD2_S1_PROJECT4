import { ACCENT } from "../utils/constants";

export default function SearchHistory({ history, onSelect }) {
  if (history.length === 0) return null;

  return (
    <div className="flex items-center gap-2 mb-4 flex-wrap">
      <span className="text-[10px] text-[#333] tracking-[2px]">RECENT:</span>
      {history.map((username, i) => (
        <button
          key={i}
          onClick={() => onSelect(username)}
          className="px-3 py-1 text-[10px] tracking-[1px] rounded transition-all duration-200 hover:opacity-80"
          style={{
            border: `1px solid ${ACCENT}30`,
            color: ACCENT,
            background: `${ACCENT}08`,
            fontFamily: "'Share Tech Mono', monospace",
          }}
        >
          {username}
        </button>
      ))}
    </div>
  );
}
