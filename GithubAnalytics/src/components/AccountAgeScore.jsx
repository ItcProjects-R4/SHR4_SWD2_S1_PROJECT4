import { GlowText } from "./UI";

const getLevel = (years) => {
  if (years >= 10) return { label: "VETERAN", color: "#ff6b35" };
  if (years >= 5) return { label: "SENIOR", color: "#ffd700" };
  if (years >= 3) return { label: "MID-LEVEL", color: "#00ff88" };
  if (years >= 1) return { label: "JUNIOR", color: "#00bfff" };
  return { label: "NEWBIE", color: "#888" };
};

export default function AccountAgeScore({ user, color }) {
  const created = new Date(user.created_at);
  const now = new Date();
  const years = ((now - created) / (1000 * 60 * 60 * 24 * 365)).toFixed(1);
  const { label, color: levelColor } = getLevel(parseFloat(years));

  return (
    <div
      className="flex items-center justify-between px-4 py-3 rounded mt-3"
      style={{ border: `1px solid ${color}15`, background: `${color}04` }}
    >
      <div className="flex flex-col">
        <span
          className="text-[10px] tracking-[2px]"
          style={{ color: "#444", fontFamily: "'Share Tech Mono', monospace" }}
        >
          ACCOUNT AGE
        </span>
        <GlowText color={color} size="1rem">
          {years} YRS
        </GlowText>
      </div>
      <div
        className="px-3 py-1 rounded text-[10px] tracking-[2px]"
        style={{
          border: `1px solid ${levelColor}40`,
          color: levelColor,
          background: `${levelColor}10`,
          fontFamily: "'Share Tech Mono', monospace",
          boxShadow: `0 0 8px ${levelColor}20`,
        }}
      >
        {label}
      </div>
    </div>
  );
}
