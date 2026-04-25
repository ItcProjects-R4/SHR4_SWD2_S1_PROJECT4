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
  return (
    <div
      className={`grid grid-cols-1 ${
        data.length === 2 ? "lg:grid-cols-2" : ""
      } gap-8`}
    >
      {data.filter(Boolean).map((d, i) => {
        const color = i === 0 ? ACCENT : ACCENT2;
        return (
          <div key={d.user.login} className="flex flex-col">
            <UserCard user={d.user} stats={d} color={color} />
            <div className="mt-8">
              <SectionTitle>TOP REPOS BY STARS</SectionTitle>
              <div style={{ height: 180, marginTop: 16 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={d.topByStars}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#222"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#555", fontSize: 10 }}
                      tickLine={false}
                      axisLine={{ stroke: "#333" }}
                    />
                    <YAxis
                      tick={{ fill: "#555", fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                      width={30}
                    />
                    <Tooltip
                      content={<CustomTooltip unit="Stars" />}
                      cursor={{ fill: "#1a1a1a" }}
                    />
                    <Bar
                      dataKey="stars"
                      fill={color}
                      radius={[2, 2, 0, 0]}
                      maxBarSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
