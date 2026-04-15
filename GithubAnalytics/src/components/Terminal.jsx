import { useEffect, useRef } from "react";
import { ACCENT } from "../utils/constants";

const TYPE_STYLES = {
  cmd: { prefix: "> ", color: ACCENT },
  success: { prefix: "", color: ACCENT },
  error: { prefix: "", color: "#ff4488" },
  info: { prefix: "", color: "#555" },
};

export default function Terminal({ logs = [] }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div
      className="rounded-md px-4 py-5 overflow-y-auto text-[0.72rem] leading-relaxed"
      style={{
        background: "#0a0a0a",
        border: "1px solid #1a1a1a",
        maxHeight: "120px",
        fontFamily: "'Share Tech Mono', monospace",
        scrollbarWidth: "thin",
        scrollbarColor: "#2a2a2a transparent",
      }}
    >
      {logs.map((entry, i) => {
        const s = TYPE_STYLES[entry.type] || TYPE_STYLES.info;
        return (
          <div key={i} style={{ color: s.color }}>
            {s.prefix && <span>{s.prefix}</span>}
            {entry.text}
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
