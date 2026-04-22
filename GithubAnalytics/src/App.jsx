import { useState } from "react";
import Header from "./components/Header";

const TABS = ["overview", "repos", "languages"];

export default function App() {
  const [compareMode, setCompareMode] = useState(false);

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

      <main style={{ padding: "24px 32px" }}></main>
    </div>
  );
}