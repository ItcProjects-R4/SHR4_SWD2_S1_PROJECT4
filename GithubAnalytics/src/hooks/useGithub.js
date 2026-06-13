import { useState, useEffect } from "react";
import { fetchGithubUser, analyzeRepos } from "../utils/github";

export function useGithub() {
  const [userData, setUserData] = useState([null, null]);
  const [loading, setLoading] = useState([false, false]);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem("github_search_history");
    return saved ? JSON.parse(saved) : [];
  });
  const [logs, setLogs] = useState([
    { type: "info", text: "GitHub Analytics Terminal v2.0 ready." },
  ]);

  useEffect(() => {
    localStorage.setItem(
      "github_search_history",
      JSON.stringify(searchHistory),
    );
  }, [searchHistory]);

  const log = (text, type = "info") =>
    setLogs((l) => [...l.slice(-25), { text, type }]);

  const addToHistory = (username) => {
    setSearchHistory((prev) => {
      const filtered = prev.filter((u) => u !== username);
      return [username, ...filtered].slice(0, 5);
    });
  };

  const fetchUser = async (idx, username) => {
    if (!username.trim()) return;
    setLoading((l) => {
      const n = [...l];
      n[idx] = true;
      return n;
    });
    log(`Fetching ${username}...`, "cmd");
    try {
      const { user, repos } = await fetchGithubUser(username.trim());
      const analysis = analyzeRepos(repos);
      setUserData((prev) => {
        const n = [...prev];
        n[idx] = { user, repos, ...analysis };
        return n;
      });
      addToHistory(username.trim());
      log(
        `✓ ${username} — ${repos.length} repos, ${analysis.totalStars} stars`,
        "success",
      );
    } catch (e) {
      log(`✗ ${e.message}`, "error");
    }
    setLoading((l) => {
      const n = [...l];
      n[idx] = false;
      return n;
    });
  };

  return { userData, loading, logs, fetchUser, searchHistory };
}
