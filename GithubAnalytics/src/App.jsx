import { useState } from "react";
import Header from "./components/Header";
// import OverviewTab from "./components/tabs/OverviewTab";
// import UserCard from "./components/UserCard";
// import { fetchGithubUser, analyzeRepos } from "./utils/github";
// import { ACCENT } from "./utils/constants";

const TABS = ["overview", "repos", "languages"];

export default function App() {
  const [compareMode, setCompareMode] = useState(false);
  // const [query, setQuery] = useState("");
  // const [userData, setUserData] = useState(null);
  // const [statsData, setStatsData] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  // const handleSearch = async () => {
  //   if (!query.trim()) return;
  //   setLoading(true);
  //   setError("");
  //   try {
  //     const data = await fetchGithubUser(query.trim());
  //     setUserData(data.user);
  //     setStatsData(analyzeRepos(data.repos));
  //   } catch (err) {
  //     setError(err.message);
  //     setUserData(null);
  //     setStatsData(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#030303",
        color: "#e0e0e0",
        fontFamily: "'Share Tech Mono', monospace",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Bebas+Neue&display=swap');
        body { font-family: 'Share Tech Mono', monospace; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; }
      `}</style>

      <Header
        compareMode={compareMode}
        onToggleCompare={() => setCompareMode((m) => !m)}
      />
      <main style={{ padding: "24px 32px" }}>

      </main>
      
{/*             
        <div className="flex items-center w-full max-w-2xl border border-[#1a1a1a] rounded-md overflow-hidden bg-[#050505] mb-8">
          <div className="px-4 py-3 text-xs font-bold border-r border-[#1a1a1a] bg-[#0a0a0a]" style={{ color: ACCENT }}>
            USER_1 $
          </div>
          <input 
            className="flex-1 bg-transparent px-4 py-3 text-[#e0e0e0] outline-none text-sm placeholder-[#444]" 
            placeholder="Enter GitHub username..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="px-6 py-3 text-xs font-bold border-l border-[#1a1a1a] transition-colors"
            style={{ color: loading ? "#555" : ACCENT }}
            disabled={loading}
          >
            {loading ? "ANALYZING..." : "ANALYZE"}
          </button>
        </div>

        {error && (
          <div className="text-[#ff4488] mb-8 text-sm">{error}</div>
        )}

        {userData && (
          <OverviewTab data={[{ user: userData, ...statsData }]} />
        )}
      </main> */}
    </div>
  );
}

