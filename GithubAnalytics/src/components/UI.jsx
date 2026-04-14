import { ACCENT, ACCENT2 } from "../utils/constants";

// ─── GlowText ───────────────────────────────────────────────────────────────
export function GlowText({ color = ACCENT, size = "1rem", children }) {
  return (
    <span
      style={{
        color,
        fontSize: size,
        textShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
      }}
    >
      {children}
    </span>
  );
}

// ─── SectionTitle ────────────────────────────────────────────────────────────
export function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div
        className="w-1 h-5 rounded-sm shrink-0"
        style={{ background: ACCENT }}
      />
      <span
        className="text-xs font-bold tracking-widest uppercase"
        style={{ color: ACCENT }}
      >
        {children}
      </span>
    </div>
  );
}

// ─── CustomTooltip ───────────────────────────────────────────────────────────
export function CustomTooltip({ active, payload, label, unit = "" }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      className="rounded-md px-3 py-2 text-xs min-w-[120px]"
      style={{
        background: "#0d0d0d",
        border: `1px solid ${ACCENT}`,
        color: "#e0e0e0",
        boxShadow: `0 0 12px ${ACCENT}55`,
      }}
    >
      {label && (
        <p
          className="mb-1 font-bold uppercase tracking-wider"
          style={{ color: ACCENT2 }}
        >
          {label}
        </p>
      )}
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color || ACCENT }}>
          {entry.name ? `${entry.name}: ` : ""}
          <span className="text-white">
            {entry.value}
            {unit ? ` ${unit}` : ""}
          </span>
        </p>
      ))}
    </div>
  );
}