import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TabNav from "./components/TabNav";
import CompareTab from "./components/tabs/CompareTab";
import LanguagesTab from "./components/tabs/LanguagesTab";
import OverviewTab from "./components/tabs/OverviewTab";
import ReposTab from "./components/tabs/ReposTab";
import { useGithub } from "./hooks/useGithub";
import { ACCENT, ACCENT2 } from "./utils/constants";
import Terminal from "./components/Terminal";

// const TABS = ["overview", "repos", "languages"];

export default function App() {
  const { userData, loading, logs, fetchUser } = useGithub();

  const [compareMode, setCompareMode] = useState(false);

  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    "overview",
    "repos",
    "languages",
    ...(userData[0] && userData[1] ? ["compare"] : []),
  ];

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
        onFetch={fetchUser}
        compareMode={compareMode}
        loading={loading}
      />
      <Terminal logs={logs} />

      <div className="flex border-b border-[#111] mt-7 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 sm:px-6 py-2 text-[10px] sm:text-[11px] tracking-[1px] sm:tracking-[2px] uppercase font-mono whitespace-nowrap transition-all duration-200 border-b-2 -mb-[1px]"
            style={{
              color: tab === activeTab ? ACCENT : "#333",
              borderBottom:
                tab === activeTab
                  ? `2px solid ${ACCENT}`
                  : "2px solid transparent",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <main style={{ padding: "24px 32px" }}>
        {!userData[0] && !userData[1] ? (
          <div className="text-center mt-12 sm:mt-16 text-gray-500 px-4">
            <h3 className="text-lg mb-2">No data yet</h3>
          </div>
        ) : (
          <>
            {activeTab === "overview" && <OverviewTab data={userData} />}
            {activeTab === "repos" && <ReposTab data={userData} />}
            {activeTab === "languages" && <LanguagesTab data={userData} />}
            {activeTab === "compare" && <CompareTab data={userData} />}
          </>
        )}
      </main>
    </div>
  );
}
