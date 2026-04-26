import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Legend,
} from "recharts";
import { ACCENT, ACCENT2 } from "../../utils/constants";
import { computeRadar } from "../../utils/github";
import { SectionTitle, CustomTooltip, GlowText } from "./../UI";
import { Trophy } from "lucide-react";

export default function CompareTab({ data }) {
  const [d0, d1] = data;
  const radarData = computeRadar(d0, d1);

  const stats = [
    { label: "PUBLIC REPOS", a: d0.totalRepos, b: d1.totalRepos },
    { label: "TOTAL STARS", a: d0.totalStars, b: d1.totalStars },
    { label: "TOTAL FORKS", a: d0.totalForks, b: d1.totalForks },
    { label: "FOLLOWERS", a: d0.user.followers, b: d1.user.followers },
    { label: "FOLLOWING", a: d0.user.following, b: d1.user.following },
    { label: "LANGUAGES", a: d0.langs.length, b: d1.langs.length },
  ];

  const score = (d) =>
    d.totalStars * 3 + d.user.followers * 2 + d.totalRepos + d.langs.length * 5;
  const s0 = score(d0),
    s1 = score(d1);
  const winner = s0 > s1 ? d0.user.login : s1 > s0 ? d1.user.login : null;
  const winColor = s0 >= s1 ? ACCENT : ACCENT2;

  const allNames = [
    ...new Set([
      ...d0.topByStars.map((r) => r.full),
      ...d1.topByStars.map((r) => r.full),
    ]),
  ].slice(0, 10);

  const compareBarData = allNames.map((name) => ({
    name: name.length > 12 ? name.slice(0, 11) + "…" : name,
    [d0.user.login]:
      d0.repos.find((r) => r.full_name === name)?.stargazers_count || 0,
    [d1.user.login]:
      d1.repos.find((r) => r.full_name === name)?.stargazers_count || 0,
  }));

  return (
    <div className="space-y-8">
      <SectionTitle>Head-to-Head Comparison</SectionTitle>

      <div className="grid grid-cols-2 gap-8 items-center">
        {/* Radar Chart */}
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

        {/* Stats */}
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

          {/* Winner */}
          <div
            className="mt-6 p-4 rounded text-center"
            style={{
              border: `1px solid ${ACCENT}20`,
              background: `${ACCENT}05`,
            }}
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

      {/* Bar Chart */}
      <div>
        <SectionTitle>Stars Comparison — Top Repos</SectionTitle>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={compareBarData} barSize={10} barCategoryGap="30%">
            <CartesianGrid stroke="#0a0a0a" vertical={false} />
            <XAxis
              dataKey="name"
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
      </div>
    </div>
  );
}
