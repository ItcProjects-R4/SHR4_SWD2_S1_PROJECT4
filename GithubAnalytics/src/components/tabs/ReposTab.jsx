import { useState } from "react";
import { ACCENT, ACCENT2 } from "../../utils/constants";
import { SectionTitle, CustomTooltip, GlowText } from "./../UI";

export default function ReposTab({ data = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const activeData = Array.isArray(data) ? data.filter(Boolean) : [];

  if (activeData.length === 0) {
    return (
      <div className="text-zinc-800 font-mono text-center py-20 tracking-tighter">
        INITIALIZING DATA STREAM...
      </div>
    );
  }

  return (
    <div className="font-mono w-full">
      <div className="mx-1 md:mx-4 mb-10">
        <div className="relative group max-w-sm">
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-zinc-700 text-[10px] animate-pulse">
            &gt;
          </div>
          <input
            type="text"
            placeholder="FILTER_REPOSITORIES..."
            className="w-full bg-transparent border-b border-zinc-900 px-4 py-2 text-[11px] text-zinc-400 focus:outline-none focus:border-emerald-500/50 transition-all uppercase tracking-[0.2em] placeholder:text-zinc-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div
        className={`grid gap-6 ${activeData.length > 1 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}
      >
        {activeData.map((d, i) => {
          const userColor = i === 0 ? ACCENT : ACCENT2;
          const filteredRepos = d.repos?.filter((repo) =>
            repo.name.toLowerCase().includes(searchTerm.toLowerCase()),
          );

          return (
            <div key={i} className="w-full">
              <div className="mb-4">
                <SectionTitle>{d.user?.login} — REPOSITORIES</SectionTitle>
              </div>

              <div className="border border-[#0d0d0d] rounded overflow-hidden">
                <div className="grid grid-cols-[1fr_80px_80px_80px] px-4 py-2 bg-[#080808] text-[10px] text-[#333] tracking-[2px]">
                  <span>REPO NAME</span>
                  <span className="text-right">STARS</span>
                  <span className="text-right">FORKS</span>
                  <span className="text-right">LANG</span>
                </div>

                <div className="max-h-[600px] overflow-y-auto">
                  {filteredRepos?.length > 0 ? (
                    filteredRepos.map((repo, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-[1fr_80px_80px_80px] px-4 py-2.5 text-[12px] border-t border-[#080808] transition-colors duration-200 cursor-default"
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = `${userColor}06`)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <span
                          className="overflow-hidden text-ellipsis whitespace-nowrap"
                          style={{ color: userColor }}
                        >
                          {repo.fork && (
                            <span className="mr-1.5 text-[#333]">⑂</span>
                          )}
                          {repo.name}
                        </span>
                        <span
                          className={`text-right ${repo.stargazers_count > 0 ? "text-[#ffcc00]" : "text-[#222]"}`}
                        >
                          ★ {repo.stargazers_count}
                        </span>
                        <span className="text-right text-[#333]">
                          {repo.forks_count}
                        </span>
                        <span className="text-right text-[#555] text-[10px]">
                          {repo.language || "—"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="py-20 text-center text-zinc-800 text-[10px] uppercase">
                      No_data_found
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
