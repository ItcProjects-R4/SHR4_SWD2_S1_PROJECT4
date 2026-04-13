import { ACCENT } from "../utils/constants";

export default function Header({ compareMode, onToggleCompare }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 32px",
        borderBottom: "1px solid #111",
        background: "linear-gradient(180deg, #060606 0%, #030303 100%)",
        width: "100%",
      }}
    >
      {/* Logo */}
      <div>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "28px",
            letterSpacing: "6px",
            color: ACCENT,
            textShadow: `0 0 30px ${ACCENT}50`,
          }}
        >
          GITHUB ANALYTICS
        </div>
        <div
          style={{
            fontSize: "10px",
            color: "#333",
            letterSpacing: "3px",
            marginTop: "2px",
          }}
        >
          PROFILE INTELLIGENCE DASHBOARD
        </div>
      </div>

      {/* Compare Mode Toggle */}
      <div
        onClick={onToggleCompare}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "11px",
          color: "#555",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "18px",
            borderRadius: "9px",
            background: compareMode ? `${ACCENT}40` : "#1a1a1a",
            border: `1px solid ${compareMode ? ACCENT : "#333"}`,
            position: "relative",
            transition: "all .3s",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: compareMode ? ACCENT : "#444",
              position: "absolute",
              top: "2px",
              left: compareMode ? "20px" : "2px",
              transition: "all .3s",
              boxShadow: compareMode ? `0 0 6px ${ACCENT}` : "none",
            }}
          />
        </div>
        COMPARE MODE
      </div>
    </header>
  );
}
