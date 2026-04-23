import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { COLORS, ACCENT, ACCENT2 } from '../../utils/constants';
import { SectionTitle, CustomTooltip, GlowText } from "./../UI";


export default function LanguagesTab({ data = [] }) {
  const activeData = Array.isArray(data) ? data.filter(Boolean) : [];
  const dualMode = activeData.length > 1;

  if (activeData.length === 0) return null;

  return (
    <div className={`grid gap-12 ${dualMode ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
      {activeData.map((d, i) => {
        const userColor = i === 0 ? ACCENT : ACCENT2;
        
        return (
          <div key={i} className="font-mono">
            <div className="ml-4 mb-4">
              <SectionTitle color={userColor}>
                {d.user?.login} — LANGUAGES
              </SectionTitle>
            </div>

            <div className="flex items-center justify-center gap-16 flex-wrap md:flex-nowrap p-8 bg-zinc-950/20 border border-zinc-900/50 rounded mx-4">
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
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
                        <span className="text-zinc-500 uppercase font-bold">{lang.name}</span>
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