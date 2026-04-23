import React, { useState } from 'react';
import { ACCENT, ACCENT2 } from '../../utils/constants';
import { SectionTitle, CustomTooltip, GlowText } from "./../UI";

export default function ReposTab({ data = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const activeData = Array.isArray(data) ? data.filter(Boolean) : [];

  if (activeData.length === 0) {
    return <div className="text-zinc-800 font-mono text-center py-20 tracking-tighter">INITIALIZING DATA STREAM...</div>;
  }

  return (
    <div className="font-mono w-full">
      <div className="mx-1 md:mx-4 mb-10">
        <div className="relative group max-w-sm">
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-zinc-700 text-[10px] animate-pulse">&gt;</div>
          <input
            type="text"
            placeholder="FILTER_REPOSITORIES..."
            className="w-full bg-transparent border-b border-zinc-900 px-4 py-2 text-[11px] text-zinc-400 focus:outline-none focus:border-emerald-500/50 transition-all uppercase tracking-[0.2em] placeholder:text-zinc-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={`grid gap-12 ${activeData.length > 1 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {activeData.map((d, i) => {
          const userColor = i === 0 ? ACCENT : ACCENT2;
          const filteredRepos = d.repos?.filter(repo =>
            repo.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          return (
            <div key={i} className="w-full">
              <div className="ml-1 md:ml-4 mb-6">
                <SectionTitle color={userColor}>
                  {d.user?.login} — REPOSITORIES
                </SectionTitle>
              </div>

              <div className="border border-zinc-900 rounded bg-black/20 overflow-hidden mx-1 md:mx-4">
                <div className="grid grid-cols-[1.2fr_70px_60px_1fr] md:grid-cols-[1fr_100px_100px_140px] px-4 py-4 bg-zinc-950/50 text-[9px] md:text-[11px] text-zinc-600 tracking-[0.15em] uppercase border-b border-zinc-900 font-bold">
                  <span>Name</span>
                  <span className="text-center">Stars</span>
                  <span className="text-center">Forks</span>
                  <span className="text-right">Language</span>
                </div>

                <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                  {filteredRepos?.length > 0 ? (
                    filteredRepos.map((repo, idx) => (
                      <div key={idx} className="grid grid-cols-[1.2fr_70px_60px_1fr] md:grid-cols-[1fr_100px_100px_140px] px-4 py-4 border-b border-zinc-900/30 last:border-0 hover:bg-zinc-800/5 transition-colors items-center">
                        <span className="flex items-center gap-2 text-left min-w-0">
                          {repo.fork && <span style={{ color: userColor }} className="text-[10px] opacity-80 shrink-0">-</span>}
                          <div className="truncate flex-1">
                            <GlowText size="12px" color={userColor}>{repo.name}</GlowText>
                          </div>
                        </span>
                        <span className="flex items-center justify-center gap-1.5 font-mono text-[11px] md:text-[13px]">
                           <span className={repo.stargazers_count > 0 ? 'text-amber-400' : 'text-zinc-800'}>{repo.stargazers_count > 0 ? '★' : '☆'}</span>
                           <span className={repo.stargazers_count > 0 ? 'text-amber-400' : 'text-zinc-800'}>{repo.stargazers_count}</span>
                        </span>
                        <span className="text-zinc-600 font-mono text-center">{repo.forks_count}</span>
                        <span className="text-zinc-500 text-[10px] md:text-[12px] font-medium truncate uppercase text-right">
                          {repo.language || "—"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="py-20 text-center text-zinc-800 text-[10px] uppercase">No_data_found</div>
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
