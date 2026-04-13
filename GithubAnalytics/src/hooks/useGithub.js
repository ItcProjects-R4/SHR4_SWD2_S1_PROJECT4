import { useState } from "react";
import { fetchGithubUser, analyzeRepos } from "../utils/github";

export function useGithub() {
  const [userData, setUserData] = useState([null, null]);
  const [loading, setLoading] = useState([false, false]);
  const [logs, setLogs] = useState([
    { type: "info", text: "GitHub Analytics Terminal v2.0 ready." },
  ]);

  const log = (text, type = "info") =>
    setLogs((l) => [...l.slice(-25), { text, type }]);

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

  return { userData, loading, logs, fetchUser };
}
