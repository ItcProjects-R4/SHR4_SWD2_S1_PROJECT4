import { useState } from "react";
import { ACCENT, ACCENT2 } from "../utils/constants";
import SearchHistory from "./SearchHistory";

function SearchBar({ onFetch, compareMode, loading, searchHistory }) {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");

  const handleClick = (idx) => {
    const userName = idx === 0 ? user1 : user2;
    if (!userName) return;
    onFetch(idx, userName);
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Enter") handleClick(idx);
  };

  const handleHistorySelect = (username) => {
    setUser1(username);
    onFetch(0, username);
  };

  const rows = compareMode ? [0, 1] : [0];

  return (
    <div>
      <div
        className={`grid gap-4 mb-3 grid-cols-1 ${compareMode ? "md:grid-cols-2" : ""}`}
      >
        {rows.map((idx) => {
          const color = idx === 0 ? ACCENT : ACCENT2;
          const value = idx === 0 ? user1 : user2;
          const setValue = idx === 0 ? setUser1 : setUser2;

          return (
            <div key={idx} className="flex">
              <div
                className="px-3 py-2 bg-[#080808] rounded-l flex items-center"
                style={{ border: `1px solid ${color}25` }}
              >
                <span className="text-xs" style={{ color }}>
                  {idx === 0 ? "USER_1 $" : "USER_2 $"}
                </span>
              </div>
              <input
                type="text"
                placeholder="github username..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="flex-1 bg-[#080808] px-4 py-1 text-gray-200 text-xs outline-none font-mono"
                style={{
                  border: `1px solid ${color}25`,
                  fontFamily: "'Share Tech Mono', monospace",
                }}
              />
              <button
                onClick={() => handleClick(idx)}
                disabled={loading[idx]}
                style={{
                  background: loading[idx] ? "#111" : `${color}15`,
                  border: `1px solid ${color}${loading[idx] ? "20" : "60"}`,
                  color: loading[idx] ? "#333" : color,
                }}
                className={`px-5 py-2 rounded-r font-mono text-xs tracking-widest transition ${loading[idx] ? "cursor-wait" : "hover:opacity-80"}`}
              >
                {loading[idx] ? "LOADING" : "ANALYZE"}
              </button>
            </div>
          );
        })}
      </div>
      <SearchHistory history={searchHistory} onSelect={handleHistorySelect} />
    </div>
  );
}

export default SearchBar;
