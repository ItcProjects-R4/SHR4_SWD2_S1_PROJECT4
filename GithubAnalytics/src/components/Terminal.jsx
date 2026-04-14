import { useEffect, useRef } from "react";
import { ACCENT } from "../utils/constants";

// ─── Terminal ────────────────────────────────────────────────────────────────
// Props:
//   logs — array of { type: "cmd" | "success" | "error" | "info", text: string }
//
// Behaviour:
//   • "cmd"     → green  ">"  prefix
//   • "success" → green  text
//   • "error"   → red    text
//   • "info"    → dimmed text
//   • auto-scrolls to bottom on every new log entry
//   • max height 120px with overflow-y scroll

const TYPE_STYLES = {
  cmd: {
    prefix: "> ",
    prefixColor: ACCENT,
    color: ACCENT,
  },
  success: {
    prefix: "",
    prefixColor: "transparent",
    color: ACCENT,
  },
  error: {
    prefix: "",
    prefixColor: "transparent",
    color: "#ff4488",
  },
  info: {
    prefix: "",
    prefixColor: "transparent",
    color: "#555",
  },
};

export default function Terminal({ logs = [] }) {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom whenever logs change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div
      style={{
        background: "#0a0a0a",
        border: "1px solid #1a1a1a",
        borderRadius: "6px",
        padding: "10px 14px",
        maxHeight: "120px",
        overflowY: "auto",
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: "0.72rem",
        lineHeight: "1.6",
        // custom slim scrollbar
        scrollbarWidth: "thin",
        scrollbarColor: "#2a2a2a transparent",
      }}
    >
      {logs.map((entry, i) => {
        const style = TYPE_STYLES[entry.type] || TYPE_STYLES.info;
        return (
          <div key={i} style={{ color: style.color }}>
            {style.prefix && (
              <span style={{ color: style.prefixColor }}>{style.prefix}</span>
            )}
            {entry.text}
          </div>
        );
      })}
      {/* sentinel element — scrolled into view on update */}
      <div ref={bottomRef} />
    </div>
  );
}