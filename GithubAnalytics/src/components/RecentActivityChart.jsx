import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ACCENT, ACCENT2 } from "../utils/constants";
import { SectionTitle, CustomTooltip } from "./UI";

function getRecentCount(repos, months) {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);
  return repos.filter((r) => new Date(r.updated_at) > cutoff).length;
}

export default function RecentActivityChart({ d0, d1 }) {
  const data = [
    {
      period: "Last 3 Months",
      [d0.user.login]: getRecentCount(d0.repos, 3),
      [d1.user.login]: getRecentCount(d1.repos, 3),
    },
    {
      period: "Last 6 Months",
      [d0.user.login]: getRecentCount(d0.repos, 6),
      [d1.user.login]: getRecentCount(d1.repos, 6),
    },
    {
      period: "Last Year",
      [d0.user.login]: getRecentCount(d0.repos, 12),
      [d1.user.login]: getRecentCount(d1.repos, 12),
    },
  ];

  return (
    <div>
      <SectionTitle>Recently Active Repos</SectionTitle>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barSize={20} barCategoryGap="30%">
          <CartesianGrid stroke="#0a0a0a" vertical={false} />
          <XAxis
            dataKey="period"
            tick={{
              fill: "#333",
              fontSize: 9,
              fontFamily: "'Share Tech Mono', monospace",
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#333", fontSize: 9 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey={d0.user.login}
            fill={ACCENT}
            opacity={0.8}
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey={d1.user.login}
            fill={ACCENT2}
            opacity={0.8}
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-2">
        {[
          { login: d0.user.login, color: ACCENT },
          { login: d1.user.login, color: ACCENT2 },
        ].map((u) => (
          <div key={u.login} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-sm"
              style={{ background: u.color }}
            />
            <span
              className="text-[10px] tracking-[1px]"
              style={{
                color: u.color,
                fontFamily: "'Share Tech Mono', monospace",
              }}
            >
              {u.login}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
