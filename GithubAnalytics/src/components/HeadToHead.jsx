import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ACCENT, ACCENT2 } from "../utils/constants";
import { CustomTooltip, GlowText } from "./UI";
import { Trophy } from "lucide-react";

export default function HeadToHead({
  radarData,
  stats,
  d0,
  d1,
  winner,
  winColor,
}) {
  return (
    <div className="grid grid-cols-2 gap-8 items-center">
      <ResponsiveContainer width="100%" height={320}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="#111" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fill: "#333",
              fontSize: 11,
              fontFamily: "'Share Tech Mono', monospace",
            }}
          />
          <Radar
            name={d0.user.login}
            dataKey="A"
            stroke={ACCENT}
            fill={ACCENT}
            fillOpacity={0.15}
            strokeWidth={2}
          />
          <Radar
            name={d1.user.login}
            dataKey="B"
            stroke={ACCENT2}
            fill={ACCENT2}
            fillOpacity={0.15}
            strokeWidth={2}
          />
          <Legend
            formatter={(v) => (
              <span
                className="text-[11px] text-[#555]"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                {v}
              </span>
            )}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>

      <div className="space-y-4.5">
        {stats.map(({ label, a, b }) => {
          const pct = Math.round((a / (a + b || 1)) * 100);
          return (
            <div key={label}>
              <div className="flex justify-between items-center mb-1.5">
                <GlowText color={ACCENT} size="12px">
                  {a}
                </GlowText>
                <span className="text-[#333] tracking-[2px] text-[10px]">
                  {label}
                </span>
                <GlowText color={ACCENT2} size="12px">
                  {b}
                </GlowText>
              </div>
              <div className="h-1 bg-[#0d0d0d] rounded-sm flex overflow-hidden">
                <div
                  className="h-full"
                  style={{
                    width: `${pct}%`,
                    background: ACCENT,
                    boxShadow: `0 0 6px ${ACCENT}`,
                  }}
                />
                <div
                  className="flex-1 h-full"
                  style={{
                    background: ACCENT2,
                    boxShadow: `0 0 6px ${ACCENT2}`,
                  }}
                />
              </div>
            </div>
          );
        })}

        <div
          className="mt-6 p-4 rounded text-center"
          style={{ border: `1px solid ${ACCENT}20`, background: `${ACCENT}05` }}
        >
          <div className="text-[10px] text-[#333] tracking-[3px] mb-2">
            OVERALL WINNER
          </div>
          <GlowText color={winColor} size="1.4rem">
            {winner ? (
              <span className="flex items-center justify-center gap-2">
                <Trophy size={18} color={winColor} />
                {winner}
              </span>
            ) : (
              "TIE"
            )}
          </GlowText>
        </div>
      </div>
    </div>
  );
}
