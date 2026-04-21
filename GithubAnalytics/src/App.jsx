import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

const TABS = ["overview", "repos", "languages"];

export default function App() {
  const [compareMode, setCompareMode] = useState(false);

  const [loading, setLoading] = useState({
    0: false,
    1: false,
  });

  const handleFetch = async (idx, userName) => {
    console.log("idx", idx);
    console.log("UserName", userName);

    setLoading((prev) => ({ ...prev, [idx]: true }));

    await new Promise((res) => setTimeout(res, 2000));

    setLoading((prev) => ({ ...prev, [idx]: false }));
  };

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

      <SearchBar
        onFetch={handleFetch}
        compareMode={compareMode}
        loading={loading}
      />

      <main style={{ padding: "24px 32px" }}></main>
    </div>
  );
}
