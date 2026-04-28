import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { COLORS } from "../../utils/constants";
import { SectionTitle, CustomTooltip, GlowText } from "./../UI";

export default function LanguagesTab({ data = [] }) {
  const activeData = Array.isArray(data) ? data.filter(Boolean) : [];
  const dualMode = activeData.length > 1;

  if (activeData.length === 0) return null;

  return (
    <div
      className={`grid gap-6 ${dualMode ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}
    >
      {activeData.map((d, i) => (
        <div key={i}>
          <SectionTitle>{d.user?.login} — Language Distribution</SectionTitle>

          <div className="grid gap-6 items-center grid-cols-1 lg:grid-cols-2">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={d.langs}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  paddingAngle={2}
                >
                  {d.langs?.map((_, li) => (
                    <Cell
                      key={li}
                      fill={COLORS[li % COLORS.length]}
                      opacity={0.85}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex flex-col gap-2.5">
              {d.langs?.map((lang, li) => {
                const color = COLORS[li % COLORS.length];
                return (
                  <div key={li} className="flex items-center gap-2.5">
                    <div
                      className="shrink-0"
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "2px",
                        background: color,
                        boxShadow: `0 0 6px ${color}`,
                      }}
                    />
                    <span
                      className="flex-1 text-[11px]"
                      style={{ color: "#666" }}
                    >
                      {lang.name}
                    </span>
                    <GlowText color={color} size="12px">
                      {lang.value}
                    </GlowText>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
