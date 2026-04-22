import { ACCENT } from "../utils/constants";

export default function Header({ compareMode, onToggleCompare }) {
  return (
    <header
      className="flex items-center justify-between px-8 py-5 border-b border-[#111] w-full"
      style={{
        background: "linear-gradient(180deg, #060606 0%, #030303 100%)",
      }}
    >
      {/* Logo */}
      <div>
        <div
          className="text-[28px] tracking-[6px]"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: ACCENT,
            textShadow: `0 0 30px ${ACCENT}50`,
          }}
        >
          GITHUB ANALYTICS
        </div>
        <div className="text-[10px] text-[#333] tracking-[3px] mt-0.5">
          PROFILE INTELLIGENCE DASHBOARD
        </div>
      </div>

      {/* Compare Mode Toggle */}
      <div
        onClick={onToggleCompare}
        className="flex items-center gap-2.5 text-[11px] text-[#555] cursor-pointer select-none"
      >
        <div
          className="relative w-9 h-4.5 rounded-full transition-all duration-300"
          style={{
            background: compareMode ? `${ACCENT}40` : "#1a1a1a",
            border: `1px solid ${compareMode ? ACCENT : "#333"}`,
          }}
        >
          <div
            className="absolute top-0.5 w-3 h-3 rounded-full transition-all duration-300"
            style={{
              background: compareMode ? ACCENT : "#444",
              left: compareMode ? "20px" : "2px",
              boxShadow: compareMode ? `0 0 6px ${ACCENT}` : "none",
            }}
          />
        </div>
        COMPARE MODE
      </div>
    </header>
  );
}
