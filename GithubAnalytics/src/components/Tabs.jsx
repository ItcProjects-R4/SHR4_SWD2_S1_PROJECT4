import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { COLORS, ACCENT, ACCENT2 } from '../utils/constants'; 
import { SectionTitle, CustomTooltip, GlowText } from './UI';

export default function GithubAnalyticsTabs({ data = [], currentTab, onTabChange }) {
  const activeTab = currentTab || 'repos';

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6">
      <div className="flex items-center gap-12 border-b border-zinc-900 mb-12 ml-2">
        <button
          onClick={() => onTabChange('repos')}
          className={`pb-4 text-[11px] uppercase tracking-[0.3em] font-mono transition-all relative outline-none ${
            activeTab === 'repos' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
          }`}
        >
          Repos
          {activeTab === 'repos' && (
            <div className="absolute bottom-[-1px] left-0 w-full h-[2px]" style={{ backgroundColor: ACCENT }}></div>
          )}
        </button>

        <button
          onClick={() => onTabChange('languages')}
          className={`pb-4 text-[11px] uppercase tracking-[0.3em] font-mono transition-all relative outline-none ${
            activeTab === 'languages' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
          }`}
        >
          Languages
          {activeTab === 'languages' && (
            <div className="absolute bottom-[-1px] left-0 w-full h-[2px]" style={{ backgroundColor: ACCENT }}></div>
          )}
        </button>
      </div>

      {activeTab === 'repos' ? <ReposTab data={data} /> : <LanguagesTab data={data} />}
    </div>
  );
}

export function ReposTab({ data = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const activeData = Array.isArray(data) ? data.filter(Boolean) : [];

  if (activeData.length === 0) {
    return <div className="text-zinc-800 font-mono text-center py-20 tracking-tighter">INITIALIZING DATA STREAM...</div>;
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

      <div className={`grid gap-12 ${activeData.length > 1 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {activeData.map((d, i) => {
          const userColor = i === 0 ? ACCENT : ACCENT2;
          
          const filteredRepos = d.repos?.filter(repo =>
            repo.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          return (
            <div key={i} className="w-full">
              <div className="ml-1 md:ml-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 rounded-sm shrink-0" style={{ background: userColor }} />
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: userColor }}>
                    {d.user?.login} — REPOSITORIES
                  </span>
                </div>
              </div>

              <div className="border border-zinc-900 rounded bg-black/20 overflow-hidden mx-1 md:mx-4 mt-6">
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
                          {repo.fork && (
                            <span style={{ color: userColor }} className="text-[10px] opacity-80 shrink-0">-</span>
                          )}
                          <div className="truncate flex-1">
                            <GlowText size="12px" color={userColor}>{repo.name}</GlowText>
                          </div>
                        </span>

                        <span className="flex items-center justify-center gap-1.5">
                          <span className={`text-[11px] md:text-[13px] ${repo.stargazers_count > 0 ? 'text-amber-400' : 'text-zinc-800'}`}>
                            {repo.stargazers_count > 0 ? '★' : '☆'}
                          </span>
                          <span className={`font-mono text-[11px] md:text-[13px] ${repo.stargazers_count > 0 ? 'text-amber-400' : 'text-zinc-800'}`}>
                            {repo.stargazers_count}
                          </span>
                        </span>

                        <span className="text-zinc-600 font-mono text-[11px] md:text-[13px] text-center">
                          {repo.forks_count}
                        </span>

                        <span className="text-zinc-500 text-[10px] md:text-[12px] font-medium truncate uppercase text-right">
                          {repo.language || "—"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="py-20 text-center text-zinc-800 text-[10px] uppercase tracking-[0.3em]">
                      No_data_packets_found
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

export function LanguagesTab({ data = [] }) {
  const activeData = Array.isArray(data) ? data.filter(Boolean) : [];
  const dualMode = activeData.length > 1;

  if (activeData.length === 0) return null;

  return (
    <div className={`grid gap-12 ${dualMode ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
      {activeData.map((d, i) => {
        const userColor = i === 0 ? ACCENT : ACCENT2;
        
        return (
          <div key={i} className="font-mono">
            <div className="ml-4">
               <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 rounded-sm shrink-0" style={{ background: userColor }} />
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: userColor }}>
                    {d.user?.login} — LANGUAGE DISTRIBUTION
                  </span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-16 flex-wrap md:flex-nowrap p-8 mt-4 bg-zinc-950/20 border border-zinc-900/50 rounded mx-4">
              <div className="w-[220px] h-[220px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={d.langs}
                      dataKey="value"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={5}
                      stroke="none"
                      isAnimationActive={true}
                    >
                      {d.langs?.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col gap-4 flex-1 max-w-[280px]">
                {d.langs?.map((lang, li) => {
                  const color = COLORS[li % COLORS.length];
                  return (
                    <div key={li} className="flex items-center justify-between text-[12px] border-b border-zinc-900/50 pb-2">
                      <div className="flex items-center gap-3.5">
                        <div className="w-1.5 h-1.5 rounded-full shadow-lg" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
                        <span className="text-zinc-500 uppercase tracking-widest font-bold">{lang.name}</span>
                      </div>
                      <GlowText size="16px" color={color}>{lang.value}</GlowText>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}