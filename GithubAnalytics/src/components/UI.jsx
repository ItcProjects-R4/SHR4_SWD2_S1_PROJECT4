import { ACCENT, ACCENT2 } from "../utils/constants";

// ─── GlowText ───────────────────────────────────────────────────────────────
// Props: color (string), size (string), children
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
// Props: children (string | JSX)
export function SectionTitle({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "12px",
      }}
    >
      {/* green left bar */}
      <div
        style={{
          width: "4px",
          height: "18px",
          background: ACCENT,
          borderRadius: "2px",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          color: ACCENT,
          fontSize: "0.75rem",
          fontWeight: "bold",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
    </div>
  );
}

// ─── CustomTooltip ───────────────────────────────────────────────────────────
// Designed to work inside Recharts — receives active, payload, label from chart
// Props: active, payload, label, unit (optional suffix e.g. "stars")
export function CustomTooltip({ active, payload, label, unit = "" }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      style={{
        background: "#0d0d0d",
        border: `1px solid ${ACCENT}`,
        borderRadius: "6px",
        padding: "10px 14px",
        fontSize: "0.78rem",
        color: "#e0e0e0",
        boxShadow: `0 0 12px ${ACCENT}55`,
        minWidth: "120px",
      }}
    >
      {label && (
        <p
          style={{
            margin: "0 0 6px 0",
            color: ACCENT2,
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {label}
        </p>
      )}
      {payload.map((entry, i) => (
        <p
          key={i}
          style={{
            margin: "2px 0",
            color: entry.color || ACCENT,
          }}
        >
          {entry.name ? `${entry.name}: ` : ""}
          <span style={{ color: "#fff" }}>
            {entry.value}
            {unit ? ` ${unit}` : ""}
          </span>
        </p>
      ))}
    </div>
  );
}