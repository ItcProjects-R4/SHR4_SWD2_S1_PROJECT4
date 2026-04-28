import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Terminal from "./components/Terminal";
import TabsNav from "./components/TabNav";
import EmptyState from "./components/EmptyState";
import CompareTab from "./components/tabs/CompareTab";
import LanguagesTab from "./components/tabs/LanguagesTab";
import OverviewTab from "./components/tabs/OverviewTab";
import ReposTab from "./components/tabs/ReposTab";
import { useGithub } from "./hooks/useGithub";
import { ACCENT } from "./utils/constants";

const TABS = ["overview", "repos", "languages"];

export default function App() {
  const { userData, loading, logs, fetchUser } = useGithub();
  const [compareMode, setCompareMode] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const activeData = userData.filter(Boolean);
  const showCompare = compareMode && userData[0] && userData[1];
  const tabs = showCompare ? [...TABS, "compare"] : TABS;

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
        .tabs-scroll::-webkit-scrollbar { display: none; }
        .tabs-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Header
        compareMode={compareMode}
        onToggleCompare={() => setCompareMode((m) => !m)}
      />

      <main
        style={{ padding: "24px 32px", maxWidth: "1400px", margin: "0 auto" }}
      >
        <SearchBar
          onFetch={fetchUser}
          compareMode={compareMode}
          loading={loading}
        />
        <Terminal logs={logs} />

        {activeData.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <TabsNav
              tabs={tabs}
              activeTab={activeTab}
              onSelect={setActiveTab}
            />
            {activeTab === "overview" && <OverviewTab data={userData} />}
            {activeTab === "repos" && <ReposTab data={userData} />}
            {activeTab === "languages" && <LanguagesTab data={userData} />}
            {activeTab === "compare" && showCompare && (
              <CompareTab data={userData} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
