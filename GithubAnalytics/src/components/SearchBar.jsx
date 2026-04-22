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
      className={`grid gap-4 mb-5 p-5 gird-col-1 ${compareMode ? "md:grid-cols-2" : ""}`}
    >
      {rows.map((idx) => {
        const color = idx === 0 ? ACCENT : ACCENT2;
        const value = idx === 0 ? user1 : user2;
        const setValue = idx === 0 ? setUser1 : setUser2;

        return (
          <div key={idx} className="flex">
            <div
              className="px-3 py-2 bg-black border border-opacity-20 boder-r-0 rounded-l flex items-center"
              style={{ borderColor: `${color}40` }}
            >
              <span className="text-xs font-bold" style={{ color }}>
                {idx === 0 ? "USER_1 $" : "USER_2 $"}
              </span>
            </div>

            <input
              type="text"
              placeholder="Enter UserName"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="flex-1 bg-black border border-r-0 px-4 py-2 text-gray-200 text-sm outline-none font-mono"
              style={{ borderColor: `${color}40` }}
            />
            <button
              onClick={() => handleClick(idx)}
              disabled={loading[idx]}
              style={{
                background: loading[idx] ? "#111" : `${color}15`,
                border: `1px solid ${color}${loading[idx] ? "20" : "60"}`,
                color: loading[idx] ? "#333" : color,
              }}
              className={`px-5 py-2 rounded-r font-mono text-xs tracking-widest transition
                ${
                  loading[idx]
                    ? "bg-black cursor-not-allowed text-gray-600"
                    : "hover:opacity-80"
                }`}
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
