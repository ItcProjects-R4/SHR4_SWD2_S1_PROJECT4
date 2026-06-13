import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ACCENT, ACCENT2 } from "../utils/constants";
import { SectionTitle, CustomTooltip } from "./UI";

function getSizeDistribution(repos) {
  return {
    small: repos.filter((r) => r.stargazers_count < 100).length,
    medium: repos.filter(
      (r) => r.stargazers_count >= 100 && r.stargazers_count < 1000,
    ).length,
    large: repos.filter((r) => r.stargazers_count >= 1000).length,
  };
}

export default function RepoSizeChart({ d0, d1 }) {
  const dist0 = getSizeDistribution(d0.repos);
  const dist1 = getSizeDistribution(d1.repos);

  const data = [
    {
      size: "< 100 ★",
      [d0.user.login]: dist0.small,
      [d1.user.login]: dist1.small,
    },
    {
      size: "100-1k ★",
      [d0.user.login]: dist0.medium,
      [d1.user.login]: dist1.medium,
    },
    {
      size: "> 1k ★",
      [d0.user.login]: dist0.large,
      [d1.user.login]: dist1.large,
    },
  ];

  return (
    <div>
      <SectionTitle>Repo Size Distribution</SectionTitle>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barSize={20} barCategoryGap="30%">
          <CartesianGrid stroke="#0a0a0a" vertical={false} />
          <XAxis
            dataKey="size"
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
