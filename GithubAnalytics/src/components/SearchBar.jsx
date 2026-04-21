import { useState } from "react";
import { ACCENT, ACCENT2 } from "../utils/constants";

function SearchBar({ onFetch, compareMode, loading }) {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");

  const handleClick = (idx) => {
    const userName = idx === 0 ? user1 : user2;
    if (!userName) return;

    onFetch(idx, userName);
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Enter") {
      handleClick(idx);
    }
  };

  const rows = compareMode ? [0, 1] : [0];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: compareMode ? "1fr 1fr" : "1fr",
        gap: "16px",
        marginBottom: "20px",
        padding: "20px",
      }}
    >
      {rows.map((idx) => {
        const color = idx === 0 ? ACCENT : ACCENT2;
        const value = idx === 0 ? user1 : user2;
        const setValue = idx === 0 ? setUser1 : setUser2;

        return (
          <div key={idx} style={{ display: "flex" }}>
            <div
              style={{
                padding: "10px 14px",
                background: "#080808",
                border: `1px solid ${color}25`,
                borderRight: "none",
                borderRadius: "4px 0 0 4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ color, fontSize: "12px", fontWeight: "bold" }}>
                {idx === 0 ? "USER_1 $" : "USER_2 $"}
              </span>
            </div>

            <input
              type="text"
              placeholder="Enter UserName"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              style={{
                flex: 1,
                background: "#080808",
                border: `1px solid ${color}25`,
                borderRight: "none",
                padding: "10px 16px",
                color: "#e0e0e0",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "13px",
                outline: "none",
              }}
            />
            <button
              onClick={() => handleClick(idx)}
              disabled={loading[idx]}
              style={{
                padding: "10px 20px",
                background: loading[idx] ? "#111" : `${color}15`,
                border: `1px solid ${color}${loading[idx] ? "20" : "60"}`,
                borderRadius: "0 4px 4px 0",
                color: loading[idx] ? "#333" : color,
                cursor: loading[idx] ? "not-allowed" : "pointer",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "12px",
                letterSpacing: "2px",
                transition: "0.2s",
              }}
            >
              {loading[idx] ? "LOADING" : " ANALYZE"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default SearchBar;
