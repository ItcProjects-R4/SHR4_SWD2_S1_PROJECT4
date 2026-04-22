import { useState } from "react";
import Header from "./components/Header";
import GithubAnalyticsTabs from "./components/Tabs";
import SearchBar from "./components/SearchBar";
import Terminal from "./components/Terminal";
import { useGithub } from "./hooks/useGithub";

export default function App() {
  const [compareMode, setCompareMode] = useState(false);
  const [activeTab, setActiveTab] = useState("repos");
  const { userData, loading, logs, fetchUser } = useGithub();

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
        body { font-family: 'Share Tech Mono', monospace; margin: 0; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #00ff8833; }
      `}</style>

      <Header
        compareMode={compareMode}
        onToggleCompare={() => setCompareMode((m) => !m)}
      />

      <main className="max-w-[1400px] mx-auto" style={{ padding: "0 32px 40px" }}>
        <SearchBar 
          onFetch={fetchUser} 
          compareMode={compareMode} 
          loading={loading} 
        />
        <div className="px-5 mb-8">
          <Terminal logs={logs} />
        </div>
        <div className="mt-10">
          <GithubAnalyticsTabs
            data={userData}
            currentTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

      </main>
    </div>
  );
}