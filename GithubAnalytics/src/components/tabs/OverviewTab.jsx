import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ACCENT, ACCENT2 } from "../../utils/constants";
import UserCard from "../UserCard";
import { SectionTitle, CustomTooltip } from "../UI";

export default function OverviewTab({ data = [] }) {
  const activeData = data.filter(Boolean);
  const dual = activeData.length > 1;

  return (
    <div
      className={`grid gap-6 ${dual ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}
    >
      {activeData.map((d, i) => {
        const color = i === 0 ? ACCENT : ACCENT2;
        return (
          <div key={d.user.login} className="flex flex-col">
            <UserCard user={d.user} stats={d} color={color} />
            <div className="mt-5">
              <SectionTitle>Top Repos by Stars</SectionTitle>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={d.topByStars} barSize={14}>
                  <CartesianGrid stroke="#0d0d0d" vertical={false} />
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
                    dataKey="stars"
                    fill={color}
                    opacity={0.8}
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}
