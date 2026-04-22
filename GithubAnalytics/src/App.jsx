import { useState } from "react";
import Header from "./components/Header";
import Terminal from "./components/Terminal";
import TabsNav from "./components/TabNav";
import { CompareTab } from "./components/tabs";
import { useGithub } from "./hooks/useGithub";

const TABS = ["overview", "repos", "languages"];

export default function App() {
  const [compareMode, setCompareMode] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { userData, logs } = useGithub();

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
      `}</style>

      <Header
        compareMode={compareMode}
        onToggleCompare={() => setCompareMode((m) => !m)}
      />

      <main style={{ padding: "24px 32px" }}>
        <Terminal logs={logs} />
        <TabsNav tabs={tabs} activeTab={activeTab} onSelect={setActiveTab} />
        {/* {activeTab === "compare" && showCompare && (
          <CompareTab data={userData} />
        )} */}
      </main>
    </div>
  );
}
