import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ACCENT, ACCENT2 } from "../utils/constants";
import { SectionTitle, CustomTooltip } from "./UI";

export default function StarsCompareChart({ compareBarData, login0, login1 }) {
  return (
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
            dataKey={login0}
            fill={ACCENT}
            opacity={0.8}
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey={login1}
            fill={ACCENT2}
            opacity={0.8}
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
